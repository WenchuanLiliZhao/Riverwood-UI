import * as React from "react";
import {
  BaseKpiRingChart,
  type BaseKpiRingChartProps,
} from "./_BaseKpiRingChart";

export type KpiRingChartProps = BaseKpiRingChartProps;
export type { KpiData, Metric } from "./_BaseKpiRingChart";
export type { KpiRingChartDesignProperties as DesignProperties } from "./designProperties";
export { KpiRingChartDefaultDesignProperties as DefaultDesignProperties } from "./designProperties";

export const KpiRingChart = React.forwardRef<
  HTMLDivElement,
  KpiRingChartProps
>((props, ref) => {
  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <BaseKpiRingChart {...props} />
    </div>
  );
});

KpiRingChart.displayName = "KpiRingChart";

