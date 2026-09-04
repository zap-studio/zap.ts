import type { ComponentProps } from "react";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  list: {
    gap: space.xs,
    display: "flex",
    position: "relative",
    borderBottomColor: colors.border,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  tab: {
    borderStyle: "none",
    paddingBlock: space.sm,
    paddingInline: space.md,
    appearance: "none",
    backgroundColor: "transparent",
    color: {
      "[data-active]": colors.fg,
      default: colors.mutedFg,
    },
    cursor: {
      "[data-disabled]": "not-allowed",
      default: "pointer",
    },
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    opacity: {
      "[data-disabled]": 0.5,
      default: 1,
    },
    position: "relative",
  },
  indicator: {
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    position: "absolute",
    transitionDuration: {
      default: "150ms",
      "@media (prefers-reduced-motion: reduce)": "0.01ms",
    },
    transitionProperty: "left, width",
    transitionTimingFunction: "ease-out",
    bottom: -1,
    height: 2,
    left: "var(--active-tab-left)",
    width: "var(--active-tab-width)",
  },
  panel: {
    paddingTop: space.lg,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type ListProps = Omit<ComponentProps<typeof BaseTabs.List>, "className" | "style"> & StyleProp;
const List = ({ style, children, ...props }: ListProps) => (
  <BaseTabs.List {...stylex.props(styles.list, style)} {...props}>
    {children}
    <BaseTabs.Indicator {...stylex.props(styles.indicator)} />
  </BaseTabs.List>
);

type TabProps = Omit<ComponentProps<typeof BaseTabs.Tab>, "className" | "style"> & StyleProp;
const Tab = ({ style, ...props }: TabProps) => (
  <BaseTabs.Tab {...stylex.props(styles.tab, style)} {...props} />
);

type PanelProps = Omit<ComponentProps<typeof BaseTabs.Panel>, "className" | "style"> & StyleProp;
const Panel = ({ style, ...props }: PanelProps) => (
  <BaseTabs.Panel {...stylex.props(styles.panel, style)} {...props} />
);

export const Tabs = {
  Root: BaseTabs.Root,
  List,
  Tab,
  Panel,
};
