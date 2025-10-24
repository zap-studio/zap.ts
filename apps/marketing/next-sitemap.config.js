import { createNextSitemapConfig } from "@zap/seo/next-sitemap";
import { env } from "./src/app/env.ts";

export default createNextSitemapConfig(env.SITE_URL, {
	// Override or add app-specific config here if needed
});
