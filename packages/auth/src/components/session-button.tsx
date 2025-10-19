"use client";
import "client-only";

import { ZAP_CORE_CONFIG } from "@zap/config";
import { ZapButton } from "@zap/ui/components/core/button";
import Link from "next/link";
import { AUTH_CONFIG } from "..";
import { betterAuthClient } from "../better-auth/client";

export function SessionButton() {
  const { data: result } = betterAuthClient.useSession();
  const session = result?.session;

  if (session) {
    return (
      <ZapButton asChild size="sm">
        <Link href={{ pathname: ZAP_CORE_CONFIG.APP.APP_URL }}>Open App</Link>
      </ZapButton>
    );
  }

  return (
    <>
      <ZapButton asChild variant="ghost">
        <Link
          className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground active:text-foreground"
          href={{
            pathname: AUTH_CONFIG.LOGIN_URL,
          }}
        >
          Login
        </Link>
      </ZapButton>

      <ZapButton asChild size="sm">
        <Link
          href={{
            pathname: AUTH_CONFIG.SIGN_UP_URL,
          }}
        >
          Get Started
        </Link>
      </ZapButton>
    </>
  );
}
