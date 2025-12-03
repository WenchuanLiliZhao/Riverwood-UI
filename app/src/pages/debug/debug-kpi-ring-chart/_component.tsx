import * as React from "react";
import {
  KpiRingChart,
  type KpiData,
  type DesignProperties,
  DefaultDesignProperties,
  WidetFrame,
} from "../../../components";

export const KpiRingChartDebug = () => {
  // Mock Data - Example 1: Train Entity with Multiple Metrics
  const trainKpiData: KpiData = {
    title: "Train",
    icon: "fitness_center",
    metrics: [
      {
        id: "service-days",
        label: "Service Days Used",
        percentage: 35,
        current: 131,
        total: 372,
        unit: "days",
        color: "#FF5252", // Red
      },
      {
        id: "ambassadors",
        label: "Ambassadors Engaged",
        percentage: 74,
        current: 58,
        total: 78,
        unit: "pax",
        color: "#F48FB1", // Pink
      },
    ],
  };

  // Mock Data - Example 2: Single Metric
  const singleMetricKpiData: KpiData = {
    title: "Tennis",
    icon: "sports_tennis",
    metrics: [
      {
        id: "participation",
        label: "Participation Rate",
        percentage: 65,
        current: 52,
        total: 80,
        unit: "pax",
        color: "#42A5F5", // Blue
      },
    ],
  };

  // Mock Data - Example 3: Three Metrics
  const threeMetricsKpiData: KpiData = {
    title: "Yoga",
    icon: "self_improvement",
    metrics: [
      {
        id: "sessions",
        label: "Sessions Completed",
        percentage: 80,
        current: 24,
        total: 30,
        unit: "sessions",
        color: "#66BB6A", // Green
      },
      {
        id: "attendance",
        label: "Average Attendance",
        percentage: 60,
        current: 18,
        total: 30,
        unit: "pax",
        color: "#FFA726", // Orange
      },
      {
        id: "satisfaction",
        label: "Satisfaction Score",
        percentage: 90,
        current: 4.5,
        total: 5,
        unit: "stars",
        color: "#AB47BC", // Purple
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>KPI Ring Chart Debug</h1>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 1: Multiple Metrics (with WidetFrame)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidetFrame
            nav={{
              icon: "donut_small",
              title: "Train KPI Metrics",
              controls: [],
            }}
          >
            <KpiRingChart data={trainKpiData} />
          </WidetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 2: Single Metric</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidetFrame
            nav={{
              icon: "sports_tennis",
              title: "Tennis Participation",
              controls: [],
            }}
          >
            <KpiRingChart data={singleMetricKpiData} />
          </WidetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 3: Three Metrics</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidetFrame
            nav={{
              icon: "self_improvement",
              title: "Yoga Performance",
              controls: [],
            }}
          >
            <KpiRingChart data={threeMetricsKpiData} />
          </WidetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 4: Standalone (without WidetFrame)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KpiRingChart data={trainKpiData} />
        </div>
      </section>

      <section>
        <h2>Case 5: Customize Design Properties</h2>
        <CustomizeDesignPropertiesExample data={trainKpiData} />
      </section>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                      Customize Design Properties Example                  */
/* -------------------------------------------------------------------------- */

const CustomizeDesignPropertiesExample = ({ data }: { data: KpiData }) => {
  const [designProperties, setDesignProperties] =
    React.useState<DesignProperties>({
      outerRadius: DefaultDesignProperties.outerRadius,
      ringWidth: DefaultDesignProperties.ringWidth,
      ringGap: DefaultDesignProperties.ringGap,
    });

  const handleChange = (key: keyof DesignProperties, value: number) => {
    setDesignProperties((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetToDefaults = () => {
    setDesignProperties({
      outerRadius: DefaultDesignProperties.outerRadius,
      ringWidth: DefaultDesignProperties.ringWidth,
      ringGap: DefaultDesignProperties.ringGap,
    });
  };

  // Calculate chart size from outerRadius (chart size = outerRadius * 2)
  const chartSize = (designProperties.outerRadius ?? DefaultDesignProperties.outerRadius) * 2;

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
            Chart Size: {chartSize}px (auto: outerRadius × 2)
          </label>
          <div
            style={{
              padding: "8px 12px",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              fontSize: 14,
              color: "#6b7280",
            }}
          >
            Calculated from Outer Radius
          </div>
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
            Outer Radius: {designProperties.outerRadius}px
          </label>
          <input
            title="Outer Radius"
            type="range"
            min="50"
            max="150"
            step="5"
            value={designProperties.outerRadius ?? DefaultDesignProperties.outerRadius}
            onChange={(e) =>
              handleChange("outerRadius", parseInt(e.target.value))
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
            Ring Width: {designProperties.ringWidth}px
          </label>
          <input
            title="Ring Width"
            type="range"
            min="8"
            max="32"
            step="2"
            value={designProperties.ringWidth ?? DefaultDesignProperties.ringWidth}
            onChange={(e) =>
              handleChange("ringWidth", parseInt(e.target.value))
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
            Ring Gap: {designProperties.ringGap}px
          </label>
          <input
            title="Ring Gap"
            type="range"
            min="4"
            max="20"
            step="2"
            value={designProperties.ringGap ?? DefaultDesignProperties.ringGap}
            onChange={(e) =>
              handleChange("ringGap", parseInt(e.target.value))
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

      {/* Chart Preview */}
      <div
        style={{
          border: "1px solid #e5e7eb",
          padding: 20,
          borderRadius: 8,
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <WidetFrame
          nav={{
            icon: "tune",
            title: "Customized Design",
            controls: [],
          }}
        >
          <KpiRingChart data={data} designProperties={designProperties} />
        </WidetFrame>
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
  outerRadius: ${designProperties.outerRadius},
  ringWidth: ${designProperties.ringWidth},
  ringGap: ${designProperties.ringGap},
}}
// Chart size is automatically calculated as: outerRadius * 2 = ${chartSize}px`}
        </pre>
      </details>
    </div>
  );
};

