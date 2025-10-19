import { createORPCClient, type NestedClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCReactQueryUtils } from "@orpc/react-query";

/**
 * The RPC link to be used by the ORPC client.
 * It points to the `/rpc` endpoint of the current origin. (If `window` is not defined, it falls back to a specified URL or `http://localhost:3000`).
 *
 * @example
 * import { type OrpcRouter } from "./router";
 * export const { link, orpcClient, orpcReactQuery } = createOrpcClient<OrpcRouter>();
 */
// biome-ignore lint/suspicious/noExplicitAny: We need to allow any here for the router type.
export function createOrpcClient<TOrpcRouter extends NestedClient<any>>(
  fallbackUrl = "http://localhost:3000"
) {
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

  const orpcClient = createORPCClient<TOrpcRouter>(link);
  const orpcReactQuery = createORPCReactQueryUtils(orpcClient);

  return { link, orpcClient, orpcReactQuery };
}
