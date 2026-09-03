import type { ComponentProps } from "react";

import { Popover as BasePopover } from "@base-ui/react/popover";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";
import { shadow } from "../tokens/shadow.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  popup: {
    padding: space.lg,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: "solid",
    borderWidth: 1,
    gap: space.xs,
    backgroundColor: colors.card,
    boxShadow: shadow.md,
    color: colors.cardFg,
    display: "flex",
    flexDirection: "column",
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
    transitionDuration: "150ms",
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "ease-out",
    minWidth: 200,
  },
  arrow: {
    backgroundColor: colors.card,
    transform: "rotate(45deg)",
    height: 8,
    width: 8,
  },
  title: {
    margin: 0,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  description: {
    margin: 0,
    color: colors.mutedFg,
    fontSize: fontSize.xs,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type PopupProps = Omit<ComponentProps<typeof BasePopover.Popup>, "className" | "style"> & StyleProp;
const Popup = ({ style, ...props }: PopupProps) => (
  <BasePopover.Popup {...stylex.props(styles.popup, style)} {...props} />
);

type ArrowProps = Omit<ComponentProps<typeof BasePopover.Arrow>, "className" | "style"> & StyleProp;
const Arrow = ({ style, ...props }: ArrowProps) => (
  <BasePopover.Arrow {...stylex.props(styles.arrow, style)} {...props} />
);

type TitleProps = Omit<ComponentProps<typeof BasePopover.Title>, "className" | "style"> & StyleProp;
const Title = ({ style, ...props }: TitleProps) => (
  <BasePopover.Title {...stylex.props(styles.title, style)} {...props} />
);

type DescriptionProps = Omit<
  ComponentProps<typeof BasePopover.Description>,
  "className" | "style"
> &
  StyleProp;
const Description = ({ style, ...props }: DescriptionProps) => (
  <BasePopover.Description {...stylex.props(styles.description, style)} {...props} />
);

export const Popover = {
  Root: BasePopover.Root,
  Trigger: BasePopover.Trigger,
  Portal: BasePopover.Portal,
  Positioner: BasePopover.Positioner,
  Backdrop: BasePopover.Backdrop,
  Popup,
  Arrow,
  Title,
  Description,
  Close: BasePopover.Close,
};
