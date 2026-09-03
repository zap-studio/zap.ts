import { Context, type Effect } from "effect";

import type { BillingError } from "./errors";

export interface CheckoutOptions {
  organizationId: string;
  customerEmail: string;
  priceId: string;
  quantity?: number;
  trialDays?: number;
  successUrl: string;
  cancelUrl: string;
}

export interface BillingProviderService {
  createCustomer: (organizationId: string, email: string) => Effect.Effect<string, BillingError>;
  createCheckoutSession: (opts: CheckoutOptions) => Effect.Effect<{ url: string }, BillingError>;
  createPortalSession: (
    organizationId: string,
    returnUrl: string,
  ) => Effect.Effect<{ url: string }, BillingError>;
  cancelSubscription: (subscriptionId: string) => Effect.Effect<void, BillingError>;
  updateSubscriptionQuantity: (
    subscriptionId: string,
    quantity: number,
  ) => Effect.Effect<void, BillingError>;
  reportUsage: (
    organizationId: string,
    eventName: string,
    value: number,
  ) => Effect.Effect<void, BillingError>;
}

export class BillingProvider extends Context.Tag("BillingProvider")<
  BillingProvider,
  BillingProviderService
>() {}
