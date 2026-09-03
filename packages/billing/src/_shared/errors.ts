import { Data } from "effect";

export class BillingError extends Data.TaggedError("BillingError")<{ cause: unknown }> {}

export class EntitlementError extends Data.TaggedError("EntitlementError")<{ reason: string }> {}
