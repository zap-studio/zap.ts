import { createOrpcClient } from "@zap/rpc/orpc/client";
import type { OrpcRouter } from "./router";

export const { link, orpcClient, orpcReactQuery } =
  createOrpcClient<OrpcRouter>("http://localhost:3000");
