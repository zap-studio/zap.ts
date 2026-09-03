import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { createStart } from "@tanstack/react-start";
import { env } from "@zap-ts/environment";

const skipClerkMiddleware = import.meta.env.DEV && env.SKIP_CLERK_MIDDLEWARE;

export const startInstance = createStart(() => ({
  requestMiddleware: skipClerkMiddleware ? [] : [clerkMiddleware()],
}));
