import { $pwa } from "./procedures/pwa";

export const router = {
  pwa: $pwa(),
};

export type Router = typeof router;
