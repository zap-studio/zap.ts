import { Database } from "@zap-ts/database";
import { billingCustomers, billingSubscriptions } from "@zap-ts/database/schema";
import { eq } from "drizzle-orm";
import { Context, Effect, Layer } from "effect";

import type { BillingStatus, SubscriptionStatus } from "./types";

import { BillingError } from "./errors";

export interface UpsertSubscriptionInput {
  organizationId: string;
  subscriptionId: string;
  planId: string;
  status: BillingStatus;
  quantity: number | null;
  currentPeriodEnd: Date;
  trialEndsAt: Date | null;
  cancelAtPeriodEnd: boolean;
}

export interface SeatSubscription {
  subscriptionId: string;
  quantity: number;
}

export interface BillingStoreService {
  upsertCustomer: (organizationId: string, customerId: string) => Effect.Effect<void, BillingError>;
  getCustomerId: (organizationId: string) => Effect.Effect<string | null, BillingError>;
  upsertSubscription: (input: UpsertSubscriptionInput) => Effect.Effect<void, BillingError>;
  resolveSubscriptionStatus: (
    organizationId: string,
  ) => Effect.Effect<SubscriptionStatus, BillingError>;
  getSeatSubscription: (
    organizationId: string,
  ) => Effect.Effect<SeatSubscription | null, BillingError>;
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

    const resolveSubscriptionStatus = (organizationId: string) =>
      Effect.tryPromise({
        try: async (): Promise<SubscriptionStatus> => {
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
            };
          }

          return {
            organizationId,
            active: row.status === "trialing" || row.status === "active",
            planId: row.planId,
            status: row.status,
            trialEndsAt: row.trialEndsAt,
          };
        },
        catch: (cause) => new BillingError({ cause }),
      });

    const getSeatSubscription = (organizationId: string) =>
      Effect.tryPromise({
        try: async (): Promise<SeatSubscription | null> => {
          const rows = await db
            .select({ id: billingSubscriptions.id, quantity: billingSubscriptions.quantity })
            .from(billingSubscriptions)
            .where(eq(billingSubscriptions.organizationId, organizationId))
            .limit(1);
          const row = rows[0];

          if (!row || row.quantity === null) {
            return null;
          }

          return { subscriptionId: row.id, quantity: row.quantity };
        },
        catch: (cause) => new BillingError({ cause }),
      });

    return {
      upsertCustomer,
      getCustomerId,
      upsertSubscription,
      resolveSubscriptionStatus,
      getSeatSubscription,
    };
  }),
);
