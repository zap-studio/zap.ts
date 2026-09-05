import type Stripe from "stripe";

export type LifecycleEventType = "trial_will_end" | "payment_failed" | "canceled";

export interface LifecycleEvent {
  type: LifecycleEventType;
  organizationId: string;
  trialEndsAt: Date | null;
}

export const toLifecycleEvent = (event: Stripe.Event): LifecycleEvent | null => {
  if (event.type === "customer.subscription.trial_will_end") {
    // SAFETY: for this event type, Stripe always sets `data.object` to a Stripe.Subscription.
    const subscription = event.data.object as Stripe.Subscription;
    const organizationId = subscription.metadata["organizationId"];

    if (!organizationId) {
      return null;
    }

    return {
      type: "trial_will_end",
      organizationId,
      trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
    };
  }

  if (event.type === "customer.subscription.deleted") {
    // SAFETY: for this event type, Stripe always sets `data.object` to a Stripe.Subscription.
    const subscription = event.data.object as Stripe.Subscription;
    const organizationId = subscription.metadata["organizationId"];

    if (!organizationId) {
      return null;
    }

    return { type: "canceled", organizationId, trialEndsAt: null };
  }

  if (event.type === "invoice.payment_failed") {
    // SAFETY: for this event type, Stripe always sets `data.object` to a Stripe.Invoice.
    const invoice = event.data.object as Stripe.Invoice;
    const organizationId = invoice.parent?.subscription_details?.metadata?.["organizationId"];

    if (!organizationId) {
      return null;
    }

    return { type: "payment_failed", organizationId, trialEndsAt: null };
  }

  return null;
};
