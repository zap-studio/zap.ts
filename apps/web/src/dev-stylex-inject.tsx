import { useEffect } from "react";

const DevStyleXInjectImpl = () => {
  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    const load = async () => {
      try {
        await import("virtual:stylex:runtime");
      } catch {
        // dev-only fire-and-forget import; failures are non-fatal
      }
    };

    void load();
  }, []);
  return <link rel="stylesheet" href="/virtual:stylex.css" />;
};

export const DevStyleXInject = ({ cssHref }: { cssHref: string }) => (
  <>
    {import.meta.env.DEV && <DevStyleXInjectImpl />}
    {cssHref && <link rel="stylesheet" href={cssHref} />}
  </>
);
