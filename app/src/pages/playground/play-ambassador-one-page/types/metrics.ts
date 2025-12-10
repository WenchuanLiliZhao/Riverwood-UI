/**
 * Type definitions for Engagement Overview metrics data
 */

/**
 * Progress bar segment configuration with detailed breakdown
 */
export interface ProgressBarSegment {
  label: string; // e.g., "SSC Requests"
  color: string; // e.g., "#ef4444"
  value: number; // e.g., 110
  total: number; // e.g., 660
  unit: string; // e.g., "days"
}

/**
 * Metric data structure for a specific category (serviceDays or ambassadorsEngaged)
 */
export interface MetricData {
  percentage: number; // 0-100, e.g., 44
  current: number; // e.g., 288
  total: number; // e.g., 660
  unit: string; // e.g., "days" or "pax"
  trendData: ProgressBarSegment[]; // Data for the progress bars
  description: string; // Explanatory text
}

/**
 * Represents metric data for a specific month
 */
export interface MonthMetrics {
  month: string; // e.g., "APR", "MAY"
  serviceDays: MetricData;
  ambassadorsEngaged: MetricData;
}

/**
 * Complete metrics dataset indexed by month
 */
export type MetricsDataByMonth = Record<string, MonthMetrics>;
