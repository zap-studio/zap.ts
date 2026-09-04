import type { ComponentProps } from "react";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import * as stylex from "@stylexjs/stylex";
import { Minus, Plus } from "lucide-react";

import { colors } from "../tokens/colors.stylex";
import { controlHeight } from "../tokens/control-height.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { radius } from "../tokens/radius.stylex";

const styles = stylex.create({
  group: {
    borderColor: colors.input,
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: colors.bg,
    display: "inline-flex",
    height: controlHeight.md,
  },
  input: {
    borderStyle: "none",
    backgroundColor: "transparent",
    color: colors.fg,
    fontSize: fontSize.sm,
    outlineStyle: "none",
    textAlign: "center",
    height: "100%",
    width: 56,
  },
  button: {
    borderStyle: "none",
    alignItems: "center",
    appearance: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": {
        default: "transparent",
        "@media (hover: hover) and (pointer: fine)": colors.accent,
      },
    },
    color: colors.fg,
    cursor: {
      "[data-disabled]": "not-allowed",
      default: "pointer",
    },
    display: "inline-flex",
    justifyContent: "center",
    opacity: {
      "[data-disabled]": 0.5,
      default: 1,
    },
    height: "100%",
    width: controlHeight.md,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type GroupProps = Omit<ComponentProps<typeof BaseNumberField.Group>, "className" | "style"> &
  StyleProp;
const Group = ({ style, ...props }: GroupProps) => (
  <BaseNumberField.Group {...stylex.props(styles.group, style)} {...props} />
);

type InputProps = Omit<ComponentProps<typeof BaseNumberField.Input>, "className" | "style"> &
  StyleProp;
const Input = ({ style, ...props }: InputProps) => (
  <BaseNumberField.Input {...stylex.props(styles.input, style)} {...props} />
);

type IncrementProps = Omit<
  ComponentProps<typeof BaseNumberField.Increment>,
  "className" | "style"
> &
  StyleProp;
const Increment = ({ style, children, ...props }: IncrementProps) => (
  <BaseNumberField.Increment {...stylex.props(styles.button, style)} {...props}>
    {children ?? <Plus size={14} />}
  </BaseNumberField.Increment>
);

type DecrementProps = Omit<
  ComponentProps<typeof BaseNumberField.Decrement>,
  "className" | "style"
> &
  StyleProp;
const Decrement = ({ style, children, ...props }: DecrementProps) => (
  <BaseNumberField.Decrement {...stylex.props(styles.button, style)} {...props}>
    {children ?? <Minus size={14} />}
  </BaseNumberField.Decrement>
);

export const NumberField = {
  Root: BaseNumberField.Root,
  Group,
  Input,
  Increment,
  Decrement,
  ScrubArea: BaseNumberField.ScrubArea,
  ScrubAreaCursor: BaseNumberField.ScrubAreaCursor,
};
