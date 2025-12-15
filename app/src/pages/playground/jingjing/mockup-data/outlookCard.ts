export interface OutlookBreakdownItem {
  title: string;
  value: number;
}

export type OutlookCardType = "variance" | "percentage";

export interface OutlookCardData {
  type: OutlookCardType;
  title: string;
  mainValue: number;
  currency?: string; // Only used for variance type
  breakdownItems: OutlookBreakdownItem[];
}

/**
 * Variance to Outlook - shows absolute difference
 * Positive values indicate above outlook, negative values indicate below outlook
 */
export const varianceToOutlookData: OutlookCardData = {
  type: "variance",
  title: "Var. to Outlook",
  currency: "¥",
  mainValue: 11553, // Positive value means above outlook
  breakdownItems: [
    {
      title: "XStore",
      value: 17328, // Positive
    },
    {
      title: "WeCom&VS",
      value: -5775, // Negative
    },
  ],
};

/**
 * Percentage to Outlook - shows percentage of outlook achieved
 * Values above 100 indicate above outlook, values below 100 indicate below outlook
 */
export const percentageToOutlookData: OutlookCardData = {
  type: "percentage",
  title: "% to Outlook",
  mainValue: 104.1, // 104.1% means 4.1% above outlook
  breakdownItems: [
    {
      title: "XStore",
      value: 106, // 106% means 6% above outlook
    },
    {
      title: "WeCom&VS",
      value: 63.2, // 63.2% means 36.8% below outlook
    },
  ],
};

