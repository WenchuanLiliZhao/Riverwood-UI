import * as React from "react";
import { MaterialIcon } from "../../../shared/material-icon";
import styles from "./kpiRingChart.module.scss";
import { clsx } from "clsx";
import { KpiRingChartDefaultDesignProperties, type KpiRingChartDesignProperties } from "./designProperties";

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
  designProperties?: KpiRingChartDesignProperties;
}

export const BaseKpiRingChart = React.forwardRef<
  HTMLDivElement,
  BaseKpiRingChartProps
>(({ data, className, designProperties }, ref) => {
  const { title, icon, metrics } = data;

  // Merge custom design properties with defaults
  const design = {
    outerRadius: designProperties?.outerRadius ?? KpiRingChartDefaultDesignProperties.outerRadius,
    ringWidth: designProperties?.ringWidth ?? KpiRingChartDefaultDesignProperties.ringWidth,
    ringGap: designProperties?.ringGap ?? KpiRingChartDefaultDesignProperties.ringGap,
    cornerRadius: designProperties?.cornerRadius ?? KpiRingChartDefaultDesignProperties.cornerRadius,
  };

  // Calculate chart size from outerRadius (chart size is outerRadius * 2)
  const chartSize = design.outerRadius * 2;
  const center = design.outerRadius;

  // Determine strokeLinecap based on cornerRadius
  const strokeLinecap = design.cornerRadius > 0 ? "round" : "butt";

  // Animation state: track whether animation should play
  const [isAnimated, setIsAnimated] = React.useState(false);

  // Trigger animation on mount
  React.useEffect(() => {
    // Use requestAnimationFrame to ensure the initial state is rendered first
    requestAnimationFrame(() => {
      setIsAnimated(true);
    });
  }, []);

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
        <svg
          width={chartSize}
          height={chartSize}
          style={{ transform: "rotate(-90deg)" }}
        >
          {metrics.map((metric, index) => {
            // Calculate radii for concentric rings
            // Outer ring is index 0, Inner ring is index 1, etc.
            const outerRadius =
              design.outerRadius -
              index * (design.ringWidth + design.ringGap);

            // Radius is at the middle of the stroke
            const radius = outerRadius - design.ringWidth / 2;

            // Calculate circumference
            const circumference = 2 * Math.PI * radius;

            // Calculate stroke dash offset for progress
            const progress = metric.percentage / 100;
            // When not animated, start at 0%; when animated, show actual progress
            const strokeDashoffset = isAnimated 
              ? circumference * (1 - progress)
              : circumference; // Start from 0% progress

            return (
              <React.Fragment key={metric.id}>
                {/* Background Track */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="#f3f4f6" // gray-100/200
                  strokeWidth={design.ringWidth}
                  strokeLinecap={strokeLinecap}
                />
                {/* Progress Ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={metric.color}
                  strokeWidth={design.ringWidth}
                  strokeLinecap={strokeLinecap}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: "stroke-dashoffset 1s ease-out",
                  }}
                />
              </React.Fragment>
            );
          })}
        </svg>
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

