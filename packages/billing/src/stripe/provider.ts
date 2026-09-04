import type Stripe from "stripe";

import { Effect, Layer } from "effect";

import { BillingError } from "../core/errors";
import {
  BillingProvider,
  type BillingProviderService,
  type CheckoutOptions,
} from "../core/provider";
import { BillingStore } from "../core/store";
import { StripeClient } from "./client";

export const StripeBillingProviderLive: Layer.Layer<
  BillingProvider,
  never,
  StripeClient | BillingStore
> = Layer.effect(
  BillingProvider,
  Effect.gen(function* () {
    const stripe = yield* StripeClient;
    const store = yield* BillingStore;

    const createCustomer: BillingProviderService["createCustomer"] = (organizationId, email) =>
      Effect.gen(function* () {
        const customer = yield* Effect.tryPromise({
          try: () => stripe.customers.create({ email, metadata: { organizationId } }),
          catch: (cause) => new BillingError({ cause }),
        });
        yield* store.upsertCustomer(organizationId, customer.id);
        return customer.id;
      });

    const createCheckoutSession: BillingProviderService["createCheckoutSession"] = (
      opts: CheckoutOptions,
    ) =>
      Effect.gen(function* () {
        const customerId = yield* store.getCustomerId(opts.organizationId);

        const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = { price: opts.priceId };
        if (opts.quantity !== undefined) {
          lineItem.quantity = opts.quantity;
        }

        const subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData = {
          metadata: { organizationId: opts.organizationId },
        };
        if (opts.trialDays !== undefined) {
          subscriptionData.trial_period_days = opts.trialDays;
        }

        const session = yield* Effect.tryPromise({
          try: () =>
            stripe.checkout.sessions.create({
              mode: "subscription",
              ...(customerId ? { customer: customerId } : { customer_email: opts.customerEmail }),
              line_items: [lineItem],
              subscription_data: subscriptionData,
              payment_method_collection: opts.trialDays === undefined ? "always" : "if_required",
              success_url: opts.successUrl,
              cancel_url: opts.cancelUrl,
            }),
          catch: (cause) => new BillingError({ cause }),
        });

        if (!session.url) {
          return yield* Effect.fail(new BillingError({ cause: "checkout session missing url" }));
        }

        return { url: session.url };
      });

    const createPortalSession: BillingProviderService["createPortalSession"] = (
      organizationId,
      returnUrl,
    ) =>
      Effect.gen(function* () {
        const customerId = yield* store.getCustomerId(organizationId);

        if (!customerId) {
          return yield* Effect.fail(
            new BillingError({ cause: "no stripe customer for organization" }),
          );
        }

        const session = yield* Effect.tryPromise({
          try: () =>
            stripe.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl }),
          catch: (cause) => new BillingError({ cause }),
        });

        return { url: session.url };
      });

    const updateSubscriptionQuantity: BillingProviderService["updateSubscriptionQuantity"] = (
      subscriptionId,
      quantity,
    ) =>
      Effect.gen(function* () {
        const subscription = yield* Effect.tryPromise({
          try: () => stripe.subscriptions.retrieve(subscriptionId),
          catch: (cause) => new BillingError({ cause }),
        });

        const item = subscription.items.data[0];

        if (!item) {
          yield* Effect.fail(new BillingError({ cause: "subscription has no items" }));
          return;
        }

        yield* Effect.tryPromise({
          try: () => stripe.subscriptionItems.update(item.id, { quantity }),
          catch: (cause) => new BillingError({ cause }),
        });
      });

    const service: BillingProviderService = {
      createCustomer,
      createCheckoutSession,
      createPortalSession,
      updateSubscriptionQuantity,
    };

    return service;
  }),
);
