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

  const session = await betterAuthServer.api.getSession({
    headers: _headers,
  });

  if (!session) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Unauthorized access",
    });
  }

  return await next({
    context: {
      session,
      headers: _headers,
    },
  });
});
