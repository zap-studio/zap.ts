import { createWebhookRouter } from "@zap-studio/webhooks";
import { getOrganizationAdminEmails } from "@zap-ts/authentication/organization";
import { clerkVerify, parseClerkEvent } from "@zap-ts/authentication/webhook";
import { applyMembershipEvent } from "@zap-ts/billing/membership";
import {
  parseStripeEvent,
  stripeVerify,
  toBillingWebhookEvent,
  toLifecycleEvent,
} from "@zap-ts/billing/stripe";
// oxlint-disable-next-line sonarjs/no-implicit-dependencies -- Workers runtime built-in, not an npm package
import { env as cloudflareEnv } from "cloudflare:workers";
import { Effect } from "effect";

import { billing, runBilling } from "./billing";
import { lifecycleEmail } from "./billing-emails";
import { runEmail, sendEmail } from "./email";

const router = createWebhookRouter({ prefix: "/webhooks" });

router.register("/stripe", {
  verify: stripeVerify,
  handler: async (ctx) => {
    const stripeEvent = parseStripeEvent(ctx.rawBody);
    const billingEvent = toBillingWebhookEvent(stripeEvent);

    if (billingEvent) {
      await runBilling(
        cloudflareEnv.HYPERDRIVE.connectionString,
        billing.onWebhookEvent(billingEvent),
      );
    }

    const lifecycleEvent = toLifecycleEvent(stripeEvent);

    if (lifecycleEvent) {
      const adminEmails = await getOrganizationAdminEmails(lifecycleEvent.organizationId);
      const { subject, react } = lifecycleEmail(lifecycleEvent);

      await runEmail(
        Effect.all(
          adminEmails.map((to) => sendEmail({ to, subject, react })),
          { concurrency: "unbounded" },
        ),
      );
    }

    return Response.json({ received: true });
  },
});

router.register("/clerk", {
  verify: clerkVerify,
  handler: async (ctx) => {
    const event = parseClerkEvent(ctx.rawBody);

    if (
      event.type !== "organizationMembership.created" &&
      event.type !== "organizationMembership.deleted"
    ) {
      return Response.json({ received: true });
    }

    await runBilling(
      cloudflareEnv.HYPERDRIVE.connectionString,
      applyMembershipEvent({
        type: event.type === "organizationMembership.created" ? "created" : "deleted",
        id: event.data.id,
        organizationId: event.data.organization.id,
        userId: event.data.public_user_data.user_id,
      }),
    );

    return Response.json({ received: true });
  },
});

export { router };
