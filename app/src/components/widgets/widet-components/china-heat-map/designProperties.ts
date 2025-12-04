/**
 * Centralized design constants for the China Heat Map component.
 */
export const ChinaHeatMapDefaultDesignProperties = {
  width: 959,
  height: 672,
  backgroundColor: "#FAFAFA",
  landColor: "#FFFFFF",
  borderColor: "#CCCCCC",
  borderWidth: 1,
  radiusFactor: 30000,
  circleColor: "#FF4646",
  circleOpacity: 0.2,
  circleBorderOpacity: 0.5,
  dotRadius: 1,
  hoverLineColor: "#FF4646",
  hoverLineOpacity: 0.56,
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
  circleBorderOpacity?: number;
  dotRadius?: number;
  hoverLineColor?: string;
  hoverLineOpacity?: number;
};

