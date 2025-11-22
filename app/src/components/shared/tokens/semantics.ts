/**
 * Unified semantic names for components across the design system.
 * This ensures consistency in semantic naming across all components.
 */
export const COMPONENT_SEMANTICS = {
  brand: "brand",
  primary: "primary",
  secondary: "secondary",
  negative: "negative",
  disabled: "disabled"
} as const;

export type ComponentSemantic = typeof COMPONENT_SEMANTICS[keyof typeof COMPONENT_SEMANTICS];

