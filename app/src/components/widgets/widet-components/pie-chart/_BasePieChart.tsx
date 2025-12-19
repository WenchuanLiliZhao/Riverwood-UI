import * as React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import { MaterialIcon } from "../../../shared/material-icon";
import styles from "./pieChart.module.scss";
import { clsx } from "clsx";

/* -------------------------------------------------------------------------- */
/*                                 Type Definitions                           */
/* -------------------------------------------------------------------------- */

/**
 * Represents a single value object.
 */
export type ValueObject = {
  value: number;
  unit: string;
  color: string;
};

/**
 * Represents a set of values (e.g., a list of slices or metrics).
 * The user defines valueType as an array of these objects.
 */
export type ValueType = ValueObject[];

/**
 * Represents a high-level data category (e.g., "Train", "Tennis").
 * Contains metadata like ID, name, icon, and a sequence of value arrays.
 * 
 * Structure of `valueArray`:
 * - Index 0: Typically used for the Chart visualization (e.g., Percentages).
 * - Index 1+: Can be used for other displays like Legends (e.g., Pax counts).
 */
export type PieChartDataItem = {
  id: string;
  name: string;
  valueArray: ValueType[];
  icon: string; // Material icon name
};

/* -------------------------------------------------------------------------- */
/*                             Design Configuration                           */
/* -------------------------------------------------------------------------- */

/**
 * Centralized design constants for the chart layout.
 * These values control the size, spacing, and positioning of chart elements
 * to ensure a pixel-perfect "hug content" effect.
 */
const DefaultDesignProperties = {
  // The diameter of the pie chart in pixels.
  diameter: 100,
  // The width of the ring (donut thickness) in pixels.
  ringWidth: 24,
  // Multiplier for positioning labels outside the pie.
  // 1.125 means the label is placed at 1.125x the radius.
  labelRadiusMultiplier: 1.125,
  // Top margin for the legend container to separate it from the chart.
  legendMarginTop: 24,
  // Horizontal and vertical gaps between legend items (grid layout).
  legendGapX: 8,
  legendGapY: 8,
};

/* -------------------------------------------------------------------------- */
/*                           Helper Functions                                 */
/* -------------------------------------------------------------------------- */

/**
 * Type for Pie label props from Recharts
 */
interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  index?: number;
  name?: string;
  value: number;
  payload?: { unit?: string; [key: string]: unknown };
  [key: string]: unknown;
}

/**
 * Custom label renderer for the Pie Chart.
 * Calculates the x, y coordinates based on the angle and radius.
 */
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle = 0,
  outerRadius,
  value,
  payload,
  showLabelUnit,
}: PieLabelProps & { showLabelUnit: boolean }) => {
  const RADIAN = Math.PI / 180;
  // Calculate position for the label
  const radius =
    (outerRadius || DefaultDesignProperties.diameter / 2) *
    DefaultDesignProperties.labelRadiusMultiplier;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text
      x={x}
      y={y}
      fill="#666"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className={styles.label}
    >
      {/* Display the numerical value */}
      {value}
      {/* Conditionally display the unit if enabled and present in data */}
      {showLabelUnit && payload?.unit ? payload.unit : null}
    </text>
  );
};

/* -------------------------------------------------------------------------- */
/*                             Main Component                                 */
/* -------------------------------------------------------------------------- */

export interface BasePieChartProps {
  /**
   * Chart data array. Each item represents a category with its values.
   */
  data: PieChartDataItem[];
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
   * Position of the legend relative to the chart.
   * @default "bottom"
   */
  legendPosition?: "bottom" | "right";
  /**
   * Diameter of the pie chart in pixels.
   * @default 100
   */
  pieDiameter?: number;
  /**
   * Width of the legend container in pixels (only applies when legendPosition is "right").
   * @default 200
   */
  legendWidth?: number;
  /**
   * Height of the legend container in pixels (optional, defaults to auto).
   */
  legendHeight?: number;
  /**
   * Spacing between the pie chart and legend in pixels.
   * @default 24
   */
  spacing?: number;
  /**
   * Custom className for the container
   */
  className?: string;
}

