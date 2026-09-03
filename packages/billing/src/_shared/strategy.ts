import { Context, type Effect } from "effect";

import type { BillingError } from "./errors";
import type { BillingStrategyKind, BillingWebhookEvent, Entitlement } from "./types";

export interface StartCheckoutInput {
  organizationId: string;
  customerEmail: string;
  planId?: string;
  quantity?: number;
  successUrl: string;
  cancelUrl: string;
}

export interface BillingStrategyService {
  readonly kind: BillingStrategyKind;
  startCheckout: (input: StartCheckoutInput) => Effect.Effect<{ url: string }, BillingError>;
  onWebhookEvent: (event: BillingWebhookEvent) => Effect.Effect<void, BillingError>;
  resolveEntitlement: (organizationId: string) => Effect.Effect<Entitlement, BillingError>;
}

export class BillingStrategy extends Context.Tag("BillingStrategy")<
  BillingStrategy,
  BillingStrategyService
>() {}
