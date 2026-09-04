import { BillingProvider, BillingStore, BillingStoreLive, BillingStrategy } from "@zap-ts/billing";
import { StripeBillingProviderLive, StripeClientLive } from "@zap-ts/billing/stripe";
import { makeSubscriptionStrategy } from "@zap-ts/billing/subscription";
import { DatabaseLive } from "@zap-ts/database";
import { Effect, Layer, ManagedRuntime } from "effect";

// TODO: Replace these placeholder plan ids and Stripe price ids with your own. Pass a
// `quantity` in `startCheckout` for a plan you want billed per seat.
const strategy = makeSubscriptionStrategy({
  plans: [
    { id: "starter", priceId: "price_replace_me_starter" },
    { id: "team", priceId: "price_replace_me_team" },
  ],
  defaultTrialDays: 14,
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

export const runBilling = async <A, E>(
  connectionString: string,
  effect: Effect.Effect<A, E, BillingProvider | BillingStore | BillingStrategy>,
): Promise<A> => {
  const runtime = ManagedRuntime.make(buildBillingLayer(connectionString));

  try {
    return await runtime.runPromise(effect);
  } finally {
    await runtime.dispose();
  }
};
