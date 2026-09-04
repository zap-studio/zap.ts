import { createFileRoute } from "@tanstack/react-router";
import { createWebhookRouter } from "@zap-studio/webhooks";
import { parseStripeEvent, stripeVerify, toBillingWebhookEvent } from "@zap-ts/billing/stripe";
// oxlint-disable-next-line sonarjs/no-implicit-dependencies -- Workers runtime built-in, not an npm package
import { env as cloudflareEnv } from "cloudflare:workers";

import { billing, runBilling } from "../lib/billing";

const router = createWebhookRouter({ prefix: "/webhooks" });

router.register("/stripe", {
  verify: stripeVerify,
  handler: async (ctx) => {
    const stripeEvent = parseStripeEvent(ctx.rawBody);
    const billingEvent = toBillingWebhookEvent(stripeEvent);

    if (!billingEvent) {
      return Response.json({ received: true });
    }

    await runBilling(
      cloudflareEnv.HYPERDRIVE.connectionString,
      billing.onWebhookEvent(billingEvent),
    );

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
