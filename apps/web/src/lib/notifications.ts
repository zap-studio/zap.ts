import type { LifecycleEvent } from "@zap-ts/billing/stripe";

import { Clerk, ClerkLive } from "@zap-ts/authentication";
import { getOrganizationAdminEmails } from "@zap-ts/authentication/organization";
import { Email, EmailLive, sendEmail } from "@zap-ts/email";
import { Effect, Layer, ManagedRuntime } from "effect";

import { lifecycleEmail } from "./billing-emails";

const runtime = ManagedRuntime.make(Layer.mergeAll(ClerkLive, EmailLive));

const notifyOrganizationAdmins = (
  event: LifecycleEvent,
): Effect.Effect<void, never, Clerk | Email> =>
  Effect.gen(function* () {
    const adminEmails = yield* getOrganizationAdminEmails(event.organizationId).pipe(
      Effect.catchAll(() => Effect.succeed<string[]>([])),
    );

    const { subject, react } = lifecycleEmail(event);

    yield* Effect.all(
      adminEmails.map((to) => sendEmail({ to, subject, react })),
      { concurrency: "unbounded" },
    );
  });

export const runLifecycleNotification = (event: LifecycleEvent): Promise<void> =>
  runtime.runPromise(notifyOrganizationAdmins(event));
