import * as React from "react";
import type { ActivityProgressCardData, ProgressItem } from "./activity-progress-card";

// Source data interface without maxValue and totalValue (totalValue is calculated from segments)
interface ProgressItemSource {
  label: string;
  segments: number[]; // Array of segment values (colors are assigned automatically)
}

interface ActivityProgressCardDataSource {
  title: string;
  icon?: string | React.ReactNode;
  items: ProgressItemSource[];
}



// Source data object without maxValue
export const activityProgressCardDataSourceObject: Record<string, ActivityProgressCardDataSource> = {
  activityProgressCardData: {
    title: "Yoga",
    icon: "self_improvement",
    items: [
      {
        label: "R&D",
        segments: [64]
      },
      {
        label: "Referred",
        segments: [50, 22]
      },
      {
        label: "Connecting",
        segments: [32]
      },
      {
        label: "Pipeline",
        segments: [12]
      }
    ]
  },

  swimmingActivityData: {
    title: "Swimming",
    icon: "pool",
    items: [
      {
        label: "R&D",
        segments: [48]
      },
      {
        label: "Referred",
        segments: [24]
      },
      {
        label: "Connecting",
        segments: [12]
      },
      {
        label: "Pipeline",
        segments: [2]
      }
    ]
  },

  runningActivityData: {
    title: "Running",
    icon: "directions_run",
    items: [
      {
        label: "R&D",
        segments: [12]
      },
      {
        label: "Referred",
        segments: [12]
      },
      {
        label: "Connecting",
        segments: [8]
      },
      {
        label: "Pipeline",
        segments: [2]
      }
    ]
  },

  cyclingActivityData: {
    title: "Cycling",
    icon: "directions_bike",
    items: [
      {
        label: "R&D",
        segments: [28]
      },
      {
        label: "Referred",
        segments: [18]
      },
      {
        label: "Connecting",
        segments: [12]
      },
      {
        label: "Pipeline",
        segments: [2]
      }
    ]
  },

  hikingActivityData: {
    title: "Hiking",
    icon: "hiking",
    items: [
      {
        label: "R&D",
        segments: [28]
      },
      {
        label: "Referred",
        segments: [20]
      },
      {
        label: "Connecting",
        segments: [12]
      },
      {
        label: "Pipeline",
        segments: [4]
      }
    ]
  },

  gymActivityData: {
    title: "Gym Training",
    icon: "fitness_center",
    items: [
      {
        label: "R&D",
        segments: [20]
      },
      {
        label: "Referred",
        segments: [10]
      },
      {
        label: "Connecting",
        segments: [0]
      },
      {
        label: "Pipeline",
        segments: [0]
      }
    ]
  },
};

// Helper function to calculate totalValue from segments
function calculateTotalValue(segments: number[]): number {
  return segments.reduce((sum, value) => sum + value, 0);
}

// Helper function to get color for a segment based on its index
function getSegmentColor(index: number): string {
  if (index === 0) return "rgba(255, 70, 70, 1)";
  if (index === 1) return "rgba(255, 70, 70, 0.5)";
  if (index === 2) return "rgba(255, 70, 70, 0.25)";
  // For other indices, use a default color
  return "rgba(255, 70, 70, 0.1)";
}

// Calculate the sum of all "R&D" items' segments across all activities
function calculateAllRdSegmentsSum(sourceObject: Record<string, ActivityProgressCardDataSource>): number {
  return Object.values(sourceObject).reduce((sum, activity) => {
    const rdItem = activity.items[0]; // R&D is always the first item
    const rdTotalValue = calculateTotalValue(rdItem.segments);
    return sum + rdTotalValue;
  }, 0);
}

// Function to calculate maxValue for each item
// maxValue should be equal to the sum of all "R&D" items' segments across all activities
// All items in all activities use the same maxValue
function calculateMaxValue(
  source: ActivityProgressCardDataSource,
  allRdSegmentsSum: number
): ActivityProgressCardData {
  // All items use the same maxValue (sum of all R&D segments across all activities)
  return {
    items: source.items.map((item): ProgressItem => {
      const totalValue = calculateTotalValue(item.segments);
      // Convert number[] segments to ProgressSegment[] with colors based on index
      const segmentsWithColors = item.segments.map((value, index) => ({
        value,
        color: getSegmentColor(index),
      }));
      return {
        label: item.label,
        totalValue,
        maxValue: allRdSegmentsSum,
        segments: segmentsWithColors,
      };
    }),
  };
}

// Calculate the sum of all "R&D" items' segments across all activities
const allRdSegmentsSum = calculateAllRdSegmentsSum(activityProgressCardDataSourceObject);

// Calculate activityProgressCardDataObject from source
export const activityProgressCardDataObject = {
  activityProgressCardData: calculateMaxValue(activityProgressCardDataSourceObject.activityProgressCardData, allRdSegmentsSum),
  swimmingActivityData: calculateMaxValue(activityProgressCardDataSourceObject.swimmingActivityData, allRdSegmentsSum),
  runningActivityData: calculateMaxValue(activityProgressCardDataSourceObject.runningActivityData, allRdSegmentsSum),
  cyclingActivityData: calculateMaxValue(activityProgressCardDataSourceObject.cyclingActivityData, allRdSegmentsSum),
  hikingActivityData: calculateMaxValue(activityProgressCardDataSourceObject.hikingActivityData, allRdSegmentsSum),
  gymActivityData: calculateMaxValue(activityProgressCardDataSourceObject.gymActivityData, allRdSegmentsSum),
};

// Calculate summary data: sum of all items with the same label across all activities
// For each segment index position, sum all corresponding segments from all activities
export function calculateSummaryActivityProgressCardData(): ActivityProgressCardData {
  const labelOrder = ["R&D", "Referred", "Connecting", "Pipeline"];
  const summaryItems: ProgressItem[] = [];

  // For each label, sum up segments by index position across all activities
  labelOrder.forEach((label) => {
    // Collect all items with this label from all activities
    const itemsWithLabel = Object.values(activityProgressCardDataSourceObject)
      .map((activity) => activity.items.find((item) => item.label === label))
      .filter((item): item is ProgressItemSource => item !== undefined);

    // Find the maximum number of segments across all items with this label
    const maxSegmentsLength = Math.max(
      ...itemsWithLabel.map((item) => item.segments.length),
      0
    );

    // Sum segments by index position (0-th, 1-th, 2-th, etc.)
    const summarySegments: number[] = [];
    for (let segmentIndex = 0; segmentIndex < maxSegmentsLength; segmentIndex++) {
      let segmentSum = 0;
      itemsWithLabel.forEach((item) => {
        // If this item has a segment at this index, add it to the sum
        if (segmentIndex < item.segments.length) {
          segmentSum += item.segments[segmentIndex];
        }
      });
      summarySegments.push(segmentSum);
    }

    // Calculate totalValue from summary segments
    const totalValue = calculateTotalValue(summarySegments);

    // Convert to ProgressSegment[] with colors based on index
    const segmentsWithColors = summarySegments.map((value, index) => ({
      value,
      color: getSegmentColor(index),
    }));

    summaryItems.push({
      label,
      totalValue,
      maxValue: allRdSegmentsSum,
      segments: segmentsWithColors,
    });
  });

  return {
    items: summaryItems,
  };
}

export const summaryActivityProgressCardData = calculateSummaryActivityProgressCardData();
