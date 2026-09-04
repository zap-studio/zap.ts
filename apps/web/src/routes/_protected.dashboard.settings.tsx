import { useUser } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

const Settings = () => {
  const { user } = useUser();

  return (
    <div>
      <h2>Settings</h2>
      <p>Signed in as {user?.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
};

export const Route = createFileRoute("/_protected/dashboard/settings")({ component: Settings });
