import React from 'react';
import { BaseTrendChart, type BaseTrendChartProps } from './_BaseTrendChart';

export type TrendChartProps = BaseTrendChartProps;
export type { SeriesConfig, ChartDataPoint, SeriesDisplayType } from './_BaseTrendChart';

export const TrendChart = React.forwardRef<HTMLDivElement, TrendChartProps>((props, ref) => {
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <BaseTrendChart {...props} />
    </div>
  );
});

TrendChart.displayName = 'TrendChart';

