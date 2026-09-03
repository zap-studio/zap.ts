import type { ComponentProps } from "react";

import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { radius } from "../tokens/radius.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  group: {
    gap: space.sm,
    display: "flex",
    flexDirection: "column",
  },
  root: {
    borderColor: {
      "[data-checked]": colors.primary,
      default: colors.input,
    },
    borderRadius: radius.full,
    borderStyle: "solid",
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: colors.bg,
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
    transitionProperty: "border-color",
    transitionTimingFunction: "ease-out",
    height: 16,
    width: 16,
  },
  indicator: {
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    height: 8,
    width: 8,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

export type RadioGroupProps<Value> = Omit<
  ComponentProps<typeof BaseRadioGroup<Value>>,
  "className" | "style"
> &
  StyleProp;
export const RadioGroup = <Value,>({ style, ...props }: RadioGroupProps<Value>) => (
  <BaseRadioGroup {...stylex.props(styles.group, style)} {...props} />
);

type RadioRootProps = Omit<ComponentProps<typeof BaseRadio.Root>, "className" | "style"> &
  StyleProp;
const Root = ({ style, children, ...props }: RadioRootProps) => (
  <BaseRadio.Root {...stylex.props(styles.root, style)} {...props}>
    {children ?? <BaseRadio.Indicator {...stylex.props(styles.indicator)} />}
  </BaseRadio.Root>
);

export const Radio = { Root };
