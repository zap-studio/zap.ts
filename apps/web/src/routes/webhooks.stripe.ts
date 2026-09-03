import { createFileRoute } from "@tanstack/react-router";
import { createWebhookRouter } from "@zap-studio/webhooks";
import { BillingStrategy } from "@zap-ts/billing";
import { parseStripeEvent, stripeVerify, toBillingWebhookEvent } from "@zap-ts/billing/stripe";
// oxlint-disable-next-line sonarjs/no-implicit-dependencies -- Workers runtime built-in, not an npm package
import { env as cloudflareEnv } from "cloudflare:workers";
import { Effect, ManagedRuntime } from "effect";

import { buildBillingLayer } from "../lib/billing";

const router = createWebhookRouter({ prefix: "/webhooks" });

router.register("/stripe", {
  verify: stripeVerify,
  handler: async (ctx) => {
    const stripeEvent = parseStripeEvent(ctx.rawBody);
    const billingEvent = toBillingWebhookEvent(stripeEvent);

    if (!billingEvent) {
      return Response.json({ received: true });
    }

    const runtime = ManagedRuntime.make(
      buildBillingLayer(cloudflareEnv.HYPERDRIVE.connectionString),
    );

    try {
      await runtime.runPromise(
        Effect.gen(function* () {
          const strategy = yield* BillingStrategy;
          yield* strategy.onWebhookEvent(billingEvent);
        }),
      );
    } finally {
      await runtime.dispose();
    }

    return Response.json({ received: true });
  },
});

export const Route = createFileRoute("/webhooks/stripe")({
  server: {
    handlers: {
      POST: ({ request }) => router.handle(request),
    },
  },
});
