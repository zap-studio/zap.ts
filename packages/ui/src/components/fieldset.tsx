import type { ComponentProps } from "react";

import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  root: {
    margin: 0,
    padding: 0,
    borderStyle: "none",
    gap: space.lg,
    display: "flex",
    flexDirection: "column",
  },
  legend: {
    padding: 0,
    color: colors.fg,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    marginBottom: space.xs,
  },
});

type RootProps = Omit<ComponentProps<typeof BaseFieldset.Root>, "className" | "style"> & {
  style?: stylex.StyleXStyles;
};
const Root = ({ style, ...props }: RootProps) => (
  <BaseFieldset.Root {...stylex.props(styles.root, style)} {...props} />
);

type LegendProps = Omit<ComponentProps<typeof BaseFieldset.Legend>, "className" | "style"> & {
  style?: stylex.StyleXStyles;
};
const Legend = ({ style, ...props }: LegendProps) => (
  <BaseFieldset.Legend {...stylex.props(styles.legend, style)} {...props} />
);

export const Fieldset = { Root, Legend };
