import type { MetricsDataByMonth } from '../types/metrics';

/**
 * Complete metrics data for all months in the fiscal year
 * 
 * Business Rules:
 * - Total service days = 660 (165 ambassadors × 4 days minimum)
 * - Service days accumulate over the year (cumulative)
 * - Engagement percentage reflects unique ambassadors who have participated
 * - Progress bars show both completed work and specific category breakdowns
 */
export const metricsDataByMonth: MetricsDataByMonth = {
  APR: {
    month: "APR",
    serviceDays: {
      percentage: 44,
      current: 288,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 110, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 178, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 68,
      current: 112,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 74, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 79, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  MAY: {
    month: "MAY",
    serviceDays: {
      percentage: 47,
      current: 309,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 118, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 191, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 71,
      current: 117,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 77, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 83, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  JUN: {
    month: "JUN",
    serviceDays: {
      percentage: 52,
      current: 342,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 131, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 211, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 75,
      current: 124,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 82, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 88, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  JUL: {
    month: "JUL",
    serviceDays: {
      percentage: 59,
      current: 388,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 149, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 239, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 79,
      current: 130,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 86, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 93, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  AUG: {
    month: "AUG",
    serviceDays: {
      percentage: 67,
      current: 443,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 170, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 273, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 83,
      current: 137,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 90, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 98, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  SEP: {
    month: "SEP",
    serviceDays: {
      percentage: 70,
      current: 461,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 177, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 284, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 85,
      current: 140,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 92, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 101, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  OCT: {
    month: "OCT",
    serviceDays: {
      percentage: 77,
      current: 505,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 194, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 311, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 88,
      current: 145,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 95, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 105, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  NOV: {
    month: "NOV",
    serviceDays: {
      percentage: 79,
      current: 520,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 200, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 320, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 89,
      current: 147,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 97, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 107, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  DEC: {
    month: "DEC",
    serviceDays: {
      percentage: 80,
      current: 526,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 202, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 324, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far (projected)"
    },
    ambassadorsEngaged: {
      percentage: 90,
      current: 149,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 98, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 108, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term (projected)"
    }
  },
  JAN: {
    month: "JAN",
    serviceDays: {
      percentage: 82,
      current: 540,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 207, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 333, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far (projected)"
    },
    ambassadorsEngaged: {
      percentage: 92,
      current: 152,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 100, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 111, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term (projected)"
    }
  },
  FEB: {
    month: "FEB",
    serviceDays: {
      percentage: 88,
      current: 580,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 223, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 357, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far (projected)"
    },
    ambassadorsEngaged: {
      percentage: 94,
      current: 155,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 102, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 114, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term (projected)"
    }
  },
  MAR: {
    month: "MAR",
    serviceDays: {
      percentage: 95,
      current: 627,
      total: 660,
      unit: "days",
      trendData: [
        { label: "SSC Requests", color: "#ef4444", value: 241, total: 660, unit: "days" },
        { label: "Store Communities", color: "#ef4444", value: 386, total: 660, unit: "days" },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far (projected)"
    },
    ambassadorsEngaged: {
      percentage: 97,
      current: 160,
      total: 165,
      unit: "pax",
      trendData: [
        { label: "SSC Engaged", color: "#ef4444", value: 106, total: 165, unit: "pax" },
        { label: "Store Communities Engaged", color: "#ef4444", value: 118, total: 165, unit: "pax" },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term (projected)"
    }
  }
};
