import type { ComponentProps } from "react";

import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { radius } from "../tokens/radius.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  root: {
    overflow: "hidden",
    position: "relative",
  },
  viewport: {
    overscrollBehavior: "contain",
    height: "100%",
    width: "100%",
  },
  scrollbar: {
    margin: 2,
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    opacity: {
      "[data-hovering]": 1,
      "[data-scrolling]": 1,
      default: 0,
    },
    transitionDuration: "150ms",
    transitionProperty: "opacity",
    height: {
      '[data-orientation="horizontal"]': space.sm,
      default: "auto",
    },
    width: {
      '[data-orientation="horizontal"]': "auto",
      default: space.sm,
    },
  },
  thumb: {
    borderRadius: radius.full,
    backgroundColor: colors.mutedFg,
    height: {
      '[data-orientation="horizontal"]': "100%",
      default: "auto",
    },
    width: {
      '[data-orientation="horizontal"]': "auto",
      default: "100%",
    },
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type RootProps = Omit<ComponentProps<typeof BaseScrollArea.Root>, "className" | "style"> &
  StyleProp;
const Root = ({ style, ...props }: RootProps) => (
  <BaseScrollArea.Root {...stylex.props(styles.root, style)} {...props} />
);

type ViewportProps = Omit<ComponentProps<typeof BaseScrollArea.Viewport>, "className" | "style"> &
  StyleProp;
const Viewport = ({ style, ...props }: ViewportProps) => (
  <BaseScrollArea.Viewport {...stylex.props(styles.viewport, style)} {...props} />
);

type ScrollbarProps = Omit<ComponentProps<typeof BaseScrollArea.Scrollbar>, "className" | "style"> &
  StyleProp;
const Scrollbar = ({ style, ...props }: ScrollbarProps) => (
  <BaseScrollArea.Scrollbar {...stylex.props(styles.scrollbar, style)} {...props} />
);

type ThumbProps = Omit<ComponentProps<typeof BaseScrollArea.Thumb>, "className" | "style"> &
  StyleProp;
const Thumb = ({ style, ...props }: ThumbProps) => (
  <BaseScrollArea.Thumb {...stylex.props(styles.thumb, style)} {...props} />
);

export const ScrollArea = {
  Root,
  Viewport,
  Content: BaseScrollArea.Content,
  Scrollbar,
  Thumb,
  Corner: BaseScrollArea.Corner,
};
