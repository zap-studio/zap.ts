import type { ReactElement } from "react";

import { env } from "@zap-ts/environment";
import { Context, Data, Duration, Effect, Layer, Schedule } from "effect";
import { Resend } from "resend";

export class EmailError extends Data.TaggedError("EmailError")<{ cause: unknown }> {}

export class Email extends Context.Tag("Email")<Email, Resend>() {}

export const EmailLive: Layer.Layer<Email> = Layer.sync(
  Email,
  () => new Resend(env.RESEND_API_KEY),
);

const retrySchedule = Schedule.exponential(Duration.millis(200), 2).pipe(
  Schedule.jittered,
  Schedule.intersect(Schedule.recurs(3)),
);

export const sendEmail = (opts: { to: string; subject: string; react: ReactElement }) => {
  return Effect.gen(function* () {
    const resend = yield* Email;
    return yield* Effect.tryPromise({
      try: () =>
        resend.emails.send({
          from: "zap.ts <noreply@zapstudio.dev>",
          to: opts.to,
          subject: opts.subject,
          react: opts.react,
        }),
      catch: (cause) => new EmailError({ cause }),
    });
  }).pipe(
    Effect.tapError(() => Effect.logDebug("retrying email send")),
    Effect.retry(retrySchedule),
    Effect.tapError((error) => Effect.logWarning("email send exhausted retries", { error })),
    Effect.catchAll(() => Effect.void),
  );
};
