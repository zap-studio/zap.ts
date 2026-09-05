import { Effect } from "effect";

import type { BillingError } from "../core/errors";

import { BillingProvider } from "../core/provider";
import { BillingStore } from "../core/store";
import { MembershipStore, type UpsertMemberInput } from "./store";

export interface MembershipEvent extends UpsertMemberInput {
  type: "created" | "deleted";
}

/**
 * Recomputes the organization's billable member count and pushes it to the
 * billing provider as the subscription quantity. No-op when the organization
 * has no subscription, or its subscription isn't billed per seat (see
 * `BillingStoreService.getSeatSubscription`).
 */
export const syncSeatCount = (
  organizationId: string,
): Effect.Effect<void, BillingError, BillingStore | MembershipStore | BillingProvider> =>
  Effect.gen(function* () {
    const billingStore = yield* BillingStore;
    const seatSubscription = yield* billingStore.getSeatSubscription(organizationId);

    if (!seatSubscription) {
      return;
    }

    const membershipStore = yield* MembershipStore;
    const quantity = yield* membershipStore.countBillableMembers(organizationId);

    const provider = yield* BillingProvider;
    yield* provider.updateSubscriptionQuantity(seatSubscription.subscriptionId, quantity);
  });

/**
 * Applies an organization-membership change (member added/removed) and keeps
 * the Stripe seat quantity in sync. Call this from the Clerk
 * `organizationMembership.created` / `organizationMembership.deleted` webhook handlers.
 */
export const applyMembershipEvent = (
  event: MembershipEvent,
): Effect.Effect<void, BillingError, MembershipStore | BillingStore | BillingProvider> =>
  Effect.gen(function* () {
    const membershipStore = yield* MembershipStore;

    if (event.type === "deleted") {
      yield* membershipStore.removeMember(event.id);
    } else {
      yield* membershipStore.upsertMember(event);
    }

    yield* syncSeatCount(event.organizationId);
  });
