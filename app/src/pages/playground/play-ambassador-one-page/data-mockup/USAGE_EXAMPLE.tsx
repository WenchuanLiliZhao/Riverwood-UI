/**
 * Complete Usage Example
 * 
 * This file demonstrates how to use the new AmbassadorMockupData structure
 * in the _component.tsx file.
 */

import { useState } from "react";
import {
  Avatar,
  BentoGrid,
  BentoItem,
  ChinaHeatMap,
  DocSection,
  KpiRingChart,
  Layout,
  NavTitle,
  TextHr,
  TrendChart,
} from "../../../../components";
import type { ChartDataPoint, SeriesConfig } from "../../../../components";
import { WidgetFrame } from "../../../../components/widgets/widget-frame";
import {
  TextMetric,
  ActivityDistributionPieChart,
  ActivityProgressCard,
  SummaryActivityProgressCard,
} from "../play-components";
import { EngagementOverviewMetric } from "../play-components/engagement-overview-metric";
import {
  LocationSelector,
  YearSelector,
} from "../play-components/universal-selectors";
import { AmbassadorMockupData, formatTimeInterval, location, allYears } from "./index";
import type { KpiData } from "../../../../components/widgets/widet-components/kpi-ring-chart";
import type { ActivityProgressCardData } from "../types/activity-progress";
import type { ActivityDistributionItem } from "../play-components/activity-distribution-pie-chart";
import type { CategoryData } from "../../../../components";
import type { MetricsDataByMonth } from "../types/metrics";
import styles from "../_styles.module.scss";

