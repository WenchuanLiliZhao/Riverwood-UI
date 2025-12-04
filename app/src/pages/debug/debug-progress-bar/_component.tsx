import * as React from "react";
import {
  ProgressBar,
  type ProgressBarData,
  type DistributionBarData,
  type ProgressBarDesignProperties,
  ProgressBarDefaultDesignProperties,
  WidgetFrame,
} from "../../../components";

export const ProgressBarDebug = () => {
  // Mock Data - Example 1: Progress Bar (from image)
  const progressBarData: ProgressBarData = {
    label: "SSC Requests",
    value: 110,
    total: 650,
    unit: "days",
    color: "#ef4444", // Red
  };

  // Mock Data - Example 2: Another Progress Bar
  const progressBarData2: ProgressBarData = {
    label: "Project Completion",
    value: 75,
    total: 100,
    unit: "%",
    color: "#10b981", // Green
  };

  // Mock Data - Example 3: Distribution Bar
  const distributionBarData: DistributionBarData = {
    label: "Task Distribution",
    segments: [
      {
        id: "completed",
        value: 45,
        color: "#10b981", // Green
        label: "Completed",
      },
      {
        id: "in-progress",
        value: 30,
        color: "#3b82f6", // Blue
        label: "In Progress",
      },
      {
        id: "pending",
        value: 25,
        color: "#f59e0b", // Orange
        label: "Pending",
      },
    ],
    total: 100,
    unit: "tasks",
  };

  // Mock Data - Example 4: Distribution Bar with More Segments
  const distributionBarData2: DistributionBarData = {
    label: "Sales by Region",
    segments: [
      {
        id: "north",
        value: 120,
        color: "#ef4444", // Red
        label: "North",
      },
      {
        id: "south",
        value: 85,
        color: "#f59e0b", // Orange
        label: "South",
      },
      {
        id: "east",
        value: 150,
        color: "#10b981", // Green
        label: "East",
      },
      {
        id: "west",
        value: 95,
        color: "#3b82f6", // Blue
        label: "West",
      },
    ],
    total: 450,
    unit: "units",
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Progress Bar / Distribution Bar Debug</h1>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 1: Progress Bar (from image example)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 120,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "trending_up",
              title: "SSC Requests Progress",
              controls: [],
            }}
          >
            <ProgressBar progressData={progressBarData} />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 2: Another Progress Bar</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 120,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "check_circle",
              title: "Project Status",
              controls: [],
            }}
          >
            <ProgressBar progressData={progressBarData2} />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 3: Distribution Bar (3 segments)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 120,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "pie_chart",
              title: "Task Distribution",
              controls: [],
            }}
          >
            <ProgressBar distributionData={distributionBarData} />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 4: Distribution Bar (4 segments)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 120,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "public",
              title: "Sales by Region",
              controls: [],
            }}
          >
            <ProgressBar distributionData={distributionBarData2} />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 5: Standalone (without WidetFrame)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: 600 }}>
            <ProgressBar progressData={progressBarData} />
          </div>
        </div>
      </section>

      <section>
        <h2>Case 6: Customize Design Properties</h2>
        <CustomizeDesignPropertiesExample
          progressData={progressBarData}
          distributionData={distributionBarData}
        />
      </section>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                      Customize Design Properties Example                  */
/* -------------------------------------------------------------------------- */

const CustomizeDesignPropertiesExample = ({
  progressData,
  distributionData,
}: {
  progressData: ProgressBarData;
  distributionData: DistributionBarData;
}) => {
  const [designProperties, setDesignProperties] =
    React.useState<ProgressBarDesignProperties>({
      height: ProgressBarDefaultDesignProperties.height,
      cornerRadius: ProgressBarDefaultDesignProperties.cornerRadius,
      distributionGap: ProgressBarDefaultDesignProperties.distributionGap,
    });

  const handleChange = (key: keyof ProgressBarDesignProperties, value: number) => {
    setDesignProperties((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetToDefaults = () => {
    setDesignProperties({
      height: ProgressBarDefaultDesignProperties.height,
      cornerRadius: ProgressBarDefaultDesignProperties.cornerRadius,
      distributionGap: ProgressBarDefaultDesignProperties.distributionGap,
    });
  };

  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: 20,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Controls */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          padding: 16,
          backgroundColor: "#f9fafb",
          borderRadius: 8,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#666",
              textTransform: "uppercase",
            }}
          >
            Height: {designProperties.height}px
          </label>
          <input
            title="Height"
            type="range"
            min="4"
            max="24"
            step="2"
            value={designProperties.height ?? ProgressBarDefaultDesignProperties.height}
            onChange={(e) => handleChange("height", parseInt(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#666",
              textTransform: "uppercase",
            }}
          >
            Corner Radius: {designProperties.cornerRadius}px
          </label>
          <input
            title="Corner Radius"
            type="range"
            min="0"
            max="12"
            step="1"
            value={
              designProperties.cornerRadius ??
              ProgressBarDefaultDesignProperties.cornerRadius
            }
            onChange={(e) =>
              handleChange("cornerRadius", parseInt(e.target.value))
            }
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#666",
              textTransform: "uppercase",
            }}
          >
            Distribution Gap: {designProperties.distributionGap}px
          </label>
          <input
            title="Distribution Gap"
            type="range"
            min="0"
            max="8"
            step="1"
            value={
              designProperties.distributionGap ??
              ProgressBarDefaultDesignProperties.distributionGap
            }
            onChange={(e) =>
              handleChange("distributionGap", parseInt(e.target.value))
            }
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button
          onClick={resetToDefaults}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f3f4f6",
            border: "1px solid #d1d5db",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Reset to Defaults
        </button>
      </div>

      {/* Chart Previews */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        <div
          style={{
            border: "1px solid #e5e7eb",
            padding: 20,
            borderRadius: 8,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ width: "100%" }}>
            <ProgressBar
              progressData={progressData}
              designProperties={designProperties}
            />
          </div>
        </div>

        <div
          style={{
            border: "1px solid #e5e7eb",
            padding: 20,
            borderRadius: 8,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ width: "100%" }}>
            <ProgressBar
              distributionData={distributionData}
              designProperties={designProperties}
            />
          </div>
        </div>
      </div>

      {/* Code Preview */}
      <details
        style={{
          backgroundColor: "#1f2937",
          color: "#f9fafb",
          padding: 16,
          borderRadius: 8,
          fontSize: 12,
          fontFamily: "monospace",
        }}
      >
        <summary style={{ cursor: "pointer", marginBottom: 8 }}>
          View Design Properties Code
        </summary>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {`designProperties={{
  height: ${designProperties.height},
  cornerRadius: ${designProperties.cornerRadius},
  distributionGap: ${designProperties.distributionGap},
}}`}
        </pre>
      </details>
    </div>
  );
};

