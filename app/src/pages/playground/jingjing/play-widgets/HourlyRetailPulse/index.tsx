import * as React from "react";
import { WidgetFrame, Switch } from "../../../../../components";
import { ClockChartView } from "./ClockChartView";
import { TableView } from "./TableView";
import { ChartView } from "./ChartView";
import styles from "./styles.module.scss";

export type HourlyViewType = "refresh" | "table" | "chart";

export const HourlyRetailPulse: React.FC = () => {
  const [view, setView] = React.useState<HourlyViewType>("refresh");

  return (
    <WidgetFrame
      nav={{
        icon: "insights",
        title: "Hourly Retail Pulse",
        controls: [
          <Switch
            key="hourly-view"
            size="medium"
            options={[
              { value: "refresh", icon: "refresh" },
              { value: "table", icon: "table_view" },
              { value: "chart", icon: "show_chart" },
            ]}
            value={view}
            onChange={(value) => setView(value as HourlyViewType)}
            hoverable={false}
          />,
        ],
      }}
    >
      <div className={styles.container}>
        {view === "refresh" && <ClockChartView />}
        {view === "table" && <TableView />}
        {view === "chart" && <ChartView />}
      </div>
    </WidgetFrame>
  );
};
