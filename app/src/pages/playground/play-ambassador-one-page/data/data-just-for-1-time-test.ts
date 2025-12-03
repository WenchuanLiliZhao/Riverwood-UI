import type { PieChartDataItem } from "../../../../components";

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