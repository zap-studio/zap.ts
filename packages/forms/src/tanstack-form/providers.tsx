"use client";
import "client-only";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";

type TanStackFormProviderProps = {
  children: React.ReactNode;
};

/**
 * Provider component for TanStack Form that wraps children with form development tools.
 *
 * This component serves as the root provider for TanStack Form functionality and includes
 * the TanStack Devtools with the FormDevtoolsPlugin enabled for enhanced debugging capabilities.
 *
 * @example
 * ```tsx
 * <TanStackFormProvider>
 *   <YourFormComponent />
 * </TanStackFormProvider>
 * ```
 */
export function TanStackFormProvider({ children }: TanStackFormProviderProps) {
  return (
    <>
      {children} <TanStackDevtools plugins={[FormDevtoolsPlugin()]} />
    </>
  );
}
