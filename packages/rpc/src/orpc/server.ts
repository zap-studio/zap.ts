import "server-only";

import {
  type AnyRouter,
  type ClientContext,
  createRouterClient,
  type InferRouterInitialContext,
} from "@orpc/server";
import { router } from "./router";

/**
 * Create an oRPC client instance for server-side usage.
 *
 * This client instance can be used in server components or API routes.
 *
 * @example
 * import { createOrpcServer } from "@zap/rpc/orpc/server";
 * import { appRouter } from "@/lib/rpc/index.ts";
 *
 * export const orpcServer = createOrpcServer(appRouter, {
 *   context: {
 *     // Add global context shared across all requests.
 *     // For per-request context, use middleware or a function.
 *   },
 * })
 */
export function createOrpcServer<
  T extends AnyRouter,
  TClientContext extends ClientContext,
>(_router: T, options?: { context?: TClientContext }) {
  return createRouterClient<T, TClientContext>(_router, {
    context: async () =>
      ({
        ...options?.context,
      }) as InferRouterInitialContext<T>,
  });
}

export const orpcServer = createOrpcServer(router);
