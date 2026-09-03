import { Effect, Layer } from "effect";

import { BillingError } from "../../_shared/errors";
import { BillingProvider } from "../../_shared/provider";
import { BillingStore } from "../../_shared/store";
import { BillingStrategy, type BillingStrategyService } from "../../_shared/strategy";
import { resolveTrialDays, withTrialDays } from "../../_shared/trial";
import { applySubscriptionEvent } from "../../_shared/webhook";

export interface TieredPlan {
  id: string;
  priceId: string;
  trialDays?: number;
}

export interface TieredSubscriptionConfig {
  plans: TieredPlan[];
  defaultTrialDays?: number;
}

export const makeTieredSubscriptionStrategy = (
  config: TieredSubscriptionConfig,
): Layer.Layer<BillingStrategy, never, BillingProvider | BillingStore> => {
  const findPlan = (planId: string | undefined): TieredPlan | undefined =>
    config.plans.find((candidate) => candidate.id === planId);

  return Layer.effect(
    BillingStrategy,
    Effect.gen(function* () {
      const provider = yield* BillingProvider;
      const store = yield* BillingStore;

      const service: BillingStrategyService = {
        kind: "tiered-subscription",

        startCheckout: (input) =>
          Effect.gen(function* () {
            const plan = findPlan(input.planId);

            if (!plan) {
              return yield* Effect.fail(
                new BillingError({ cause: `unknown plan: ${input.planId}` }),
              );
            }

            return yield* provider.createCheckoutSession(
              withTrialDays(
                {
                  organizationId: input.organizationId,
                  customerEmail: input.customerEmail,
                  priceId: plan.priceId,
                  successUrl: input.successUrl,
                  cancelUrl: input.cancelUrl,
                },
                resolveTrialDays(plan.trialDays, config.defaultTrialDays),
              ),
            );
          }),

        onWebhookEvent: (event) => applySubscriptionEvent(store, "tiered-subscription", event),

        resolveEntitlement: (organizationId) => store.resolveEntitlement(organizationId),
      };

      return service;
    }),
  );
};
