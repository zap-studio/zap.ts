import { authRouter } from "@zap/auth/rpc/orpc/router";

export const router = {
  auth: authRouter,
};

export type OrpcRouter = typeof router;
