import { TrendChart, type ChartDataPoint, type SeriesConfig } from "../../../components";


export const TrendChartDebug = () => {
  // Mock Data (Plan B Structure)
  const chartData: ChartDataPoint[] = [
    { label: 'APR', used: 32, planned: 0 },
    { label: 'MAY', used: 21, planned: 0 },
    { label: 'JUN', used: 33, planned: 0 },
    { label: 'JUL', used: 46, planned: 0 },
    { label: 'AUG', used: 55, planned: 0 },
    { label: 'SEP', used: 18, planned: 0 },
    { label: 'OCT', used: 44, planned: 0 },
    { label: 'NOV', used: 15, planned: 0 },
    { label: 'DEC', used: 0, planned: 6 },
    { label: 'JAN', used: 0, planned: 0 },
    { label: 'FEB', used: 0, planned: 0 },
    { label: 'MAR', used: 0, planned: 0 },
  ];

  const seriesConfig: SeriesConfig[] = [
    {
      key: 'used',
      title: 'Used',
      icon: 'circle', // Material icon name for a filled circle
      displayAs: 'column',
      color: '#ef4444', // Red
      unit: 'hrs'
    },
    {
      key: 'planned',
      title: 'Planned',
      icon: 'circle', 
      displayAs: 'column', // Or curve? Screenshot looked like columns for both, but maybe mixed.
      color: '#e5e7eb', // Light Gray
      unit: 'hrs'
    }
  ];
  
  // Mixed example
  const mixedData: ChartDataPoint[] = [
    { label: 'Mon', value: 10, trend: 12 },
    { label: 'Tue', value: 20, trend: 18 },
    { label: 'Wed', value: 15, trend: 22 },
    { label: 'Thu', value: 25, trend: 25 },
    { label: 'Fri', value: 30, trend: 28 },
  ];

  const mixedConfig: SeriesConfig[] = [
    {
      key: 'value',
      title: 'Sales',
      icon: 'bar_chart',
      displayAs: 'column',
      color: '#3b82f6',
    },
    {
      key: 'trend',
      title: 'Trend',
      icon: 'show_chart',
      displayAs: 'curve',
      color: '#10b981',
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Trend Chart Debug</h1>
      
      <section style={{ marginBottom: 40 }}>
        <h2>Case 1: Resource Planning (Columns)</h2>
        <div style={{ border: '1px solid #eee', padding: 20, borderRadius: 8, height: 300 }}>
          <TrendChart 
            data={chartData} 
            series={seriesConfig} 
            // height={350}
            xAxisPadding={{ left: 40, right: 40 }}
          />
        </div>
      </section>

      <section>
        <h2>Case 2: Mixed (Column + Curve)</h2>
        <div style={{ border: '1px solid #eee', padding: 20, borderRadius: 8, height: 300 }}>
          <TrendChart 
            data={mixedData} 
            series={mixedConfig} 
          />
        </div>
      </section>
    </div>
  );
};

