import type { ComponentProps } from "react";

import { Form as BaseForm } from "@base-ui/react/form";
import * as stylex from "@stylexjs/stylex";

import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  root: {
    gap: space.lg,
    display: "flex",
    flexDirection: "column",
  },
});

type FormValues = Record<string, unknown>;

export type FormProps<T extends FormValues = FormValues> = Omit<
  ComponentProps<typeof BaseForm<T>>,
  "className" | "style"
> & {
  style?: stylex.StyleXStyles;
};

export const Form = <T extends FormValues = FormValues>({ style, ...props }: FormProps<T>) => (
  <BaseForm {...stylex.props(styles.root, style)} {...props} />
);
