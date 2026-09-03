import { BillingStoreLive } from "@zap-ts/billing";
import { makePerSeatStrategy } from "@zap-ts/billing/strategies/per-seat";
import { StripeBillingProviderLive, StripeClientLive } from "@zap-ts/billing/stripe";
import { DatabaseLive } from "@zap-ts/database";
import { Layer } from "effect";

// TODO: Swap this for `makeFlatSubscriptionStrategy`, `makeTieredSubscriptionStrategy`, or
// `makeUsageBasedStrategy` (from their respective `@zap-ts/billing/strategies/*`
// subpaths) to change pricing models.
const strategy = makePerSeatStrategy({
  planId: "team",
  priceId: "price_replace_me",
  trialDays: 14,
});

export const buildBillingLayer = (connectionString: string) => {
  const databaseLayer = DatabaseLive(connectionString);
  const storeLayer = BillingStoreLive.pipe(Layer.provide(databaseLayer));
  const providerLayer = StripeBillingProviderLive.pipe(
    Layer.provide(StripeClientLive),
    Layer.provide(storeLayer),
  );
  const strategyLayer = strategy.pipe(Layer.provide(providerLayer), Layer.provide(storeLayer));

  return Layer.mergeAll(providerLayer, storeLayer, strategyLayer);
};
