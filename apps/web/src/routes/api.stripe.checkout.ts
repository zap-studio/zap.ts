import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { createFileRoute } from "@tanstack/react-router";
import { isOrganizationRole, organizationPolicy } from "@zap-ts/authorization";
import { BillingProvider, BillingStore, BillingStrategy } from "@zap-ts/billing";
// oxlint-disable-next-line sonarjs/no-implicit-dependencies -- Workers runtime built-in, not an npm package
import { env as cloudflareEnv } from "cloudflare:workers";
import { Effect } from "effect";

import { runBilling } from "../lib/billing";

export const Route = createFileRoute("/api/stripe/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { userId, orgId, orgRole } = await auth();

        if (!userId || !orgId || !orgRole || !isOrganizationRole(orgRole)) {
          return new Response("Forbidden", { status: 403 });
        }

        const canManageBilling = await organizationPolicy.can(
          { actor: { role: orgRole } },
          "organization:manage-billing",
          { id: orgId },
        );

        if (!canManageBilling) {
          return new Response("Forbidden", { status: 403 });
        }

        const user = await clerkClient().users.getUser(userId);
        const email = user.emailAddresses[0]?.emailAddress;

        if (!email) {
          return new Response("Organization admin has no email on file", { status: 400 });
        }

        const origin = new URL(request.url).origin;

        try {
          const session = await runBilling(
            cloudflareEnv.HYPERDRIVE.connectionString,
            Effect.gen(function* () {
              const store = yield* BillingStore;
              const provider = yield* BillingProvider;
              const strategy = yield* BillingStrategy;

              const existingCustomerId = yield* store.getCustomerId(orgId);
              if (!existingCustomerId) {
                yield* provider.createCustomer(orgId, email);
              }

              return yield* strategy.startCheckout({
                organizationId: orgId,
                customerEmail: email,
                successUrl: `${origin}/dashboard/billing?checkout=success`,
                cancelUrl: `${origin}/dashboard/billing?checkout=cancelled`,
              });
            }),
          );

          return Response.redirect(session.url, 303);
        } catch {
          return new Response("Checkout failed", { status: 500 });
        }
      },
    },
  },
});
