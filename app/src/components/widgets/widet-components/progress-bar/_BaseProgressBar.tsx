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
  /**
   * Optional caption to display on the right side of the header.
   * If not provided, will automatically display the percentage (e.g., "75%")
   */
  caption?: string;
};

/**
 * Distribution bar mode: multiple segments
 */
export type DistributionBarData = {
  label: string;
  segments: DistributionSegment[];
  total: number;
  unit: string;
  /**
   * Optional caption to display on the right side of the header.
   * If not provided, will automatically display the percentage (e.g., "75%")
   */
  caption?: string;
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
    showHeader:
      designProperties?.showHeader ?? ProgressBarDefaultDesignProperties.showHeader,
    showLoadingAnimation:
      designProperties?.showLoadingAnimation ?? ProgressBarDefaultDesignProperties.showLoadingAnimation,
    showWidthAnimation:
      designProperties?.showWidthAnimation ?? ProgressBarDefaultDesignProperties.showWidthAnimation,
    animationDuration:
      designProperties?.animationDuration ?? ProgressBarDefaultDesignProperties.animationDuration,
  };

  // State to control width animation - always enable animation for loading effect
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Trigger animation on mount - always animate width from 0 to target
  React.useEffect(() => {
    // Use requestAnimationFrame to ensure the initial render is complete
    // This ensures the element is rendered with 0% width before animation starts
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Progress bar mode
  if (progressData) {
    const { label, value, total, unit, color, caption } = progressData;
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    const displayCaption = caption ?? `${percentage}%`;

    return (
      <div
        ref={ref}
        className={clsx(styles.container, className)}
        style={
          {
            "--corner-radius": `${design.cornerRadius}px`,
            "--progress-color": color,
            "--animation-duration": `${design.animationDuration}s`,
          } as React.CSSProperties
        }
      >
        {/* Header */}
        {design.showHeader && (
          <div className={styles.header}>
            <span className={styles.label}>{label}</span>
            <div className={styles["header-right"]}>
              <span className={styles.value}>
                {value} {unit}
              </span>
              <span className={styles.caption}>{displayCaption}</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div
          className={styles["progress-bar-wrapper"]}
          style={{ height: `${design.height}px` }}
        >
          <div
            className={clsx(
              styles["progress-bar"],
              styles["progress-bar-single"],
              design.showLoadingAnimation && styles["progress-bar-loading"]
            )}
            style={{
              width: isAnimating ? `${percentage}%` : "0%",
              transition: `width ${design.animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
            } as React.CSSProperties}
          />
        </div>
      </div>
    );
  }

  // Distribution bar mode
  if (distributionData) {
    const { label, segments, total, unit, caption } = distributionData;

    // Calculate percentages for each segment
    const segmentsWithPercentages = segments.map((segment) => ({
      ...segment,
      percentage: total > 0 ? (segment.value / total) * 100 : 0,
    }));

    // Calculate total value for display
    const totalValue = segments.reduce((sum, seg) => sum + seg.value, 0);
    const totalPercentage = total > 0 ? Math.round((totalValue / total) * 100) : 0;
    const displayCaption = caption ?? `${totalPercentage}%`;

    return (
      <div
        ref={ref}
        className={clsx(styles.container, className)}
        style={
          {
            "--corner-radius": `${design.cornerRadius}px`,
            "--distribution-gap": `${design.distributionGap}px`,
            "--animation-duration": `${design.animationDuration}s`,
          } as React.CSSProperties
        }
      >
        {/* Header */}
        {design.showHeader && (
          <div className={styles.header}>
            <span className={styles.label}>{label}</span>
            <div className={styles["header-right"]}>
              <span className={styles.value}>
                {totalValue} {unit}
              </span>
              <span className={styles.caption}>{displayCaption}</span>
            </div>
          </div>
        )}

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
                  className={clsx(
                    styles["distribution-segment"],
                    design.showLoadingAnimation && styles["progress-bar-loading"]
                  )}
                  style={{
                    width: isAnimating ? `${segment.percentage}%` : "0%",
                    backgroundColor: segment.color,
                    transition: `width ${design.animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                  } as React.CSSProperties}
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

