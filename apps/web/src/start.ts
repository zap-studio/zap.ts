import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { createStart } from "@tanstack/react-start";
import {
  sentryGlobalFunctionMiddleware,
  sentryGlobalRequestMiddleware,
} from "@zap-ts/observability/server";

export const startInstance = createStart(() => ({
  requestMiddleware: [sentryGlobalRequestMiddleware, clerkMiddleware()],
  functionMiddleware: [sentryGlobalFunctionMiddleware],
}));
