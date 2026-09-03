import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute } from "@tanstack/react-router";
import { isOrganizationRole, organizationPolicy } from "@zap-ts/authorization";
import { BillingProvider } from "@zap-ts/billing";
// oxlint-disable-next-line sonarjs/no-implicit-dependencies -- Workers runtime built-in, not an npm package
import { env as cloudflareEnv } from "cloudflare:workers";
import { Effect } from "effect";

import { runBilling } from "../lib/billing";

export const Route = createFileRoute("/api/stripe/portal")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { orgId, orgRole } = await auth();

        if (!orgId || !orgRole || !isOrganizationRole(orgRole)) {
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

        const origin = new URL(request.url).origin;

        try {
          const session = await runBilling(
            cloudflareEnv.HYPERDRIVE.connectionString,
            Effect.gen(function* () {
              const provider = yield* BillingProvider;
              return yield* provider.createPortalSession(orgId, `${origin}/dashboard/billing`);
            }),
          );

          return Response.redirect(session.url, 303);
        } catch {
          return new Response("No subscription", { status: 404 });
        }
      },
    },
  },
});
