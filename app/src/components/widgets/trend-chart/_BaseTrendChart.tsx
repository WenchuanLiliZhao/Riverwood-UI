import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
// import type { TooltipProps, LegendProps } from 'recharts';
// import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { MaterialIcon } from '../../shared/material-icon';
import styles from './trendChart.module.scss';
import { clsx } from 'clsx';

// --- Types (Plan B Structure) ---

export type ChartDataPoint = {
  label: string;
  [key: string]: string | number;
};

export type SeriesDisplayType = 'curve' | 'column';

export type SeriesConfig = {
  key: string;       // Data key in ChartDataPoint (e.g. "used", "planned")
  title: string;     // Legend title
  icon?: string;     // Material icon name
  unit?: string;
  displayAs: SeriesDisplayType;
  color?: string;    // Optional color override
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

export interface BaseTrendChartProps {
  data: ChartDataPoint[];
  series: SeriesConfig[];
  className?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  chartMargin?: ChartMargin;
  xAxisPadding?: ChartPadding;
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
          const config = seriesConfig.find((s: SeriesConfig) => s.key === entry.dataKey);
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
              <span style={{ fontWeight: 'bold' }}>{entry.value}</span>
              {config?.unit && <span style={{ fontSize: '0.8em', marginLeft: 2 }}>{config.unit}</span>}
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
  showGrid = true,
  chartMargin,
  xAxisPadding
}: BaseTrendChartProps) => {

  // Default colors if not provided
  const defaultColors = ['#2563eb', '#9333ea', '#059669', '#d97706', '#dc2626'];

  // Default margin values
  const defaultMargin = {
    top: 0,
    right: 24,
    bottom: 0,
    left: 24,
  };

  // Merge default margin with custom margin
  const margin = {
    ...defaultMargin,
    ...chartMargin,
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

  return (
    <div className={clsx(styles.chartContainer, className)}>
      {/* Chart Surface Area - Takes remaining space */}
      <div className={styles.chartSurface}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={margin}
            barCategoryGap="20%"
          >
            {showGrid && <CartesianGrid stroke="#f5f5f5" vertical={false} />}
            <XAxis 
              dataKey="label" 
              scale="point" 
              padding={xAxisPaddingValue} 
              tick={{ fill: '#666', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#999', fontSize: 12 }}
            />
            <Tooltip 
              content={<CustomTooltip seriesConfig={series} />} 
              cursor={{ fill: 'transparent' }}
            />

            {series.map((s, index) => {
              const color = s.color || defaultColors[index % defaultColors.length];
              
              if (s.displayAs === 'column') {
                return (
                  <Bar 
                    key={s.key}
                    dataKey={s.key}
                    stackId="a"
                    name={s.title}
                    barSize={20}
                    fill={color}
                    radius={[4, 4, 0, 0]}
                  />
                );
              } else {
                return (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.title}
                    stroke={color}
                    strokeWidth={3}
                    dot={{ r: 4, fill: 'white', stroke: color, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                );
              }
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Area - Fixed height at bottom */}
      {showLegend && (
        <div className={styles.legendArea}>
          <div className={styles.customLegend}>
            {series.map((config, index) => {
              const color = config.color || defaultColors[index % defaultColors.length];
              const iconName = config?.icon || 'circle';
              
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
      )}
    </div>
  );
};

