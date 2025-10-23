import "server-only";

import { $fetch } from "@zap/utils/fetch";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_CONFIG } from ".";
import type { Session } from "./better-auth/client";

/**
 * Checks if the current path is a public path that doesn't require authentication.
 */
export function isPublicPath(pathname: string): boolean {
  if (!AUTH_CONFIG.PUBLIC_PATHS) {
    return (AUTH_CONFIG.PUBLIC_PATHS as string[]).includes(pathname);
  }
  return AUTH_CONFIG.PUBLIC_PATHS.includes(pathname);
}

/**
 * Checks if the current path should be allowed without authentication.
 * This includes public paths and any custom logic for auth bypass.
 */
export function checkPublicPathAccess(
  request: NextRequest
): NextResponse | null {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    const requestHeaders = new Headers(request.headers);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    return response;
  }

  return null;
}

/**
 * Creates a redirect response to the login page with the original path as redirect parameter.
 */
export function createLoginRedirect(
  request: NextRequest,
  pathname: string
): NextResponse {
  const loginUrl = new URL(AUTH_CONFIG.URLS.LOGIN, request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

/**
 * Gets the login URL from the auth configuration.
 */
export function getLoginUrl(): string {
  return AUTH_CONFIG.URLS.LOGIN;
}

/**
 * Fetches the current user session from the auth API in edge runtime.
 * This method is specifically designed for use in middleware and edge functions
 * where traditional session access methods may not be available.
 */
export async function getSessionInEdgeRuntime(
  request: NextRequest
): Promise<Session | null> {
  try {
    const session = await $fetch<Session>("/api/auth/get-session", {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    return session;
  } catch {
    // Session fetch failed, treat as unauthenticated
    return null;
  }
}
