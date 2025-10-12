"use client";
import "client-only";

import { _GlobalError } from "@zap/ui/pages/global-error";

type ErrorBoundaryProps = {
  reset: () => void;
  error: Error & { digest?: string };
};

export default function GlobalError({ reset, error }: ErrorBoundaryProps) {
  return <_GlobalError error={error} reset={reset} />;
}
