import { ClerkProvider } from "@clerk/tanstack-react-start";
import { createRootRoute, HeadContent, Outlet, ScriptOnce, Scripts } from "@tanstack/react-router";
import { Toast } from "@zap-ts/ui/components/toast";
import { bodyProps } from "@zap-ts/ui/global-styles";
import { darkClassNames, ThemeProvider } from "@zap-ts/ui/theme-provider";

import { Toaster } from "../components/toaster";
import { DevStyleXInject } from "../dev-stylex-inject";
import { SITE_NAME, SITE_URL } from "../lib/site";
import { toastManager } from "../lib/toast";
import appCss from "../styles/app.css?url";

const ORGANIZATION_JSON_LD = {
  __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  }),
};

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
        <DevStyleXInject cssHref={appCss} />
        <ScriptOnce>{NO_FLASH_THEME_SCRIPT}</ScriptOnce>
        <script type="application/ld+json" dangerouslySetInnerHTML={ORGANIZATION_JSON_LD} />
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
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "zap.ts" },
    ],
  }),
  component: RootComponent,
});
