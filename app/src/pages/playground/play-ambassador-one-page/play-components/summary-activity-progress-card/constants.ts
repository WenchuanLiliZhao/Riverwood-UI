/**
 * Summary Activity Progress Card - Design Constants
 * 
 * This file contains all adjustable design parameters for the funnel view.
 * Modify these values to customize the appearance of the funnel chart.
 */

// ============================================================================
// Funnel Dimensions
// ============================================================================

/**
 * Width reduction step for each funnel level (in percentage points)
 * - Level 0 (R&D): 100%
 * - Level 1 (Referred): 100% - FUNNEL_WIDTH_STEP
 * - Level 2 (Connecting): 100% - 2 * FUNNEL_WIDTH_STEP
 * - Level 3 (Pipeline): 100% - 3 * FUNNEL_WIDTH_STEP
 * @default 15
 */
export const FUNNEL_WIDTH_STEP = 24;

/**
 * Height of each funnel bar (in pixels)
 * @default 48
 */
export const FUNNEL_BAR_HEIGHT = 48;

/**
 * Height of the connector (trapezoid) between levels (in pixels)
 * @default 48
 */
export const FUNNEL_CONNECTOR_HEIGHT = 48;

// ============================================================================
// Border Radius
// ============================================================================

/**
 * Border radius for funnel bars (in pixels)
 * Applied to all four corners of each level
 * @default 0
 */
export const FUNNEL_BAR_BORDER_RADIUS = 0;

// ============================================================================
// Segment Width Ratios
// ============================================================================

/**
 * Width ratio for Level 0 (R&D) segments
 * - First segment (R&D): LEVEL_0_INTERNAL_RATIO
 * - Second segment (Referred): 100 - LEVEL_0_INTERNAL_RATIO
 * @default 60 (60% each)
 */
export const LEVEL_0_INTERNAL_RATIO = 60;

/**
 * Width ratio for Level 1 (Referred) segments
 * - First segment (Referred from R&D): LEVEL_1_INTERNAL_RATIO
 * - Second segment (Outside): 100 - LEVEL_1_INTERNAL_RATIO
 * @default 60 (60% each)
 */
export const LEVEL_1_INTERNAL_RATIO = 60;

// ============================================================================
// Trapezoid Connector
// ============================================================================

/**
 * Opacity of the trapezoid connector fill
 * @default 0.08
 */
export const TRAPEZOID_OPACITY = 0.08;

/**
 * Trapezoid gradient configuration (top to bottom)
 * Set to null to use solid color instead
 */
export const TRAPEZOID_GRADIENT = {
  /** Start color (top) */
  startColor: "black",
  /** Start color opacity */
  startOpacity: 0.12,
  /** End color (bottom) */
  endColor: "black",
  /** End color opacity */
  endOpacity: 0,
};

/**
 * Fill color of the trapezoid connector (used only if TRAPEZOID_GRADIENT is null)
 * @default "black"
 * @deprecated Use TRAPEZOID_GRADIENT instead for gradient effect
 */
export const TRAPEZOID_FILL_COLOR = "black";

/**
 * Horizontal inset for trapezoid endpoints (in percentage points)
 * This creates a gap between the trapezoid edges and the funnel bar edges
 * Higher values = narrower trapezoid
 * @default 0
 */
export const TRAPEZOID_HORIZONTAL_INSET = 0;

// ============================================================================
// Label Styling
// ============================================================================

/**
 * Minimum width of the left-side label (in pixels)
 * @default 80
 */
export const LABEL_MIN_WIDTH = 80;

/**
 * Gap between label and funnel bar (in pixels)
 * @default 16
 */
export const LABEL_GAP = 16;

/**
 * Font size of the left-side label (in pixels)
 * @default 14
 */
export const LABEL_FONT_SIZE = 14;

/**
 * Font weight of the left-side label
 * @default 600
 */
export const LABEL_FONT_WEIGHT = 600;

// ============================================================================
// Segment Label (Inside Funnel Bars)
// ============================================================================

/**
 * Font size of text inside funnel segments (in pixels)
 * @default 13
 */
export const SEGMENT_LABEL_FONT_SIZE = 13;

/**
 * Font weight of text inside funnel segments
 * @default 600
 */
export const SEGMENT_LABEL_FONT_WEIGHT = 600;

// ============================================================================
// Connector Percentage Label
// ============================================================================

/**
 * Font size of the percentage label in trapezoid connectors (in pixels)
 * @default 14
 */
export const CONNECTOR_LABEL_FONT_SIZE = 14;

/**
 * Font weight of the percentage label in trapezoid connectors
 * @default 600
 */
export const CONNECTOR_LABEL_FONT_WEIGHT = 600;
