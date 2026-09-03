import * as stylex from "@stylexjs/stylex";

export const colors = stylex.defineVars({
  bg: "#ffffff",
  fg: "#171717",

  card: "#ffffff",
  cardFg: "#171717",

  border: "#e5e5e5",
  input: "#e5e5e5",
  ring: "#f2b41f",

  primary: "#f2b41f",
  primaryFg: "#171717",

  secondary: "#f5f5f5",
  secondaryFg: "#171717",

  muted: "#f5f5f5",
  mutedFg: "#737373",

  accent: "#f5f5f5",
  accentFg: "#171717",

  destructive: "#dc2626",
  destructiveFg: "#fafafa",

  overlay: "rgba(0, 0, 0, 0.4)",
});

export const darkTheme = stylex.createTheme(colors, {
  bg: "#0a0a0a",
  fg: "#fafafa",

  card: "#171717",
  cardFg: "#fafafa",

  border: "#262626",
  input: "#262626",
  ring: "#f2b41f",

  primary: "#f2b41f",
  primaryFg: "#171717",

  secondary: "#262626",
  secondaryFg: "#fafafa",

  muted: "#262626",
  mutedFg: "#a3a3a3",

  accent: "#262626",
  accentFg: "#fafafa",

  destructive: "#ef4444",
  destructiveFg: "#fafafa",

  overlay: "rgba(0, 0, 0, 0.6)",
});

export const radius = stylex.defineVars({
  sm: "6px",
  md: "8px",
  lg: "12px",
  full: "9999px",
});

export const space = stylex.defineVars({
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "32px",
  xxxl: "48px",
});

export const fontSize = stylex.defineVars({
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  xxl: "24px",
  xxxl: "30px",
});

export const fontWeight = stylex.defineVars({
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
});

export const lineHeight = stylex.defineVars({
  tight: "1.25",
  normal: "1.5",
  relaxed: "1.75",
});

export const fontFamily = stylex.defineVars({
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
});

export const controlHeight = stylex.defineVars({
  sm: "28px",
  md: "32px",
  lg: "36px",
});

export const shadow = stylex.defineVars({
  sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
  md: "0 4px 12px rgba(0, 0, 0, 0.08)",
  lg: "0 12px 32px rgba(0, 0, 0, 0.12)",
});

export const shadowDark = stylex.createTheme(shadow, {
  sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
  md: "0 4px 16px rgba(0, 0, 0, 0.5)",
  lg: "0 16px 48px rgba(0, 0, 0, 0.6)",
});
