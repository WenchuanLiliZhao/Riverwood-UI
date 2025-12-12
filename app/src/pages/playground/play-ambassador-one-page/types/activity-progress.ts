/**
 * Type definitions for Activity Progress Card components
 */

/**
 * Progress bar segment with value and color
 */
export interface ProgressSegment {
  value: number;        // The raw numerical value for this specific segment
  color: string;        // CSS color value (e.g., "#F44336", "#90CAF9", "red")
}

/**
 * Single progress item data
 */
export interface ProgressItem {
  label: string;                    // Label text, e.g., "R&D", "Referred", "Connecting", "Pipeline"
  totalValue: number;               // Total value for this item (sum of all segments' values)
  maxValue: number;                 // Maximum possible value (used to calculate percentage and progress bar length)
  segments: ProgressSegment[];      // Array of colored segments that make up the progress bar
}

/**
 * Overall component data structure for Activity Progress Card
 */
export interface ActivityProgressCardData {
  items: ProgressItem[];            // Array of progress items
}
