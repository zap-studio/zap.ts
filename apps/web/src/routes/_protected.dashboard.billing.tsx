import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { isOrganizationRole, organizationPolicy } from "@zap-ts/authorization";
import { BillingStrategy } from "@zap-ts/billing";
// oxlint-disable-next-line sonarjs/no-implicit-dependencies -- Workers runtime built-in, not an npm package
import { env as cloudflareEnv } from "cloudflare:workers";
import { Effect } from "effect";

import { runBilling } from "../lib/billing";

const getBillingPageData = createServerFn().handler(async () => {
  const { orgId, orgRole } = await auth();

  if (!orgId || !orgRole || !isOrganizationRole(orgRole)) {
    throw redirect({ to: "/dashboard" });
  }

  const [canManageBilling, entitlement] = await Promise.all([
    organizationPolicy.can({ actor: { role: orgRole } }, "organization:manage-billing", {
      id: orgId,
    }),
    runBilling(
      cloudflareEnv.HYPERDRIVE.connectionString,
      Effect.gen(function* () {
        const strategy = yield* BillingStrategy;
        return yield* strategy.resolveEntitlement(orgId);
      }),
    ),
  ]);

  return { canManageBilling, entitlement };
});

const BillingPage = () => {
  const { canManageBilling, entitlement } = Route.useLoaderData();

  return (
    <div>
      <h1>Billing</h1>
      <p>Status: {entitlement.status}</p>
      {entitlement.trialEndsAt ? (
        <p>Trial ends {new Date(entitlement.trialEndsAt).toLocaleDateString()}</p>
      ) : null}
      {entitlement.creditsRemaining === null ? null : (
        <p>Credits remaining: {entitlement.creditsRemaining}</p>
      )}

      {canManageBilling ? (
        <>
          <form action="/api/stripe/checkout" method="post">
            <button type="submit">Upgrade</button>
          </form>
          <form action="/api/stripe/portal" method="post">
            <button type="submit">Manage billing</button>
          </form>
        </>
      ) : (
        <p>Only an organization admin can manage billing.</p>
      )}
    </div>
  );
};

export const Route = createFileRoute("/_protected/dashboard/billing")({
  loader: () => getBillingPageData(),
  component: BillingPage,
});
