import { cloudflare } from "@cloudflare/vite-plugin";
import stylex from "@stylexjs/unplugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

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
    // TODO: Replace placeholder manifest info (name, description, colors, icons) for your app.
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "zap.ts",
        short_name: "zap.ts",
        description: "A SaaS starter kit.",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: { tsconfigPaths: true },
  server: { port: 3000 },
});
