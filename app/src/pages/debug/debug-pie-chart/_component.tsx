import {
  PieChart,
  type PieChartDataItem,
  WidgetFrame,
} from "../../../components";

export const PieChartDebug = () => {
  // Mock Data - Example 1: Activity Distribution
  const activityData: PieChartDataItem[] = [
    {
      id: "1",
      name: "Train",
      icon: "fitness_center",
      valueArray: [
        [{ value: 50, unit: "%", color: "#FF5252" }], // Chart Data
        [{ value: 78, unit: "pax", color: "#FF5252" }], // Legend Data
      ],
    },
    {
      id: "2",
      name: "Tennis",
      icon: "sports_tennis",
      valueArray: [
        [{ value: 12, unit: "%", color: "#FF8A80" }],
        [{ value: 78, unit: "pax", color: "#FF8A80" }],
      ],
    },
    {
      id: "3",
      name: "Yoga",
      icon: "self_improvement",
      valueArray: [
        [{ value: 13, unit: "%", color: "#FFCDD2" }],
        [{ value: 26, unit: "pax", color: "#FFCDD2" }],
      ],
    },
    {
      id: "4",
      name: "Ski",
      icon: "downhill_skiing",
      valueArray: [
        [{ value: 11, unit: "%", color: "#90CAF9" }],
        [{ value: 13, unit: "pax", color: "#90CAF9" }],
      ],
    },
    {
      id: "5",
      name: "Other",
      icon: "search",
      valueArray: [
        [{ value: 14, unit: "%", color: "#E0E0E0" }],
        [{ value: 21, unit: "pax", color: "#E0E0E0" }],
      ],
    },
  ];

  // Mock Data - Example 2: Simple Distribution
  const simpleData: PieChartDataItem[] = [
    {
      id: "1",
      name: "Category A",
      icon: "category",
      valueArray: [
        [{ value: 40, unit: "%", color: "#3b82f6" }],
        [{ value: 40, unit: "", color: "#3b82f6" }],
      ],
    },
    {
      id: "2",
      name: "Category B",
      icon: "category",
      valueArray: [
        [{ value: 30, unit: "%", color: "#10b981" }],
        [{ value: 30, unit: "", color: "#10b981" }],
      ],
    },
    {
      id: "3",
      name: "Category C",
      icon: "category",
      valueArray: [
        [{ value: 20, unit: "%", color: "#f59e0b" }],
        [{ value: 20, unit: "", color: "#f59e0b" }],
      ],
    },
    {
      id: "4",
      name: "Category D",
      icon: "category",
      valueArray: [
        [{ value: 10, unit: "%", color: "#ef4444" }],
        [{ value: 10, unit: "", color: "#ef4444" }],
      ],
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Pie Chart Debug</h1>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 1: Activity Distribution (with WidetFrame)</h2>
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
              title: "Activity Distribution",
              controls: [],
            }}
          >
            <PieChart
              data={activityData}
              alwaysShowLabels={false}
              showLegendValue={true}
              showLegendUnit={true}
              showLabelUnit={true}
            />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 2: Always Show Labels</h2>
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
              title: "Distribution Overview",
              controls: [],
            }}
          >
            <PieChart
              data={activityData}
              alwaysShowLabels={true}
              showLegendValue={false}
              showLegendUnit={false}
              showLabelUnit={true}
            />
          </WidgetFrame>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Case 3: Simple Distribution (No Units)</h2>
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
              title: "Simple Distribution",
              controls: [],
            }}
          >
            <PieChart
              data={simpleData}
              alwaysShowLabels={false}
              showLegendValue={true}
              showLegendUnit={false}
              showLabelUnit={false}
            />
          </WidgetFrame>
        </div>
      </section>

      <section>
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
          <PieChart
            data={simpleData}
            alwaysShowLabels={true}
            showLegendValue={true}
            showLegendUnit={false}
            showLabelUnit={true}
          />
        </div>
      </section>
    </div>
  );
};

