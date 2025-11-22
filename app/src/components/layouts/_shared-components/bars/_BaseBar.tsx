import React, { type ElementType } from "react";
import type { BarElements } from "../../basic-layout/shared";
import sharedStyles from "./_barItemGroup.module.scss";

export interface BaseBarProps {
  elements: BarElements;
  className?: string;
  itemGroupClassName?: string;
  direction?: "row" | "column";
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
    const directionClass = sharedStyles[direction];

    return (
      <Component ref={ref as React.RefObject<HTMLElement>} className={className} {...props}>
        {elements.first && elements.first.length > 0 && (
          // here
          <div
            className={`${sharedStyles["bar-item-group"]} ${sharedStyles["first"]} ${directionClass} ${itemGroupClassName || ""}`}
          >
            {elements.first.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
        )}
        {elements.center && elements.center.length > 0 ? (
          <div
            className={`${sharedStyles["bar-item-group"]} ${sharedStyles["center"]} ${directionClass} ${itemGroupClassName || ""}`}
          >
            {elements.center.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
        ) : (<div></div>)}
        {elements.last && elements.last.length > 0 && (
          <div
            className={`${sharedStyles["bar-item-group"]} ${sharedStyles["last"]} ${directionClass} ${itemGroupClassName || ""}`}
          >
            {elements.last.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
        )}
      </Component>
    );
  }
);

BaseBar.displayName = "BaseBar";

