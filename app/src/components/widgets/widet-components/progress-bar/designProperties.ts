/**
 * Centralized design constants for the progress bar layout.
 */
export const ProgressBarDefaultDesignProperties = {
  height: 8,
  cornerRadius: 4,
  distributionGap: 1,
  showHeader: true,
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
};

