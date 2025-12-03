import * as React from "react";
import {
  BasePieChart,
  type BasePieChartProps,
} from "./_BasePieChart";

export type PieChartProps = BasePieChartProps;
export type {
  PieChartDataItem,
  ValueObject,
  ValueType,
} from "./_BasePieChart";

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (props, ref) => {
    return (
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <BasePieChart {...props} />
      </div>
    );
  }
);

PieChart.displayName = "PieChart";

