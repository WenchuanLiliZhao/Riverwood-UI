import * as React from "react";
import styles from "./sectorPieChart.module.scss";
import { clsx } from "clsx";

/* -------------------------------------------------------------------------- */
/*                                 Type Definitions                           */
/* -------------------------------------------------------------------------- */

/**
 * Represents a single data point with value and optional color.
 */
export interface SectorPieChartDataPoint {
  value: number;
  color?: string; // Supports rgba() and hex formats
}

/**
 * Represents a data series.
 * Can be either:
 * - Simple format: array of numbers (will use default color for the series)
 * - Full format: array of objects with value and color (each point can have its own color)
 * 
 * Example (simple format):
 * [2, 3, 9, 3]
 * 
 * Example (with colors per point):
 * [
 *   { value: 2, color: '#FF5252' },
 *   { value: 3, color: '#FF8A80' },
 *   { value: 9, color: '#FFCDD2' },
 *   { value: 3, color: '#90CAF9' }
 * ]
 */
export type SectorPieChartDataSeries = number[] | SectorPieChartDataPoint[];

/**
 * Represents multiple data series.
 * Each key represents a data group, and the value can be:
 * - An array of numbers (simple format, all points use default color)
 * - An array of objects with value and color (each point can have its own color)
 * 
 * Example (simple format):
 * {
 *   key1: [2, 3, 9, 3],
 *   key2: [9, 3, 9, 7],
 *   key3: [9, 13, 0, 7]
 * }
 * 
 * Example (with colors per point):
 * {
 *   key1: [
 *     { value: 2, color: '#FF5252' },
 *     { value: 3, color: '#FF8A80' },
 *     { value: 9, color: '#FFCDD2' },
 *     { value: 3, color: '#90CAF9' }
 *   ],
 *   key2: [
 *     { value: 9, color: 'rgba(33, 150, 243, 0.8)' },
 *     { value: 3, color: 'rgba(76, 175, 80, 0.8)' },
 *     { value: 9 },
 *     { value: 7, color: '#FFD54F' }
 *   ],
 *   key3: [9, 13, 0, 7] // This one will use default color for the series
 * }
 */
export type SectorPieChartData = Record<string, SectorPieChartDataSeries>;

export interface SectorPieChartDataItem {
  /**
   * The key/name of this data series
   */
  key: string;
  /**
   * Array of data points for this series.
   * Each point can have its own value and color.
   */
  points: Array<{
    value: number;
    color: string; // Supports rgba() and hex formats
  }>;
}

/* -------------------------------------------------------------------------- */
/*                             Design Configuration                           */
/* -------------------------------------------------------------------------- */

/**
 * Centralized design constants for the chart layout.
 */
const DefaultDesignProperties = {
  // The radius of the chart in pixels (from center to edge)
  radius: 100,
  // Default opacity for sectors
  defaultOpacity: 0.48,
  // Starting angle (0 = top, 90 = right, etc.)
  startAngle: 0,
};

/* -------------------------------------------------------------------------- */
/*                           Helper Functions                                 */
/* -------------------------------------------------------------------------- */

/**
 * Converts degrees to radians
 */
const degToRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Converts clock time (HH:MM format) to degrees.
 * 12:00 = -90° (top), 3:00 = 0° (right), 6:00 = 90° (bottom), 9:00 = 180° (left)
 * 
 * @param timeString - Time in "HH:MM" format (e.g., "11:49", "3:30")
 * @returns Angle in degrees (SVG coordinate system)
 */
const clockTimeToAngle = (timeString: string): number => {
  const [hoursStr, minutesStr] = timeString.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (isNaN(hours) || isNaN(minutes)) {
    console.warn(`Invalid time format: ${timeString}, using 12:00 as default`);
    return -90; // Default to top (12:00)
  }

  // Convert to 12-hour format if needed
  const hours12 = hours % 12;

  // Calculate angle from 12 o'clock position
  // Each hour is 30 degrees (360 / 12)
  // Each minute adds (30 / 60) = 0.5 degrees
  const hourAngle = hours12 * 30;
  const minuteAngle = minutes * 0.5;
  const clockAngle = hourAngle + minuteAngle;

  // Convert to SVG coordinate system (0° = right, -90° = top)
  // Clock angle is measured from 12 o'clock (top) clockwise
  // SVG angle is measured from 3 o'clock (right) clockwise
  const svgAngle = clockAngle - 90;

  return svgAngle;
};