export const BasePieChart = React.forwardRef<HTMLDivElement, BasePieChartProps>(
  (
    {
      data,
      alwaysShowLabels = false,
      showLegendValue = false,
      showLegendUnit = false,
      showLabelUnit = true,
      legendPosition = "bottom",
      pieDiameter = DefaultDesignProperties.diameter,
      legendWidth = 200,
      legendHeight,
      spacing = DefaultDesignProperties.legendMarginTop,
      className,
    },
    ref
  ) => {
    // State to track the currently hovered slice index
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    // Flatten data for Pie consumption.
    // We use the FIRST array in valueArray (Index 0) for the chart slices.
    const chartData = data.flatMap((item) => {
      const chartValues = item.valueArray[0] || [];
      return chartValues.map((v) => ({
        ...v,
        name: item.name,
      }));
    });

    return (
      <div 
        ref={ref} 
        className={clsx(
          styles.container, 
          legendPosition === "right" && styles["container--right"],
          className
        )}
      >
        {/* Recharts PieChart Container - wrapped to prevent shrinking */}
        <div 
          className={styles["chart-wrapper"]}
          style={{ 
            width: pieDiameter, 
            height: pieDiameter,
            flexShrink: 0 
          }}
        >
          <RechartsPieChart
            width={pieDiameter}
            height={pieDiameter}
          >
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              // Create a ring (donut) effect by setting innerRadius
              innerRadius={
                pieDiameter / 2 - DefaultDesignProperties.ringWidth
              }
              outerRadius={pieDiameter / 2}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              // Custom label logic: render if alwaysShowLabels is true OR if this slice is active
              label={((props: PieLabelProps) =>
                alwaysShowLabels || props.index === activeIndex
                  ? renderCustomizedLabel({
                      ...props,
                      showLabelUnit,
                    })
                  : null) as React.ComponentProps<typeof Pie>["label"]}
              labelLine={false} // Disable the connecting line for a cleaner look
              stroke="none" // Remove border stroke around slices
              isAnimationActive={false} // Disable animation for instant feedback
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Render each slice with its specific color */}
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{ outline: "none" }}
                  strokeWidth={0}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </Pie>
          </RechartsPieChart>
        </div>

        {/* Legend Section */}
        <div
          className={clsx(
            styles["legend-container"],
            legendPosition === "right" && styles["legend-container--right"]
          )}
          style={{
            ...(legendPosition === "bottom"
              ? { marginTop: spacing }
              : { marginLeft: spacing }),
            ...(legendPosition === "right" && legendWidth
              ? { width: legendWidth }
              : {}),
            ...(legendHeight ? { height: legendHeight } : {}),
          }}
        >
          <div
            className={clsx(
              styles["legend-items"],
              legendPosition === "right" && styles["legend-items--right"]
            )}
            style={{
              columnGap: DefaultDesignProperties.legendGapX,
              rowGap: DefaultDesignProperties.legendGapY,
            }}
          >
            {/* Map through original data to render LegendItems */}
            {data.map((item) => (
              <LegendItem
                key={item.id}
                item={item}
                showValue={showLegendValue}
                showUnit={showLegendUnit}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

BasePieChart.displayName = "BasePieChart";

/* -------------------------------------------------------------------------- */
/*                             Sub-Components                                 */
/* -------------------------------------------------------------------------- */

/**
 * Component for a single item in the legend.
 * Displays the category icon, name, and optional aggregated value/unit.
 */
const LegendItem = ({
  item,
  showValue,
  showUnit,
}: {
  item: PieChartDataItem;
  showValue: boolean;
  showUnit: boolean;
}) => {
  // Determine which value set to use for the legend.
  // Use the second array (Index 1) if available (e.g., for "pax" counts),
  // otherwise fall back to the first array (Index 0).
  const legendValues = item.valueArray[1] || item.valueArray[0] || [];

  // Calculate total value for the display (summing up sub-values)
  const totalValue = legendValues.reduce((acc, v) => acc + v.value, 0);

  // Retrieve display properties from the first value entry of the chosen set
  const unit = legendValues[0]?.unit || "";
  // Color should match the chart, so we take it from the first set (Index 0) if possible,
  // but usually color is consistent.
  const color = item.valueArray[0]?.[0]?.color || "#000";

  return (
    <div className={styles["legend-item"]}>
      <MaterialIcon
        icon={item.icon}
        className={styles["legend-icon"]}
        style={{ color }}
        size={16}
      />
      <span className={styles["legend-text"]}>
        {item.name}{" "}
        {showValue && (
          <span className={styles["legend-count"]}>
            ({totalValue}
            {showUnit && unit})
          </span>
        )}
      </span>
    </div>
  );
};

