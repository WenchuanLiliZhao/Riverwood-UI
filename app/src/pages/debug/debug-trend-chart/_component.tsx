import { TrendChart, type ChartDataPoint, type SeriesConfig } from "../../../components";
import { WidgetFrame } from "../../../components/widgets/widget-frame";


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
      displayAs: 'column',
      color: '#ef4444', // Red
      unit: 'hrs',
      selectable: true, // Only 'used' series is selectable
    },
    {
      key: 'planned',
      title: 'Planned',
      displayAs: 'column', // Or curve? Screenshot looked like columns for both, but maybe mixed.
      color: '#e5e7eb', // Light Gray
      unit: 'hrs',
      selectable: false, // 'planned' series is not selectable
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
        <div style={{ border: '1px solid #eee', padding: 20, borderRadius: 8, height: 400 }}>
          <WidgetFrame
            nav={{
              icon: "bar_chart",
              title: "Resource Planning",
              controls: [],
            }}
          >
            <TrendChart 
              data={chartData} 
              series={seriesConfig} 
              // height={350}
              xAxisPadding={{ left: 40, right: 40 }}
              enableSelection={true}
              defaultSelectedNode={{ label: 'APR', seriesKey: 'used' }}
            />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 2: Mixed (Column + Curve)</h2>
        <div style={{ border: '1px solid #eee', padding: 20, borderRadius: 8, height: 400 }}>
          <WidgetFrame
            nav={{
              icon: "show_chart",
              title: "Sales Trend",
              controls: [],
            }}
          >
            <TrendChart 
              data={mixedData} 
              series={mixedConfig} 
            />
          </WidgetFrame>
        </div>
      </section>

      <section>
        <h2>Case 3: With Node Selection (Click nodes to select/deselect)</h2>
        <div style={{ border: '1px solid #eee', padding: 20, borderRadius: 8, height: 400 }}>
          <WidgetFrame
            nav={{
              icon: "show_chart",
              title: "Sales Trend with Selection",
              controls: [],
            }}
          >
            <TrendChart 
              data={mixedData} 
              series={mixedConfig}
              enableSelection={true}
              defaultSelectedNode={{ label: 'Mon', seriesKey: 'value' }}
            />
          </WidgetFrame>
        </div>
        <p style={{ marginTop: 10, color: '#666', fontSize: 14 }}>
          Click on any column or curve node to select it. Only one node can be selected at a time. Selected node has opacity 1, unselected nodes have opacity 0.475.
        </p>
      </section>
    </div>
  );
};

