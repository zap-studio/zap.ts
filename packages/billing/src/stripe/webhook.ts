import type Stripe from "stripe";

import { VerificationError, type VerifyFn } from "@zap-studio/webhooks";
import { env } from "@zap-ts/environment";
import StripeSdk from "stripe";

import type { BillingStatus, BillingWebhookEvent, BillingWebhookEventType } from "../core/types";

const decoder = new TextDecoder();

export const stripeVerify: VerifyFn = async (ctx) => {
  const signature = ctx.request.headers.get("stripe-signature");

  if (!signature) {
    throw new VerificationError("missing stripe-signature header");
  }

  try {
    await StripeSdk.webhooks.constructEventAsync(
      decoder.decode(ctx.rawBody),
      signature,
      env.STRIPE_WEBHOOK_SECRET,
      undefined,
      StripeSdk.createSubtleCryptoProvider(),
    );
  } catch (cause) {
    throw new VerificationError(`stripe signature verification failed: ${String(cause)}`);
  }
};

export const parseStripeEvent = (rawBody: Uint8Array): Stripe.Event => {
  // SAFETY: `stripeVerify` already confirmed this exact payload came from Stripe.
  return JSON.parse(decoder.decode(rawBody)) as Stripe.Event;
};

const statusMap = {
  trialing: "trialing",
  active: "active",
  past_due: "past_due",
  canceled: "canceled",
  incomplete: "incomplete",
  incomplete_expired: "canceled",
  unpaid: "unpaid",
  paused: null,
} as const satisfies Record<Stripe.Subscription.Status, BillingStatus | null>;

const toBillingStatus = (status: Stripe.Subscription.Status): BillingStatus | null => {
  if (!Object.hasOwn(statusMap, status)) {
    return null;
  }

  // SAFETY: just confirmed above that `status` is one of `statusMap`'s own keys.
  return statusMap[status as keyof typeof statusMap];
};

const subscriptionEventTypes = {
  "customer.subscription.created": "subscription.created",
  "customer.subscription.updated": "subscription.updated",
  "customer.subscription.deleted": "subscription.deleted",
} as const satisfies Record<string, BillingWebhookEventType>;

type SubscriptionEventType = keyof typeof subscriptionEventTypes;

const isSubscriptionEvent = (type: string): type is SubscriptionEventType =>
  type in subscriptionEventTypes;

const toWebhookEvent = (
  event: Stripe.Event,
  type: SubscriptionEventType,
  subscription: Stripe.Subscription,
  organizationId: string,
): BillingWebhookEvent => {
  const item = subscription.items.data[0];

  return {
    id: event.id,
    type: subscriptionEventTypes[type],
    organizationId,
    customerId:
      typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id,
    subscriptionId: subscription.id,
    planId: item?.price.id ?? null,
    status: toBillingStatus(subscription.status),
    quantity: item?.quantity ?? null,
    currentPeriodEnd: item ? new Date(item.current_period_end * 1000) : null,
    trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  };
};

export const toBillingWebhookEvent = (event: Stripe.Event): BillingWebhookEvent | null => {
  if (!isSubscriptionEvent(event.type)) {
    return null;
  }

  // SAFETY: `isSubscriptionEvent` only matches Stripe subscription webhook types,
  // whose `data.object` is always a Stripe.Subscription.
  const subscription = event.data.object as Stripe.Subscription;
  const organizationId = subscription.metadata["organizationId"];

  if (!organizationId) {
    return null;
  }

  return toWebhookEvent(event, event.type, subscription, organizationId);
};