/**
 * Calculates the maximum value across all data series for normalization
 */
const getMaxValue = (dataItems: SectorPieChartDataItem[]): number => {
  let max = 0;
  dataItems.forEach((item) => {
    item.points.forEach((point) => {
      if (point.value > max) max = point.value;
    });
  });
  return max || 1; // Avoid division by zero
};

/**
 * Generates SVG path for a single sector
 */
const generateSectorPath = (
  centerX: number,
  centerY: number,
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number
): string => {
  const startRad = degToRad(startAngle);
  const endRad = degToRad(endAngle);

  // If innerRadius is 0, create a triangle sector (from center point)
  if (innerRadius === 0) {
    const x1 = centerX + outerRadius * Math.cos(startRad);
    const y1 = centerY + outerRadius * Math.sin(startRad);
    const x2 = centerX + outerRadius * Math.cos(endRad);
    const y2 = centerY + outerRadius * Math.sin(endRad);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${centerX} ${centerY}`, // Move to center
      `L ${x1} ${y1}`, // Line to outer start point
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arc along outer edge
      "Z", // Close path (back to center)
    ].join(" ");
  }

  // Otherwise, create a ring sector (donut style)
  const x1 = centerX + innerRadius * Math.cos(startRad);
  const y1 = centerY + innerRadius * Math.sin(startRad);
  const x2 = centerX + outerRadius * Math.cos(startRad);
  const y2 = centerY + outerRadius * Math.sin(startRad);
  const x3 = centerX + outerRadius * Math.cos(endRad);
  const y3 = centerY + outerRadius * Math.sin(endRad);
  const x4 = centerX + innerRadius * Math.cos(endRad);
  const y4 = centerY + innerRadius * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${x1} ${y1}`, // Move to inner start point
    `L ${x2} ${y2}`, // Line to outer start point
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}`, // Arc along outer edge
    `L ${x4} ${y4}`, // Line to inner end point
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`, // Arc along inner edge
    "Z", // Close path
  ].join(" ");
};

/* -------------------------------------------------------------------------- */
/*                             Main Component                                 */
/* -------------------------------------------------------------------------- */

export interface BaseSectorPieChartProps {
  /**
   * Chart data. Can be either:
   * - An object with keys mapping to:
   *   - Arrays of numbers (simple format, all points use default color for the series)
   *   - Arrays of objects with `value` and optional `color` (each point can have its own color)
   * - An array of SectorPieChartDataItem objects
   * 
   * Example (simple format):
   * {
   *   key1: [2, 3, 9, 3],
   *   key2: [9, 3, 9, 7]
   * }
   * 
   * Example (with colors per point):
   * {
   *   key1: [
   *     { value: 2, color: '#FF5252' },
   *     { value: 3, color: '#FF8A80' },
   *     { value: 9, color: 'rgba(33, 150, 243, 0.8)' },
   *     { value: 3 } // This point will use default color for the series
   *   ]
   * }
   */
  data: SectorPieChartData | SectorPieChartDataItem[];
  /**
   * Opacity for all sectors (default: 0.48)
   * Note: If color already contains opacity (rgba), this prop will still apply additional opacity
   */
  opacity?: number;
  /**
   * Custom colors for each data series (if data is provided as object)
   * If not provided, default colors will be used
   */
  colors?: string[];
  /**
   * Start time in clock format (HH:MM) to specify where the first sector begins.
   * Uses 12-hour clock positions (12:00 = top, 3:00 = right, 6:00 = bottom, 9:00 = left).
   * Sectors are arranged clockwise from this position.
   * 
   * Examples:
   * - "12:00" = start from top
   * - "3:00" = start from right
   * - "11:49" = start from approximately 11:49 on clock
   * 
   * If not provided, uses default startAngle (0° = right/3:00 position)
   */
  startTime?: string;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Inner radius (distance from center to start of sectors)
   * Default: 0 (sectors start from center)
   */
  innerRadius?: number;
  /**
   * Outer radius multiplier (0-1, relative to DefaultDesignProperties.radius)
   * Default: 1 (sectors extend to full radius)
   */
  outerRadiusMultiplier?: number;
}

export const BaseSectorPieChart = React.forwardRef<
  HTMLDivElement,
  BaseSectorPieChartProps
