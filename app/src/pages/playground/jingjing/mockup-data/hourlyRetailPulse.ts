export type FeedbackType = "thumbsUp" | "thumbsDown" | null;

export const FEEDBACK_PRESET_REASONS = [
  "I love this design!",
  "Great layout, but the fonts could be improved.",
  "Could we explore different color schemes?",
  "The data visualization is clear and helpful.",
] as const;

export type FeedbackCategory = "traffic" | "product" | "labor";

export interface FeedbackCategoryData {
  id: FeedbackCategory;
  label: string;
  reasons: readonly string[];
}

export const FEEDBACK_THUMBS_DOWN_CATEGORIES: readonly FeedbackCategoryData[] = [
  {
    id: "traffic",
    label: "Traffic & Conversion",
    reasons: [
      "Lower-than-expected traffic",
      "Short-term floor overload",
      "Low Try-on Rate",
    ],
  },
  {
    id: "product",
    label: "Product Related",
    reasons: [
      "Product availability issues",
      "Pricing concerns",
      "Product quality feedback",
    ],
  },
  {
    id: "labor",
    label: "Labor Related",
    reasons: [
      "Insufficient staff coverage",
      "Training needs",
      "Scheduling conflicts",
    ],
  },
] as const;

export interface HourlyRetailPulseRowData {
  timeSlot: string;
  netSales: number | null;
  netSalesOutlook: number | null;
  percentToOutlook: number | null; // Percentage value (e.g., 95.5 means 95.5%)
  txn: number | null;
  txnGoal: number | null;
  aov: number | null;
  upt: number | null;
  cr: number | null; // Percentage value (e.g., 8.4 means 8.4%)
  isSummary?: boolean;
  feedback?: FeedbackType;
}

export interface HourlyRetailPulseData {
  currentSales: number;
  targetSales: number;
  currency: string;
  rows: HourlyRetailPulseRowData[];
}

export type ChartMetric = "netSales" | "trafficCR" | "txn" | "aov" | "upt";

export interface ChartDataPoint {
  label: string;
  current: number;
  lastWeek: number;
  outlook: number;
}

export interface ChartMetricData {
  metric: ChartMetric;
  label: string;
  data: ChartDataPoint[];
  unit: string;
}

export const hourlyRetailPulseChartData: Record<ChartMetric, ChartMetricData> = {
  netSales: {
    metric: "netSales",
    label: "Net Sales",
    unit: "¥",
    data: [
      { label: "10:00 ~ 12:00", current: 18000, lastWeek: 15000, outlook: 30000 },
      { label: "12:00 ~ 14:00", current: 38000, lastWeek: 29000, outlook: 48000 },
      { label: "14:00 ~ 16:00", current: 25000, lastWeek: 20000, outlook: 29000 },
      { label: "16:00 ~ 18:00", current: 44000, lastWeek: 33000, outlook: 45000 },
      { label: "18:00 ~ 20:00", current: 33000, lastWeek: 28000, outlook: 38000 },
    ],
  },
  trafficCR: {
    metric: "trafficCR",
    label: "Traffic-CR",
    unit: "%",
    data: [
      { label: "10:00 ~ 12:00", current: 8.5, lastWeek: 7.8, outlook: 9.0 },
      { label: "12:00 ~ 14:00", current: 9.1, lastWeek: 8.2, outlook: 9.5 },
      { label: "14:00 ~ 16:00", current: 8.8, lastWeek: 7.5, outlook: 9.2 },
      { label: "16:00 ~ 18:00", current: 9.3, lastWeek: 8.8, outlook: 9.6 },
      { label: "18:00 ~ 20:00", current: 9.6, lastWeek: 8.5, outlook: 10.0 },
    ],
  },
  txn: {
    metric: "txn",
    label: "TXN",
    unit: "",
    data: [
      { label: "10:00 ~ 12:00", current: 16, lastWeek: 14, outlook: 17 },
      { label: "12:00 ~ 14:00", current: 19, lastWeek: 18, outlook: 21 },
      { label: "14:00 ~ 16:00", current: 17, lastWeek: 13, outlook: 18 },
      { label: "16:00 ~ 18:00", current: 18, lastWeek: 20, outlook: 19 },
      { label: "18:00 ~ 20:00", current: 21, lastWeek: 17, outlook: 22 },
    ],
  },
  aov: {
    metric: "aov",
    label: "AOV",
    unit: "¥",
    data: [
      { label: "10:00 ~ 12:00", current: 1605, lastWeek: 1571, outlook: 1559 },
      { label: "12:00 ~ 14:00", current: 1644, lastWeek: 1611, outlook: 1562 },
      { label: "14:00 ~ 16:00", current: 1674, lastWeek: 1538, outlook: 1622 },
      { label: "16:00 ~ 18:00", current: 1673, lastWeek: 1650, outlook: 1642 },
      { label: "18:00 ~ 20:00", current: 1680, lastWeek: 1647, outlook: 1673 },
    ],
  },
  upt: {
    metric: "upt",
    label: "UPT",
    unit: "",
    data: [
      { label: "10:00 ~ 12:00", current: 1.6, lastWeek: 1.5, outlook: 1.6 },
      { label: "12:00 ~ 14:00", current: 1.7, lastWeek: 1.6, outlook: 1.7 },
      { label: "14:00 ~ 16:00", current: 1.6, lastWeek: 1.4, outlook: 1.7 },
      { label: "16:00 ~ 18:00", current: 1.7, lastWeek: 1.7, outlook: 1.7 },
      { label: "18:00 ~ 20:00", current: 1.8, lastWeek: 1.6, outlook: 1.8 },
    ],
  },
};

