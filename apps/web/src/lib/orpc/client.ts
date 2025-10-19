import { createOrpcClient } from "@zap/rpc/orpc/client";
import type { OrpcRouter } from "./router";

export const { orpcClient, orpcReactQuery } = createOrpcClient<OrpcRouter>(
  "http://localhost:3000"
);
