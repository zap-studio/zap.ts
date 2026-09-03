import type { ComponentProps } from "react";

import { Toast as BaseToast } from "@base-ui/react/toast";
import * as stylex from "@stylexjs/stylex";
import { X } from "lucide-react";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";
import { shadow } from "../tokens/shadow.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  viewport: {
    gap: space.sm,
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    zIndex: 100,
    bottom: space.xl,
    right: space.xl,
  },
  root: {
    padding: space.md,
    borderColor: {
      '[data-type="error"]': colors.destructive,
      '[data-type="success"]': colors.primary,
      default: colors.border,
    },
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: 1,
    gap: 2,
    backgroundColor: colors.card,
    boxShadow: shadow.md,
    color: colors.cardFg,
    display: "flex",
    flexDirection: "column",
    opacity: {
      "[data-ending-style]": 0,
      "[data-starting-style]": 0,
      default: 1,
    },
    position: "relative",
    transform: {
      "[data-ending-style]": "translateX(100%)",
      "[data-starting-style]": "translateX(100%)",
      default: "translateX(0)",
    },
    transitionDuration: "200ms",
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "ease-out",
    borderLeftWidth: {
      '[data-type="error"]': 3,
      '[data-type="success"]': 3,
      default: 1,
    },
    width: 320,
  },
  title: {
    margin: 0,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  description: {
    margin: 0,
    color: colors.mutedFg,
    fontSize: fontSize.xs,
  },
  close: {
    borderRadius: radius.sm,
    borderStyle: "none",
    alignItems: "center",
    appearance: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": colors.accent,
    },
    color: colors.mutedFg,
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    position: "absolute",
    height: 20,
    right: space.xs,
    top: space.xs,
    width: 20,
  },
  action: {
    alignSelf: "flex-start",
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    marginTop: space.xs,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type ViewportProps = Omit<ComponentProps<typeof BaseToast.Viewport>, "className" | "style"> &
  StyleProp;
const Viewport = ({ style, ...props }: ViewportProps) => (
  <BaseToast.Viewport {...stylex.props(styles.viewport, style)} {...props} />
);

type RootProps = Omit<ComponentProps<typeof BaseToast.Root>, "className" | "style"> & StyleProp;
const Root = ({ style, ...props }: RootProps) => (
  <BaseToast.Root {...stylex.props(styles.root, style)} {...props} />
);

type TitleProps = Omit<ComponentProps<typeof BaseToast.Title>, "className" | "style"> & StyleProp;
const Title = ({ style, ...props }: TitleProps) => (
  <BaseToast.Title {...stylex.props(styles.title, style)} {...props} />
);

type DescriptionProps = Omit<ComponentProps<typeof BaseToast.Description>, "className" | "style"> &
  StyleProp;
const Description = ({ style, ...props }: DescriptionProps) => (
  <BaseToast.Description {...stylex.props(styles.description, style)} {...props} />
);

type CloseProps = Omit<ComponentProps<typeof BaseToast.Close>, "className" | "style"> & StyleProp;
const Close = ({ style, children, ...props }: CloseProps) => (
  <BaseToast.Close {...stylex.props(styles.close, style)} {...props}>
    {children ?? <X size={12} />}
  </BaseToast.Close>
);

type ActionProps = Omit<ComponentProps<typeof BaseToast.Action>, "className" | "style"> & StyleProp;
const Action = ({ style, ...props }: ActionProps) => (
  <BaseToast.Action {...stylex.props(styles.action, style)} {...props} />
);

export const Toast = {
  Provider: BaseToast.Provider,
  Portal: BaseToast.Portal,
  Positioner: BaseToast.Positioner,
  Viewport,
  Root,
  Content: BaseToast.Content,
  Title,
  Description,
  Close,
  Action,
};

export const useToastManager = BaseToast.useToastManager;
export const createToastManager = BaseToast.createToastManager;
