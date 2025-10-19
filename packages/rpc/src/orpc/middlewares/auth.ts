import "server-only";

import { ORPCError } from "@orpc/client";
import type { Session } from "@zap/auth/better-auth/client";
import { betterAuthServer } from "@zap/auth/better-auth/server";
import { headers } from "next/headers";
import { base } from "./base";

export type SessionContext = {
  readonly session: Session;
  readonly headers: Headers;
};

export const authMiddleware = base.middleware(async ({ next }) => {
  const _headers = await headers();

  const result = await betterAuthServer.api.getSession({
    headers: _headers,
  });

  if (!result) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Unauthorized access",
    });
  }

  return await next({
    context: {
      session: result.session,
      user: result.user,
      headers: _headers,
    },
  });
});
