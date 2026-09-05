import { captureException } from "@zap-ts/observability";
import { useEffect } from "react";

export const RouteError = ({ error }: { error: Error }) => {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
};
