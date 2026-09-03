import { Effect, Layer } from "effect";

import type { BillingError } from "../../_shared/errors";

import { BillingProvider } from "../../_shared/provider";
import { BillingStore } from "../../_shared/store";
import { BillingStrategy, type BillingStrategyService } from "../../_shared/strategy";
import { applySubscriptionEvent } from "../../_shared/webhook";

export interface UsageBasedConfig {
  planId: string;
  meteredPriceId: string;
  meterEventName: string;
  initialCredits: number;
}

export const makeUsageBasedStrategy = (
  config: UsageBasedConfig,
): Layer.Layer<BillingStrategy, never, BillingProvider | BillingStore> =>
  Layer.effect(
    BillingStrategy,
    Effect.gen(function* () {
      const provider = yield* BillingProvider;
      const store = yield* BillingStore;

      const service: BillingStrategyService = {
        kind: "usage-based",

        // No trial: access before payment is granted through `initialCredits` instead.
        startCheckout: (input) =>
          provider.createCheckoutSession({
            organizationId: input.organizationId,
            customerEmail: input.customerEmail,
            priceId: config.meteredPriceId,
            successUrl: input.successUrl,
            cancelUrl: input.cancelUrl,
          }),

        onWebhookEvent: (event) => applySubscriptionEvent(store, "usage-based", event),

        // Grants `initialCredits` once, on the first entitlement check for the org, so
        // access is available before a subscription exists. The grant's id is keyed to
        // the organization, so this stays a no-op on every later call.
        resolveEntitlement: (organizationId) =>
          Effect.gen(function* () {
            const alreadyGranted = yield* store.hasCreditHistory(organizationId);

            if (!alreadyGranted) {
              yield* store.grantCredits(
                organizationId,
                config.initialCredits,
                "initial_grant",
                organizationId,
              );
            }

            const base = yield* store.resolveEntitlement(organizationId);
            const creditsRemaining = yield* store.creditBalance(organizationId);

            return { ...base, creditsRemaining, active: base.active || creditsRemaining > 0 };
          }),
      };

      return service;
    }),
  );

// Consumes included credits first; once they run out, usage is reported to Stripe's
// meter so the metered price picks up billing for the overage.
export const recordUsage = (
  organizationId: string,
  meterEventName: string,
  value: number,
): Effect.Effect<void, BillingError, BillingProvider | BillingStore> =>
  Effect.gen(function* () {
    const store = yield* BillingStore;

    const consumed = yield* store.consumeCredits(organizationId, value, "usage").pipe(
      Effect.as(true),
      Effect.catchTag("EntitlementError", () => Effect.succeed(false)),
    );

    if (consumed) {
      return;
    }

    const provider = yield* BillingProvider;
    yield* provider.reportUsage(organizationId, meterEventName, value);
  });
