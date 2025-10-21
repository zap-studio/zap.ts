import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

export interface ReactQueryClientOptions extends QueryClientConfig {}

/**
 * Creates a configured React Query client with merged default options.
 *
 * @example
 * const queryClient = createReactQueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 5000,
 *     },
 *   },
 * });
 */
export function createReactQueryClient(config: ReactQueryClientOptions = {}) {
  const userDefaults = config.defaultOptions ?? {};

  const mergedDefaults: QueryClientConfig["defaultOptions"] = {
    ...userDefaults,
  };

  return new QueryClient({
    ...config,
    defaultOptions: mergedDefaults,
  });
}