export const hourlyRetailPulseData: HourlyRetailPulseData = {
  currency: "¥",
  currentSales: 220976,
  targetSales: 230000,
  rows: [
    {
      timeSlot: "06:00–08:00",
      netSales: 12450,
      netSalesOutlook: 13500,
      percentToOutlook: 92.2,
      txn: 8,
      txnGoal: 10,
      aov: 1556,
      upt: 1.3,
      cr: 6.2,
      feedback: "thumbsUp",
    },
    {
      timeSlot: "08:00–10:00",
      netSales: 18920,
      netSalesOutlook: 19800,
      percentToOutlook: 95.6,
      txn: 12,
      txnGoal: 13,
      aov: 1577,
      upt: 1.5,
      cr: 7.8,
      feedback: "thumbsDown",
    },
    {
      timeSlot: "10:00–12:00",
      netSales: 25680,
      netSalesOutlook: 26500,
      percentToOutlook: 96.9,
      txn: 16,
      txnGoal: 17,
      aov: 1605,
      upt: 1.6,
      cr: 8.5,
      feedback: null,
    },
    {
      timeSlot: "12:00–14:00",
      netSales: 31240,
      netSalesOutlook: 32800,
      percentToOutlook: 95.2,
      txn: 19,
      txnGoal: 21,
      aov: 1644,
      upt: 1.7,
      cr: 9.1,
      feedback: "thumbsUp",
    },
    {
      timeSlot: "14:00–16:00",
      netSales: 28450,
      netSalesOutlook: 29200,
      percentToOutlook: 97.4,
      txn: 17,
      txnGoal: 18,
      aov: 1674,
      upt: 1.6,
      cr: 8.8,
      feedback: "thumbsDown",
    },
    {
      timeSlot: "16:00–18:00",
      netSales: 30120,
      netSalesOutlook: 31200,
      percentToOutlook: 96.5,
      txn: 18,
      txnGoal: 19,
      aov: 1673,
      upt: 1.7,
      cr: 9.3,
      feedback: null,
    },
    {
      timeSlot: "18:00–20:00",
      netSales: 35280,
      netSalesOutlook: 36800,
      percentToOutlook: 95.9,
      txn: 21,
      txnGoal: 22,
      aov: 1680,
      upt: 1.8,
      cr: 9.6,
      feedback: "thumbsUp",
    },
    {
      timeSlot: "20:00–22:00",
      netSales: 28960,
      netSalesOutlook: 30100,
      percentToOutlook: 96.2,
      txn: 17,
      txnGoal: 18,
      aov: 1704,
      upt: 1.7,
      cr: 8.9,
      feedback: "thumbsDown",
    },
    {
      timeSlot: "22:00–24:00",
      netSales: 9876,
      netSalesOutlook: 11000,
      percentToOutlook: 89.8,
      txn: 6,
      txnGoal: 7,
      aov: 1646,
      upt: 1.4,
      cr: 7.2,
      feedback: null,
    },
    {
      timeSlot: "Summary",
      netSales: 220976,
      netSalesOutlook: 230000,
      percentToOutlook: 96.1,
      txn: 134,
      txnGoal: 145,
      aov: 1649,
      upt: 1.6,
      cr: 8.7,
      isSummary: true,
    },
  ],
};

