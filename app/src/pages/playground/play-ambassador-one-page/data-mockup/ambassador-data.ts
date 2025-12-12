import type { ChartDataPoint, SeriesConfig, CategoryData } from "../../../../components";
import type { KpiData } from "../../../../components/widgets/widet-components/kpi-ring-chart";
import type { ActivityDistributionItem } from "../play-components/activity-distribution-pie-chart";
import type { MetricsDataByMonth } from '../types/metrics';
import type { 
  ActivityProgressCardData, 
  ProgressItem 
} from "../data-just-for-1-time-test/activity-progress-card";

/**
 * Main Ambassador Mockup Data Structure
 * Organized into three major sections: Roster Overview, Engagement Overview, and Pipeline Overview
 */
export const AmbassadorMockupData = {
  "roster-overview": {
    timeInterval: ["2025-4-1", "2026-3-31"] as [string, string],
    widgets: [
      {
        title: "Ambassador Total",
        icon: "accessibility_new",
        data: {
          value: 165,
          unit: "pax"
        }
      },
      {
        title: "By Athletic Discipline",
        icon: "pie_chart",
        data: [
          {
            id: "1",
            name: "Train",
            icon: "fitness_center",
            count: 78,
            unit: "pax",
            color: "#FF5252",
          },
          {
            id: "2",
            name: "Tennis",
            icon: "sports_tennis",
            count: 2,
            unit: "pax",
            color: "#FF8A80",
          },
          {
            id: "3",
            name: "Yoga",
            icon: "self_improvement",
            count: 61,
            unit: "pax",
            color: "#FFCDD2",
          },
          {
            id: "4",
            name: "Golf",
            icon: "golf_course",
            count: 0,
            unit: "pax",
            color: "#90CAF9",
          },
          {
            id: "5",
            name: "Run",
            icon: "directions_run",
            count: 21,
            unit: "pax",
            color: "#EF9A9A",
          },
          {
            id: "6",
            name: "Other",
            icon: "search",
            count: 3,
            unit: "pax",
            color: "#E0E0E0",
          },
        ] as ActivityDistributionItem[]
      },
      {
        title: "Geographic Breakdown",
        icon: "pie_chart",
        data: [
          {
            id: "1",
            name: "East",
            icon: "place",
            count: 92,
            unit: "pax",
            color: "#FF5252",
          },
          {
            id: "2",
            name: "Central",
            icon: "place",
            count: 48,
            unit: "pax",
            color: "#FF8A80",
          },
          {
            id: "3",
            name: "North East",
            icon: "place",
            count: 25,
            unit: "pax",
            color: "#FFCDD2",
          },
        ] as ActivityDistributionItem[]
      },
      {
        title: "By Tenure",
        icon: "pie_chart",
        data: [
          {
            id: "1",
            name: "New",
            icon: "fiber_new",
            count: 87,
            unit: "pax",
            color: "#FF5252",
          },
          {
            id: "2",
            name: "Renew",
            icon: "autorenew",
            count: 78,
            unit: "pax",
            color: "#FF8A80",
          },
        ] as ActivityDistributionItem[]
      },
      {
        title: "Sports Activities Distribution",
        icon: "map",
        data: {
          categories: [
            {
              icon: "Σ",
              term: "Sum",
              locations: [
                { name: "East", coordinates: [31.2304, 121.4737] as [number, number], radius: 92 },
                { name: "Central", coordinates: [30.5928, 114.3055] as [number, number], radius: 48 },
                { name: "North East", coordinates: [41.8057, 123.4328] as [number, number], radius: 25 },
              ],
            },
            {
              icon: "🏃",
              term: "Run",
              locations: [
                { name: "East", coordinates: [31.2304, 121.4737] as [number, number], radius: 12 },
                { name: "Central", coordinates: [30.5928, 114.3055] as [number, number], radius: 7 },
                { name: "North East", coordinates: [41.8057, 123.4328] as [number, number], radius: 2 },
              ],
            },
            {
              icon: "💪",
              term: "Train",
              locations: [
                { name: "East", coordinates: [31.2304, 121.4737] as [number, number], radius: 45 },
                { name: "Central", coordinates: [30.5928, 114.3055] as [number, number], radius: 23 },
                { name: "North East", coordinates: [41.8057, 123.4328] as [number, number], radius: 10 },
              ],
            },
            {
              icon: "🧘",
              term: "Yoga",
              locations: [
                { name: "East", coordinates: [31.2304, 121.4737] as [number, number], radius: 30 },
                { name: "Central", coordinates: [30.5928, 114.3055] as [number, number], radius: 21 },
                { name: "North East", coordinates: [41.8057, 123.4328] as [number, number], radius: 10 },
              ],
            },
            {
              icon: "🎾",
              term: "Tennis",
              locations: [
                { name: "East", coordinates: [31.2304, 121.4737] as [number, number], radius: 1 },
                { name: "Central", coordinates: [30.5928, 114.3055] as [number, number], radius: 1 },
                { name: "North East", coordinates: [41.8057, 123.4328] as [number, number], radius: 0 },
              ],
            },
            {
              icon: "⛳",
              term: "Golf",
              locations: [
                { name: "East", coordinates: [31.2304, 121.4737] as [number, number], radius: 0 },
                { name: "Central", coordinates: [30.5928, 114.3055] as [number, number], radius: 0 },
                { name: "North East", coordinates: [41.8057, 123.4328] as [number, number], radius: 0 },
              ],
            },
            {
              icon: "🤸",
              term: "Other",
              locations: [
                { name: "East", coordinates: [31.2304, 121.4737] as [number, number], radius: 2 },
                { name: "Central", coordinates: [30.5928, 114.3055] as [number, number], radius: 1 },
                { name: "North East", coordinates: [41.8057, 123.4328] as [number, number], radius: 0 },
              ],
            },
            {
              icon: "♀",
              term: "Female",
              locations: [
                { name: "East", coordinates: [31.2304, 121.4737] as [number, number], radius: 52 },
                { name: "Central", coordinates: [30.5928, 114.3055] as [number, number], radius: 27 },
                { name: "North East", coordinates: [41.8057, 123.4328] as [number, number], radius: 14 },
              ],
            },
            {
              icon: "♂",
              term: "Male",
              locations: [
                { name: "East", coordinates: [31.2304, 121.4737] as [number, number], radius: 40 },
                { name: "Central", coordinates: [30.5928, 114.3055] as [number, number], radius: 21 },
                { name: "North East", coordinates: [41.8057, 123.4328] as [number, number], radius: 11 },
              ],
            },
          ] as CategoryData[],
          center: [33.8, 114.1] as [number, number],
          zoom: 4.2,
          designProperties: {
            radiusFactor: 25000,
          }
        }
      }
    ]
  },
  
  "engagement-overview": {
    timeInterval: ["2025-4-1", "2026-3-31"] as [string, string],
    widgets: [
      {
        title: "Resource Planning",
        icon: "bar_chart",
        data: {
          chartData: [
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
          ] as ChartDataPoint[],
          series: [
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
          ] as SeriesConfig[]
        }
      },
      {
        title: "Total Service Days Used",
        icon: "bar_chart",
        data: {
          byMonth: {
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
            },
          } as MetricsDataByMonth
        }
      },
      {
        title: "Engagement by Athletic Discipline",
        icon: "sports",
        data: [
          {
            title: "Yoga",
            icon: "self_improvement",
            metrics: [
              {
                id: "service-days",
                label: "Service Days Used",
                current: 101,
                total: 244,
                unit: "days",
                color: "#FF5252",
              },
              {
                id: "ambassadors",
                label: "Ambassadors Engaged",
                current: 46,
                total: 61,
                unit: "pax",
                color: "#F48FB1",
              },
            ],
          },
          {
            title: "Train",
            icon: "fitness_center",
            metrics: [
              {
                id: "service-days",
                label: "Service Days Used",
                current: 131,
                total: 372,
                unit: "days",
                color: "#FF5252",
              },
              {
                id: "ambassadors",
                label: "Ambassadors Engaged",
                current: 58,
                total: 78,
                unit: "pax",
                color: "#F48FB1",
              },
            ],
          },
          {
            title: "Run",
            icon: "directions_run",
            metrics: [
              {
                id: "service-days",
                label: "Service Days Used",
                current: 44,
                total: 84,
                unit: "days",
                color: "#FF5252",
              },
              {
                id: "ambassadors",
                label: "Ambassadors Engaged",
                current: 16,
                total: 21,
                unit: "pax",
                color: "#F48FB1",
              },
            ],
          },
          {
            title: "Tennis",
            icon: "sports_tennis",
            metrics: [
              {
                id: "service-days",
                label: "Service Days Used",
                current: 4,
                total: 8,
                unit: "days",
                color: "#FF5252",
              },
              {
                id: "ambassadors",
                label: "Ambassadors Engaged",
                current: 2,
                total: 2,
                unit: "pax",
                color: "#F48FB1",
              },
            ],
          },
          {
            title: "Golf",
            icon: "golf_course",
            metrics: [
              {
                id: "service-days",
                label: "Service Days Used",
                current: 0,
                total: 0,
                unit: "days",
                color: "#FF5252",
              },
              {
                id: "ambassadors",
                label: "Ambassadors Engaged",
                current: 0,
                total: 0,
                unit: "pax",
                color: "#F48FB1",
              },
            ],
          },
          {
            title: "Other",
            icon: "search",
            metrics: [
              {
                id: "service-days",
                label: "Service Days Used",
                current: 1,
                total: 12,
                unit: "days",
                color: "#FF5252",
              },
              {
                id: "ambassadors",
                label: "Ambassadors Engaged",
                current: 1,
                total: 3,
                unit: "pax",
                color: "#F48FB1",
              },
            ],
          },
        ] as KpiData[]
      }
    ]
  },
  
  "pipeline-overview": {
    timeInterval: ["2025-4-1", "2026-3-31"] as [string, string],
    widgets: [
      {
        title: "Summary",
        icon: "tornado",
        data: {
          items: [
            {
              label: "R&D",
              totalValue: 300,
              maxValue: 300,
              segments: [
                { value: 300, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Referred",
              totalValue: 156,
              maxValue: 300,
              segments: [
                { value: 134, color: "rgba(255, 70, 70, 1)" },
                { value: 22, color: "rgba(255, 70, 70, 0.5)" }
              ],
            },
            {
              label: "Connecting",
              totalValue: 76,
              maxValue: 300,
              segments: [
                { value: 76, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Pipeline",
              totalValue: 22,
              maxValue: 300,
              segments: [
                { value: 22, color: "rgba(255, 70, 70, 1)" }
              ],
            },
          ] as ProgressItem[]
        } as ActivityProgressCardData
      },
      {
        title: "Yoga",
        icon: "self_improvement",
        data: {
          items: [
            {
              label: "R&D",
              totalValue: 164,
              maxValue: 300,
              segments: [
                { value: 164, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Referred",
              totalValue: 72,
              maxValue: 300,
              segments: [
                { value: 50, color: "rgba(255, 70, 70, 1)" },
                { value: 22, color: "rgba(255, 70, 70, 0.5)" }
              ],
            },
            {
              label: "Connecting",
              totalValue: 32,
              maxValue: 300,
              segments: [
                { value: 32, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Pipeline",
              totalValue: 12,
              maxValue: 300,
              segments: [
                { value: 12, color: "rgba(255, 70, 70, 1)" }
              ],
            },
          ] as ProgressItem[]
        } as ActivityProgressCardData
      },
      {
        title: "Swimming",
        icon: "pool",
        data: {
          items: [
            {
              label: "R&D",
              totalValue: 48,
              maxValue: 300,
              segments: [
                { value: 48, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Referred",
              totalValue: 24,
              maxValue: 300,
              segments: [
                { value: 24, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Connecting",
              totalValue: 12,
              maxValue: 300,
              segments: [
                { value: 12, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Pipeline",
              totalValue: 2,
              maxValue: 300,
              segments: [
                { value: 2, color: "rgba(255, 70, 70, 1)" }
              ],
            },
          ] as ProgressItem[]
        } as ActivityProgressCardData
      },
      {
        title: "Running",
        icon: "directions_run",
        data: {
          items: [
            {
              label: "R&D",
              totalValue: 12,
              maxValue: 300,
              segments: [
                { value: 12, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Referred",
              totalValue: 12,
              maxValue: 300,
              segments: [
                { value: 12, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Connecting",
              totalValue: 8,
              maxValue: 300,
              segments: [
                { value: 8, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Pipeline",
              totalValue: 2,
              maxValue: 300,
              segments: [
                { value: 2, color: "rgba(255, 70, 70, 1)" }
              ],
            },
          ] as ProgressItem[]
        } as ActivityProgressCardData
      },
      {
        title: "Cycling",
        icon: "directions_bike",
        data: {
          items: [
            {
              label: "R&D",
              totalValue: 28,
              maxValue: 300,
              segments: [
                { value: 28, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Referred",
              totalValue: 18,
              maxValue: 300,
              segments: [
                { value: 18, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Connecting",
              totalValue: 12,
              maxValue: 300,
              segments: [
                { value: 12, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Pipeline",
              totalValue: 2,
              maxValue: 300,
              segments: [
                { value: 2, color: "rgba(255, 70, 70, 1)" }
              ],
            },
          ] as ProgressItem[]
        } as ActivityProgressCardData
      },
      {
        title: "Hiking",
        icon: "hiking",
        data: {
          items: [
            {
              label: "R&D",
              totalValue: 28,
              maxValue: 300,
              segments: [
                { value: 28, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Referred",
              totalValue: 20,
              maxValue: 300,
              segments: [
                { value: 20, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Connecting",
              totalValue: 12,
              maxValue: 300,
              segments: [
                { value: 12, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Pipeline",
              totalValue: 4,
              maxValue: 300,
              segments: [
                { value: 4, color: "rgba(255, 70, 70, 1)" }
              ],
            },
          ] as ProgressItem[]
        } as ActivityProgressCardData
      },
      {
        title: "Gym Training",
        icon: "fitness_center",
        data: {
          items: [
            {
              label: "R&D",
              totalValue: 20,
              maxValue: 300,
              segments: [
                { value: 20, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Referred",
              totalValue: 10,
              maxValue: 300,
              segments: [
                { value: 10, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Connecting",
              totalValue: 0,
              maxValue: 300,
              segments: [
                { value: 0, color: "rgba(255, 70, 70, 1)" }
              ],
            },
            {
              label: "Pipeline",
              totalValue: 0,
              maxValue: 300,
              segments: [
                { value: 0, color: "rgba(255, 70, 70, 1)" }
              ],
            },
          ] as ProgressItem[]
        } as ActivityProgressCardData
      }
    ]
  }
};

/**
 * Helper function to render time interval as display string
 * Example: ["2025-4-1", "2026-3-31"] => "Apr 1, 2025 – Mar 31, 2026"
 */
export function formatTimeInterval(interval: [string, string]): string {
  const [start, end] = interval;
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[month - 1]} ${day}, ${year}`;
  };
  return `${formatDate(start)} – ${formatDate(end)}`;
}

