/**
 * Centralized design constants for the KPI ring chart layout.
 */
export const KpiRingChartDefaultDesignProperties = {
  outerRadius: 80,
  ringWidth: 16,
  ringGap: 8,
  cornerRadius: 100, // 0 for flat ends (butt), >0 for rounded ends (round strokeLinecap)
};

export type KpiRingChartDesignProperties = {
  outerRadius?: number;
  ringWidth?: number;
  ringGap?: number;
  cornerRadius?: number;
};

