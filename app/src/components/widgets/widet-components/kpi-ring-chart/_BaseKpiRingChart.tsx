import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { MaterialIcon } from "../../../shared/material-icon";
import styles from "./kpiRingChart.module.scss";
import { clsx } from "clsx";
import { DefaultDesignProperties, type DesignProperties } from "./designProperties";

/* -------------------------------------------------------------------------- */
/*                             Type Definitions                               */
/* -------------------------------------------------------------------------- */

/**
 * Represents a single metric in the KPI ring chart.
 */
export type Metric = {
  id: string;
  label: string;
  percentage: number; // 0-100
  current: number;
  total: number;
  unit: string;
  color: string;
};

/**
 * Represents the complete KPI data for a single entity.
 */
export type KpiData = {
  title: string;
  icon: string; // Material icon name
  metrics: Metric[];
};


/* -------------------------------------------------------------------------- */
/*                             Main Component                                 */
/* -------------------------------------------------------------------------- */

export interface BaseKpiRingChartProps {
  /**
   * KPI data containing title, icon, and metrics array.
   */
  data: KpiData;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Custom design properties to override defaults
   */
  designProperties?: DesignProperties;
}

export const BaseKpiRingChart = React.forwardRef<
  HTMLDivElement,
  BaseKpiRingChartProps
>(({ data, className, designProperties }, ref) => {
  const { title, icon, metrics } = data;

  // Merge custom design properties with defaults
  const design = {
    outerRadius: designProperties?.outerRadius ?? DefaultDesignProperties.outerRadius,
    ringWidth: designProperties?.ringWidth ?? DefaultDesignProperties.ringWidth,
    ringGap: designProperties?.ringGap ?? DefaultDesignProperties.ringGap,
  };

  // Calculate chart size from outerRadius (chart size is outerRadius * 2)
  const chartSize = design.outerRadius * 2;

  return (
    <div ref={ref} className={clsx(styles.container, className)}>
      {/* Chart Section */}
      <div
        className={styles["chart-wrapper"]}
        style={{
          width: chartSize,
          height: chartSize,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {metrics.map((metric, index) => {
              // Calculate radii for concentric rings
              // Outer ring is index 0, Inner ring is index 1, etc.
              const outerRadius =
                design.outerRadius -
                index * (design.ringWidth + design.ringGap);

              const innerRadius = outerRadius - design.ringWidth;

              // Data for the progress ring
              const ringData = [
                { value: metric.percentage },
                { value: 100 - metric.percentage },
              ];

              return (
                <React.Fragment key={metric.id}>
                  {/* Background Track */}
                  <Pie
                    data={[{ value: 100 }]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={90}
                    endAngle={-270}
                    fill="#f3f4f6" // gray-100/200
                    stroke="none"
                    isAnimationActive={false}
                  />
                  {/* Progress Ring */}
                  <Pie
                    data={ringData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={90}
                    endAngle={-270} // Full circle range
                    stroke="none"
                    cornerRadius={10} // Rounded ends
                  >
                    <Cell fill={metric.color} />
                    <Cell fill="transparent" />
                  </Pie>
                </React.Fragment>
              );
            })}
          </PieChart>
        </ResponsiveContainer>
        {/* Center Content */}
        <div className={styles["chart-center"]}>
          <MaterialIcon
            icon={icon}
            className={styles["center-icon"]}
            size={22}
          />
          <span className={styles["center-text"]}>{title}</span>
        </div>
      </div>

      {/* Legend Section */}
      <div className={styles["legend-container"]}>
        {metrics.map((metric) => (
          <div key={metric.id} className={styles["legend-item"]}>
            <span className={styles["legend-label"]}>{metric.label}</span>
            <div className={styles["legend-stats"]}>
              <span
                className={styles["legend-percent"]}
                style={{ color: metric.color }}
              >
                {metric.percentage}%
              </span>
              <span className={styles["legend-details"]}>
                {metric.current}/{metric.total}
                <span className={styles["unit"]}>{metric.unit}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

BaseKpiRingChart.displayName = "BaseKpiRingChart";

