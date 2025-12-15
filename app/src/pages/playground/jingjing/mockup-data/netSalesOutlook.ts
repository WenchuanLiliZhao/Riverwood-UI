export interface DistributionSegment {
  id: string;
  value: number;
  color: string;
  label: string;
  change: {
    value: number;
    direction: "up" | "down";
  };
}

export interface LowerItem {
  title: string;
  valueCurrent: number;
  change: {
    value: number;
    direction: "up" | "down";
  };
}

export interface NetSalesOutlookData {
  currency: string;
  valueCurrent: number;
  valueTarget: number;
  distributionUnit: string;
  segments: DistributionSegment[];
  lowerItems: LowerItem[];
}

export const netSalesOutlookData: NetSalesOutlookData = {
  currency: "¥",
  valueCurrent: 290909,
  valueTarget: 297356,
  distributionUnit: "pts",
  segments: [
    {
      id: "women",
      value: 67,
      color: "#FF4646", // Red
      label: "Women",
      change: {
        value: 6,
        direction: "down",
      },
    },
    {
      id: "men",
      value: 3,
      color: "#A1B5FF", // Light blue/periwinkle
      label: "Men",
      change: {
        value: 12,
        direction: "up",
      },
    },
    {
      id: "acc",
      value: 14,
      color: "#E092FF", // Light purple/lavender
      label: "Acc",
      change: {
        value: 6,
        direction: "down",
      },
    },
    {
      id: "ftw",
      value: 16,
      color: "#FFC146", // Orange/golden yellow
      label: "FTW",
      change: {
        value: 12,
        direction: "up",
      },
    },
  ],
  lowerItems: [
    {
      title: "XStore",
      valueCurrent: 220976,
      change: {
        value: 12,
        direction: "up",
      },
    },
    {
      title: "XStore",
      valueCurrent: 69933,
      change: {
        value: 10,
        direction: "down",
      },
    },
  ],
};

