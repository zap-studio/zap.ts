import type { ComponentProps } from "react";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { radius } from "../tokens/radius.stylex";
import { shadow } from "../tokens/shadow.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  popup: {
    borderRadius: radius.sm,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    backgroundColor: colors.fg,
    boxShadow: shadow.sm,
    color: colors.bg,
    fontSize: fontSize.xs,
    opacity: {
      "[data-ending-style]": 0,
      "[data-starting-style]": 0,
      default: 1,
    },
    transform: {
      "[data-ending-style]": "scale(0.96)",
      "[data-starting-style]": "scale(0.96)",
      default: "scale(1)",
    },
    transformOrigin: "var(--transform-origin)",
    transitionDuration: {
      default: "100ms, 100ms",
      "@media (prefers-reduced-motion: reduce)": "100ms, 0.01ms",
    },
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "ease-out",
  },
  arrow: {
    backgroundColor: colors.fg,
    transform: "rotate(45deg)",
    height: 6,
    width: 6,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type PopupProps = Omit<ComponentProps<typeof BaseTooltip.Popup>, "className" | "style"> & StyleProp;
const Popup = ({ style, ...props }: PopupProps) => (
  <BaseTooltip.Popup {...stylex.props(styles.popup, style)} {...props} />
);

type ArrowProps = Omit<ComponentProps<typeof BaseTooltip.Arrow>, "className" | "style"> & StyleProp;
const Arrow = ({ style, ...props }: ArrowProps) => (
  <BaseTooltip.Arrow {...stylex.props(styles.arrow, style)} {...props} />
);

export const Tooltip = {
  Provider: BaseTooltip.Provider,
  Root: BaseTooltip.Root,
  Trigger: BaseTooltip.Trigger,
  Portal: BaseTooltip.Portal,
  Positioner: BaseTooltip.Positioner,
  Popup,
  Arrow,
};
