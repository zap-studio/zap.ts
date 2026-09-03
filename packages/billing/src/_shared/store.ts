import { Database } from "@zap-ts/database";
import {
  billingCreditLedger,
  billingCustomers,
  billingSubscriptions,
} from "@zap-ts/database/schema";
import { eq, sql } from "drizzle-orm";
import { Context, Effect, Layer } from "effect";

import type { BillingStatus, BillingStrategyKind, Entitlement } from "./types";

import { BillingError, EntitlementError } from "./errors";

export interface UpsertSubscriptionInput {
  organizationId: string;
  subscriptionId: string;
  strategy: BillingStrategyKind;
  planId: string;
  status: BillingStatus;
  quantity: number | null;
  currentPeriodEnd: Date;
  trialEndsAt: Date | null;
  cancelAtPeriodEnd: boolean;
}

export interface BillingStoreService {
  upsertCustomer: (organizationId: string, customerId: string) => Effect.Effect<void, BillingError>;
  getCustomerId: (organizationId: string) => Effect.Effect<string | null, BillingError>;
  upsertSubscription: (input: UpsertSubscriptionInput) => Effect.Effect<void, BillingError>;
  resolveEntitlement: (organizationId: string) => Effect.Effect<Entitlement, BillingError>;
  grantCredits: (
    organizationId: string,
    amount: number,
    reason: string,
    id?: string,
  ) => Effect.Effect<void, BillingError>;
  consumeCredits: (
    organizationId: string,
    amount: number,
    reason: string,
  ) => Effect.Effect<void, BillingError | EntitlementError>;
  creditBalance: (organizationId: string) => Effect.Effect<number, BillingError>;
  hasCreditHistory: (organizationId: string) => Effect.Effect<boolean, BillingError>;
}

export class BillingStore extends Context.Tag("BillingStore")<
  BillingStore,
  BillingStoreService
>() {}

export const BillingStoreLive: Layer.Layer<BillingStore, never, Database> = Layer.effect(
  BillingStore,
  Effect.gen(function* () {
    const db = yield* Database;

    const upsertCustomer = (organizationId: string, customerId: string) =>
      Effect.tryPromise({
        try: () =>
          db
            .insert(billingCustomers)
            .values({ id: customerId, organizationId, provider: "stripe" })
            .onConflictDoUpdate({ target: billingCustomers.id, set: { organizationId } }),
        catch: (cause) => new BillingError({ cause }),
      }).pipe(Effect.asVoid);

    const getCustomerId = (organizationId: string) =>
      Effect.tryPromise({
        try: async () => {
          const rows = await db
            .select({ id: billingCustomers.id })
            .from(billingCustomers)
            .where(eq(billingCustomers.organizationId, organizationId))
            .limit(1);
          return rows[0]?.id ?? null;
        },
        catch: (cause) => new BillingError({ cause }),
      });

    const upsertSubscription = (input: UpsertSubscriptionInput) =>
      Effect.tryPromise({
        try: () =>
          db
            .insert(billingSubscriptions)
            .values({ ...input, id: input.subscriptionId, updatedAt: new Date() })
            .onConflictDoUpdate({
              target: billingSubscriptions.organizationId,
              set: { ...input, id: input.subscriptionId, updatedAt: new Date() },
            }),
        catch: (cause) => new BillingError({ cause }),
      }).pipe(Effect.asVoid);

    const resolveEntitlement = (organizationId: string) =>
      Effect.tryPromise({
        try: async (): Promise<Entitlement> => {
          const rows = await db
            .select()
            .from(billingSubscriptions)
            .where(eq(billingSubscriptions.organizationId, organizationId))
            .limit(1);
          const row = rows[0];

          if (!row) {
            return {
              organizationId,
              active: false,
              planId: null,
              status: "no_subscription",
              trialEndsAt: null,
              creditsRemaining: null,
            };
          }

          return {
            organizationId,
            active: row.status === "trialing" || row.status === "active",
            planId: row.planId,
            status: row.status,
            trialEndsAt: row.trialEndsAt,
            creditsRemaining: null,
          };
        },
        catch: (cause) => new BillingError({ cause }),
      });

    const creditBalance = (organizationId: string) =>
      Effect.tryPromise({
        try: async () => {
          const rows = await db
            .select({ total: sql<number>`coalesce(sum(${billingCreditLedger.amount}), 0)` })
            .from(billingCreditLedger)
            .where(eq(billingCreditLedger.organizationId, organizationId));
          return rows[0]?.total ?? 0;
        },
        catch: (cause) => new BillingError({ cause }),
      });

    const hasCreditHistory = (organizationId: string) =>
      Effect.tryPromise({
        try: async () => {
          const rows = await db
            .select({ id: billingCreditLedger.id })
            .from(billingCreditLedger)
            .where(eq(billingCreditLedger.organizationId, organizationId))
            .limit(1);
          return rows.length > 0;
        },
        catch: (cause) => new BillingError({ cause }),
      });

    const grantCredits = (
      organizationId: string,
      amount: number,
      reason: string,
      id: string = crypto.randomUUID(),
    ) =>
      Effect.tryPromise({
        try: () =>
          db
            .insert(billingCreditLedger)
            .values({ id, organizationId, amount, reason })
            .onConflictDoNothing(),
        catch: (cause) => new BillingError({ cause }),
      }).pipe(Effect.asVoid);

    const consumeCredits = (organizationId: string, amount: number, reason: string) =>
      Effect.gen(function* () {
        const current = yield* creditBalance(organizationId);

        if (current < amount) {
          yield* Effect.fail(new EntitlementError({ reason: "insufficient_credits" }));
          return;
        }

        yield* Effect.tryPromise({
          try: () =>
            db
              .insert(billingCreditLedger)
              .values({ id: crypto.randomUUID(), organizationId, amount: -amount, reason }),
          catch: (cause) => new BillingError({ cause }),
        });
      });

    return {
      upsertCustomer,
      getCustomerId,
      upsertSubscription,
      resolveEntitlement,
      grantCredits,
      consumeCredits,
      creditBalance,
      hasCreditHistory,
    };
  }),
);
