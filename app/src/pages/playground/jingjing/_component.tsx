import * as React from "react";
import {
  Layout,
  Avatar,
  NavTitle,
  FigmaBentoGrid,
  FigmaBentoItem,
  TestBlock,
  WidgetFrame,
} from "../../../components";
import { design, totalSalesDesign } from "./design";
import { NetSalesOutlook } from "./play-components/NetSalesOutlook";
import { netSalesOutlookData } from "./mockup-data/netSalesOutlook";
import { OutLookCard } from "./play-components/OutLookCard";
import {
  varianceToOutlookData,
  percentageToOutlookData,
} from "./mockup-data/outlookCard";
import { KPIMetric } from "./play-components/KPIMetric";
import { kpiMetricsData } from "./mockup-data/kpiMetric";
import { Switch } from "../../../components/";

export const PageContent = () => {
  // State for filter controls
  const [comparisonMode, setComparisonMode] = React.useState<"LY" | "LW">("LY");
  const [timeRange, setTimeRange] = React.useState<"today" | "yesterday">("today");

  const calculateGridDimensions = () => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate available height: viewport - navBar height
    const availableHeight = viewportHeight - design.navBar.height;

    // Width is full viewport
    const width = viewportWidth;

    return { height: availableHeight, width };
  };

  // the function disables the scroll on the body
  const disableBodyScroll = () => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  };

  // Calculate the grid dimensions once
  const { height, width } = calculateGridDimensions();

  return (
    <div
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
      onLoad={disableBodyScroll}
    >
      <Layout
        contentDesign={{ widthMode: "full", enablePadding: false }}
        elements={{
          navBar: {
            first: [
              <Avatar
                src="../../../vite.svg"
                alt="Avatar"
                size="medium"
              />,
              <NavTitle title="Today Sales" />,
              // divider
            ],
          },

          content: (
            <FigmaBentoGrid
              height={height}
              width={width}
              rowCount={24}
              colCount={12}
              padding={design.content.padding}
              gap={[design.content.gap, design.content.gap]}
            >
              <FigmaBentoItem row={[1, 13]} col={[1, 7]}>
                {/* AI Context: the WidgetFrame is a container for the Today's Outlook section */}
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
                        size="small"
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
                        size="small"
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
              </FigmaBentoItem>
              <FigmaBentoItem row={[1, 24]} col={[8, 5]}>
                <TestBlock>2!</TestBlock>
              </FigmaBentoItem>
              <FigmaBentoItem row={[14, 11]} col={[1, 7]}>
                <TestBlock>3</TestBlock>
              </FigmaBentoItem>
            </FigmaBentoGrid>
          ),
        }}
      />
    </div>
  );
};
