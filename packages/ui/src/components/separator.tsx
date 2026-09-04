import type { ComponentProps } from "react";

import { Separator as BaseSeparator } from "@base-ui/react/separator";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";

const styles = stylex.create({
  horizontal: {
    backgroundColor: colors.border,
    height: 1,
    width: "100%",
  },
  vertical: {
    backgroundColor: colors.border,
    height: "100%",
    width: 1,
  },
});

export type SeparatorProps = Omit<ComponentProps<typeof BaseSeparator>, "className" | "style"> & {
  style?: stylex.StyleXStyles;
};

export const Separator = ({ orientation = "horizontal", style, ...props }: SeparatorProps) => (
  <BaseSeparator
    orientation={orientation}
    {...stylex.props(styles[orientation], style)}
    {...props}
  />
);
