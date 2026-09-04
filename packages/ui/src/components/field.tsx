import type { ComponentProps } from "react";

import { Field as BaseField } from "@base-ui/react/field";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  root: {
    gap: space.xs,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: colors.fg,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  description: {
    margin: 0,
    color: colors.mutedFg,
    fontSize: fontSize.xs,
  },
  error: {
    color: colors.destructive,
    fontSize: fontSize.xs,
  },
});

type RootProps = Omit<ComponentProps<typeof BaseField.Root>, "className" | "style"> & {
  style?: stylex.StyleXStyles;
};
const Root = ({ style, ...props }: RootProps) => (
  <BaseField.Root {...stylex.props(styles.root, style)} {...props} />
);

type LabelProps = Omit<ComponentProps<typeof BaseField.Label>, "className" | "style"> & {
  style?: stylex.StyleXStyles;
};
const Label = ({ style, ...props }: LabelProps) => (
  <BaseField.Label {...stylex.props(styles.label, style)} {...props} />
);

type DescriptionProps = Omit<
  ComponentProps<typeof BaseField.Description>,
  "className" | "style"
> & {
  style?: stylex.StyleXStyles;
};
const Description = ({ style, ...props }: DescriptionProps) => (
  <BaseField.Description {...stylex.props(styles.description, style)} {...props} />
);

type ErrorProps = Omit<ComponentProps<typeof BaseField.Error>, "className" | "style"> & {
  style?: stylex.StyleXStyles;
};
const FieldError = ({ style, ...props }: ErrorProps) => (
  <BaseField.Error {...stylex.props(styles.error, style)} {...props} />
);

export const Field = {
  Root,
  Label,
  Description,
  Error: FieldError,
  Control: BaseField.Control,
  Item: BaseField.Item,
  Validity: BaseField.Validity,
};
