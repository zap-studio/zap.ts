import { Effect, Layer } from "effect";

import { BillingError } from "./_shared/errors";
import { BillingProvider, type CheckoutOptions } from "./_shared/provider";
import { BillingStore } from "./_shared/store";
import { BillingStrategy, type BillingStrategyService } from "./_shared/strategy";
import { resolveTrialDays, withTrialDays } from "./_shared/trial";
import { applySubscriptionEvent } from "./_shared/webhook";

export interface SubscriptionPlan {
  id: string;
  priceId: string;
  trialDays?: number;
}

export interface SubscriptionConfig {
  plans: SubscriptionPlan[];
  defaultTrialDays?: number;
}

// Tiered subscription billing: pick a plan by id, optionally with a seat `quantity`
// on top (per-seat billing is just this plan's price multiplied by quantity in Stripe).
export const makeSubscriptionStrategy = (
  config: SubscriptionConfig,
): Layer.Layer<BillingStrategy, never, BillingProvider | BillingStore> => {
  const findPlan = (planId: string | undefined): SubscriptionPlan | undefined =>
    config.plans.find((candidate) => candidate.id === planId);

  return Layer.effect(
    BillingStrategy,
    Effect.gen(function* () {
      const provider = yield* BillingProvider;
      const store = yield* BillingStore;

      const service: BillingStrategyService = {
        startCheckout: (input) =>
          Effect.gen(function* () {
            const plan = findPlan(input.planId);

            if (!plan) {
              return yield* Effect.fail(
                new BillingError({ cause: `unknown plan: ${input.planId}` }),
              );
            }

            const checkoutOpts: CheckoutOptions = withTrialDays(
              {
                organizationId: input.organizationId,
                customerEmail: input.customerEmail,
                priceId: plan.priceId,
                successUrl: input.successUrl,
                cancelUrl: input.cancelUrl,
              },
              resolveTrialDays(plan.trialDays, config.defaultTrialDays),
            );

            if (input.quantity !== undefined) {
              checkoutOpts.quantity = input.quantity;
            }

            return yield* provider.createCheckoutSession(checkoutOpts);
          }),

        onWebhookEvent: (event) => applySubscriptionEvent(store, event),

        resolveEntitlement: (organizationId) => store.resolveEntitlement(organizationId),
      };

      return service;
    }),
  );
};

// Call whenever an organization's seat count changes (member joins or leaves) to keep
// Stripe's subscription quantity, and therefore the invoiced seat count, in sync.
// Only relevant for plans billed per seat.
export const syncSeatCount = (
  subscriptionId: string,
  quantity: number,
): Effect.Effect<void, BillingError, BillingProvider> =>
  Effect.gen(function* () {
    const provider = yield* BillingProvider;
    yield* provider.updateSubscriptionQuantity(subscriptionId, quantity);
  });
