import type { ComponentProps, ReactNode } from "react";

import { Progress as BaseProgress } from "@base-ui/react/progress";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  root: {
    gap: space.xs,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  track: {
    borderRadius: radius.full,
    overflow: "hidden",
    backgroundColor: colors.secondary,
    position: "relative",
    height: 6,
    width: "100%",
  },
  indicator: {
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    transitionDuration: "200ms",
    transitionProperty: "width",
    transitionTimingFunction: "ease-out",
    height: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    color: colors.fg,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  value: {
    color: colors.mutedFg,
    fontSize: fontSize.sm,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type RootProps = Omit<ComponentProps<typeof BaseProgress.Root>, "className" | "style"> & StyleProp;
const Root = ({ style, ...props }: RootProps) => (
  <BaseProgress.Root {...stylex.props(styles.root, style)} {...props} />
);

type TrackProps = Omit<ComponentProps<typeof BaseProgress.Track>, "className" | "style"> &
  StyleProp;
const Track = ({ style, ...props }: TrackProps) => (
  <BaseProgress.Track {...stylex.props(styles.track, style)} {...props} />
);

type IndicatorProps = Omit<ComponentProps<typeof BaseProgress.Indicator>, "className" | "style"> &
  StyleProp;
const Indicator = ({ style, ...props }: IndicatorProps) => (
  <BaseProgress.Indicator {...stylex.props(styles.indicator, style)} {...props} />
);

type LabelProps = Omit<ComponentProps<typeof BaseProgress.Label>, "className" | "style"> &
  StyleProp;
const Label = ({ style, ...props }: LabelProps) => (
  <BaseProgress.Label {...stylex.props(styles.label, style)} {...props} />
);

type ValueProps = Omit<ComponentProps<typeof BaseProgress.Value>, "className" | "style"> &
  StyleProp;
const Value = ({ style, ...props }: ValueProps) => (
  <BaseProgress.Value {...stylex.props(styles.value, style)} {...props} />
);

type HeaderProps = { children?: ReactNode } & StyleProp;
const Header = ({ style, ...props }: HeaderProps) => (
  <div {...stylex.props(styles.header, style)} {...props} />
);

export const Progress = { Root, Track, Indicator, Label, Value, Header };
