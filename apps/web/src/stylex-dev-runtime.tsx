import { useEffect } from "react";

export const StylexDevRuntime = () => {
  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    const load = async () => {
      try {
        await import("virtual:stylex:runtime");
      } catch {}
    };

    void load();
  }, []);

  return import.meta.env.DEV ? <link rel="stylesheet" href="/virtual:stylex.css" /> : null;
};
