import * as React from "react";
import { PieChart } from "../../../../../components";
import type { PieChartDataItem } from "../../../../../components";

/**
 * Input data structure for ActivityDistributionPieChart.
 * Contains only raw counts - percentages will be calculated automatically.
 */
export interface ActivityDistributionItem {
  id: string;
  name: string;
  icon: string;
  count: number; // Raw count (e.g., number of people)
  unit?: string; // Unit for the count (e.g., "pax", defaults to empty)
  color: string;
}

export interface ActivityDistributionPieChartProps {
  /**
   * Array of items with raw counts.
   * Percentages will be automatically calculated from these counts.
   */
  data: ActivityDistributionItem[];
  /**
   * If true, labels are shown for all slices. If false, only for the active (hovered) slice.
   */
  alwaysShowLabels?: boolean;
  /**
   * Toggle to show/hide numerical values in the legend.
   */
  showLegendValue?: boolean;
  /**
   * Toggle to show/hide units in the legend.
   */
  showLegendUnit?: boolean;
  /**
   * Toggle to show/hide units in the chart labels.
   */
  showLabelUnit?: boolean;
  /**
   * Diameter of the pie chart in pixels.
   * @default 90
   */
  pieDiameter?: number;
  /**
   * Width of the legend container in pixels.
   * @default auto-calculated based on data length
   */
  legendWidth?: number;
  /**
   * Height of the legend container in pixels.
   */
  legendHeight?: number;
  /**
   * Spacing between the pie chart and legend in pixels.
   * @default 72
   */
  spacing?: number;
}

/**
 * Wrapper component for PieChart that automatically calculates percentages
 * from raw count data.
 * 
 * This component eliminates the need to manually calculate and maintain
 * percentage values in the data source.
 */
export const ActivityDistributionPieChart: React.FC<ActivityDistributionPieChartProps> = ({
  data,
  alwaysShowLabels = true,
  showLegendValue = true,
  showLegendUnit = false,
  showLabelUnit = true,
  pieDiameter = 90,
  legendWidth: legendWidthProp,
  legendHeight,
  spacing = 72,
}) => {
  // Calculate total count across all items
  const totalCount = React.useMemo(() => {
    return data.reduce((sum, item) => sum + item.count, 0);
  }, [data]);

  // Transform input data to PieChartDataItem format with calculated percentages
  const pieChartData: PieChartDataItem[] = React.useMemo(() => {
    if (totalCount === 0) {
      // Handle edge case: if total is 0, return empty array or items with 0%
      return data.map((item) => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        valueArray: [
          [{ value: 0, unit: "%", color: item.color }],
          [{ value: item.count, unit: item.unit || "", color: item.color }],
        ],
      }));
    }

    return data.map((item) => {
      // Calculate percentage from raw count
      const percentage = (item.count / totalCount) * 100;
      // Round to nearest integer for display (or keep decimals if needed)
      const roundedPercentage = Math.round(percentage * 100) / 100;

      return {
        id: item.id,
        name: item.name,
        icon: item.icon,
        valueArray: [
          // Index 0: Percentage values for chart visualization
          [{ value: roundedPercentage, unit: "%", color: item.color }],
          // Index 1: Raw counts for legend display
          [{ value: item.count, unit: item.unit || "", color: item.color }],
        ],
      };
    });
  }, [data, totalCount]);

  // Auto-calculate legend width based on data length if not provided
  const legendWidth = React.useMemo(() => {
    if (legendWidthProp !== undefined) {
      return legendWidthProp;
    }
    
    switch (data.length) {
      case 2:
        return 80;
      case 3:
        return 120;
      case 4:
        return 240;
    }
    return 200;
  }, [data.length, legendWidthProp]);

  return (
    <PieChart
      data={pieChartData}
      alwaysShowLabels={alwaysShowLabels}
      showLegendValue={showLegendValue}
      showLegendUnit={showLegendUnit}
      showLabelUnit={showLabelUnit}
      legendPosition="right"
      pieDiameter={pieDiameter}
      legendWidth={legendWidth}
      legendHeight={legendHeight}
      spacing={spacing}
      className="activity-distribution-pie-chart"
    />
  );
};

ActivityDistributionPieChart.displayName = "ActivityDistributionPieChart";