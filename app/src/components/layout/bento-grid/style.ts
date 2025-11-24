/**
 * Bento Grid Style Configuration using CVA
 * 
 * This file defines variants for the Bento Grid items using class-variance-authority.
 */

import { cva, type VariantProps } from "class-variance-authority";
import styles from "./styles.module.scss";

/**
 * Bento Item Variants Configuration
 * 
 * Defines all possible variants for grid items including:
 * - colSpan: How many columns the item spans (1-12)
 * - rowSpan: How many rows the item spans (1-6)
 */
export const bentoItemVariants = cva(
  styles.item, // Base class
  {
    variants: {
      // Column span variants (1-12 columns)
      colSpan: {
        1: styles["col-span-1"],
        2: styles["col-span-2"],
        3: styles["col-span-3"],
        4: styles["col-span-4"],
        5: styles["col-span-5"],
        6: styles["col-span-6"],
        7: styles["col-span-7"],
        8: styles["col-span-8"],
        9: styles["col-span-9"],
        10: styles["col-span-10"],
        11: styles["col-span-11"],
        12: styles["col-span-12"],
        full: styles["col-span-full"],
      },
      
      // Row span variants (1-6 rows)
      rowSpan: {
        1: styles["row-span-1"],
        2: styles["row-span-2"],
        3: styles["row-span-3"],
        4: styles["row-span-4"],
        5: styles["row-span-5"],
        6: styles["row-span-6"],
      },
    },
    
    // Default values
    defaultVariants: {
      colSpan: 1,
      rowSpan: 1,
    },
  }
);

/**
 * Bento Grid Variants Configuration
 */
export const bentoGridVariants = cva(
  styles.grid, // Base class
  {
    variants: {
      // Gap size variants
      gap: {
        sm: styles["gap-sm"],
        md: styles["gap-md"],
        lg: styles["gap-lg"],
      },
    },
    defaultVariants: {
      gap: "md",
    },
  }
);

/**
 * Helper function to generate row height CSS value
 * 
 * @param rowHeight - Minimum row height in pixels or CSS value
 * @returns CSS value for grid-auto-rows
 */
export function getRowHeightStyle(rowHeight?: number | string): string {
  if (!rowHeight) return "";
  
  if (typeof rowHeight === "number") {
    return `minmax(${rowHeight}px, auto)`;
  }
  
  // If it's already a CSS value like "200px" or "minmax(200px, auto)"
  return rowHeight;
}

/**
 * Type export for BentoItem props
 */
export type BentoItemVariantsProps = VariantProps<typeof bentoItemVariants>;

/**
 * Type export for BentoGrid props
 */
export type BentoGridVariantsProps = VariantProps<typeof bentoGridVariants>;

