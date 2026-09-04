export type BillingStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "unpaid";

export interface BillingCustomer {
  organizationId: string;
  provider: "stripe";
  providerCustomerId: string;
}

export interface Entitlement {
  organizationId: string;
  active: boolean;
  planId: string | null;
  status: BillingStatus | "no_subscription";
  trialEndsAt: Date | null;
}

export type BillingWebhookEventType =
  | "subscription.created"
  | "subscription.updated"
  | "subscription.deleted";

export interface BillingWebhookEvent {
  id: string;
  type: BillingWebhookEventType;
  organizationId: string;
  customerId: string;
  subscriptionId: string | null;
  planId: string | null;
  status: BillingStatus | null;
  quantity: number | null;
  currentPeriodEnd: Date | null;
  trialEndsAt: Date | null;
  cancelAtPeriodEnd: boolean | null;
}
