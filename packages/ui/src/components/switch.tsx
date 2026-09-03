import type { ComponentProps } from "react";

import { Switch as BaseSwitch } from "@base-ui/react/switch";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { radius } from "../tokens/radius.stylex";

const styles = stylex.create({
  root: {
    borderRadius: radius.full,
    alignItems: "center",
    backgroundColor: {
      "[data-checked]": colors.primary,
      default: colors.secondary,
    },
    cursor: {
      "[data-disabled]": "not-allowed",
      default: "pointer",
    },
    display: "inline-flex",
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
    position: "relative",
    transitionDuration: "120ms",
    transitionProperty: "background-color",
    transitionTimingFunction: "ease-out",
    height: 20,
    width: 36,
  },
  thumb: {
    borderRadius: radius.full,
    backgroundColor: colors.bg,
    display: "block",
    transform: {
      "[data-checked]": "translateX(18px)",
      default: "translateX(2px)",
    },
    transitionDuration: "120ms",
    transitionProperty: "transform",
    transitionTimingFunction: "ease-out",
    height: 16,
    width: 16,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type RootProps = Omit<ComponentProps<typeof BaseSwitch.Root>, "className" | "style"> & StyleProp;
const Root = ({ style, children, ...props }: RootProps) => (
  <BaseSwitch.Root {...stylex.props(styles.root, style)} {...props}>
    {children ?? <BaseSwitch.Thumb {...stylex.props(styles.thumb)} />}
  </BaseSwitch.Root>
);

export const Switch = { Root };