>(
  (
    {
      data,
      opacity = DefaultDesignProperties.defaultOpacity,
      colors,
      className,
      innerRadius = 0,
      outerRadiusMultiplier = 1,
      startTime,
    },
    ref
  ) => {
    // Normalize data format
    const dataItems: SectorPieChartDataItem[] = React.useMemo(() => {
      if (Array.isArray(data)) {
        return data;
      } else {
        // Convert object format to array format
        const keys = Object.keys(data);
        const defaultColors = [
          "#FF4646",
          "#FF4646",
          "#FF4646",
          "#FF4646",
          "#FF4646",
          "#FF4646",
          "#FF4646",
          "#FF4646",
        ];
        return keys.map((key, index) => {
          const dataValue = data[key];
          const seriesColor = colors?.[index] || defaultColors[index % defaultColors.length];
          
          // Check if dataValue is an array of objects with value and color
          if (Array.isArray(dataValue) && dataValue.length > 0) {
            // Check if first element is an object with value property
            if (
              typeof dataValue[0] === "object" &&
              dataValue[0] !== null &&
              "value" in dataValue[0]
            ) {
              // Format: [{ value: number, color?: string }, ...]
              return {
                key,
                points: dataValue.map((point) => ({
                  value: typeof point === "object" && point !== null && "value" in point
                    ? point.value
                    : 0,
                  color:
                    typeof point === "object" &&
                    point !== null &&
                    "color" in point &&
                    typeof point.color === "string"
                      ? point.color
                      : seriesColor,
                })),
              };
            } else {
              // Format: [number, number, ...] - simple array of numbers
              return {
                key,
                points: dataValue.map((value) => ({
                  value: typeof value === "number" ? value : 0,
                  color: seriesColor,
                })),
              };
            }
          }
          
          // Fallback: empty array
          return {
            key,
            points: [],
          };
        });
      }
    }, [data, colors]);

    // Calculate chart dimensions
    const chartSize = DefaultDesignProperties.radius * 2;
    const centerX = DefaultDesignProperties.radius;
    const centerY = DefaultDesignProperties.radius;
    const maxOuterRadius =
      DefaultDesignProperties.radius * outerRadiusMultiplier;

    // Calculate start angle based on startTime prop or use default
    const calculatedStartAngle = React.useMemo(() => {
      if (startTime) {
        return clockTimeToAngle(startTime);
      }
      return DefaultDesignProperties.startAngle;
    }, [startTime]);

    // Find maximum value for normalization
    const maxValue = React.useMemo(
      () => getMaxValue(dataItems),
      [dataItems]
    );

    // Generate sectors for each data series
    const sectors = React.useMemo(() => {
      return dataItems.map((item, seriesIndex) => {
        const numPoints = item.points.length;
        const anglePerSector = 360 / numPoints;

        return item.points.map((point, index) => {
          const startAngle = calculatedStartAngle + index * anglePerSector;
          const endAngle = startAngle + anglePerSector;

          // Normalize value to radius (0 to maxOuterRadius)
          const normalizedValue = (point.value / maxValue) * maxOuterRadius;
          const sectorOuterRadius = Math.max(innerRadius, normalizedValue);

          return {
            key: `${item.key}-${index}`,
            seriesKey: item.key,
            seriesIndex,
            valueIndex: index,
            value: point.value,
            color: point.color,
            path: generateSectorPath(
              centerX,
              centerY,
              startAngle,
              endAngle,
              innerRadius,
              sectorOuterRadius
            ),
          };
        });
      });
    }, [
      dataItems,
      maxValue,
      centerX,
      centerY,
      innerRadius,
      maxOuterRadius,
      calculatedStartAngle,
    ]);

    return (
      <div ref={ref} className={clsx(styles.container, className)}>
        <svg
          width={chartSize}
          height={chartSize}
          viewBox={`0 0 ${chartSize} ${chartSize}`}
          className={styles.chart}
        >
          {/* Render all sectors */}
          {sectors.flat().map((sector) => (
            <path
              key={sector.key}
              d={sector.path}
              fill={sector.color}
              opacity={opacity}
              className={styles.sector}
            />
          ))}
        </svg>
      </div>
    );
  }
);

BaseSectorPieChart.displayName = "BaseSectorPieChart";
