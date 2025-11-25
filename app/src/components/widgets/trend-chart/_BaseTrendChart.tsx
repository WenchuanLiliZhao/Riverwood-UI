import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

export interface BaseTrendChartProps {
  data: ChartDataPoint[];
  series: SeriesConfig[];
  className?: string;
  height?: number | string;
  showLegend?: boolean;
  showGrid?: boolean;
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
            <div key={index} className={styles.tooltipItem} style={{ color: entry.color }}>
              {config?.icon && <MaterialIcon icon={config.icon} size={16} />}
              <span>{entry.name}:</span>
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
  height = 300,
  showLegend = true,
  showGrid = true
}: BaseTrendChartProps) => {

  // Default colors if not provided
  const defaultColors = ['#2563eb', '#9333ea', '#059669', '#d97706', '#dc2626'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    if (!payload) return null;

    return (
      <div className={styles.customLegend}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((entry: any, index: number) => {
          const config = series.find(s => s.key === entry.dataKey);
          const color = entry.color;
          
          return (
            <div key={`item-${index}`} className={styles.legendItem}>
               {/* Icon or Color Dot */}
               {config?.icon ? (
                 <div className={styles.legendIcon} style={{ color }}>
                   <MaterialIcon icon={config.icon} size={20} />
                 </div>
               ) : (
                 <div style={{ width: 10, height: 10, backgroundColor: color, borderRadius: '50%' }} />
               )}
               <span className={styles.legendTitle} style={{ color }}>{entry.value}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={clsx(styles.chartContainer, className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          {showGrid && <CartesianGrid stroke="#f5f5f5" vertical={false} />}
          <XAxis 
            dataKey="label" 
            scale="point" 
            padding={{ left: 20, right: 20 }} 
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
          <Tooltip content={<CustomTooltip seriesConfig={series} />} cursor={{ fill: 'transparent' }} />
          
          {showLegend && (
            <Legend content={renderLegend} />
          )}

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
  );
};

