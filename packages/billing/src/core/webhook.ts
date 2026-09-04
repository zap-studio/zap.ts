import { Effect } from "effect";

import type { BillingError } from "./errors";
import type { BillingStoreService } from "./store";
import type { BillingWebhookEvent } from "./types";

export const applySubscriptionEvent = (
  store: BillingStoreService,
  event: BillingWebhookEvent,
): Effect.Effect<void, BillingError> =>
  Effect.gen(function* () {
    if (!event.subscriptionId) {
      return;
    }

    if (event.type === "subscription.deleted") {
      yield* store.upsertSubscription({
        organizationId: event.organizationId,
        subscriptionId: event.subscriptionId,
        planId: event.planId ?? "",
        status: "canceled",
        quantity: event.quantity,
        currentPeriodEnd: event.currentPeriodEnd ?? new Date(),
        trialEndsAt: event.trialEndsAt,
        cancelAtPeriodEnd: true,
      });
      return;
    }

    if (event.status && event.currentPeriodEnd) {
      yield* store.upsertSubscription({
        organizationId: event.organizationId,
        subscriptionId: event.subscriptionId,
        planId: event.planId ?? "",
        status: event.status,
        quantity: event.quantity,
        currentPeriodEnd: event.currentPeriodEnd,
        trialEndsAt: event.trialEndsAt,
        cancelAtPeriodEnd: event.cancelAtPeriodEnd ?? false,
      });
    }
  });
