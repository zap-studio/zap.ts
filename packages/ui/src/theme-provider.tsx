import * as stylex from "@stylexjs/stylex";
import { useTheme as useThemeState } from "@zap-studio/react-hooks/state/use-theme";
import { createContext, type ReactNode, use, useEffect } from "react";

import { colorsDark } from "./tokens/colors-dark";
import { shadowDark } from "./tokens/shadow-dark";

export const darkClassNames = (stylex.props(colorsDark, shadowDark).className ?? "")
  .split(" ")
  .filter(Boolean);

type ThemeState = ReturnType<typeof useThemeState>;

const ThemeContext = createContext<ThemeState | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeState = useThemeState();
  const { resolvedTheme } = themeState;

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"](...darkClassNames);
  }, [resolvedTheme]);

  return <ThemeContext value={themeState}>{children}</ThemeContext>;
};

export const useTheme = () => {
  const themeState = use(ThemeContext);

  if (!themeState) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return themeState;
};
