import { UserButton } from "@clerk/tanstack-react-start";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useIsMobile } from "@zap-studio/react-hooks/sensors/use-is-mobile";

const NAV_LINKS = [
  { to: "/dashboard", label: "Overview" },
  { to: "/dashboard/billing", label: "Billing" },
  { to: "/dashboard/settings", label: "Settings" },
] as const;

const DashboardLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div data-collapsed={isMobile}>
      <nav>
        {NAV_LINKS.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
        <UserButton />
      </nav>
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/_protected/dashboard")({ component: DashboardLayout });
