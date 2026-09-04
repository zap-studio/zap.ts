import * as stylex from "@stylexjs/stylex";

import { colors } from "./tokens/colors.stylex";
import { fontFamily } from "./tokens/font-family.stylex";

const styles = stylex.create({
  body: {
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    margin: 0,
    backgroundColor: colors.bg,
    color: colors.fg,
    fontFamily: fontFamily.sans,
    scrollbarColor: `${colors.mutedFg} transparent`,
    scrollbarWidth: "thin",
    textSizeAdjust: "100%",
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "ease-out",
  },
});

export const bodyProps = stylex.props(styles.body);
