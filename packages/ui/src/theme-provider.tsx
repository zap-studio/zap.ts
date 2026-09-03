import * as stylex from "@stylexjs/stylex";
import { useTheme as useThemeState } from "@zap-studio/react-hooks/state/use-theme";
import { type ReactNode, useEffect } from "react";

import { darkTheme } from "./theme.stylex";

export const darkClassNames = (stylex.props(darkTheme).className ?? "").split(" ").filter(Boolean);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useThemeState();

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"](...darkClassNames);
  }, [resolvedTheme]);

  return children;
};

export const useTheme = useThemeState;
