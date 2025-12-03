import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
// import type { TooltipProps, LegendProps } from 'recharts';
// import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { MaterialIcon } from "../../../shared/material-icon";
import styles from "./trendChart.module.scss";
import { clsx } from "clsx";
import { useNodeSelection } from "./useNodeSelection";
import { DefaultDesignProperties } from "./designProperties";

// --- Types (Plan B Structure) ---

export type ChartDataPoint = {
  label: string;
  [key: string]: string | number;
};

export type SeriesDisplayType = "curve" | "column";

export type SeriesConfig = {
  key: string; // Data key in ChartDataPoint (e.g. "used", "planned")
  title: string; // Legend title
  icon?: string; // Material icon name
  unit?: string;
  displayAs: SeriesDisplayType;
  color?: string; // Optional color override
  selectable?: boolean; // Whether nodes in this series can be selected (default: true when enableSelection is true)
};

export interface ChartPadding {
  left?: number;
  right?: number;
}

export interface ChartMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface DefaultSelectedNode {
  label: string;
  seriesKey: string;
}

export type LegendPosition = 'top' | 'bottom';

export interface BaseTrendChartProps {
  data: ChartDataPoint[];
  series: SeriesConfig[];
  className?: string;
  showLegend?: boolean;
  legendPosition?: LegendPosition; // Position of legend: 'top' or 'bottom' (default: 'bottom')
  showGrid?: boolean;
  chartMargin?: ChartMargin;
  xAxisPadding?: ChartPadding;
  enableSelection?: boolean; // Enable node selection feature
  defaultSelectedNode?: DefaultSelectedNode; // Required when enableSelection is true
}

