/**
 * Centralized design constants for the KPI ring chart layout.
 */
export const KpiRingChartDefaultDesignProperties = {
  outerRadius: 64,
  ringWidth: 8,
  ringGap: 6,
  cornerRadius: 100, // 0 for flat ends (butt), >0 for rounded ends (round strokeLinecap)
};

export type KpiRingChartDesignProperties = {
  outerRadius?: number;
  ringWidth?: number;
  ringGap?: number;
  cornerRadius?: number;
};

