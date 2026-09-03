import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { createStart } from "@tanstack/react-start";

const skipClerkMiddleware =
  import.meta.env.DEV &&
  typeof process !== "undefined" &&
  process.env["SKIP_CLERK_MIDDLEWARE"] === "true";

export const startInstance = createStart(() => ({
  requestMiddleware: skipClerkMiddleware ? [] : [clerkMiddleware()],
}));
