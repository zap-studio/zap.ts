import type { UserJSON } from "@clerk/backend";

import { clerkClient } from "@clerk/tanstack-react-start/server";
import { Context, Data, Effect, Layer } from "effect";

export class ClerkError extends Data.TaggedError("ClerkError")<{ cause: unknown }> {}

export class Clerk extends Context.Tag("Clerk")<Clerk, ReturnType<typeof clerkClient>>() {}

export const ClerkLive: Layer.Layer<Clerk> = Layer.sync(Clerk, () => clerkClient());

export type PersonalOrganizationUser = Pick<UserJSON, "id" | "first_name">;

export const createPersonalOrganization = (user: PersonalOrganizationUser) =>
  Effect.gen(function* () {
    const clerk = yield* Clerk;
    const organization = yield* Effect.tryPromise({
      try: () =>
        clerk.organizations.createOrganization({
          name: user.first_name ? `${user.first_name}'s Organization` : "My Organization",
          createdBy: user.id,
        }),
      catch: (cause) => new ClerkError({ cause }),
    });
    yield* Effect.logInfo("personal organization created", {
      userId: user.id,
      organizationId: organization.id,
    });
    return organization;
  }).pipe(
    Effect.tapError((error) =>
      Effect.logError("personal organization creation failed", { userId: user.id, error }),
    ),
  );
