/**
 * Filter options for Hero Products section
 */

export interface FilterOption {
  value: string;
  label: string;
}

/**
 * Scope filter options for geographical filtering
 */
export const scopeFilterOptions: FilterOption[] = [
  {
    value: "Same Store",
    label: "Same Store",
  },
  {
    value: "Same Region",
    label: "Same Region",
  },
  {
    value: "National",
    label: "National",
  },
];

/**
 * Relationship filter options for product relationship types
 */
export const relationshipFilterOptions: FilterOption[] = [
  {
    value: "Co-purchase",
    label: "Co-purchase",
  },
  {
    value: "Co-try-on",
    label: "Co-try-on",
  },
];

/**
 * Get default scope filter value
 */
export const getDefaultScopeFilter = (): string => {
  return scopeFilterOptions[0].value;
};

/**
 * Get default relationship filter value
 */
export const getDefaultRelationshipFilter = (): string => {
  return relationshipFilterOptions[0].value;
};

