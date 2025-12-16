/**
 * Sort options for product list
 */
export interface SortOption {
  value: string;
  label: string;
}

export const sortOptions: SortOption[] = [
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "newArrival",
    label: "New Arrival",
  },
  {
    value: "topRated",
    label: "Top Rated",
  },
  {
    value: "priceHighToLow",
    label: "Price (High to Low)",
  },
  {
    value: "priceLowToHigh",
    label: "Price (Low to High)",
  },
];

/**
 * Get sort option label by value
 */
export const getSortOptionLabel = (value: string): string => {
  const option = sortOptions.find((opt) => opt.value === value);
  return option?.label || sortOptions[0].label;
};

