import { env } from "@zap-ts/environment";
import { Context, Layer } from "effect";
import Stripe from "stripe";

export class StripeClient extends Context.Tag("StripeClient")<StripeClient, Stripe>() {}

export const StripeClientLive: Layer.Layer<StripeClient> = Layer.sync(
  StripeClient,
  () =>
    new Stripe(env.STRIPE_SECRET_KEY, {
      httpClient: Stripe.createFetchHttpClient(),
    }),
);
