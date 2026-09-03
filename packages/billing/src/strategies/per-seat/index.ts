import { Effect, Layer } from "effect";

import type { BillingError } from "../../_shared/errors";

import { BillingProvider } from "../../_shared/provider";
import { BillingStore } from "../../_shared/store";
import { BillingStrategy, type BillingStrategyService } from "../../_shared/strategy";
import { resolveTrialDays, withTrialDays } from "../../_shared/trial";
import { applySubscriptionEvent } from "../../_shared/webhook";

export interface PerSeatConfig {
  planId: string;
  priceId: string;
  trialDays?: number;
}

export const makePerSeatStrategy = (
  config: PerSeatConfig,
): Layer.Layer<BillingStrategy, never, BillingProvider | BillingStore> =>
  Layer.effect(
    BillingStrategy,
    Effect.gen(function* () {
      const provider = yield* BillingProvider;
      const store = yield* BillingStore;

      const service: BillingStrategyService = {
        kind: "per-seat",

        startCheckout: (input) =>
          provider.createCheckoutSession(
            withTrialDays(
              {
                organizationId: input.organizationId,
                customerEmail: input.customerEmail,
                priceId: config.priceId,
                quantity: input.quantity ?? 1,
                successUrl: input.successUrl,
                cancelUrl: input.cancelUrl,
              },
              resolveTrialDays(config.trialDays),
            ),
          ),

        onWebhookEvent: (event) => applySubscriptionEvent(store, "per-seat", event),

        resolveEntitlement: (organizationId) => store.resolveEntitlement(organizationId),
      };

      return service;
    }),
  );

// Call whenever an organization's member count changes, so Stripe's subscription
// quantity (and therefore the invoiced seat count) stays in sync with membership.
export const syncSeatCount = (
  subscriptionId: string,
  quantity: number,
): Effect.Effect<void, BillingError, BillingProvider> =>
  Effect.gen(function* () {
    const provider = yield* BillingProvider;
    yield* provider.updateSubscriptionQuantity(subscriptionId, quantity);
  });
