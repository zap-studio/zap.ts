import "server-only";

import { createOrpcServer } from "@zap/rpc/orpc/server";
import { router } from "./router";

export const orpcServer = createOrpcServer(router);
