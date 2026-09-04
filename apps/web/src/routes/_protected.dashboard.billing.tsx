import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { isOrganizationRole, organizationPolicy } from "@zap-ts/authorization";
// oxlint-disable-next-line sonarjs/no-implicit-dependencies -- Workers runtime built-in, not an npm package
import { env as cloudflareEnv } from "cloudflare:workers";

import { billing, runBilling } from "../lib/billing";

const getBillingPageData = createServerFn().handler(async () => {
  const { orgId, orgRole } = await auth();

  if (!orgId || !orgRole || !isOrganizationRole(orgRole)) {
    throw redirect({ to: "/dashboard" });
  }

  const [canManageBilling, subscription] = await Promise.all([
    organizationPolicy.can({ actor: { role: orgRole } }, "organization:manage-billing", {
      id: orgId,
    }),
    runBilling(cloudflareEnv.HYPERDRIVE.connectionString, billing.resolveSubscriptionStatus(orgId)),
  ]);

  return { canManageBilling, subscription };
});

const BillingPage = () => {
  const { canManageBilling, subscription } = Route.useLoaderData();

  return (
    <div>
      <h1>Billing</h1>
      <p>Status: {subscription.status}</p>
      {subscription.trialEndsAt ? (
        <p>Trial ends {new Date(subscription.trialEndsAt).toLocaleDateString()}</p>
      ) : null}

      {canManageBilling ? (
        <>
          {/* TODO: List your real plans here instead of these placeholder ids. */}
          <form action="/api/stripe/checkout" method="post">
            <input name="planId" type="hidden" value="starter" />
            <button type="submit">Upgrade to Starter</button>
          </form>
          <form action="/api/stripe/checkout" method="post">
            <input name="planId" type="hidden" value="team" />
            <button type="submit">Upgrade to Team</button>
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
