import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useIdentifyUser } from "@zap-ts/analytics/client";

const checkAuth = createServerFn().handler(async () => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    throw redirect({ to: "/" });
  }

  return { isAuthenticated };
});

const ProtectedLayout = () => {
  useIdentifyUser();

  return <Outlet />;
};

export const Route = createFileRoute("/_protected")({
  beforeLoad: () => checkAuth(),
  component: ProtectedLayout,
});
