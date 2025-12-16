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

