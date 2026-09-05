import type { WebhookEvent } from "@clerk/tanstack-react-start/webhooks";

import { VerificationError, type VerifyFn } from "@zap-studio/webhooks";
import { env } from "@zap-ts/environment";
import { Webhook } from "standardwebhooks";

const decoder = new TextDecoder();

export const clerkVerify: VerifyFn = (ctx) => {
  const webhookId = ctx.request.headers.get("svix-id");
  const webhookTimestamp = ctx.request.headers.get("svix-timestamp");
  const webhookSignature = ctx.request.headers.get("svix-signature");

  if (!(webhookId && webhookTimestamp && webhookSignature)) {
    throw new VerificationError("missing svix-id/svix-timestamp/svix-signature header");
  }

  const webhook = new Webhook(env.CLERK_WEBHOOK_SIGNING_SECRET);

  try {
    webhook.verify(decoder.decode(ctx.rawBody), {
      "webhook-id": webhookId,
      "webhook-timestamp": webhookTimestamp,
      "webhook-signature": webhookSignature,
    });
  } catch (cause) {
    throw new VerificationError(`clerk signature verification failed: ${String(cause)}`);
  }
};

export const parseClerkEvent = (rawBody: Uint8Array): WebhookEvent => {
  // SAFETY: `clerkVerify` already confirmed this exact payload came from Clerk.
  return JSON.parse(decoder.decode(rawBody)) as WebhookEvent;
};
