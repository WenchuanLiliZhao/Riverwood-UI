import {
  SectorPieChart,
  type SectorPieChartData,
  WidgetFrame,
} from "../../../components";

export const SectorPieChartDebug = () => {
  // Mock Data - Example 1: Multiple overlapping series with colors per point
  const multiSeriesData: SectorPieChartData = {
    key1: [
      { value: 0, color: "#FF4646" },
      { value: 13, color: "#FF4646" },
      { value: 18, color: "#FF4646" },
      { value: 16, color: "#FF4646" },
      { value: 17, color: "#FF4646" },
      { value: 12, color: "#FF4646" },
    ],
    key2: [
      { value: 9, color: "#FF4646" },
      { value: 3, color: "#FF4646" },
      { value: 9, color: "#FF4646" },
      { value: 7, color: "#FF4646" },
      { value: 2, color: "#FF4646" },
      { value: 8, color: "#FF4646" },
    ],
    // key3: [
    //   { value: 9, color: "#FF4646" },
    //   { value: 13, color: "#FF4646" },
    //   { value: 0, color: "#FF4646" },
    //   { value: 7, color: "#FF4646" },
    //   { value: 11, color: "#FF4646" },
    //   { value: 3, color: "#FF4646" },
    // ],
  };

  // Mock Data - Example 2: With clock start time
  const clockTimeData: SectorPieChartData = {
    series1: [
      { value: 5, color: "#FF4646" },
      { value: 8, color: "#FF8A80" },
      { value: 3, color: "#FFCDD2" },
      { value: 6, color: "#90CAF9" },
      { value: 7, color: "#81C784" },
      { value: 4, color: "#FFD54F" },
    ],
  };

  // Mock Data - Example 3: Different number of data points
  const differentLengthData: SectorPieChartData = {
    seriesA: [5, 8, 3, 6], // 4 points = 90 degrees per sector
    seriesB: [10, 7, 12, 9, 5], // 5 points = 72 degrees per sector
    seriesC: [6, 4, 8, 2, 7, 9], // 6 points = 60 degrees per sector
  };

  // Mock Data - Example 4: Single series
  const singleSeriesData: SectorPieChartData = {
    main: [12, 8, 15, 6, 10, 9, 11, 7],
  };

  // Mock Data - Example 5: With custom colors (via colors prop)
  const customColorData: SectorPieChartData = {
    red: [5, 8, 3, 6, 7],
    blue: [9, 4, 7, 5, 8],
    green: [6, 10, 2, 9, 4],
  };

  // Mock Data - Example 6: With colors per point (supports rgba and hex)
  const dataWithColors: SectorPieChartData = {
    series1: [
      { value: 5, color: "#FF5252" }, // Hex format
      { value: 8, color: "#FF8A80" },
      { value: 3, color: "#FFCDD2" },
      { value: 6, color: "#90CAF9" },
      { value: 7, color: "#81C784" },
    ],
    series2: [
      { value: 9, color: "rgba(33, 150, 243, 0.8)" }, // RGBA format
      { value: 4, color: "rgba(76, 175, 80, 0.8)" },
      { value: 7, color: "rgba(255, 152, 0, 0.8)" },
      { value: 5, color: "rgba(156, 39, 176, 0.8)" },
      { value: 8, color: "rgba(244, 67, 54, 0.8)" },
    ],
    series3: [
      { value: 6, color: "#4CAF50" }, // Hex format
      { value: 10, color: "#2196F3" },
      { value: 2, color: "#FF9800" },
      { value: 9, color: "#9C27B0" },
      { value: 4, color: "#F44336" },
    ],
    series4: [12, 5, 8, 3], // This one will use default color for the series
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sector Pie Chart Debug</h1>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 1: Multiple Overlapping Series (with WidgetFrame)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "pie_chart",
              title: "Multi-Series Sector Chart",
              controls: [],
            }}
          >
            <SectorPieChart data={multiSeriesData} opacity={0.48} startTime="11:00" />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 2: Start Time - Clock Position (11:49)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "schedule",
              title: "Clock Start Time Demo",
              controls: [],
            }}
          >
            <SectorPieChart
              data={clockTimeData}
              opacity={0.48}
              startTime="11:49"
            />
          </WidgetFrame>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
          <p>
            This example starts at 11:49 on a clock face. The first sector's
            left edge begins at this position, and sectors are arranged
            clockwise.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 3: Different Start Times Comparison</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 14, marginBottom: 10 }}>12:00 (Top)</h3>
            <div
              style={{
                border: "1px solid #eee",
                padding: 20,
                borderRadius: 8,
                height: 300,
              }}
            >
              <SectorPieChart
                data={clockTimeData}
                opacity={0.48}
                startTime="12:00"
              />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 14, marginBottom: 10 }}>3:00 (Right)</h3>
            <div
              style={{
                border: "1px solid #eee",
                padding: 20,
                borderRadius: 8,
                height: 300,
              }}
            >
              <SectorPieChart
                data={clockTimeData}
                opacity={0.48}
                startTime="3:00"
              />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 14, marginBottom: 10 }}>6:00 (Bottom)</h3>
            <div
              style={{
                border: "1px solid #eee",
                padding: 20,
                borderRadius: 8,
                height: 300,
              }}
            >
              <SectorPieChart
                data={clockTimeData}
                opacity={0.48}
                startTime="6:00"
              />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 14, marginBottom: 10 }}>9:00 (Left)</h3>
            <div
              style={{
                border: "1px solid #eee",
                padding: 20,
                borderRadius: 8,
                height: 300,
              }}
            >
              <SectorPieChart
                data={clockTimeData}
                opacity={0.48}
                startTime="9:00"
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 4: Different Number of Data Points</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "donut_small",
              title: "Variable Sector Angles",
              controls: [],
            }}
          >
            <SectorPieChart data={differentLengthData} opacity={0.41} />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 5: Single Series</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "pie_chart",
              title: "Single Series",
              controls: [],
            }}
          >
            <SectorPieChart data={singleSeriesData} opacity={0.41} />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 6: Custom Colors</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "pie_chart",
              title: "Custom Color Scheme",
              controls: [],
            }}
          >
            <SectorPieChart
              data={customColorData}
              colors={["#FF5252", "#2196F3", "#4CAF50"]}
              opacity={0.41}
            />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 7: Different Opacity</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "pie_chart",
              title: "Higher Opacity (0.7)",
              controls: [],
            }}
          >
            <SectorPieChart data={multiSeriesData} opacity={0.7} />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 8: With Inner Radius (Donut Style)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "donut_small",
              title: "Donut Style Sector Chart",
              controls: [],
            }}
          >
            <SectorPieChart
              data={multiSeriesData}
              opacity={0.48}
              innerRadius={30}
            />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 9: Colors in Data (RGBA and Hex)</h2>
        <div
          style={{
            border: "1px solid #eee",
            padding: 20,
            borderRadius: 8,
            height: 400,
          }}
        >
          <WidgetFrame
            nav={{
              icon: "palette",
              title: "Colors in Data Format",
              controls: [],
            }}
          >
            <SectorPieChart data={dataWithColors} opacity={0.48} />
          </WidgetFrame>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
          <p>
            This example shows how to include colors directly in the data format.
            Supports both hex (#FF5252) and rgba (rgba(33, 150, 243, 0.8))
            formats. Series without color will use default colors.
          </p>
        </div>
      </section>

      <section>
        <h2>Case 10: Standalone (without WidgetFrame)</h2>
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
          <SectorPieChart data={multiSeriesData} opacity={0.48} />
        </div>
      </section>
    </div>
  );
};
