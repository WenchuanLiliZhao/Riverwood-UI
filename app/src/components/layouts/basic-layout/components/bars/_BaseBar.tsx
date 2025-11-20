import React, { type ElementType } from "react";
import { barItemGroupVariants, type BarItemGroupVariantProps } from "./_barItemGroup.style";
import type { BarElements } from "../../shared";
import sharedStyles from "./_barItemGroup.module.scss";
import { clsx } from "clsx";

export interface BaseBarProps extends BarItemGroupVariantProps {
  elements: BarElements;
  className?: string;
  itemGroupClassName?: string;
  as?: ElementType;
}

/**
 * Core component for bar components (AppBar, NavBar)
 * Handles the shared structure and logic for rendering bar item groups
 */
export const BaseBar = React.forwardRef<HTMLElement, BaseBarProps>(
  (
    {
      elements,
      className,
      itemGroupClassName,
      direction = "row",
      as: Component = "nav",
      ...props
    },
    ref
  ) => {
    // Use CVA to generate class names for item groups
    const itemGroupBaseClass = barItemGroupVariants({ direction });

    return (
      <Component ref={ref as React.RefObject<HTMLElement>} className={className} {...props}>
        <div
          className={clsx(
            itemGroupBaseClass,
            sharedStyles["first"],
            itemGroupClassName
          )}
        >
          {elements.first.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div
          className={clsx(
            itemGroupBaseClass,
            sharedStyles["center"],
            itemGroupClassName
          )}
        >
          {elements.center.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div
          className={clsx(
            itemGroupBaseClass,
            sharedStyles["last"],
            itemGroupClassName
          )}
        >
          {elements.last.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
      </Component>
    );
  }
);

BaseBar.displayName = "BaseBar";

