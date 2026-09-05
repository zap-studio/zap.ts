import { cloudflare } from "@cloudflare/vite-plugin";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";
import stylex from "@stylexjs/unplugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { SITE_URL } from "./src/lib/site.ts";

export default defineConfig({
  plugins: [
    stylex({ useCSSLayers: true, devPersistToDisk: true }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      pages: [{ path: "/", sitemap: { changefreq: "weekly", priority: 1 } }],
      sitemap: { host: SITE_URL },
    }),
    viteReact(),
    sentryTanstackStart({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      tunnelRoute: true,
    }),
  ],
  resolve: { tsconfigPaths: true },
  server: { port: 3000 },
});
