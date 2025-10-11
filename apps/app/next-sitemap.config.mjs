/** @type {import('next-sitemap').IConfig} */
const { SITE_URL } = process.env;

export const siteUrl = SITE_URL || "http://localhost:3000";
export const changefreq = "daily";
export const priority = 0.7;
export const generateRobotsTxt = true;
export const exclude = [
  "/server-sitemap-index.xml",
  "/404",
  "/admin/**",
  "/api/**",
];
export const alternateRefs = [
  {
    href: SITE_URL || "http://localhost:3000",
    hreflang: "en",
  },
  {
    href: `${SITE_URL || "http://localhost:3000"}/fr`,
    hreflang: "fr",
  },
  {
    href: `${SITE_URL || "http://localhost:3000"}/pt`,
    hreflang: "pt",
  },
];
export const robotsTxtOptions = {
  policies: [
    {
      userAgent: "*",
      allow: "/",
    },
  ],
  additionalSitemaps: [`${SITE_URL}/server-sitemap-index.xml`],
};
