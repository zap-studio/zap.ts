import { Effect } from "effect";

import type { BillingWebhookEvent } from "./core/types";

import { BillingError } from "./core/errors";
import { BillingProvider, type CheckoutOptions } from "./core/provider";
import { BillingStore } from "./core/store";
import { withTrialDays } from "./core/trial";
import { applySubscriptionEvent } from "./core/webhook";

export interface SubscriptionPlan {
  id: string;
  priceId: string;
  trialDays?: number;
}

export interface SubscriptionConfig {
  plans: SubscriptionPlan[];
}

export interface StartCheckoutInput {
  organizationId: string;
  customerEmail: string;
  planId?: string;
  quantity?: number;
  successUrl: string;
  cancelUrl: string;
}

export const createSubscriptionBilling = (config: SubscriptionConfig) => {
  const findPlan = (planId: string | undefined): SubscriptionPlan | undefined =>
    config.plans.find((candidate) => candidate.id === planId);

  const startCheckout = (
    input: StartCheckoutInput,
  ): Effect.Effect<{ url: string }, BillingError, BillingProvider> =>
    Effect.gen(function* () {
      const plan = findPlan(input.planId);

      if (!plan) {
        return yield* Effect.fail(new BillingError({ cause: `unknown plan: ${input.planId}` }));
      }

      const checkoutOpts: CheckoutOptions = withTrialDays(
        {
          organizationId: input.organizationId,
          customerEmail: input.customerEmail,
          priceId: plan.priceId,
          successUrl: input.successUrl,
          cancelUrl: input.cancelUrl,
        },
        plan.trialDays,
      );

      if (input.quantity !== undefined) {
        checkoutOpts.quantity = input.quantity;
      }

      const provider = yield* BillingProvider;
      return yield* provider.createCheckoutSession(checkoutOpts);
    });

  const onWebhookEvent = (
    event: BillingWebhookEvent,
  ): Effect.Effect<void, BillingError, BillingStore> =>
    Effect.gen(function* () {
      const store = yield* BillingStore;
      yield* applySubscriptionEvent(store, event);
    });

  const resolveSubscriptionStatus = (organizationId: string) =>
    Effect.gen(function* () {
      const store = yield* BillingStore;
      return yield* store.resolveSubscriptionStatus(organizationId);
    });

  return { startCheckout, onWebhookEvent, resolveSubscriptionStatus };
};
