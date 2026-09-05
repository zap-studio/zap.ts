import { Database } from "@zap-ts/database";
import { organizationMembers } from "@zap-ts/database/schema";
import { and, count, eq } from "drizzle-orm";
import { Context, Effect, Layer } from "effect";

import { BillingError } from "../core/errors";

export interface UpsertMemberInput {
  id: string;
  organizationId: string;
  userId: string;
}

export interface MembershipStoreService {
  upsertMember: (input: UpsertMemberInput) => Effect.Effect<void, BillingError>;
  removeMember: (id: string) => Effect.Effect<void, BillingError>;
  setBillable: (id: string, billable: boolean) => Effect.Effect<void, BillingError>;
  countBillableMembers: (organizationId: string) => Effect.Effect<number, BillingError>;
}

export class MembershipStore extends Context.Tag("MembershipStore")<
  MembershipStore,
  MembershipStoreService
>() {}

export const MembershipStoreLive: Layer.Layer<MembershipStore, never, Database> = Layer.effect(
  MembershipStore,
  Effect.gen(function* () {
    const db = yield* Database;

    const upsertMember = (input: UpsertMemberInput) =>
      Effect.tryPromise({
        try: () =>
          db
            .insert(organizationMembers)
            .values(input)
            .onConflictDoUpdate({
              target: organizationMembers.id,
              set: {
                organizationId: input.organizationId,
                userId: input.userId,
                updatedAt: new Date(),
              },
            }),
        catch: (cause) => new BillingError({ cause }),
      }).pipe(Effect.asVoid);

    const removeMember = (id: string) =>
      Effect.tryPromise({
        try: () => db.delete(organizationMembers).where(eq(organizationMembers.id, id)),
        catch: (cause) => new BillingError({ cause }),
      }).pipe(Effect.asVoid);

    const setBillable = (id: string, billable: boolean) =>
      Effect.tryPromise({
        try: () =>
          db
            .update(organizationMembers)
            .set({ billable, updatedAt: new Date() })
            .where(eq(organizationMembers.id, id)),
        catch: (cause) => new BillingError({ cause }),
      }).pipe(Effect.asVoid);

    const countBillableMembers = (organizationId: string) =>
      Effect.tryPromise({
        try: async () => {
          const rows = await db
            .select({ count: count() })
            .from(organizationMembers)
            .where(
              and(
                eq(organizationMembers.organizationId, organizationId),
                eq(organizationMembers.billable, true),
              ),
            );
          return rows[0]?.count ?? 0;
        },
        catch: (cause) => new BillingError({ cause }),
      });

    return {
      upsertMember,
      removeMember,
      setBillable,
      countBillableMembers,
    };
  }),
);
