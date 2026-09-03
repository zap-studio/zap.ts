import { createPolicy, type Actions, type Resources, when } from "@zap-studio/permit";
import { z } from "zod";

const resources = {
  organization: z.object({ id: z.string() }),
} satisfies Resources;

const actions = {
  organization: ["view", "update-settings", "manage-billing", "invite-member"],
} as const satisfies Actions<typeof resources>;

export type OrganizationRole = "org:admin" | "org:member";

const organizationRoles = [
  "org:admin",
  "org:member",
] as const satisfies readonly OrganizationRole[];

export const isOrganizationRole = (role: string): role is OrganizationRole => {
  // SAFETY: `organizationRoles` is declared `as const satisfies readonly OrganizationRole[]`,
  // so widening it to `readonly string[]` for `.includes` is a lossless supertype view.
  return (organizationRoles as readonly string[]).includes(role);
};

type PermissionsContext = {
  actor: { role: OrganizationRole };
};

export const organizationPolicy = createPolicy<PermissionsContext>({
  resources,
  actions,
  rules: {
    organization: {
      view: when((ctx) => ctx.actor.role === "org:admin" || ctx.actor.role === "org:member"),
      "update-settings": when((ctx) => ctx.actor.role === "org:admin"),
      "manage-billing": when((ctx) => ctx.actor.role === "org:admin"),
      "invite-member": when((ctx) => ctx.actor.role === "org:admin"),
    },
  },
});

declare global {
  interface ClerkAuthorization {
    role: OrganizationRole;
  }
}
