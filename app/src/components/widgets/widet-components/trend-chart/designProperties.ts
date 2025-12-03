/**
 * Centralized design constants for the Trend Chart component.
 * These values define the default visual appearance and spacing of the chart.
 */
export const TrendChartDefaultDesignProperties = {
  xAxisLabel: {
    fontSize: 10,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.56)', // var(--color-text-secondary-trans) - SVG doesn't support CSS variables directly
  },
  yAxisLabel: {
    fontSize: 10,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.56)', // var(--color-text-secondary-trans) - SVG doesn't support CSS variables directly
    width: 40, // Explicit width for Y-axis area to minimize left padding
  },
  spacing: {
    top: 24,
    right: 24,
    bottom: 24,
    left: 24,
  },
  column: {
    width: 16, // barSize in Recharts
  },
  legend: {
    defaultIcon: 'commit', // Default icon name for legend items when icon is not provided
    defaultPosition: 'bottom' as const, // Default position: 'top' or 'bottom'
  },
};

export type TrendChartDesignProperties = {
  xAxisLabel?: {
    fontSize?: number;
    lineHeight?: number;
    color?: string;
  };
  yAxisLabel?: {
    fontSize?: number;
    lineHeight?: number;
    color?: string;
    width?: number;
  };
  spacing?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  column?: {
    width?: number;
  };
  legend?: {
    defaultIcon?: string;
    defaultPosition?: 'top' | 'bottom';
  };
};

