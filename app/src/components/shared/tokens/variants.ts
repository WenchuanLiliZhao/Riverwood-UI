/**
 * Unified variant names for components across the design system.
 * This ensures consistency in visual variants (fill, outline, etc.) across components.
 */
export const COMPONENT_VARIANTS = {
  fill: "fill",
  outlined: "outlined",
  ghost: "ghost",
  "fill-inverse": "fill-inverse",
} as const;

export type ComponentVariant = typeof COMPONENT_VARIANTS[keyof typeof COMPONENT_VARIANTS];