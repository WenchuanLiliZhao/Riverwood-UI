import * as React from "react";
import styles from "./progressBar.module.scss";
import { clsx } from "clsx";
import { ProgressBarDefaultDesignProperties, type ProgressBarDesignProperties } from "./designProperties";

/* -------------------------------------------------------------------------- */
/*                             Type Definitions                               */
/* -------------------------------------------------------------------------- */

/**
 * Represents a single segment in a distribution bar.
 */
export type DistributionSegment = {
  id: string;
  value: number;
  color: string;
  label?: string;
};

/**
 * Progress bar mode: single progress value
 */
export type ProgressBarData = {
  label: string;
  value: number;
  total: number;
  unit: string;
  color: string;
};

/**
 * Distribution bar mode: multiple segments
 */
export type DistributionBarData = {
  label: string;
  segments: DistributionSegment[];
  total: number;
  unit: string;
};

/* -------------------------------------------------------------------------- */
/*                             Main Component                                 */
/* -------------------------------------------------------------------------- */

export interface BaseProgressBarProps {
  /**
   * Progress bar data (for single progress mode)
   */
  progressData?: ProgressBarData;
  /**
   * Distribution bar data (for distribution mode)
   */
  distributionData?: DistributionBarData;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Custom design properties to override defaults
   */
  designProperties?: ProgressBarDesignProperties;
}

export const BaseProgressBar = React.forwardRef<
  HTMLDivElement,
  BaseProgressBarProps
>(({ progressData, distributionData, className, designProperties }, ref) => {
  // Validate that exactly one mode is provided
  if (!progressData && !distributionData) {
    throw new Error("Either progressData or distributionData must be provided");
  }
  if (progressData && distributionData) {
    throw new Error("Cannot provide both progressData and distributionData");
  }

  // Merge custom design properties with defaults
  const design = {
    height: designProperties?.height ?? ProgressBarDefaultDesignProperties.height,
    cornerRadius:
      designProperties?.cornerRadius ?? ProgressBarDefaultDesignProperties.cornerRadius,
    distributionGap:
      designProperties?.distributionGap ?? ProgressBarDefaultDesignProperties.distributionGap,
  };

  // Progress bar mode
  if (progressData) {
    const { label, value, total, unit, color } = progressData;
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

    return (
      <div
        ref={ref}
        className={clsx(styles.container, className)}
        style={
          {
            "--corner-radius": `${design.cornerRadius}px`,
            "--progress-color": color,
          } as React.CSSProperties
        }
      >
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>{label}</span>
          <div className={styles["header-right"]}>
            <span className={styles.value}>
              {value} {unit}
            </span>
            <span className={styles.percentage}>{percentage}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={styles["progress-bar-wrapper"]}
          style={{ height: `${design.height}px` }}
        >
          <div
            className={clsx(styles["progress-bar"], styles["progress-bar-single"])}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    );
  }

  // Distribution bar mode
  if (distributionData) {
    const { label, segments, total, unit } = distributionData;

    // Calculate percentages for each segment
    const segmentsWithPercentages = segments.map((segment) => ({
      ...segment,
      percentage: total > 0 ? (segment.value / total) * 100 : 0,
    }));

    // Calculate total value for display
    const totalValue = segments.reduce((sum, seg) => sum + seg.value, 0);
    const totalPercentage = total > 0 ? Math.round((totalValue / total) * 100) : 0;

    return (
      <div
        ref={ref}
        className={clsx(styles.container, className)}
        style={
          {
            "--corner-radius": `${design.cornerRadius}px`,
            "--distribution-gap": `${design.distributionGap}px`,
          } as React.CSSProperties
        }
      >
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>{label}</span>
          <div className={styles["header-right"]}>
            <span className={styles.value}>
              {totalValue} {unit}
            </span>
            <span className={styles.percentage}>{totalPercentage}%</span>
          </div>
        </div>

        {/* Distribution Bar */}
        <div
          className={styles["progress-bar-wrapper"]}
          style={{ height: `${design.height}px` }}
        >
          <div className={styles["progress-bar-distribution"]}>
            {segmentsWithPercentages.map((segment) => {
              return (
                <div
                  key={segment.id}
                  className={styles["distribution-segment"]}
                  style={{
                    width: `${segment.percentage}%`,
                    backgroundColor: segment.color,
                  }}
                  title={segment.label || `${segment.value} ${unit}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
});

BaseProgressBar.displayName = "BaseProgressBar";

