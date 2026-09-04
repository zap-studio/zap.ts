import { createFileRoute } from "@tanstack/react-router";

import { router } from "../lib/webhooks";

export const Route = createFileRoute("/webhooks/$")({
  server: {
    handlers: {
      POST: ({ request }) => router.handle(request),
    },
  },
});
