import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL } from "../lib/site";

// TODO: Feel free to remove access to agents.
const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Bytespider",
];

const DISALLOWED_PATHS = ["/dashboard", "/api/"];

const rulesFor = (userAgent: string) =>
  [
    `User-agent: ${userAgent}`,
    "Allow: /",
    ...DISALLOWED_PATHS.map((path) => `Disallow: ${path}`),
  ].join("\n");

const ROBOTS_TXT = [
  ...AI_USER_AGENTS.map(rulesFor),
  rulesFor("*"),
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n\n");

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(ROBOTS_TXT, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
