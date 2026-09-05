import { BillingProvider, BillingStore, BillingStoreLive } from "@zap-ts/billing";
import { MembershipStore, MembershipStoreLive } from "@zap-ts/billing/membership";
import { StripeBillingProviderLive, StripeClientLive } from "@zap-ts/billing/stripe";
import { createSubscriptionBilling } from "@zap-ts/billing/subscription";
import { DatabaseLive } from "@zap-ts/database";
import { Effect, Layer, ManagedRuntime } from "effect";

// TODO: Replace these placeholder plan ids and Stripe price ids with your own. Pass a
// `quantity` in `startCheckout` for a plan you want billed per seat.
export const billing = createSubscriptionBilling({
  plans: [
    { id: "starter", priceId: "price_replace_me_starter", trialDays: 14 },
    { id: "team", priceId: "price_replace_me_team", trialDays: 14 },
  ],
});

const buildBillingLayer = (connectionString: string) => {
  const databaseLayer = DatabaseLive(connectionString);
  const storeLayer = BillingStoreLive.pipe(Layer.provide(databaseLayer));
  const membershipStoreLayer = MembershipStoreLive.pipe(Layer.provide(databaseLayer));
  const providerLayer = StripeBillingProviderLive.pipe(
    Layer.provide(StripeClientLive),
    Layer.provide(storeLayer),
  );

  return Layer.mergeAll(providerLayer, storeLayer, membershipStoreLayer);
};

export const runBilling = async <A, E>(
  connectionString: string,
  effect: Effect.Effect<A, E, BillingProvider | BillingStore | MembershipStore>,
): Promise<A> => {
  const runtime = ManagedRuntime.make(buildBillingLayer(connectionString));

  try {
    return await runtime.runPromise(effect);
  } finally {
    await runtime.dispose();
  }
};
