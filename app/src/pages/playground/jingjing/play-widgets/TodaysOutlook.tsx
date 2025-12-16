import * as React from "react";
import {
  FigmaBentoGrid,
  FigmaBentoItem,
  WidgetFrame,
  Switch,
} from "../../../../components";
import { totalSalesDesign } from "../design";
import { NetSalesOutlook } from "../play-components/NetSalesOutlook";
import { netSalesOutlookData } from "../mockup-data/netSalesOutlook";
import { OutLookCard } from "../play-components/OutLookCard";
import {
  varianceToOutlookData,
  percentageToOutlookData,
} from "../mockup-data/outlookCard";
import { KPIMetric } from "../play-components/KPIMetric";
import { kpiMetricsData } from "../mockup-data/kpiMetric";

export interface TodaysOutlookProps {
  comparisonMode: "LY" | "LW";
  setComparisonMode: (value: "LY" | "LW") => void;
  timeRange: "today" | "yesterday";
  setTimeRange: (value: "today" | "yesterday") => void;
}

export const TodaysOutlook: React.FC<TodaysOutlookProps> = ({
  comparisonMode,
  setComparisonMode,
  timeRange,
  setTimeRange,
}) => {
  return (
    <WidgetFrame
      nav={{
        icon: "dashboard",
        title: "Today's Outlook​",
        controls: [
          <Switch
            key="comparison-mode"
            options={[
              { value: "LY", label: "VS LY" },
              { value: "LW", label: "VS LW" },
            ]}
            value={comparisonMode}
            onChange={(value) => setComparisonMode(value as "LY" | "LW")}
            size="medium"
            hoverable={false}
          />,
          <Switch
            key="time-range"
            options={[
              { value: "yesterday", label: "Yesterday" },
              { value: "today", label: "Today" },
            ]}
            value={timeRange}
            onChange={(value) =>
              setTimeRange(value as "today" | "yesterday")
            }
            size="medium"
            hoverable={false}
          />,
        ],
      }}
    >
      <FigmaBentoGrid
        height={"fill"}
        width={"fill"}
        rowCount={4}
        colCount={12}
        padding={totalSalesDesign.padding}
        gap={[totalSalesDesign.gap, totalSalesDesign.gap]}
      >
        {/* AI Context: the NetSalesOutlook component is placed in the first item of the FigmaBentoGrid */}
        <FigmaBentoItem row={[1, 2]} col={[1, 6]}>
          <NetSalesOutlook data={netSalesOutlookData} />
        </FigmaBentoItem>
        <FigmaBentoItem row={[1, 2]} col={[7, 3]}>
          {/* AI Context: the 1st OutLookCard is placed in the second item of the FigmaBentoGrid */}
          <OutLookCard data={varianceToOutlookData} />
        </FigmaBentoItem>
        <FigmaBentoItem row={[1, 2]} col={[10, 3]}>
          {/* AI Context: the 2nd OutLookCard is placed in the second item of the FigmaBentoGrid */}
          <OutLookCard data={percentageToOutlookData} />
        </FigmaBentoItem>
        {/* AI Context: the following 8 items are KPIMetric components, each KPIMetric component is placed in a single item of the FigmaBentoGrid */}
        <FigmaBentoItem row={[3, 1]} col={[1, 3]}>
          <KPIMetric data={kpiMetricsData.txn} />
        </FigmaBentoItem>
        <FigmaBentoItem row={[3, 1]} col={[4, 3]}>
          <KPIMetric data={kpiMetricsData.aov} />
        </FigmaBentoItem>
        <FigmaBentoItem row={[3, 1]} col={[7, 3]}>
          <KPIMetric data={kpiMetricsData.upt} />
        </FigmaBentoItem>
        <FigmaBentoItem row={[3, 1]} col={[10, 3]}>
          <KPIMetric data={kpiMetricsData.cr} />
        </FigmaBentoItem>
        <FigmaBentoItem row={[4, 1]} col={[1, 3]}>
          <KPIMetric data={kpiMetricsData.traffic} />
        </FigmaBentoItem>
        <FigmaBentoItem row={[4, 1]} col={[4, 3]}>
          <KPIMetric data={kpiMetricsData.frUtilization} />
        </FigmaBentoItem>
        <FigmaBentoItem row={[4, 1]} col={[7, 3]}>
          <KPIMetric data={kpiMetricsData.tryOn} />
        </FigmaBentoItem>
        <FigmaBentoItem row={[4, 1]} col={[10, 3]}>
          <KPIMetric data={kpiMetricsData.tryOnCR} />
        </FigmaBentoItem>
      </FigmaBentoGrid>
    </WidgetFrame>
  );
};

