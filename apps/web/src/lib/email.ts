import { Email, EmailLive, sendEmail } from "@zap-ts/email";
import { Effect, ManagedRuntime } from "effect";

const runtime = ManagedRuntime.make(EmailLive);

export const runEmail = <A>(effect: Effect.Effect<A, never, Email>): Promise<A> =>
  runtime.runPromise(effect);

export { sendEmail };
