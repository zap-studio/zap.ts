import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL } from "../lib/site";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(`User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml`, {
          headers: { "content-type": "text/plain" },
        }),
    },
  },
});
