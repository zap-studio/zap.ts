import type { ComponentProps } from "react";

import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import * as stylex from "@stylexjs/stylex";

import { radius } from "../tokens/radius.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  root: {
    padding: 2,
    borderRadius: radius.md,
    gap: space.xs,
    display: "inline-flex",
  },
});

export type ToggleGroupProps<Value extends string> = Omit<
  ComponentProps<typeof BaseToggleGroup<Value>>,
  "className" | "style"
> & { style?: stylex.StyleXStyles };

export const ToggleGroup = <Value extends string>({ style, ...props }: ToggleGroupProps<Value>) => (
  <BaseToggleGroup {...stylex.props(styles.root, style)} {...props} />
);
