import type { ComponentProps } from "react";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import * as stylex from "@stylexjs/stylex";
import { Check, ChevronRight, Circle } from "lucide-react";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";
import { shadow } from "../tokens/shadow.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  backdrop: {
    inset: 0,
    position: "fixed",
  },
  popup: {
    padding: space.xs,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: 1,
    gap: 2,
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
    transitionDuration: {
      default: "120ms, 120ms",
      "@media (prefers-reduced-motion: reduce)": "120ms, 0.01ms",
    },
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "ease-out",
    maxHeight: "var(--available-height)",
    minWidth: 180,
    overflowY: "auto",
  },
  arrow: {
    backgroundColor: colors.card,
    transform: "rotate(45deg)",
    height: 8,
    width: 8,
  },
  item: {
    borderRadius: radius.sm,
    gap: space.sm,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    alignItems: "center",
    backgroundColor: {
      "[data-highlighted]": colors.accent,
      default: "transparent",
    },
    color: colors.fg,
    cursor: {
      "[data-disabled]": "not-allowed",
      default: "pointer",
    },
    display: "flex",
    fontSize: fontSize.sm,
    opacity: {
      "[data-disabled]": 0.5,
      default: 1,
    },
    outlineStyle: "none",
  },
  groupLabel: {
    paddingBlock: space.xs,
    paddingInline: space.sm,
    color: colors.mutedFg,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  indicator: {
    alignItems: "center",
    display: "inline-flex",
    justifyContent: "center",
    height: 14,
    width: 14,
  },
  chevron: {
    color: colors.mutedFg,
    marginLeft: "auto",
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type BackdropProps = Omit<ComponentProps<typeof BaseMenu.Backdrop>, "className" | "style"> &
  StyleProp;
const Backdrop = ({ style, ...props }: BackdropProps) => (
  <BaseMenu.Backdrop {...stylex.props(styles.backdrop, style)} {...props} />
);

type PopupProps = Omit<ComponentProps<typeof BaseMenu.Popup>, "className" | "style"> & StyleProp;
const Popup = ({ style, ...props }: PopupProps) => (
  <BaseMenu.Popup {...stylex.props(styles.popup, style)} {...props} />
);

type ArrowProps = Omit<ComponentProps<typeof BaseMenu.Arrow>, "className" | "style"> & StyleProp;
const Arrow = ({ style, ...props }: ArrowProps) => (
  <BaseMenu.Arrow {...stylex.props(styles.arrow, style)} {...props} />
);

type ItemProps = Omit<ComponentProps<typeof BaseMenu.Item>, "className" | "style"> & StyleProp;
const Item = ({ style, ...props }: ItemProps) => (
  <BaseMenu.Item {...stylex.props(styles.item, style)} {...props} />
);

type LinkItemProps = Omit<ComponentProps<typeof BaseMenu.LinkItem>, "className" | "style"> &
  StyleProp;
const LinkItem = ({ style, ...props }: LinkItemProps) => (
  <BaseMenu.LinkItem {...stylex.props(styles.item, style)} {...props} />
);

type CheckboxItemProps = Omit<ComponentProps<typeof BaseMenu.CheckboxItem>, "className" | "style"> &
  StyleProp;
const CheckboxItem = ({ style, ...props }: CheckboxItemProps) => (
  <BaseMenu.CheckboxItem {...stylex.props(styles.item, style)} {...props} />
);

type RadioItemProps = Omit<ComponentProps<typeof BaseMenu.RadioItem>, "className" | "style"> &
  StyleProp;
const RadioItem = ({ style, ...props }: RadioItemProps) => (
  <BaseMenu.RadioItem {...stylex.props(styles.item, style)} {...props} />
);

type SubmenuTriggerProps = Omit<
  ComponentProps<typeof BaseMenu.SubmenuTrigger>,
  "className" | "style"
> &
  StyleProp;
const SubmenuTrigger = ({ style, children, ...props }: SubmenuTriggerProps) => (
  <BaseMenu.SubmenuTrigger {...stylex.props(styles.item, style)} {...props}>
    {children}
    <ChevronRight size={14} {...stylex.props(styles.chevron)} />
  </BaseMenu.SubmenuTrigger>
);

type GroupLabelProps = Omit<ComponentProps<typeof BaseMenu.GroupLabel>, "className" | "style"> &
  StyleProp;
const GroupLabel = ({ style, ...props }: GroupLabelProps) => (
  <BaseMenu.GroupLabel {...stylex.props(styles.groupLabel, style)} {...props} />
);

type CheckboxItemIndicatorProps = Omit<
  ComponentProps<typeof BaseMenu.CheckboxItemIndicator>,
  "className" | "style"
> &
  StyleProp;
const CheckboxItemIndicator = ({ style, children, ...props }: CheckboxItemIndicatorProps) => (
  <BaseMenu.CheckboxItemIndicator {...stylex.props(styles.indicator, style)} {...props}>
    {children ?? <Check size={14} />}
  </BaseMenu.CheckboxItemIndicator>
);

type RadioItemIndicatorProps = Omit<
  ComponentProps<typeof BaseMenu.RadioItemIndicator>,
  "className" | "style"
> &
  StyleProp;
const RadioItemIndicator = ({ style, children, ...props }: RadioItemIndicatorProps) => (
  <BaseMenu.RadioItemIndicator {...stylex.props(styles.indicator, style)} {...props}>
    {children ?? <Circle size={8} fill="currentColor" />}
  </BaseMenu.RadioItemIndicator>
);

export const Menu = {
  Root: BaseMenu.Root,
  Trigger: BaseMenu.Trigger,
  Portal: BaseMenu.Portal,
  Positioner: BaseMenu.Positioner,
  Backdrop,
  Popup,
  Arrow,
  Item,
  LinkItem,
  CheckboxItem,
  CheckboxItemIndicator,
  RadioGroup: BaseMenu.RadioGroup,
  RadioItem,
  RadioItemIndicator,
  Group: BaseMenu.Group,
  GroupLabel,
  SubmenuRoot: BaseMenu.SubmenuRoot,
  SubmenuTrigger,
};
