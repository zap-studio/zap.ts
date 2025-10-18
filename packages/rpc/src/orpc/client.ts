import { RPCLink } from "@orpc/client/fetch";

/**
 * The RPC link to be used by the ORPC client.
 * It points to the `/rpc` endpoint of the current origin. (If `window` is not defined, it falls back to a specified URL or `http://localhost:3000`).
 *
 * @example
 * export const link = createLink();
 * export const orpcClient: RouterClient<typeof router> = createORPCClient(link);
 * export const orpcReactQuery = createORPCReactQueryUtils(orpcClient);
 */
export function createLink(fallbackUrl = "http://localhost:3000") {
  return new RPCLink({
    url: `${typeof window !== "undefined" ? window.location.origin : fallbackUrl}/rpc`,
  });
}
