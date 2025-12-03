import type { PieChartDataItem } from "../../../../components";
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