import { Effect, Layer } from "effect";

import { BillingProvider } from "../../_shared/provider";
import { BillingStore } from "../../_shared/store";
import { BillingStrategy, type BillingStrategyService } from "../../_shared/strategy";
import { resolveTrialDays, withTrialDays } from "../../_shared/trial";
import { applySubscriptionEvent } from "../../_shared/webhook";

export interface FlatSubscriptionConfig {
  planId: string;
  priceId: string;
  trialDays?: number;
}

export const makeFlatSubscriptionStrategy = (
  config: FlatSubscriptionConfig,
): Layer.Layer<BillingStrategy, never, BillingProvider | BillingStore> =>
  Layer.effect(
    BillingStrategy,
    Effect.gen(function* () {
      const provider = yield* BillingProvider;
      const store = yield* BillingStore;

      const service: BillingStrategyService = {
        kind: "flat-subscription",

        startCheckout: (input) =>
          provider.createCheckoutSession(
            withTrialDays(
              {
                organizationId: input.organizationId,
                customerEmail: input.customerEmail,
                priceId: config.priceId,
                successUrl: input.successUrl,
                cancelUrl: input.cancelUrl,
              },
              resolveTrialDays(config.trialDays),
            ),
          ),

        onWebhookEvent: (event) => applySubscriptionEvent(store, "flat-subscription", event),

        resolveEntitlement: (organizationId) => store.resolveEntitlement(organizationId),
      };

      return service;
    }),
  );
