import { allow, createPolicy, type Actions, type Resources, when } from "@zap-studio/permit";
import { z } from "zod";

const resources = {
  organization: z.object({ id: z.string() }),
} satisfies Resources;

const actions = {
  organization: ["view", "update-settings", "manage-billing", "invite-member"],
} as const satisfies Actions<typeof resources>;

export type OrganizationRole = "org:admin" | "org:member";

type PermissionsContext = {
  actor: { role: OrganizationRole };
};

export const organizationPolicy = createPolicy<PermissionsContext>({
  resources,
  actions,
  rules: {
    organization: {
      view: allow(),
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