// --- Components ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, seriesConfig }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((entry: any, index: number) => {
          const config = seriesConfig.find(
            (s: SeriesConfig) => s.key === entry.dataKey
          );
          return (
            <div key={index} className={styles.tooltipItem}>
              {config?.icon && (
                <MaterialIcon
                  icon={config.icon}
                  size={16}
                  style={{ color: entry.color }}
                />
              )}
              <span className={styles.tooltipItemLabel}>{entry.name}:</span>
              <span style={{ fontWeight: "bold" }}>{entry.value}</span>
              {config?.unit && (
                <span style={{ fontSize: "0.8em", marginLeft: 2 }}>
                  {config.unit}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export const BaseTrendChart = ({
  data,
  series,
  className,
  showLegend = true,
  legendPosition = DefaultDesignProperties.legend.defaultPosition,
  showGrid = true,
  chartMargin,
  xAxisPadding,
  enableSelection = false,
  defaultSelectedNode,
}: BaseTrendChartProps) => {
  // Validate that defaultSelectedNode is provided when enableSelection is true
  if (enableSelection && !defaultSelectedNode) {
    throw new Error(
      "TrendChart: defaultSelectedNode is required when enableSelection is true. " +
        "Please provide defaultSelectedNode with { label: string, seriesKey: string }"
    );
  }

  // Validate that defaultSelectedNode's series is selectable
  if (enableSelection && defaultSelectedNode) {
    const seriesConfig = series.find(
      (s) => s.key === defaultSelectedNode.seriesKey
    );
    if (seriesConfig?.selectable === false) {
      throw new Error(
        `TrendChart: defaultSelectedNode's seriesKey "${defaultSelectedNode.seriesKey}" is not selectable. ` +
          "Please provide a selectable series key or set selectable: true for this series."
      );
    }
  }

  // Use the node selection hook to handle selection logic
  const {
    toggleNodeSelection,
    getNodeOpacity,
    getLineOpacity,
    isSeriesSelectable,
  } = useNodeSelection(data, enableSelection, series, defaultSelectedNode);

  // Default colors if not provided
  const defaultColors = ["#2563eb", "#9333ea", "#059669", "#d97706", "#dc2626"];

  // Spacing values from design properties
  const spacing = {
    top: chartMargin?.top ?? DefaultDesignProperties.spacing.top,
    right: chartMargin?.right ?? DefaultDesignProperties.spacing.right,
    bottom: chartMargin?.bottom ?? DefaultDesignProperties.spacing.bottom,
    left: chartMargin?.left ?? DefaultDesignProperties.spacing.left,
  };

  // Chart margin for Recharts
  // Left and right spacing are now handled by placeholder divs
  // Set margin to 0 to maximize chart area within its container
  const margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  // Default XAxis padding values
  const defaultXAxisPadding = {
    left: 10,
    right: 10,
  };

  // Merge default XAxis padding with custom padding
  const xAxisPaddingValue = {
    ...defaultXAxisPadding,
    ...xAxisPadding,
  };

  // Legend component
  const LegendComponent = showLegend ? (
    <div className={styles.legendArea}>
      <div className={styles.customLegend}>
        {series.map((config, index) => {
          const color =
            config.color || defaultColors[index % defaultColors.length];
          const iconName = config.icon || DefaultDesignProperties.legend.defaultIcon;

          return (
            <div key={`item-${index}`} className={styles.legendItem}>
              <div className={styles.legendIcon} style={{ color }}>
                <MaterialIcon icon={iconName} size={20} />
              </div>
              <span className={styles.legendTitle}>{config.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;

  // Spacing divs for positioning
  // Top spacing: spacing between container top and first element (legend or chart)
  const topSpacing = spacing.top;
  // Bottom spacing: spacing between last element (chart or legend) and container bottom
  const bottomSpacing = spacing.bottom;
  // Left spacing: spacing between container left and chart
  const leftSpacing = spacing.left;
  // Right spacing: spacing between chart and container right
  const rightSpacing = spacing.right;

  return (
    <div className={clsx(styles.chartContainer, className)}>
      {/* Top spacing div */}
      {topSpacing > 0 && (
        <div style={{ height: topSpacing, flexShrink: 0 }} />
      )}

      {/* Legend Area - Top */}
      {legendPosition === 'top' && LegendComponent}

      {/* Chart Surface Area - Takes remaining space */}
      <div className={styles.chartSurface}>
        {/* Left spacing div */}
        {leftSpacing > 0 && (
          <div style={{ width: leftSpacing, flexShrink: 0 }} />
        )}

        {/* Chart Content - Takes remaining width */}
        <div className={styles.chartContent}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={margin} barCategoryGap="20%">
            {showGrid && <CartesianGrid stroke="#f5f5f5" vertical={false} />}
            <XAxis
              dataKey="label"
              scale="point"
              padding={xAxisPaddingValue}
              tick={{
                fill: DefaultDesignProperties.xAxisLabel.color,
                fontSize: DefaultDesignProperties.xAxisLabel.fontSize,
                style: {
                  fontSize: DefaultDesignProperties.xAxisLabel.fontSize,
                  fill: DefaultDesignProperties.xAxisLabel.color,
                },
              }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
                width={DefaultDesignProperties.yAxisLabel.width}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: DefaultDesignProperties.yAxisLabel.color,
                fontSize: DefaultDesignProperties.yAxisLabel.fontSize,
                style: {
                  fontSize: DefaultDesignProperties.yAxisLabel.fontSize,
                  fill: DefaultDesignProperties.yAxisLabel.color,
                },
              }}
            />
            <Tooltip
              content={<CustomTooltip seriesConfig={series} />}
              cursor={{ fill: "transparent" }}
            />

            {series.map((s, index) => {
              const color =
                s.color || defaultColors[index % defaultColors.length];

              if (s.displayAs === "column") {
                return (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    stackId="a"
                    name={s.title}
                    barSize={DefaultDesignProperties.column.width}
                    fill={color}
                    radius={[4, 4, 0, 0]}
                  >
                    {data.map((entry, idx) => {
                      const opacity = getNodeOpacity(entry.label, s.key);
                      const isSelectable = isSeriesSelectable(s.key);
                      return (
                        <Cell
                          key={`cell-${idx}`}
                          fill={color}
                          opacity={opacity}
                          style={{
                            cursor:
                              enableSelection && isSelectable
                                ? "pointer"
                                : "default",
                          }}
                          onClick={() => {
                            if (enableSelection && isSelectable) {
                              toggleNodeSelection(entry.label, s.key);
                            }
                          }}
                        />
                      );
                    })}
                  </Bar>
                );
              } else {
                // Custom dot component for Line chart with selection support
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const CustomDot = (props: any) => {
                  const { cx, cy, payload } = props;
                  if (!cx || !cy) return null;

                  const isSelectable = isSeriesSelectable(s.key);
                  const opacity = enableSelection
                    ? getNodeOpacity(payload.label, s.key)
                    : 1;

                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="white"
                      stroke={color}
                      strokeWidth={2}
                      opacity={opacity}
                      style={{
                        cursor:
                          enableSelection && isSelectable
                            ? "pointer"
                            : "default",
                      }}
                      onClick={() => {
                        if (enableSelection && isSelectable && payload?.label) {
                          toggleNodeSelection(payload.label, s.key);
                        }
                      }}
                    />
                  );
                };

                return (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.title}
                    stroke={color}
                    strokeWidth={3}
                    strokeOpacity={getLineOpacity(s.key)}
                    dot={<CustomDot />}
                    activeDot={{ r: 6 }}
                  />
                );
              }
            })}
          </ComposedChart>
        </ResponsiveContainer>
        </div>

        {/* Right spacing div */}
        {rightSpacing > 0 && (
          <div style={{ width: rightSpacing, flexShrink: 0 }} />
        )}
      </div>

      {/* Legend Area - Bottom */}
      {legendPosition === 'bottom' && LegendComponent}

      {/* Bottom spacing div */}
      {bottomSpacing > 0 && (
        <div style={{ height: bottomSpacing, flexShrink: 0 }} />
      )}
    </div>
  );
};
