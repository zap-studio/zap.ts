import { Effect } from "effect";

import { AuthenticationError } from "./errors";
import { Clerk } from "./index";

export const getOrganizationAdminEmails = (
  organizationId: string,
): Effect.Effect<string[], AuthenticationError, Clerk> =>
  Effect.gen(function* () {
    const clerk = yield* Clerk;

    const { data: memberships } = yield* Effect.tryPromise({
      try: () => clerk.organizations.getOrganizationMembershipList({ organizationId, limit: 100 }),
      catch: (cause) => new AuthenticationError({ cause }),
    });

    const adminUserIds: string[] = [];
    for (const membership of memberships) {
      if (membership.role === "org:admin" && membership.publicUserData?.userId) {
        adminUserIds.push(membership.publicUserData.userId);
      }
    }

    const users = yield* Effect.tryPromise({
      try: () => Promise.all(adminUserIds.map((userId) => clerk.users.getUser(userId))),
      catch: (cause) => new AuthenticationError({ cause }),
    });

    return users
      .map((user) => user.emailAddresses[0]?.emailAddress)
      .filter((email): email is string => email !== undefined);
  });
