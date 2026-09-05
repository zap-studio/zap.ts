import {
  addIntegration,
  captureException,
  tanstackRouterBrowserTracingIntegration,
} from "@sentry/tanstackstart-react";

export { captureException };

type RouterLike = { isServer: boolean };

export const instrumentRouter = (router: RouterLike) => {
  if (!router.isServer) {
    addIntegration(tanstackRouterBrowserTracingIntegration(router));
  }
};
