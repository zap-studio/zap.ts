import type { ComponentProps } from "react";

import * as stylex from "@stylexjs/stylex";

import { colors } from "../tokens/colors.stylex";
import { fontSize } from "../tokens/font-size.stylex";
import { fontWeight } from "../tokens/font-weight.stylex";
import { radius } from "../tokens/radius.stylex";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  root: {
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: colors.card,
    color: colors.cardFg,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: space.xl,
    gap: space.xs,
    display: "flex",
    flexDirection: "column",
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
  content: {
    padding: space.xl,
    paddingTop: 0,
  },
  footer: {
    padding: space.xl,
    alignItems: "center",
    display: "flex",
    paddingTop: 0,
  },
});

type DivProps = Omit<ComponentProps<"div">, "style"> & { style?: stylex.StyleXStyles };

const Root = ({ style, ...props }: DivProps) => (
  <div {...stylex.props(styles.root, style)} {...props} />
);
const Header = ({ style, ...props }: DivProps) => (
  <div {...stylex.props(styles.header, style)} {...props} />
);
const Title = ({ style, children, ...props }: DivProps) => (
  <h3 {...stylex.props(styles.title, style)} {...props}>
    {children}
  </h3>
);
const Description = ({ style, ...props }: DivProps) => (
  <p {...stylex.props(styles.description, style)} {...props} />
);
const Content = ({ style, ...props }: DivProps) => (
  <div {...stylex.props(styles.content, style)} {...props} />
);
const Footer = ({ style, ...props }: DivProps) => (
  <div {...stylex.props(styles.footer, style)} {...props} />
);

export const Card = { Root, Header, Title, Description, Content, Footer };
