export type ChangeUnit = "percentage" | "points";

export interface KPIMetricData {
  title: string;
  value: number;
  valueIsPercentage: boolean; // Whether the value itself should display with % symbol
  change: {
    value: number;
    unit: ChangeUnit; // "percentage" for %, "points" for pts
    direction: "up" | "down";
  };
}

export const kpiMetricsData: Record<string, KPIMetricData> = {
  txn: {
    title: "TXN",
    value: 185,
    valueIsPercentage: false,
    change: {
      value: 6,
      unit: "percentage",
      direction: "down",
    },
  },
  aov: {
    title: "AOV",
    value: 1519,
    valueIsPercentage: false,
    change: {
      value: 6,
      unit: "percentage",
      direction: "down",
    },
  },
  upt: {
    title: "UPT",
    value: 1.6,
    valueIsPercentage: false,
    change: {
      value: 6,
      unit: "percentage",
      direction: "down",
    },
  },
  cr: {
    title: "CR",
    value: 8.4,
    valueIsPercentage: true, // 8.4% - value itself is a percentage
    change: {
      value: 6,
      unit: "points", // 6pts - change is in percentage points
      direction: "down",
    },
  },
  traffic: {
    title: "Traffic",
    value: 2203,
    valueIsPercentage: false,
    change: {
      value: 6,
      unit: "percentage",
      direction: "down",
    },
  },
  frUtilization: {
    title: "FR Utilization %",
    value: 40.8,
    valueIsPercentage: true, // 40.8% - value itself is a percentage
    change: {
      value: 6,
      unit: "points", // 6pts - change is in percentage points
      direction: "down",
    },
  },
  tryOn: {
    title: "Try-on %",
    value: 20.1,
    valueIsPercentage: true, // 20.1% - value itself is a percentage
    change: {
      value: 6,
      unit: "points", // 6pts - change is in percentage points
      direction: "down",
    },
  },
  tryOnCR: {
    title: "Try-on CR %",
    value: 33.4,
    valueIsPercentage: true, // 33.4% - value itself is a percentage
    change: {
      value: 6,
      unit: "points", // 6pts - change is in percentage points
      direction: "down",
    },
  },
};

