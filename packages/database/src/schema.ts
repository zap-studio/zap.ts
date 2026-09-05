import { boolean, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const billingStatusEnum = pgEnum("billing_status", [
  "trialing",
  "active",
  "past_due",
  "canceled",
  "incomplete",
  "unpaid",
]);

export const billingCustomers = pgTable("billing_customers", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().unique(),
  provider: text("provider").notNull().default("stripe"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const billingSubscriptions = pgTable("billing_subscriptions", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull().unique(),
  planId: text("plan_id").notNull(),
  status: billingStatusEnum("status").notNull(),
  quantity: integer("quantity"),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  trialEndsAt: timestamp("trial_ends_at"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Mirrors Clerk organization memberships, so per-member `billable` can be toggled
// independently of Clerk (which has no such concept) when syncing Stripe seat quantity.
export const organizationMembers = pgTable("organization_members", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").notNull(),
  userId: text("user_id").notNull(),
  billable: boolean("billable").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const schema = {
  billingCustomers,
  billingSubscriptions,
  organizationMembers,
};
