import { StandardRPCJsonSerializer } from "@orpc/client/standard";
import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

export const defaultSerializer = new StandardRPCJsonSerializer({
  customJsonSerializers: [],
});

export interface OrpcReactQueryClientOptions extends QueryClientConfig {
  serializer?: StandardRPCJsonSerializer;
}

/**
 * Creates a configured React Query client optimized for use with oRPC.
 *
 * This function sets up a QueryClient with custom serialization/deserialization
 * logic for handling data hydration and dehydration, which is essential for
 * server-side rendering (SSR) and data persistence scenarios.
 *
 * @example
 * ```typescript
 * const queryClient = createOrpcReactQueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 5000,
 *     },
 *   },
 * });
 * ```
 */
export function createOrpcReactQueryClient({
  serializer = defaultSerializer,
  ...config
}: OrpcReactQueryClientOptions = {}) {
  const userDefaults = config.defaultOptions ?? {};

  const mergedDefaults: QueryClientConfig["defaultOptions"] = {
    ...userDefaults,
    dehydrate: {
      serializeData(data) {
        const [json, meta] = serializer.serialize(data);
        return { json, meta };
      },
      ...(userDefaults.dehydrate ?? {}),
    },
    hydrate: {
      deserializeData(data) {
        return serializer.deserialize(data.json, data.meta);
      },
      ...(userDefaults.hydrate ?? {}),
    },
  };

  return new QueryClient({
    ...config,
    defaultOptions: mergedDefaults,
  });
}
