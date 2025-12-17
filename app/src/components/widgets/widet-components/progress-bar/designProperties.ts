/**
 * Centralized design constants for the progress bar layout.
 */
export const ProgressBarDefaultDesignProperties = {
  height: 8,
  cornerRadius: 4,
  distributionGap: 1,
  showHeader: true,
  showLoadingAnimation: false,
  showWidthAnimation: false,
  animationDuration: 1.5, // in seconds
};

export type ProgressBarDesignProperties = {
  height?: number;
  cornerRadius?: number;
  distributionGap?: number;
  /**
   * Whether to show the header (label, value, caption).
   * Default: true
   */
  showHeader?: boolean;
  /**
   * Whether to show the loading animation (shimmer effect).
   * Default: true
   */
  showLoadingAnimation?: boolean;
  /**
   * Whether to show the width animation (progress bar fills from 0 to target width).
   * Default: true
   */
  showWidthAnimation?: boolean;
  /**
   * Animation duration in seconds for both shimmer and width animations.
   * Default: 1.5
   */
  animationDuration?: number;
};

