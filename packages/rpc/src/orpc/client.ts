import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { Router } from "./router";

/**
 * The RPC link to be used by the ORPC client.
 * It points to the `/rpc` endpoint of the current origin. (If `window` is not defined, it falls back to a specified URL or `http://localhost:3000`).
 *
 * @example
 * export const { link, orpcClient, orpcReactQuery } = createOrpcClient();
 */
export function createOrpcClient(fallbackUrl = "http://localhost:3000") {
  const link = new RPCLink({
    url: `${typeof window !== "undefined" ? window.location.origin : fallbackUrl}/rpc`,
    headers: async () => {
      if (typeof window !== "undefined") {
        return {};
      }

      const { headers } = await import("next/headers");
      return await headers();
    },
  });

  const orpcClient = createORPCClient<Router>(link);
  const orpcReactQuery = createORPCReactQueryUtils(orpcClient);

  return { link, orpcClient, orpcReactQuery };
}
