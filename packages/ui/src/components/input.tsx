import type { ComponentProps } from "react";

import { Input as BaseInput } from "@base-ui/react/input";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { controlHeight } from "../tokens/control-height.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { radius } from "../tokens/radius.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  base: {
    borderColor: {
      "[data-invalid]": colors.destructive,
      default: colors.input,
      ":focus-visible": colors.ring,
    },
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: 1,
    paddingInline: space.sm,
    backgroundColor: colors.bg,
    color: colors.fg,
    cursor: {
      default: "text",
      ":disabled": "not-allowed",
    },
    display: "block",
    fontSize: fontSize.sm,
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.ring,
    },
    outlineOffset: -1,
    outlineStyle: "solid",
    outlineWidth: 2,
    transitionDuration: "120ms",
    transitionProperty: "border-color, outline-color",
    transitionTimingFunction: "ease-out",
    height: controlHeight.md,
    width: "100%",
  },
});

type BaseInputProps = ComponentProps<typeof BaseInput>;

export type InputProps = Omit<BaseInputProps, "className" | "style"> & {
  style?: stylex.StyleXStyles;
};

export const Input = ({ style, ...props }: InputProps) => (
  <BaseInput {...stylex.props(styles.base, style)} {...props} />
);
