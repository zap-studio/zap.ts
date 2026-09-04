import type { ComponentProps } from "react";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "lucide-react";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  root: {
    width: "100%",
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },
  divider: {
    marginInline: space.lg,
    borderBottomColor: colors.border,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  header: {
    margin: 0,
  },
  trigger: {
    borderStyle: "none",
    paddingBlock: space.md,
    paddingInline: space.lg,
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    color: colors.fg,
    cursor: "pointer",
    display: "flex",
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    justifyContent: "space-between",
    width: "100%",
  },
  chevron: {
    color: colors.mutedFg,
    flexShrink: 0,
    transform: {
      "[data-panel-open]": "rotate(180deg)",
      default: "rotate(0deg)",
    },
    transitionDuration: {
      default: "150ms",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    transitionProperty: "transform",
    transitionTimingFunction: "ease-out",
  },
  panel: {
    overflow: "hidden",
    color: colors.mutedFg,
    fontSize: fontSize.sm,
    transitionDuration: {
      default: "150ms",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    transitionProperty: "height",
    transitionTimingFunction: "ease-out",
    height: {
      "[data-ending-style]": 0,
      "[data-starting-style]": 0,
      default: "var(--accordion-panel-height)",
    },
  },
  panelInner: {
    paddingInline: space.lg,
    paddingBottom: space.md,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type RootProps = Omit<ComponentProps<typeof BaseAccordion.Root>, "className" | "style"> & StyleProp;
const Root = ({ style, ...props }: RootProps) => (
  <BaseAccordion.Root {...stylex.props(styles.root, style)} {...props} />
);

type ItemProps = Omit<ComponentProps<typeof BaseAccordion.Item>, "className" | "style"> & StyleProp;
const Item = ({ style, children, ...props }: ItemProps) => (
  <BaseAccordion.Item {...stylex.props(styles.item, style)} {...props}>
    {children}
    <div {...stylex.props(styles.divider)} />
  </BaseAccordion.Item>
);

type HeaderProps = Omit<ComponentProps<typeof BaseAccordion.Header>, "className" | "style"> &
  StyleProp;
const Header = ({ style, ...props }: HeaderProps) => (
  <BaseAccordion.Header {...stylex.props(styles.header, style)} {...props} />
);

type TriggerProps = Omit<ComponentProps<typeof BaseAccordion.Trigger>, "className" | "style"> &
  StyleProp;
const Trigger = ({ style, children, ...props }: TriggerProps) => (
  <BaseAccordion.Trigger {...stylex.props(styles.trigger, style)} {...props}>
    {children}
    <ChevronDown size={16} {...stylex.props(styles.chevron)} />
  </BaseAccordion.Trigger>
);

type PanelProps = Omit<ComponentProps<typeof BaseAccordion.Panel>, "className" | "style"> &
  StyleProp;
const Panel = ({ style, children, ...props }: PanelProps) => (
  <BaseAccordion.Panel {...stylex.props(styles.panel, style)} {...props}>
    <div {...stylex.props(styles.panelInner)}>{children}</div>
  </BaseAccordion.Panel>
);

export const Accordion = {
  Root,
  Item,
  Header,
  Trigger,
  Panel,
};
