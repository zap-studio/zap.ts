import { SignUpButton } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@zap-ts/ui/components/button";

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

export const Route = createFileRoute("/")({ component: Home });
