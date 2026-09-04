import { SignUpButton } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@zap-ts/ui/components/button";

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TWITTER_HANDLE,
  SITE_URL,
} from "../lib/site";

const OG_IMAGE = `/api/og?title=${encodeURIComponent(SITE_NAME)}`;
const TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

const Home = () => {
  return (
    <main>
      <section>
        <h1>zap.ts</h1>
        <p>Ship your SaaS.</p>
        <SignUpButton>
          <Button>Get started</Button>
        </SignUpButton>
      </section>
      <footer>&copy; zap.ts</footer>
    </main>
  );
};

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: SITE_URL }],
    meta: [
      { title: TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SITE_TWITTER_HANDLE },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
          applicationCategory: "DeveloperApplication",
        },
      },
    ],
  }),
  component: Home,
});
