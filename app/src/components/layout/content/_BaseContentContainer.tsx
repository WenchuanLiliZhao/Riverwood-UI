import React, { type ElementType, useRef } from "react";
import {
  getContentPaddingConfig,
  getMaxWidthClassName,
  type ContentDesignProps,
} from "../shared";
import { responsive } from "../../utils";

export interface BaseContentContainerProps {
  children: React.ReactNode;
  contentDesign: ContentDesignProps;
  outerClassName?: string;
  innerClassName?: string;
  as?: ElementType;
  enablePadding?: boolean;
}

/**
 * Core component for content containers with responsive padding and max-width
 * This component handles the shared logic and structure for Content and Footer
 */
export const BaseContentContainer = React.forwardRef<
  HTMLElement,
  BaseContentContainerProps
>(
  (
    {
      children,
      contentDesign,
      outerClassName,
      innerClassName,
      as: Component = "div",
      enablePadding = true,
      ...props
    },
    ref
  ) => {
    // Use responsive utility for automatic width-based padding class selection
    const defaultRef = useRef<HTMLDivElement>(null);
    const [containerRef, responsiveClassName] = enablePadding
      ? responsive(getContentPaddingConfig())
      : [defaultRef, ""];

    // Get max-width class based on spacing.widthMode
    const maxWidthClassName = getMaxWidthClassName(contentDesign);

    return (
      <Component
        ref={ref as React.RefObject<HTMLElement>}
        className={outerClassName}
        {...props}
      >
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className={`${innerClassName || ""} ${maxWidthClassName} ${responsiveClassName}`.trim()}
        >
          {children}
        </div>
      </Component>
    );
  }
);

BaseContentContainer.displayName = "BaseContentContainer";

