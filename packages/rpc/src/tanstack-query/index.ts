import { StandardRPCJsonSerializer } from "@orpc/client/standard";
import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

/**
 * Create a React Query client with default options.
 *
 * @example
 * ```ts
 * import { createReactQueryClient } from "@zap/rpc/tanstack-query";
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

export const serializer = new StandardRPCJsonSerializer({
  customJsonSerializers: [
    // put custom serializers here
  ],
});

/**
 * Create a React Query client with orpc serialization support.
 *
 * @example
 * ```ts
 * import { createOrpcReactQueryClient } from "@zap/rpc/tanstack-query";
 *
 * const queryClient = createOrpcReactQueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 1000 * 60, // 1 minute
 *     },
 *   },
 * });
 * ```
 */
export function createOrpcReactQueryClient(
  serializerInstance = serializer,
  options?: QueryClientConfig
) {
  const { defaultOptions } = options || {};

  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: defaultOptions?.queries?.staleTime || 0,
      },
      dehydrate: {
        serializeData(data) {
          const [json, meta] = serializerInstance.serialize(data);
          return { json, meta };
        },
      },
      hydrate: {
        deserializeData(data) {
          return serializerInstance.deserialize(data.json, data.meta);
        },
      },
    },
  });
}
