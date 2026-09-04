import * as stylex from "@stylexjs/stylex";

import { colors } from "./colors.stylex";

export const colorsDark = stylex.createTheme(colors, {
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
