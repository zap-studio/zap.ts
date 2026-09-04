import { SignUpButton } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@zap-ts/ui/components/button";

import { SITE_DESCRIPTION, SITE_NAME } from "../lib/site";

const OG_IMAGE = `/api/og?title=${encodeURIComponent(SITE_NAME)}`;

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
    meta: [
      { title: SITE_NAME },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_NAME },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_NAME },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Home,
});
