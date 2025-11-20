import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Button.module.scss";

export const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      "fill-inverse": styles["fill-inverse"],
      ghost: styles.ghost,
      fill: styles.fill,
      outlined: styles.outlined,
      printish: styles.printish,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
    },
  },
  defaultVariants: {
    variant: "fill",
    size: "medium",
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
