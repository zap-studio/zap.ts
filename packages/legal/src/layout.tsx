import "server-only";

import type React from "react";

export type _LegalLayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export function _LegalLayout({ children, header, footer }: _LegalLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {header}
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-24">{children}</div>
      {footer}
    </div>
  );
}
