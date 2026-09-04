import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "takumi-js/response";

export const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const title = new URL(request.url).searchParams.get("title") ?? "zap.ts";

        return new ImageResponse(
          <div tw="flex h-full w-full items-center justify-center bg-black text-6xl text-white">
            {title}
          </div>,
          { width: 1200, height: 630 },
        );
      },
    },
  },
});
