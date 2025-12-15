/**
 * Color semantics for change indicators
 * Colors are calculated on the frontend based on direction
 */
export const COLOR_SEMANTICS = {
  success: "#66BD98", // Green for upward trend/increase
  failure: "#FF4646", // Red for downward trend/decrease
} as const;

export type ColorDirection = keyof typeof COLOR_SEMANTICS;

/**
 * Get color based on direction
 * @param direction - "up" for increase, "down" for decrease
 * @returns Color hex code
 */
export const getChangeColor = (direction: ColorDirection): string => {
  return COLOR_SEMANTICS[direction];
};

