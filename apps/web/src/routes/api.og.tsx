import { createFileRoute } from "@tanstack/react-router";
import { ImageResponse } from "takumi-js/response";

import { SITE_NAME } from "../lib/site";

const MAX_TITLE_LENGTH = 100;

export const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const rawTitle = new URL(request.url).searchParams.get("title") ?? SITE_NAME;
        const title = rawTitle.slice(0, MAX_TITLE_LENGTH);

        return new ImageResponse(
          <div tw="flex h-full w-full flex-col items-center justify-center gap-6 bg-[#171717] text-white">
            <span tw="text-6xl font-bold">{title}</span>
            <span tw="text-2xl text-[#f2b41f]">{SITE_NAME}</span>
          </div>,
          {
            width: 1200,
            height: 630,
            headers: { "cache-control": "public, max-age=86400, immutable" },
          },
        );
      },
    },
  },
});
