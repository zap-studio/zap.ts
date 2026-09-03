import type { ComponentProps } from "react";

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";

const styles = stylex.create({
  root: {
    borderRadius: radius.full,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: colors.secondary,
    color: colors.secondaryFg,
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center",
    height: 32,
    width: 32,
  },
  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
  },
  fallback: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type RootProps = Omit<ComponentProps<typeof BaseAvatar.Root>, "className" | "style"> & StyleProp;
const Root = ({ style, ...props }: RootProps) => (
  <BaseAvatar.Root {...stylex.props(styles.root, style)} {...props} />
);

type ImageProps = Omit<ComponentProps<typeof BaseAvatar.Image>, "className" | "style"> & StyleProp;
const Image = ({ style, ...props }: ImageProps) => (
  <BaseAvatar.Image {...stylex.props(styles.image, style)} {...props} />
);

type FallbackProps = Omit<ComponentProps<typeof BaseAvatar.Fallback>, "className" | "style"> &
  StyleProp;
const Fallback = ({ style, ...props }: FallbackProps) => (
  <BaseAvatar.Fallback {...stylex.props(styles.fallback, style)} {...props} />
);

export const Avatar = { Root, Image, Fallback };
