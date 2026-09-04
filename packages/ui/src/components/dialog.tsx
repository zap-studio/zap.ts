import type { ComponentProps } from "react";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";
import { shadow } from "../tokens/shadow.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  backdrop: {
    inset: 0,
    backgroundColor: colors.overlay,
    opacity: {
      "[data-ending-style]": 0,
      "[data-starting-style]": 0,
      default: 1,
    },
    position: "fixed",
    transitionDuration: "150ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "ease-out",
  },
  popup: {
    padding: space.xl,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: "solid",
    borderWidth: 1,
    gap: space.md,
    backgroundColor: colors.card,
    boxShadow: shadow.lg,
    color: colors.cardFg,
    display: "flex",
    flexDirection: "column",
    opacity: {
      "[data-ending-style]": 0,
      "[data-starting-style]": 0,
      default: 1,
    },
    position: "fixed",
    transform: {
      "[data-ending-style]": "translate(-50%, -50%) scale(0.96)",
      "[data-starting-style]": "translate(-50%, -50%) scale(0.96)",
      default: "translate(-50%, -50%) scale(1)",
    },
    transitionDuration: {
      default: "150ms, 150ms",
      "@media (prefers-reduced-motion: reduce)": "150ms, 0.01ms",
    },
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "ease-out",
    left: "50%",
    maxHeight: "calc(100% - 32px)",
    maxWidth: 480,
    overflowX: "hidden",
    overflowY: "auto",
    top: "50%",
    width: "calc(100% - 32px)",
  },
  title: {
    margin: 0,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  description: {
    margin: 0,
    color: colors.mutedFg,
    fontSize: fontSize.sm,
  },
});

type StyleProp = { style?: stylex.StyleXStyles };

type BackdropProps = Omit<ComponentProps<typeof BaseDialog.Backdrop>, "className" | "style"> &
  StyleProp;
const Backdrop = ({ style, ...props }: BackdropProps) => (
  <BaseDialog.Backdrop {...stylex.props(styles.backdrop, style)} {...props} />
);

type PopupProps = Omit<ComponentProps<typeof BaseDialog.Popup>, "className" | "style"> & StyleProp;
const Popup = ({ style, ...props }: PopupProps) => (
  <BaseDialog.Popup {...stylex.props(styles.popup, style)} {...props} />
);

type TitleProps = Omit<ComponentProps<typeof BaseDialog.Title>, "className" | "style"> & StyleProp;
const Title = ({ style, ...props }: TitleProps) => (
  <BaseDialog.Title {...stylex.props(styles.title, style)} {...props} />
);

type DescriptionProps = Omit<ComponentProps<typeof BaseDialog.Description>, "className" | "style"> &
  StyleProp;
const Description = ({ style, ...props }: DescriptionProps) => (
  <BaseDialog.Description {...stylex.props(styles.description, style)} {...props} />
);

export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Portal: BaseDialog.Portal,
  Backdrop,
  Popup,
  Title,
  Description,
  Close: BaseDialog.Close,
  Viewport: BaseDialog.Viewport,
};
