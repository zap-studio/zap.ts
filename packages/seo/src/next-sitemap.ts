import type { IConfig } from "next-sitemap";

const SITE_URL =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export const baseConfig: IConfig = {
  siteUrl: SITE_URL,
  changefreq: "daily",
  priority: 0.7,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap-index.xml", "/404", "/admin/**", "/api/**"],
  alternateRefs: [
    {
      href: SITE_URL,
      hreflang: "en",
    },
    {
      href: `${SITE_URL}/fr`,
      hreflang: "fr",
    },
    {
      href: `${SITE_URL}/pt`,
      hreflang: "pt",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [`${SITE_URL}/server-sitemap-index.xml`],
  },
};

export function createNextSitemapConfig(
  overrides: Partial<IConfig> = {}
): IConfig {
  return {
    ...baseConfig,
    ...overrides,
  };
}
