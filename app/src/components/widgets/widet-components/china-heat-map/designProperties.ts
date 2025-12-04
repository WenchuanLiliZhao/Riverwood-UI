/**
 * Centralized design constants for the China Heat Map component.
 * 
 * Note: width and height are optional. If not provided, the component
 * will use 100% width/height for responsive sizing.
 */
export const ChinaHeatMapDefaultDesignProperties = {
  // width and height are undefined by default for responsive behavior
  // Set them explicitly if you need fixed dimensions
  backgroundColor: "var(--color-bg-primary)",
  landColor: "var(--color-bg-darken)",
  borderColor: "var(--color-bg-primary)",
  borderWidth: 1,
  radiusFactor: 30000,
  circleColor: "#FF4646",
  circleOpacity: 0.16,
  dotRadius: 1.5,
};

export type ChinaHeatMapDesignProperties = {
  width?: number;
  height?: number;
  backgroundColor?: string;
  landColor?: string;
  borderColor?: string;
  borderWidth?: number;
  radiusFactor?: number;
  circleColor?: string;
  circleOpacity?: number;
  dotRadius?: number;
};

