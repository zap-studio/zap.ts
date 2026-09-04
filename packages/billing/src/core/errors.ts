import { Data } from "effect";

export class BillingError extends Data.TaggedError("BillingError")<{ cause: unknown }> {}
