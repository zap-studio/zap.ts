"use client";
import "client-only";

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type TanStackQueryProviderProps = {
  children: React.ReactNode;
  queryClient: QueryClient;
};

/**
 * Provider component for TanStack Query.
 *
 * @example
 * ```tsx
 * import { TanStackQueryProvider } from "@zap/rpc/providers/tanstack-query";
 * import { createReactQueryClient } from "@zap/rpc/tanstack-query";
 *
 * const queryClient = createReactQueryClient({
 *   defaultOptions: {
 *     queries: {
 *       staleTime: 1000 * 60, // 1 minute
 *     },
 *   },
 * });
 *
 * function App({ children }: { children: React.ReactNode }) {
 *   return (
 *     <TanStackQueryProvider queryClient={queryClient}>
 *       {children}
 *     </TanStackQueryProvider>
 *   );
 * }
 * ```
 */
export function TanStackQueryProvider({
  children,
  queryClient,
}: TanStackQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
