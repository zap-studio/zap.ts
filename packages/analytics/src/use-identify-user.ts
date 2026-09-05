import { useAuth } from "@clerk/tanstack-react-start";
import { usePostHog } from "@posthog/react";
import { useEffect } from "react";

export const useIdentifyUser = () => {
  const { userId } = useAuth();
  const posthog = usePostHog();

  useEffect(() => {
    if (userId) {
      posthog.identify(userId);
    }
  }, [userId, posthog]);
};
