import * as React from "react";
import { WidgetFrame, Switch } from "../../../../../components";
import { RefreshView } from "./RefreshView";
import { TableView } from "./TableView";
import { ChartView } from "./ChartView";

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
      {view === "refresh" && <RefreshView />}
      {view === "table" && <TableView />}
      {view === "chart" && <ChartView />}
    </WidgetFrame>
  );
};

