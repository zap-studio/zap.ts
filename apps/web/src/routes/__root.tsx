import { ClerkProvider } from "@clerk/tanstack-react-start";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";

const RootComponent = () => (
  <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  </ClerkProvider>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "zap.ts" },
    ],
  }),
  component: RootComponent,
});
