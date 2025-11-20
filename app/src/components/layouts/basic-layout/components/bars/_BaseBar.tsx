import React, { type ElementType } from "react";
import type { BarElements } from "../../shared";
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
    const itemGroupStyle = {
      flexDirection: direction,
    } as React.CSSProperties;

    return (
      <Component ref={ref as React.RefObject<HTMLElement>} className={className} {...props}>
        <div
          className={`${sharedStyles["bar-item-group"]} ${sharedStyles["first"]} ${itemGroupClassName || ""}`}
          style={itemGroupStyle}
        >
          {elements.first.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div
          className={`${sharedStyles["bar-item-group"]} ${sharedStyles["center"]} ${itemGroupClassName || ""}`}
          style={itemGroupStyle}
        >
          {elements.center.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div
          className={`${sharedStyles["bar-item-group"]} ${sharedStyles["last"]} ${itemGroupClassName || ""}`}
          style={itemGroupStyle}
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

