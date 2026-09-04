import type { ComponentProps } from "react";

import { Button as BaseButton } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { controlHeight } from "../tokens/control-height.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";
import { space } from "../tokens/space.stylex";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

const styles = stylex.create({
  base: {
    borderColor: "transparent",
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: 1,
    gap: space.xs,
    paddingInline: space.md,
    alignItems: "center",
    cursor: {
      default: "pointer",
      ":disabled": "not-allowed",
    },
    display: "inline-flex",
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    justifyContent: "center",
    lineHeight: 1,
    opacity: {
      default: 1,
      ":disabled": 0.5,
    },
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.ring,
    },
    outlineOffset: 2,
    outlineStyle: "solid",
    outlineWidth: 2,
    transform: {
      default: "scale(1)",
      ":active": "scale(0.97)",
    },
    transitionDuration: {
      default: "120ms, 120ms, 120ms, 120ms",
      "@media (prefers-reduced-motion: reduce)": "120ms, 120ms, 120ms, 0.01ms",
    },
    transitionProperty: "background-color, border-color, color, transform",
    transitionTimingFunction: "ease-out",
  },

  sm: { paddingInline: space.sm, fontSize: fontSize.xs, height: controlHeight.sm },
  md: { height: controlHeight.md },
  lg: { paddingInline: space.lg, fontSize: fontSize.base, height: controlHeight.lg },

  primary: {
    backgroundColor: {
      default: colors.primary,
      ":hover": colors.primary,
    },
    color: colors.primaryFg,
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.secondaryFg,
  },
  outline: {
    borderColor: colors.border,
    backgroundColor: {
      default: "transparent",
      ":hover": {
        default: "transparent",
        "@media (hover: hover) and (pointer: fine)": colors.accent,
      },
    },
    color: colors.fg,
  },
  ghost: {
    backgroundColor: {
      default: "transparent",
      ":hover": {
        default: "transparent",
        "@media (hover: hover) and (pointer: fine)": colors.accent,
      },
    },
    color: colors.fg,
  },
  destructive: {
    backgroundColor: colors.destructive,
    color: colors.destructiveFg,
  },
});

type BaseButtonProps = ComponentProps<typeof BaseButton>;

export type ButtonProps = Omit<BaseButtonProps, "className" | "style"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: stylex.StyleXStyles;
};

export const Button = ({ variant = "primary", size = "md", style, ...props }: ButtonProps) => (
  <BaseButton {...stylex.props(styles.base, styles[size], styles[variant], style)} {...props} />
);
