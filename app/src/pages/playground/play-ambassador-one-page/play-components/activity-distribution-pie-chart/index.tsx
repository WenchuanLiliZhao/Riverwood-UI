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

  return (
    <PieChart
      data={pieChartData}
      alwaysShowLabels={alwaysShowLabels}
      showLegendValue={showLegendValue}
      showLegendUnit={showLegendUnit}
      showLabelUnit={showLabelUnit}
    />
  );
};

ActivityDistributionPieChart.displayName = "ActivityDistributionPieChart";