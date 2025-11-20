import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { buttonVariants } from "./style";
import styles from "./Button.module.scss";
import { MaterialIcon } from "../../shared/material-icon";
import { HoverBox } from "../../shared/hover-box";

export interface BaseButtonProps {
  content: {
    icon?: string;
    text?: string;
    decoIcon?: string;
  };
  design?: {
    variant: "fill-inverse" | "ghost" | "fill" | "outlined" | "printish";
    size: "small" | "medium";
  };
  asChild?: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      asChild,
      className,
      content,
      design,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";

    const variantClass = buttonVariants({
      variant: design?.variant,
      size: design?.size,
      className,
    });

    return (
      <Component
        className={variantClass}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <div className={styles.content}>
          {content.icon && (
            <span className={styles.icon}>
              <MaterialIcon icon={content.icon} />
            </span>
          )}
          {content.text && <span className={styles.text}>{content.text}</span>}
          {content.decoIcon && (
            <span className={styles.decoIcon}>
              <MaterialIcon icon={content.decoIcon} />
            </span>
          )}
        </div>
        {children}
        <HoverBox isInverse={design?.variant === "fill-inverse"} />
      </Component>
    );
  }
);

BaseButton.displayName = "BaseButton";
