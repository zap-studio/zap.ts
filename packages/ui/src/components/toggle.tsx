import type { ComponentProps } from "react";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { controlHeight } from "../tokens/control-height.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { radius } from "../tokens/radius.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  root: {
    borderColor: "transparent",
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: 1,
    paddingInline: space.sm,
    alignItems: "center",
    backgroundColor: {
      "[data-pressed]": colors.accent,
      default: "transparent",
      ":hover": colors.accent,
    },
    color: colors.fg,
    cursor: {
      "[data-disabled]": "not-allowed",
      default: "pointer",
    },
    display: "inline-flex",
    fontSize: fontSize.sm,
    justifyContent: "center",
    opacity: {
      "[data-disabled]": 0.5,
      default: 1,
    },
    height: controlHeight.md,
  },
});

export type ToggleProps<Value extends string> = Omit<
  ComponentProps<typeof BaseToggle<Value>>,
  "className" | "style"
> & { style?: stylex.StyleXStyles };

export const Toggle = <Value extends string>({ style, ...props }: ToggleProps<Value>) => (
  <BaseToggle {...stylex.props(styles.root, style)} {...props} />
);
