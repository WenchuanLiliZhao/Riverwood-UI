import React, { type ElementType } from "react";
import {
  getContentPaddingConfig,
  getMaxWidthClassName,
  type ContentDesignProps,
} from "../../basic-layout/shared";
import { responsive } from "../../../utils";

export interface BaseContentContainerProps {
  children: React.ReactNode;
  contentDesign: ContentDesignProps;
  outerClassName?: string;
  innerClassName?: string;
  as?: ElementType;
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
      ...props
    },
    ref
  ) => {
    // Use responsive utility for automatic width-based padding class selection
    const [containerRef, responsiveClassName] = responsive(
      getContentPaddingConfig()
    );

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

