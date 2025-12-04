import {
  Avatar,
  BentoGrid,
  BentoItem,
  Button,
  ChinaHeatMap,
  DocSection,
  KpiRingChart,
  Layout,
  NavTitle,
  PieChart,
  TestBlock,
  TextHr,
  TrendChart,
} from "../../../components";
import { WidgetFrame } from "../../../components/widgets/widget-frame";
import styles from "./_styles.module.scss";
import {
  pieChartData,
  kpiRingChartData,
  trendChartData,
  trendChartSeriesConfig,
  chinaHeatMapCategories,
} from "./data/data-just-for-1-time-test";
import { TextMetric } from "./play-components";
import { EngagementOverviewMetric } from "./play-components/engagement-overview-metric";

export const PageContent = () => {
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
            <Button
              content={{
                icon: "map",
                text: "Region & City",
                decoIcon: "arrow_drop_down",
              }}
              design={{
                variant: "fill-inverse",
                size: "medium",
                semantic: "brand",
              }}
            />,
            <Button
              content={{
                icon: "date_range",
                text: "2025",
                decoIcon: "arrow_drop_down",
              }}
              design={{
                variant: "outlined",
                size: "medium",
                semantic: "primary",
              }}
            />,
          ],
        },
        footer: <div>Footer</div>,
        content: (
          <div className={styles["content-container"]}>
            <DocSection
              label="Apr 1, 2025 – Mar 31, 2026"
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
                    <BentoItem res={[
                      [480, 12, 1],
                      [Infinity, 6, 1]
                    ]}>
                      <WidgetFrame
                        nav={{
                          icon: "accessibility_new",
                          title: "Ambassador Total",
                        }}
                      >
                        <TextMetric value={165} unit="pax" />
                      </WidgetFrame>
                    </BentoItem>
                    <BentoItem res={[
                      [480, 12, 1],
                      [Infinity, 6, 1]
                    ]}>
                      <WidgetFrame
                        nav={{
                          icon: "pie_chart",
                          title: "Activity Distribution",
                        }}
                      >
                        <PieChart
                          data={pieChartData}
                          alwaysShowLabels={true}
                          showLegendValue={true}
                          showLegendUnit={false}
                          showLabelUnit={true}
                        />
                      </WidgetFrame>
                    </BentoItem>
                    <BentoItem res={[
                      [480, 12, 1],
                      [Infinity, 6, 1]
                    ]}>
                      <WidgetFrame
                        nav={{
                          icon: "pie_chart",
                          title: "Activity Distribution",
                        }}
                      >
                        <PieChart
                          data={pieChartData}
                          alwaysShowLabels={true}
                          showLegendValue={true}
                          showLegendUnit={false}
                          showLabelUnit={true}
                        />
                      </WidgetFrame>
                    </BentoItem>
                    <BentoItem res={[
                      [480, 12, 1],
                      [Infinity, 6, 1]
                    ]}>
                      <WidgetFrame
                        nav={{
                          icon: "pie_chart",
                          title: "Activity Distribution",
                        }}
                      >
                        <PieChart
                          data={pieChartData}
                          alwaysShowLabels={true}
                          showLegendValue={true}
                          showLegendUnit={false}
                          showLabelUnit={true}
                        />
                      </WidgetFrame>
                    </BentoItem>
                  </BentoGrid>
                </BentoItem>
                <BentoItem
                  res={[
                    [1000, 12, 2],
                    [Infinity, 6, 2],
                  ]}
                >
                  <BentoGrid gap={"md"} rowHeight={[[Infinity, 640]]}>
                    <BentoItem res={[[Infinity, 12, 1]]}>
                      <WidgetFrame nav={{ title: "Sports Activities Distribution" }}>
                        <ChinaHeatMap
                          // title="Sports Activities Distribution"
                          categories={chinaHeatMapCategories}
                          defaultCategoryIndex={1}
                          center={[33.8, 114.1]}
                          zoom={4.2}
                          designProperties={{
                            radiusFactor: 25000,
                          }}
                        />
                      </WidgetFrame>
                    </BentoItem>
                  </BentoGrid>
                </BentoItem>
              </BentoGrid>
            </DocSection>

            <DocSection
              label="Apr 1, 2025 – Mar 31, 2026"
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
                <BentoItem res={[
                  [1080, 12, 1],
                  [Infinity, 6, 1]
                ]}>
                  <WidgetFrame
                    nav={{
                      icon: "bar_chart",
                      title: "Resource Planning",
                    }}
                  >
                    <TrendChart
                      data={trendChartData}
                      series={trendChartSeriesConfig}
                      xAxisPadding={{ left: 40, right: 40 }}
                      enableSelection={true}
                      defaultSelectedNode={{ label: "APR", seriesKey: "used" }}
                    />
                  </WidgetFrame>
                </BentoItem>
                <BentoItem res={[
                  [760, 12, 1],
                  [1080, 6, 1],
                  [Infinity, 3, 1]
                ]}>
                  <WidgetFrame
                    nav={{
                      icon: "bar_chart",
                      title: "Total Service Days Used",
                    }}
                  >
                    <EngagementOverviewMetric />
                  </WidgetFrame>
                </BentoItem>
                <BentoItem res={[
                  [760, 12, 1],
                  [1080, 6, 1],
                  [Infinity, 3, 1]
                ]}>
                  <WidgetFrame
                    nav={{
                      icon: "bar_chart",
                      title: "% of Ambassadors Engaged",
                    }}
                  >
                    <EngagementOverviewMetric />
                  </WidgetFrame>
                </BentoItem>
              </BentoGrid>
              <TextHr>Engagement by Athletic Discipline</TextHr>
              <BentoGrid gap={"md"} rowHeight={[[Infinity, 250]]}>
                <BentoItem res={[
                  [760, 12, 1],
                  [1000, 6, 1],
                  [Infinity, 4, 1]
                ]}>
                  <WidgetFrame>
                    <KpiRingChart data={kpiRingChartData[0]} />
                  </WidgetFrame>
                </BentoItem>
                <BentoItem res={[
                  [760, 12, 1],
                  [1000, 6, 1],
                  [Infinity, 4, 1]
                ]}>
                  <WidgetFrame>
                    <KpiRingChart data={kpiRingChartData[1]} />
                  </WidgetFrame>
                </BentoItem>
                <BentoItem res={[
                  [760, 12, 1],
                  [1000, 6, 1],
                  [Infinity, 4, 1]
                ]}>
                  <WidgetFrame>
                    <KpiRingChart data={kpiRingChartData[2]} />
                  </WidgetFrame>
                </BentoItem>
                <BentoItem res={[
                  [760, 12, 1],
                  [1000, 6, 1],
                  [Infinity, 4, 1]
                ]}>
                  <WidgetFrame>
                    <KpiRingChart data={kpiRingChartData[3]} />
                  </WidgetFrame>
                </BentoItem>
                <BentoItem res={[
                  [760, 12, 1],
                  [1000, 6, 1],
                  [Infinity, 4, 1]
                ]}>
                  <WidgetFrame>
                    <KpiRingChart data={kpiRingChartData[4]} />
                  </WidgetFrame>
                </BentoItem>
                <BentoItem res={[
                  [760, 12, 1],
                  [1000, 6, 1],
                  [Infinity, 4, 1]
                ]}>
                  <WidgetFrame>
                    <KpiRingChart data={kpiRingChartData[5]} />
                  </WidgetFrame>
                </BentoItem>
              </BentoGrid>
            </DocSection>

            <DocSection
              label="Apr 1, 2025 – Mar 31, 2026"
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
                <BentoItem res={[[Infinity, 6, 2]]}>
                  <WidgetFrame nav={{
                    icon: "tornado",
                    title: "Service Day by Month"
                  }}>
                    s
                  </WidgetFrame>
                </BentoItem>
                <BentoItem res={[[Infinity, 2, 1]]}>
                  <TestBlock>2</TestBlock>
                </BentoItem>
                <BentoItem res={[[Infinity, 2, 1]]}>
                  <TestBlock>3</TestBlock>
                </BentoItem>
                <BentoItem res={[[Infinity, 2, 1]]}>
                  <TestBlock>4</TestBlock>
                </BentoItem>
                <BentoItem res={[[Infinity, 2, 1]]}>
                  <TestBlock>5</TestBlock>
                </BentoItem>
                <BentoItem res={[[Infinity, 2, 1]]}>
                  <TestBlock>6</TestBlock>
                </BentoItem>
                <BentoItem res={[[Infinity, 2, 1]]}>
                  <TestBlock>7</TestBlock>
                </BentoItem>
              </BentoGrid>
            </DocSection>
          </div>
        ),
      }}
    />
  );
};
