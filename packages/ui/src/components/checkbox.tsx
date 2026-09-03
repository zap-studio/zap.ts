import type { ComponentProps } from "react";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import * as stylex from "@stylexjs/stylex";
import { Check, Minus } from "lucide-react";

import { colors } from "../tokens/colors.stylex";
import { radius } from "../tokens/radius.stylex";

const styles = stylex.create({
  root: {
    borderColor: {
      "[data-checked]": colors.primary,
      "[data-indeterminate]": colors.primary,
      default: colors.input,
    },
    borderRadius: radius.sm,
    borderStyle: "solid",
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: {
      "[data-checked]": colors.primary,
      "[data-indeterminate]": colors.primary,
      default: colors.bg,
    },
    color: colors.primaryFg,
    cursor: {
      "[data-disabled]": "not-allowed",
      default: "pointer",
    },
    display: "inline-flex",
    justifyContent: "center",
    opacity: {
      "[data-disabled]": 0.5,
      default: 1,
    },
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.ring,
    },
    outlineOffset: 2,
    outlineStyle: "solid",
    outlineWidth: 2,
    transitionDuration: "120ms",
    transitionProperty: "background-color, border-color",
    transitionTimingFunction: "ease-out",
    height: 16,
    width: 16,
  },
  indicator: {
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type RootProps = Omit<ComponentProps<typeof BaseCheckbox.Root>, "className" | "style"> & StyleProp;
const Root = ({ style, children, ...props }: RootProps) => (
  <BaseCheckbox.Root {...stylex.props(styles.root, style)} {...props}>
    {children ?? (
      <BaseCheckbox.Indicator {...stylex.props(styles.indicator)}>
        {props.indeterminate ? <Minus size={11} /> : <Check size={11} />}
      </BaseCheckbox.Indicator>
    )}
  </BaseCheckbox.Root>
);

export const Checkbox = { Root };
