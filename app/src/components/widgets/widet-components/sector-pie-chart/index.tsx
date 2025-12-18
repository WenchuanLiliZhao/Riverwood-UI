import * as React from "react";
import {
  BaseSectorPieChart,
  type BaseSectorPieChartProps,
} from "./_BaseSectorPieChart";

export type SectorPieChartProps = BaseSectorPieChartProps;
export type {
  SectorPieChartData,
  SectorPieChartDataSeries,
  SectorPieChartDataPoint,
  SectorPieChartDataItem,
} from "./_BaseSectorPieChart";

export const SectorPieChart = React.forwardRef<
  HTMLDivElement,
  SectorPieChartProps
>((props, ref) => {
  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <BaseSectorPieChart {...props} />
    </div>
  );
});

SectorPieChart.displayName = "SectorPieChart";
