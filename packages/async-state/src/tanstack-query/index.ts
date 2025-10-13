import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

/**
 * Create a React Query client with default options.
 *
 * @example
 * ```ts
 * import { createReactQueryClient } from "@zap/async-state/tanstack-query";
 *
 * const queryClient = createReactQueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 1000 * 60, // 1 minute
 *     },
 *   },
 * });
 * ```
 */
export function createReactQueryClient(options?: QueryClientConfig) {
  const { defaultOptions } = options || {};

  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: defaultOptions?.queries?.staleTime || 0,
      },
    },
  });
}