export const PageContentExample = () => {
  // State management for selected month
  const [selectedMonth, setSelectedMonth] = useState<string>("APR");

  // Extract data from mockup
  const rosterOverview = AmbassadorMockupData["roster-overview"];
  const engagementOverview = AmbassadorMockupData["engagement-overview"];
  const pipelineOverview = AmbassadorMockupData["pipeline-overview"];

  // Roster widgets with type assertions
  const ambassadorTotalWidget = rosterOverview.widgets[0];
  const ambassadorTotalData = ambassadorTotalWidget.data as { value: number; unit: string };
  
  const byAthleticDisciplineWidget = rosterOverview.widgets[1];
  const byAthleticDisciplineData = byAthleticDisciplineWidget.data as ActivityDistributionItem[];
  
  const geographicBreakdownWidget = rosterOverview.widgets[2];
  const geographicBreakdownData = geographicBreakdownWidget.data as ActivityDistributionItem[];
  
  const byTenureWidget = rosterOverview.widgets[3];
  const byTenureData = byTenureWidget.data as ActivityDistributionItem[];
  
  const mapWidget = rosterOverview.widgets[4];
  const mapData = mapWidget.data as {
    categories: CategoryData[];
    center: [number, number];
    zoom: number;
    designProperties: { radiusFactor: number };
  };

  // Engagement widgets with type assertions
  const resourcePlanningWidget = engagementOverview.widgets[0];
  const resourcePlanningData = resourcePlanningWidget.data as {
    chartData: ChartDataPoint[];
    series: SeriesConfig[];
  };
  
  const serviceDaysWidget = engagementOverview.widgets[1];
  const serviceDaysData = serviceDaysWidget.data as { byMonth: MetricsDataByMonth };
  
  const kpiRingChartsWidget = engagementOverview.widgets[2];
  const kpiRingChartsData = kpiRingChartsWidget.data as KpiData[];

  // Pipeline widgets (first one is summary, rest are individual activities)
  const summaryWidget = pipelineOverview.widgets[0];
  const summaryData = summaryWidget.data as ActivityProgressCardData;
  
  const activityWidgets = pipelineOverview.widgets.slice(1);

  // Handler for TrendChart node selection
  const handleNodeSelect = (label: string, seriesKey: string) => {
    if (seriesKey === 'used') {
      setSelectedMonth(label);
    }
  };

  // Get metrics for currently selected month (with fallback to APR)
  const metricsData = serviceDaysData.byMonth;
  const currentMetrics = metricsData[selectedMonth] || metricsData["APR"];

  return (
    <Layout
      contentDesign={{ widthMode: "large" }}
      elements={{
        navBar: {
          first: [
            <Avatar
              src="https://play-lh.googleusercontent.com/jvFsHfua7RtMM_x0z9fci13k7DcHH9s5y6EJ424-ZWH4gaaO96FqxAD2JL6GkNvVUg=w240-h480-rw"
              alt="Avatar"
              size="medium"
            />,
            <NavTitle title="Ambassador One Page" />,
          ],
          last: [
            <LocationSelector locationData={location} />,            
            <YearSelector yearData={allYears} />,
          ],
        },
        footer: <div style={{ height: "100px" }}></div>,
        content: (
          <div className={styles["content-container"]}>
            <div style={{ height: "8px" }}></div>
            
            {/* ROSTER OVERVIEW SECTION */}
            <DocSection
              label={formatTimeInterval(rosterOverview.timeInterval)}
              title="Roster Overview"
              description={
                <p>
                  This section reflects the Ambassador roster for the current
                  term by athletic discipline, city tier and tenure. Please note
                  that Ambassador term (Apr 1–Mar 31) differs from the fiscal
                  calendar (Feb 1–Jan 30). To view previous years' rosters,
                  please adjust the filter in the top-right corner.
                </p>
              }
            >
              <BentoGrid gap={"md"} rowHeight={[[Infinity, 312]]}>
                <BentoItem
                  res={[
                    [1000, 12, 2],
                    [Infinity, 6, 2],
                  ]}
                >
                  <BentoGrid gap={"md"} rowHeight={[[Infinity, 312]]}>
                    {/* Ambassador Total */}
                    <BentoItem res={[[480, 12, 1], [Infinity, 6, 1]]}>
                      <WidgetFrame
                        nav={{
                          icon: ambassadorTotalWidget.icon,
                          title: ambassadorTotalWidget.title,
                        }}
                      >
                        <TextMetric 
                          value={ambassadorTotalData.value} 
                          unit={ambassadorTotalData.unit} 
                        />
                      </WidgetFrame>
                    </BentoItem>

                    {/* By Athletic Discipline */}
                    <BentoItem res={[[480, 12, 1], [Infinity, 6, 1]]}>
                      <WidgetFrame
                        nav={{
                          icon: byAthleticDisciplineWidget.icon,
                          title: byAthleticDisciplineWidget.title,
                        }}
                      >
                        <ActivityDistributionPieChart
                          data={byAthleticDisciplineData}
                          alwaysShowLabels={true}
                          showLegendValue={true}
                          showLegendUnit={false}
                          showLabelUnit={true}
                        />
                      </WidgetFrame>
                    </BentoItem>

                    {/* Geographic Breakdown */}
                    <BentoItem res={[[480, 12, 1], [Infinity, 6, 1]]}>
                      <WidgetFrame
                        nav={{
                          icon: geographicBreakdownWidget.icon,
                          title: geographicBreakdownWidget.title,
                        }}
                      >
                        <ActivityDistributionPieChart
                          data={geographicBreakdownData}
                          alwaysShowLabels={true}
                          showLegendValue={true}
                          showLegendUnit={false}
                          showLabelUnit={true}
                        />
                      </WidgetFrame>
                    </BentoItem>

                    {/* By Tenure */}
                    <BentoItem res={[[480, 12, 1], [Infinity, 6, 1]]}>
                      <WidgetFrame
                        nav={{
                          icon: byTenureWidget.icon,
                          title: byTenureWidget.title,
                        }}
                      >
                        <ActivityDistributionPieChart
                          data={byTenureData}
                          alwaysShowLabels={true}
                          showLegendValue={true}
                          showLegendUnit={false}
                          showLabelUnit={true}
                        />
                      </WidgetFrame>
                    </BentoItem>
                  </BentoGrid>
                </BentoItem>

                {/* Map */}
                <BentoItem res={[[1000, 12, 2], [Infinity, 6, 2]]}>
                  <BentoGrid gap={"md"} rowHeight={[[Infinity, 640]]}>
                    <BentoItem res={[[Infinity, 12, 1]]}>
                      <WidgetFrame nav={{ title: mapWidget.title }}>
                        <ChinaHeatMap
                          categories={mapData.categories}
                          defaultCategoryIndex={0}
                          center={mapData.center}
                          zoom={mapData.zoom}
                          designProperties={mapData.designProperties}
                        />
                      </WidgetFrame>
                    </BentoItem>
                  </BentoGrid>
                </BentoItem>
              </BentoGrid>
            </DocSection>

            {/* ENGAGEMENT OVERVIEW SECTION */}
            <DocSection
              label={formatTimeInterval(engagementOverview.timeInterval)}
              title="Engagement Overview"
              description={
                <p>
                  Each Ambassador shall serve a minimum of 4 service days per
                  year, hence the total service days equals 4 × total Ambassador
                  count. For tracking consistency, engagements under 4 hours
                  count as a 0.5 day, while those 4 hours or more count as 1
                  day.
                </p>
              }
            >
              <BentoGrid gap={"md"} rowHeight={[[Infinity, 328]]}>
                {/* Resource Planning */}
                <BentoItem res={[[1080, 12, 1], [Infinity, 6, 1]]}>
                  <WidgetFrame
                    nav={{
                      icon: resourcePlanningWidget.icon,
                      title: resourcePlanningWidget.title,
                    }}
                  >
                    <TrendChart
                      data={resourcePlanningData.chartData}
                      series={resourcePlanningData.series}
                      xAxisPadding={{ left: 40, right: 40 }}
                      enableSelection={true}
                      defaultSelectedNode={{ label: "APR", seriesKey: "used" }}
                      onNodeSelect={handleNodeSelect}
                    />
                  </WidgetFrame>
                </BentoItem>

                {/* Total Service Days Used */}
                <BentoItem res={[[760, 12, 1], [1080, 6, 1], [Infinity, 3, 1]]}>
                  <WidgetFrame
                    nav={{
                      icon: "bar_chart",
                      title: "Total Service Days Used",
                    }}
                  >
                    <EngagementOverviewMetric data={currentMetrics.serviceDays} />
                  </WidgetFrame>
                </BentoItem>

                {/* % of Ambassadors Engaged */}
                <BentoItem res={[[760, 12, 1], [1080, 6, 1], [Infinity, 3, 1]]}>
                  <WidgetFrame
                    nav={{
                      icon: "bar_chart",
                      title: "% of Ambassadors Engaged",
                    }}
                  >
                    <EngagementOverviewMetric data={currentMetrics.ambassadorsEngaged} />
                  </WidgetFrame>
                </BentoItem>
              </BentoGrid>

              <TextHr>Engagement by Athletic Discipline</TextHr>

              <BentoGrid gap={"md"} rowHeight={[[Infinity, 250]]}>
                {kpiRingChartsData.map((kpiData: KpiData, index: number) => (
                  <BentoItem
                    key={index}
                    res={[[760, 12, 1], [1000, 6, 1], [Infinity, 4, 1]]}
                  >
                    <WidgetFrame>
                      <KpiRingChart data={kpiData} />
                    </WidgetFrame>
                  </BentoItem>
                ))}
              </BentoGrid>
            </DocSection>

            {/* PIPELINE OVERVIEW SECTION */}
            <DocSection
              label={formatTimeInterval(pipelineOverview.timeInterval)}
              title="Pipeline Overview"
              description={
                <p>
                  In order to secure a healthy talent pipeline, we are tracking
                  potential candidates referred, individuals we actively
                  connecting with, and identified strong pipeline candidates. It
                  enables us to strategically build our roster, and maintain a
                  consistent bench of talent aligned to brand priorities.
                </p>
              }
            >
              <BentoGrid gap={"md"} rowHeight={[[Infinity, 312]]}>
                {/* Summary */}
                <BentoItem res={[[Infinity, 6, 2]]}>
                  <WidgetFrame
                    nav={{
                      icon: summaryWidget.icon,
                      title: summaryWidget.title,
                    }}
                  >
                    <SummaryActivityProgressCard data={summaryData} />
                  </WidgetFrame>
                </BentoItem>

                {/* Individual Activity Cards */}
                {activityWidgets.map((widget: { title: string; icon: string; data: ActivityProgressCardData }, index: number) => (
                  <BentoItem key={index} res={[[Infinity, 2, 1]]}>
                    <WidgetFrame
                      nav={{
                        icon: widget.icon as string,
                        title: widget.title,
                      }}
                    >
                      <ActivityProgressCard data={widget.data} />
                    </WidgetFrame>
                  </BentoItem>
                ))}
              </BentoGrid>
            </DocSection>
          </div>
        ),
      }}
    />
  );
};

