import { useEffect } from "react";

const DevStyleXInjectImpl = () => {
  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    // oxlint-disable-next-line sonarjs/void-use -- dev-only fire-and-forget import; void is the only non-.then/.catch way to satisfy no-floating-promises
    void import("virtual:stylex:runtime");
  }, []);
  return <link rel="stylesheet" href="/virtual:stylex.css" />;
};

export const DevStyleXInject = ({ cssHref }: { cssHref: string }) =>
  import.meta.env.DEV ? (
    <DevStyleXInjectImpl />
  ) : (
    cssHref && <link rel="stylesheet" href={cssHref} />
  );
