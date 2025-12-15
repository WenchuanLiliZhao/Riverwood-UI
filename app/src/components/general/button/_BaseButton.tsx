import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./Button.module.scss";
import { MaterialIcon } from "../../shared/material-icon";
import { HoverBox } from "../../shared/hover-box";
import {
  type ComponentSize,
  type ComponentSemantic,
  type ComponentVariant,
  COMPONENT_VARIANTS,
  COMPONENT_SIZES,
  COMPONENT_SEMANTICS,
} from "../../shared/tokens";

export interface BaseButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'content'> {
  content: {
    icon?: string;
    text?: string;
    decoIcon?: string;
  };
  design?: {
    variant?: ComponentVariant;
    semantic?: ComponentSemantic;
    size?: ComponentSize;
  };
  asChild?: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  hoverable?: boolean;
}

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      asChild,
      className,
      content,
      design = {
        variant: COMPONENT_VARIANTS.fill,
        size: COMPONENT_SIZES.medium,
        semantic: COMPONENT_SEMANTICS.primary,
      },
      disabled,
      children,
      hoverable = true,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";

    // Manual class composition instead of CVA
    const variant = design.variant || COMPONENT_VARIANTS.fill;
    const size = design.size || COMPONENT_SIZES.medium;
    const semantic = design.semantic || COMPONENT_SEMANTICS.primary;

    const designClasses = [
      styles.base,
      styles[variant],
      styles[size],
      styles[semantic],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component
        className={designClasses}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <div className={styles["content"]}>
          {content.icon && (
            <MaterialIcon className={styles["icon"]} icon={content.icon} />
          )}
          {content.text && (
            <span className={styles["text"]}>{content.text}</span>
          )}
          {content.decoIcon && (
            <MaterialIcon
              className={styles["deco-icon"]}
              icon={content.decoIcon}
            />
          )}
        </div>
        {children}
        {disabled ? null : hoverable ? <HoverBox isInverse={variant === "fill-inverse"} /> : null}
      </Component>
    );
  }
);

BaseButton.displayName = "BaseButton";
