import { ClerkProvider } from "@clerk/tanstack-react-start";
import { createRootRoute, HeadContent, Outlet, ScriptOnce, Scripts } from "@tanstack/react-router";
import { Toast } from "@zap-ts/ui/components/toast";
import { bodyProps } from "@zap-ts/ui/global-styles";
import { darkClassNames, ThemeProvider } from "@zap-ts/ui/theme-provider";

import { Toaster } from "../components/toaster";
import { SITE_NAME, SITE_URL } from "../lib/site";
import { toastManager } from "../lib/toast";
import appCss from "../styles/app.css?url";
import { StylexDevRuntime } from "../stylex-dev-runtime";

const NO_FLASH_THEME_SCRIPT = `(function () {
  var stored = localStorage.getItem("zap-studio-theme");
  var isDark = stored === '"dark"' || (stored !== '"light"' && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (isDark) document.documentElement.classList.add(...${JSON.stringify(darkClassNames)});
})();`;

const RootComponent = () => (
  <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <link rel="stylesheet" href={appCss} />
        <StylexDevRuntime />
        <ScriptOnce>{NO_FLASH_THEME_SCRIPT}</ScriptOnce>
      </head>
      <body {...bodyProps}>
        <ThemeProvider>
          <Toast.Provider toastManager={toastManager}>
            <Outlet />
            <Toaster />
          </Toast.Provider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  </ClerkProvider>
);

export const Route = createRootRoute({
  head: () => ({
    // TODO: Replace placeholder manifest info (name, description, colors, icons) in
    // apps/web/public/manifest.webmanifest for your app.
    links: [{ rel: "manifest", href: "/manifest.webmanifest" }],
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#000000" },
      { title: SITE_NAME },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    ],
  }),
  component: RootComponent,
});
