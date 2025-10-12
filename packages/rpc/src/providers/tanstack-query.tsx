"use client";
import "client-only";

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type TanStackQueryProviderProps = {
  children: React.ReactNode;
  queryClient: QueryClient;
};

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
