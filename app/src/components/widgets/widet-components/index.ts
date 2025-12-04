export * from "./trend-chart";
export * from "./pie-chart";

// Explicit exports from kpi-ring-chart to avoid DesignProperties conflict
export {
  KpiRingChart,
  DefaultDesignProperties as KpiRingChartDefaultDesignProperties,
} from "./kpi-ring-chart";
export type {
  KpiRingChartProps,
  KpiData,
  Metric,
  DesignProperties as KpiRingChartDesignProperties,
} from "./kpi-ring-chart";

// Explicit exports from progress-bar to avoid DesignProperties conflict
export {
  ProgressBar,
  DefaultDesignProperties as ProgressBarDefaultDesignProperties,
} from "./progress-bar";
export type {
  ProgressBarProps,
  ProgressBarData,
  DistributionBarData,
  DistributionSegment,
  DesignProperties as ProgressBarDesignProperties,
} from "./progress-bar";

// Explicit exports from china-heat-map to avoid DesignProperties conflict
export {
  ChinaHeatMap,
  DefaultDesignProperties as ChinaHeatMapDefaultDesignProperties,
} from "./china-heat-map";
export type {
  ChinaHeatMapProps,
  LocationPoint,
  CategoryData,
  RegionMapping,
  DesignProperties as ChinaHeatMapDesignProperties,
} from "./china-heat-map";