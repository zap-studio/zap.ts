import { Data } from "effect";

export class AuthenticationError extends Data.TaggedError("AuthenticationError")<{
  cause: unknown;
}> {}
