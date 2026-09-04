import { cloudflare } from "@cloudflare/vite-plugin";
import stylex from "@stylexjs/unplugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { SITE_URL } from "./src/lib/site.ts";

export default defineConfig({
  // stylex must be the first plugin for Fast Refresh and CSS aggregation to keep working.
  plugins: [
    stylex({ useCSSLayers: true, devPersistToDisk: true }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      pages: [{ path: "/", sitemap: { changefreq: "weekly", priority: 1 } }],
      sitemap: { host: SITE_URL },
    }),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
  server: { port: 3000 },
});
