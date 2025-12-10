// Progress bar segment with value and color
export interface ProgressSegment {
  value: number;        // The raw numerical value for this specific segment
  color: string;        // CSS color value (e.g., "#F44336", "#90CAF9", "red")
}

// Single progress item data
export interface ProgressItem {
  label: string;                    // Label text, e.g., "R&D", "Referred", "Connecting", "Pipeline"
  totalValue: number;               // Total value for this item (sum of all segments' values)
  maxValue: number;                 // Maximum possible value (used to calculate percentage and progress bar length)
  segments: ProgressSegment[];      // Array of colored segments that make up the progress bar
}

// Overall component data structure
export interface ActivityProgressCardData {
  title: string;                    // Card title, e.g., "Yoga"
  icon?: string | React.ReactNode;  // Optional icon (Material Icon name string or ReactNode)
  items: ProgressItem[];            // Array of progress items
}

// Example data based on the image
export const activityProgressCardData: ActivityProgressCardData = {
  title: "Yoga",
  icon: "self_improvement", // Material Icon name
  items: [
    {
      label: "R&D",
      totalValue: 64,
      maxValue: 133.33,  // 64 / 0.48 ≈ 133.33
      segments: [
        { value: 64, color: "#F44336" } // Red single segment
      ]
    },
    {
      label: "Referred",
      totalValue: 72,
      maxValue: 124.14,  // 72 / 0.58 ≈ 124.14
      segments: [
        { value: 50, color: "#F44336" },  // Red segment
        { value: 22, color: "#90CAF9" }   // Light blue segment
      ]
    },
    {
      label: "Connecting",
      totalValue: 64,
      maxValue: 133.33,  // Estimated based on similar pattern
      segments: [
        { value: 64, color: "#F44336" } // Red single segment
      ]
    },
    {
      label: "Pipeline",
      totalValue: 64,
      maxValue: 133.33,  // Estimated based on similar pattern
      segments: [
        { value: 64, color: "#F44336" } // Red single segment
      ]
    }
  ]
};
