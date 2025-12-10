import type { PieChartDataItem, ChartDataPoint, SeriesConfig, ProgressBarData, CategoryData } from "../../../../components";
import type { KpiData } from "../../../../components/widgets/widet-components/kpi-ring-chart";

export const pieChartData: PieChartDataItem[] = [
  {
    id: "1",
    name: "Train",
    icon: "fitness_center",
    valueArray: [
      [{ value: 50, unit: "%", color: "#FF5252" }],
      [{ value: 78, unit: "pax", color: "#FF5252" }],
    ],
  },
  {
    id: "2",
    name: "Tennis",
    icon: "sports_tennis",
    valueArray: [
      [{ value: 12, unit: "%", color: "#FF8A80" }],
      [{ value: 78, unit: "pax", color: "#FF8A80" }],
    ],
  },
  {
    id: "3",
    name: "Yoga",
    icon: "self_improvement",
    valueArray: [
      [{ value: 13, unit: "%", color: "#FFCDD2" }],
      [{ value: 26, unit: "pax", color: "#FFCDD2" }],
    ],
  },
  {
    id: "4",
    name: "Ski",
    icon: "downhill_skiing",
    valueArray: [
      [{ value: 11, unit: "%", color: "#90CAF9" }],
      [{ value: 13, unit: "pax", color: "#90CAF9" }],
    ],
  },
  {
    id: "5",
    name: "Other",
    icon: "search",
    valueArray: [
      [{ value: 14, unit: "%", color: "#E0E0E0" }],
      [{ value: 21, unit: "pax", color: "#E0E0E0" }],
    ],
  },
];


export const kpiRingChartData: KpiData[] = [
  {
    title: "Train",
    icon: "fitness_center",
    metrics: [
      {
        id: "distribution",
        label: "Distribution",
        percentage: 50,
        current: 50,
        total: 100,
        unit: "pax",
        color: "#FF5252", // Red
      },
      {
        id: "ambassadors",
        label: "Ambassadors",
        percentage: 50,
        current: 78,
        total: 156,
        unit: "pax",
        color: "#F48FB1", // Pink
      },
    ],
  },
  {
    title: "Tennis",
    icon: "sports_tennis",
    metrics: [
      {
        id: "distribution",
        label: "Distribution",
        percentage: 12,
        current: 32,
        total: 100,
        unit: "pax",
        color: "#FF5252", // Red
      },
      {
        id: "ambassadors",
        label: "Ambassadors",
        percentage: 12,
        current: 78,
        total: 650,
        unit: "pax",
        color: "#F48FB1", // Pink
      },
    ],
  },
  {
    title: "Yoga",
    icon: "self_improvement",
    metrics: [
      {
        id: "distribution",
        label: "Distribution",
        percentage: 13,
        current: 13,
        total: 100,
        unit: "pax",
        color: "#FF5252", // Red
      },
      {
        id: "ambassadors",
        label: "Ambassadors",
        percentage: 13,
        current: 26,
        total: 200,
        unit: "pax",
        color: "#F48FB1", // Pink
      },
    ],
  },
  {
    title: "Ski",
    icon: "downhill_skiing",
    metrics: [
      {
        id: "distribution",
        label: "Distribution",
        percentage: 11,
        current: 11,
        total: 100,
        unit: "pax",
        color: "#FF5252", // Red
      },
      {
        id: "ambassadors",
        label: "Ambassadors",
        percentage: 11,
        current: 13,
        total: 118,
        unit: "pax",
        color: "#F48FB1", // Pink
      },
    ],
  },
  {
    title: "Other",
    icon: "search",
    metrics: [
      {
        id: "distribution",
        label: "Distribution",
        percentage: 14,
        current: 14,
        total: 100,
        unit: "pax",
        color: "#FF5252", // Red
      },
      {
        id: "ambassadors",
        label: "Ambassadors",
        percentage: 14,
        current: 21,
        total: 150,
        unit: "pax",
        color: "#F48FB1", // Pink
      },
    ],
  },
  {
    title: "Train",
    icon: "fitness_center",
    metrics: [
      {
        id: "distribution",
        label: "Distribution",
        percentage: 50,
        current: 50,
        total: 100,
        unit: "pax",
        color: "#FF5252", // Red
      },
      {
        id: "ambassadors",
        label: "Ambassadors",
        percentage: 50,
        current: 78,
        total: 156,
        unit: "pax",
        color: "#F48FB1", // Pink
      },
    ],
  },
];

export const trendChartData: ChartDataPoint[] = [
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

export const trendChartSeriesConfig: SeriesConfig[] = [
  {
    key: 'used',
    title: 'Used',
    icon: 'crop_square',
    displayAs: 'column',
    color: '#ef4444',
    unit: 'hrs',
    selectable: true,
  },
  {
    key: 'planned',
    title: 'Planned',
    icon: 'crop_square',
    displayAs: 'column',
    color: '#e5e7eb',
    unit: 'hrs',
    selectable: false,
  },
];

export const progressBarData: ProgressBarData = {
  label: "SSC Requests",
  value: 110,
  total: 650,
  unit: "days",
  color: "#ef4444", // Red
};

export const chinaHeatMapCategories: CategoryData[] = [
  {
    icon: "🏃",
    term: "Run",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 15 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 12 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 11 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 10 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 9 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 9 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 8 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 11 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 10 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 8 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 0 },
    ],
  },
  {
    icon: "💪",
    term: "Train",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 13 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 14 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 10 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 11 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 9 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 11 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 12 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 10 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 9 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 9 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 8 },
    ],
  },
  {
    icon: "🧘",
    term: "Yoga",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 11 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 8 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 10 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 12 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 10 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 9 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 13 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 9 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 8 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 7 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 7 },
    ],
  },
  {
    icon: "🤸",
    term: "Other",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 7 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 6 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 5 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 5 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 5 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 5 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 6 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 5 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 4 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 4 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 4 },
    ],
  },
  {
    icon: "🎾",
    term: "Tennis",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 28 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 7 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 6 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 7 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 6 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 6 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 5 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 6 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 5 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 5 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 4 },
    ],
  },
  {
    icon: "⛳",
    term: "Golf",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 6 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 5 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 7 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 6 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 5 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 6 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 4 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 5 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 4 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 5 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 3 },
    ],
  },
  {
    icon: "Σ",
    term: "Total",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 20 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 18 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 17 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 17 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 15 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 16 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 18 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 16 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 14 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 13 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 12 },
    ],
  },
  {
    icon: "♀",
    term: "Female",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 11 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 9 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 9 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 10 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 7 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 8 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 10 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 8 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 7 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 6 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 6 },
    ],
  },
  {
    icon: "♂",
    term: "Male",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 9 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 9 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 8 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 7 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 8 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 8 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 8 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 8 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 7 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 6 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 6 },
    ],
  },
];