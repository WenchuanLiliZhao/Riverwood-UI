/**
 * Bento Grid Component System
 * 
 * A flexible 12-column grid system inspired by Bento Box layouts.
 * Features responsive behavior based on container width (not viewport).
 */

import React from "react";
import { clsx } from "clsx";
import { bentoGridVariants, type BentoGridVariantsProps, getRowHeightStyle } from "./style";
import { BaseBentoItem, type BaseBentoItemProps } from "./_BaseBentoItem";

/* =============================================================================
 * Context for Container Width
 * ========================================================================== */

const BentoGridContext = React.createContext<number | null>(null);

/* =============================================================================
 * BentoGrid Container Component
 * ========================================================================== */

/**
 * Responsive row height configuration: [breakpoint, height]
 */
export type ResponsiveRowHeight = [number, number][];

/**
 * Props for BentoGrid container
 */
export interface BentoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BentoGridVariantsProps {
  /**
   * Responsive row height configuration
   * 
   * Array of [breakpoint, height] tuples.
   * When container width is 0 ~ breakpoint, use that height.
   * Default: [[Infinity, 180]]
   * 
   * @example
   * ```tsx
   * <BentoGrid rowHeight={[
   *   [560, 40],
   *   [800, 60],
   *   [1200, 70],
   *   [Infinity, 80]
   * ]}>
   * ```
   */
  rowHeight?: ResponsiveRowHeight;
}

/**
 * Helper function to get row height based on container width
 */
function getResponsiveRowHeight(
  containerWidth: number | null,
  rowHeight?: ResponsiveRowHeight
): number {
  // Default height
  const defaultHeight = 180;
  
  if (!rowHeight || rowHeight.length === 0) {
    return defaultHeight;
  }

  // Sort by breakpoint ascending
  const sorted = [...rowHeight].sort((a, b) => {
    const aVal = a[0] === Infinity ? Number.MAX_SAFE_INTEGER : a[0];
    const bVal = b[0] === Infinity ? Number.MAX_SAFE_INTEGER : b[0];
    return aVal - bVal;
  });

  // Find matching breakpoint
  for (const [breakpoint, height] of sorted) {
    if (containerWidth === null) {
      return sorted[0][1];
    }
    const breakpointVal = breakpoint === Infinity ? Number.MAX_SAFE_INTEGER : breakpoint;
    if (containerWidth <= breakpointVal) {
      return height;
    }
  }

  // Fallback to last config
  return sorted[sorted.length - 1][1];
}

/**
 * BentoGrid Component
 * 
 * The main container for Bento Grid layouts. This component:
 * - Creates a 12-column grid system
 * - Monitors its own width and provides it to child items via context
 * - Provides gap variants (sm, md, lg)
 * - Supports responsive row height
 * 
 * @example
 * ```tsx
 * <BentoGrid 
 *   gap="md"
 *   rowHeight={[[560, 40], [800, 60], [1200, 70], [Infinity, 80]]}
 * >
 *   <BentoItem res={[[640, 4, 2], [1024, 6, 2], [Infinity, 8, 2]]}>
 *     Item 1
 *   </BentoItem>
 * </BentoGrid>
 * ```
 */
export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  (
    {
      children,
      className,
      gap = "md",
      rowHeight,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = React.useState<number>(0);

    // Combine the forwarded ref with the container ref
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement, []);

    // Monitor container width using ResizeObserver
    React.useEffect(() => {
      const element = containerRef.current;
      if (!element) return;

      const updateWidth = () => {
        setContainerWidth(element.offsetWidth);
      };

      // Initial update
      updateWidth();

      const resizeObserver = new ResizeObserver(() => {
        updateWidth();
      });

      resizeObserver.observe(element);

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    // Build final className
    const finalClassName = clsx(
      bentoGridVariants({ gap }),
      className
    );

    // Get responsive row height
    const currentRowHeight = getResponsiveRowHeight(containerWidth, rowHeight);

    // Build inline styles including row height
    const inlineStyle: React.CSSProperties = {
      gridAutoRows: getRowHeightStyle(currentRowHeight),
      ...style,
    };

    return (
      <BentoGridContext.Provider value={containerWidth}>
        <div 
          ref={containerRef} 
          className={finalClassName}
          style={inlineStyle}
          {...props}
        >
          {children}
        </div>
      </BentoGridContext.Provider>
    );
  }
);

BentoGrid.displayName = "BentoGrid";

/* =============================================================================
 * BentoItem Component
 * ========================================================================== */

/**
 * BentoItem Component
 * 
 * A wrapper around BaseBentoItem that provides a cleaner public API.
 * Use this component to create items within a BentoGrid.
 * 
 * @example
 * ```tsx
 * // Basic item with responsive breakpoints
 * <BentoItem res={[[640, 4, 2], [1024, 6, 2], [Infinity, 8, 2]]}>
 *   <div>Content</div>
 * </BentoItem>
 * 
 * // Full-width item (spans all 12 columns)
 * <BentoItem res={[[Infinity, 12, 1]]}>
 *   <div>Full width content</div>
 * </BentoItem>
 * 
 * // Link item using polymorphism
 * <BentoItem res={[[Infinity, 6, 2]]} asChild>
 *   <a href="/path">
 *     <div>Link Content</div>
 *   </a>
 * </BentoItem>
 * ```
 */
export const BentoItem = React.forwardRef<HTMLDivElement, BaseBentoItemProps>(
  (props, ref) => {
    return <BaseBentoItem {...props} ref={ref} />;
  }
);

BentoItem.displayName = "BentoItem";

/* =============================================================================
 * Exports
 * ========================================================================== */

export type { BaseBentoItemProps as BentoItemProps };
export { BentoGridContext };

