# Migration Guide: From Test Data to Mockup Data

This guide shows how to migrate from `data-just-for-1-time-test` to the new `data-mockup` structure.

## Import Changes

### Before (Old)

```typescript
import {
  pieChartData,
  kpiRingChartData,
  trendChartData,
  trendChartSeriesConfig,
  chinaHeatMapCategories,
} from "./data-just-for-1-time-test/some";
import { location } from "./data-just-for-1-time-test/location";
import { allYears } from "./data-just-for-1-time-test/year";
import { 
  activityProgressCardDataObject, 
  summaryActivityProgressCardData 
} from "./data-just-for-1-time-test/service-day";
import { metricsDataByMonth } from "./data-just-for-1-time-test/metrics";
```

### After (New)

```typescript
import { 
  AmbassadorMockupData, 
  formatTimeInterval,
  location,
  allYears 
} from "./data-mockup";
```

## Component Data Access Migration

### Roster Overview Section

#### Ambassador Total
```typescript
// Before
<TextMetric value={165} unit="pax" />

// After
<TextMetric 
  value={AmbassadorMockupData["roster-overview"].widgets[0].data.value} 
  unit={AmbassadorMockupData["roster-overview"].widgets[0].data.unit} 
/>
```

#### Activity Distribution (Pie Charts)
```typescript
// Before
<ActivityDistributionPieChart data={pieChartData} />

// After - By Athletic Discipline
<ActivityDistributionPieChart 
  data={AmbassadorMockupData["roster-overview"].widgets[1].data} 
/>

// After - Geographic Breakdown
<ActivityDistributionPieChart 
  data={AmbassadorMockupData["roster-overview"].widgets[2].data} 
/>

// After - By Tenure
<ActivityDistributionPieChart 
  data={AmbassadorMockupData["roster-overview"].widgets[3].data} 
/>
```

#### China Heat Map
```typescript
// Before
<ChinaHeatMap
  categories={chinaHeatMapCategories}
  defaultCategoryIndex={1}
  center={[33.8, 114.1]}
  zoom={4.2}
  designProperties={{ radiusFactor: 25000 }}
/>

// After
const mapData = AmbassadorMockupData["roster-overview"].widgets[4].data;
<ChinaHeatMap
  categories={mapData.categories}
  defaultCategoryIndex={0}
  center={mapData.center}
  zoom={mapData.zoom}
  designProperties={mapData.designProperties}
/>
```

#### Time Interval Label
```typescript
// Before
<DocSection label="Apr 1, 2025 – Mar 31, 2026">

// After
<DocSection 
  label={formatTimeInterval(AmbassadorMockupData["roster-overview"].timeInterval)}
>
```

### Engagement Overview Section

#### Resource Planning (Trend Chart)
```typescript
// Before
<TrendChart
  data={trendChartData}
  series={trendChartSeriesConfig}
/>

// After
const resourceData = AmbassadorMockupData["engagement-overview"].widgets[0].data;
<TrendChart
  data={resourceData.chartData}
  series={resourceData.series}
/>
```

#### Service Days & Ambassadors Engaged Metrics
```typescript
// Before
const currentMetrics = metricsDataByMonth[selectedMonth] || metricsDataByMonth["APR"];
<EngagementOverviewMetric data={currentMetrics.serviceDays} />
<EngagementOverviewMetric data={currentMetrics.ambassadorsEngaged} />

// After
const metricsData = AmbassadorMockupData["engagement-overview"].widgets[1].data.byMonth;
const currentMetrics = metricsData[selectedMonth] || metricsData["APR"];
<EngagementOverviewMetric data={currentMetrics.serviceDays} />
<EngagementOverviewMetric data={currentMetrics.ambassadorsEngaged} />
```

#### Engagement by Athletic Discipline (KPI Ring Charts)
```typescript
// Before
<KpiRingChart data={kpiRingChartData[0]} />
<KpiRingChart data={kpiRingChartData[1]} />
<KpiRingChart data={kpiRingChartData[2]} />
// ...

// After
const kpiData = AmbassadorMockupData["engagement-overview"].widgets[2].data;
{kpiData.map((kpi, index) => (
  <BentoItem key={index} res={[[760, 12, 1], [1000, 6, 1], [Infinity, 4, 1]]}>
    <WidgetFrame>
      <KpiRingChart data={kpi} />
    </WidgetFrame>
  </BentoItem>
))}
```

### Pipeline Overview Section

#### Summary Card
```typescript
// Before
<SummaryActivityProgressCard data={summaryActivityProgressCardData} />

// After
const summaryData = AmbassadorMockupData["pipeline-overview"].widgets[0].data;
<SummaryActivityProgressCard data={summaryData} />
```

#### Individual Activity Cards
```typescript
// Before
<ActivityProgressCard data={activityProgressCardDataObject.activityProgressCardData} />
<ActivityProgressCard data={activityProgressCardDataObject.swimmingActivityData} />
// ...

// After
const pipelineWidgets = AmbassadorMockupData["pipeline-overview"].widgets;
{pipelineWidgets.slice(1).map((widget, index) => (
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
```

## Key Improvements

1. **Centralized Data**: All data is in one place (`AmbassadorMockupData`)
2. **Type Safety**: Strong TypeScript typing throughout
3. **Clear Structure**: Three main sections with consistent widget structure
4. **Self-Documenting**: Widget titles and icons are included in the data
5. **Easy to Extend**: Adding new widgets is straightforward
6. **Time Interval Handling**: Consistent time interval formatting across all sections

## Next Steps

1. Update `_component.tsx` to use the new data structure
2. Test all widgets with the new data
3. Verify 0/0 case handling for Golf (should display "—")
4. Remove dependency on `data-just-for-1-time-test` once migration is complete

