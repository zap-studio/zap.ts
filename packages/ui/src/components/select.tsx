import type { ComponentProps } from "react";

import { Select as BaseSelect } from "@base-ui/react/select";
import * as stylex from "@stylexjs/stylex";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { colors } from "../tokens/colors.stylex";
import { controlHeight } from "../tokens/control-height.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";
import { shadow } from "../tokens/shadow.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  trigger: {
    borderColor: {
      "[data-popup-open]": colors.ring,
      default: colors.input,
    },
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: 1,
    gap: space.sm,
    paddingInline: space.sm,
    alignItems: "center",
    backgroundColor: colors.bg,
    color: {
      "[data-placeholder]": colors.mutedFg,
      default: colors.fg,
    },
    cursor: {
      "[data-disabled]": "not-allowed",
      default: "pointer",
    },
    display: "inline-flex",
    fontSize: fontSize.sm,
    justifyContent: "space-between",
    opacity: {
      "[data-disabled]": 0.5,
      default: 1,
    },
    height: controlHeight.md,
    width: "100%",
  },
  icon: {
    color: colors.mutedFg,
    flexShrink: 0,
  },
  popup: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: 1,
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
    minWidth: "var(--anchor-width)",
  },
  list: {
    padding: space.xs,
    overflowY: "auto",
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
    justifyContent: "space-between",
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
  scrollArrow: {
    alignItems: "center",
    color: colors.mutedFg,
    display: "flex",
    justifyContent: "center",
    height: 20,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type TriggerProps = Omit<ComponentProps<typeof BaseSelect.Trigger>, "className" | "style"> &
  StyleProp;
const Trigger = ({ style, children, ...props }: TriggerProps) => (
  <BaseSelect.Trigger {...stylex.props(styles.trigger, style)} {...props}>
    {children}
    <BaseSelect.Icon {...stylex.props(styles.icon)}>
      <ChevronDown size={14} />
    </BaseSelect.Icon>
  </BaseSelect.Trigger>
);

type PopupProps = Omit<ComponentProps<typeof BaseSelect.Popup>, "className" | "style"> & StyleProp;
const Popup = ({ style, ...props }: PopupProps) => (
  <BaseSelect.Popup {...stylex.props(styles.popup, style)} {...props} />
);

type ListProps = Omit<ComponentProps<typeof BaseSelect.List>, "className" | "style"> & StyleProp;
const List = ({ style, ...props }: ListProps) => (
  <BaseSelect.List {...stylex.props(styles.list, style)} {...props} />
);

type ItemProps = Omit<ComponentProps<typeof BaseSelect.Item>, "className" | "style"> & StyleProp;
const Item = ({ style, children, ...props }: ItemProps) => (
  <BaseSelect.Item {...stylex.props(styles.item, style)} {...props}>
    <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    <BaseSelect.ItemIndicator>
      <Check size={14} />
    </BaseSelect.ItemIndicator>
  </BaseSelect.Item>
);

type GroupLabelProps = Omit<ComponentProps<typeof BaseSelect.GroupLabel>, "className" | "style"> &
  StyleProp;
const GroupLabel = ({ style, ...props }: GroupLabelProps) => (
  <BaseSelect.GroupLabel {...stylex.props(styles.groupLabel, style)} {...props} />
);

type ScrollArrowProps = Omit<
  ComponentProps<typeof BaseSelect.ScrollUpArrow>,
  "className" | "style"
> &
  StyleProp;
const ScrollUpArrow = ({ style, children, ...props }: ScrollArrowProps) => (
  <BaseSelect.ScrollUpArrow {...stylex.props(styles.scrollArrow, style)} {...props}>
    {children ?? <ChevronUp size={14} />}
  </BaseSelect.ScrollUpArrow>
);
const ScrollDownArrow = ({ style, children, ...props }: ScrollArrowProps) => (
  <BaseSelect.ScrollDownArrow {...stylex.props(styles.scrollArrow, style)} {...props}>
    {children ?? <ChevronDown size={14} />}
  </BaseSelect.ScrollDownArrow>
);

export const Select = {
  Root: BaseSelect.Root,
  Trigger,
  Value: BaseSelect.Value,
  Portal: BaseSelect.Portal,
  Backdrop: BaseSelect.Backdrop,
  Positioner: BaseSelect.Positioner,
  Popup,
  List,
  Item,
  Group: BaseSelect.Group,
  GroupLabel,
  Separator: BaseSelect.Separator,
  Label: BaseSelect.Label,
  ScrollUpArrow,
  ScrollDownArrow,
};
