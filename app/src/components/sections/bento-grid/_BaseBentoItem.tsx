/**
 * Base Bento Item Component
 * 
 * This is the core component for Bento Grid items.
 * It handles the structure and styling for individual grid items.
 */

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { bentoItemVariants } from "./style";
import { BentoGridContext } from "./index";

/**
 * Responsive configuration tuple: [breakpoint, colSpan, rowSpan]
 * When parent view (BentoGrid) width is 0 ~ breakpoint, use colSpan and rowSpan
 */
export type ResponsiveConfig = [number, number, number][];

/**
 * Props for BaseBentoItem
 */
export interface BaseBentoItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Responsive configuration array.
   * Each tuple is [breakpoint, colSpan, rowSpan].
   * When parent view (BentoGrid) width is 0 ~ breakpoint, use colSpan and rowSpan.
   * 
   * @example
   * ```tsx
   * <BentoItem res={[
   *   [640, 4, 2],   // When width 0-640px: colSpan=4, rowSpan=2
   *   [1024, 6, 2], // When width 641-1024px: colSpan=6, rowSpan=2
   *   [Infinity, 8, 2] // When width 1025px+: colSpan=8, rowSpan=2
   * ]}>
   * ```
   */
  res: ResponsiveConfig;

  /**
   * If true, the component will render its child as the root element
   * using Radix UI Slot for polymorphism.
   */
  asChild?: boolean;
}

/**
 * Valid colSpan values
 */
type ValidColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";

/**
 * Valid rowSpan values
 */
type ValidRowSpan = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Helper function to validate and clamp colSpan value
 */
function validateColSpan(value: number | "full"): ValidColSpan {
  if (value === "full") return "full";
  if (value >= 1 && value <= 12) return value as ValidColSpan;
  // Clamp to valid range
  if (value < 1) return 1;
  return 12;
}

/**
 * Helper function to validate and clamp rowSpan value
 */
function validateRowSpan(value: number): ValidRowSpan {
  if (value >= 1 && value <= 6) return value as ValidRowSpan;
  // Clamp to valid range
  if (value < 1) return 1;
  return 6;
}

/**
 * Helper function to get colSpan and rowSpan based on container width and res config
 */
function getResponsiveSpans(
  containerWidth: number | null,
  res: ResponsiveConfig
): { colSpan: ValidColSpan; rowSpan: ValidRowSpan } {
  if (res.length === 0) {
    // Default fallback
    return { colSpan: 1, rowSpan: 1 };
  }

  // Sort by breakpoint ascending
  const sorted = [...res].sort((a, b) => {
    const aVal = a[0] === Infinity ? Number.MAX_SAFE_INTEGER : a[0];
    const bVal = b[0] === Infinity ? Number.MAX_SAFE_INTEGER : b[0];
    return aVal - bVal;
  });

  // Find the first breakpoint that container width is less than or equal to
  for (const [breakpoint, colSpan, rowSpan] of sorted) {
    if (containerWidth === null) {
      // If width is not available yet, use the first config
      return { 
        colSpan: validateColSpan(colSpan), 
        rowSpan: validateRowSpan(rowSpan) 
      };
    }
    const breakpointVal = breakpoint === Infinity ? Number.MAX_SAFE_INTEGER : breakpoint;
    if (containerWidth <= breakpointVal) {
      return { 
        colSpan: validateColSpan(colSpan), 
        rowSpan: validateRowSpan(rowSpan) 
      };
    }
  }

  // Fallback to last config
  const last = sorted[sorted.length - 1];
  return { 
    colSpan: validateColSpan(last[1]), 
    rowSpan: validateRowSpan(last[2]) 
  };
}

/**
 * BaseBentoItem Component
 * 
 * This component is the foundation for all Bento Grid items.
 * It provides:
 * - Flexible column spanning (1-12 columns)
 * - Flexible row spanning (1-6 rows)
 * - Responsive behavior via res prop
 * - Polymorphic rendering via asChild
 * - Full TypeScript type safety
 * 
 * @example
 * ```tsx
 * // Regular div item with responsive breakpoints
 * <BaseBentoItem res={[[640, 4, 2], [1024, 6, 2], [Infinity, 8, 2]]}>
 *   Content
 * </BaseBentoItem>
 * 
 * // Link item using asChild
 * <BaseBentoItem res={[[Infinity, 6, 1]]} asChild>
 *   <a href="/path">Link Content</a>
 * </BaseBentoItem>
 * ```
 */
export const BaseBentoItem = React.forwardRef<
  HTMLDivElement,
  BaseBentoItemProps
>(({ className, res, asChild, ...props }, ref) => {
  const containerWidth = React.useContext(BentoGridContext);

  // Get responsive spans from res config
  const { colSpan, rowSpan } = getResponsiveSpans(containerWidth, res);

  // Use Slot if asChild is true, otherwise use div
  const Comp = asChild ? Slot : "div";

  // Combine CVA-generated classes with custom className
  const finalClassName = clsx(
    bentoItemVariants({ colSpan, rowSpan }),
    className
  );

  return <Comp className={finalClassName} ref={ref} {...props} />;
});

BaseBentoItem.displayName = "BaseBentoItem";

