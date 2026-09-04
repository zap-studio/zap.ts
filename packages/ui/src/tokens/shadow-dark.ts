import * as stylex from "@stylexjs/stylex";

import { shadow } from "./shadow.stylex";

export const shadowDark = stylex.createTheme(shadow, {
  sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
  md: "0 4px 16px rgba(0, 0, 0, 0.5)",
  lg: "0 16px 48px rgba(0, 0, 0, 0.6)",
});
