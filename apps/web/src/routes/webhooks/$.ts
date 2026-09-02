import { createFileRoute } from "@tanstack/react-router";
import { webhookRouter } from "@zap-ts/webhooks";

export const Route = createFileRoute("/webhooks/$")({
  server: {
    handlers: {
      POST: ({ request }) => webhookRouter.handle(request),
    },
  },
});
