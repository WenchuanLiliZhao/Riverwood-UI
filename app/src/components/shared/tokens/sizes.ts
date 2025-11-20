/**
 * Unified size names for components across the design system.
 * This ensures consistency in size naming across all components.
 */
export const COMPONENT_SIZES = {
  small: "small",
  medium: "medium",
  large: "large",
  xlarge: "xlarge",
} as const;

export type ComponentSize = typeof COMPONENT_SIZES[keyof typeof COMPONENT_SIZES];

