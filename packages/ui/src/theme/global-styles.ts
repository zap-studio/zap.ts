import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontFamily } from "../tokens/font-family.stylex";

const styles = stylex.create({
  body: {
    margin: 0,
    backgroundColor: colors.bg,
    color: colors.fg,
    fontFamily: fontFamily.sans,
    transitionDuration: "150ms",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "ease-out",
  },
});

export const bodyProps = stylex.props(styles.body);
