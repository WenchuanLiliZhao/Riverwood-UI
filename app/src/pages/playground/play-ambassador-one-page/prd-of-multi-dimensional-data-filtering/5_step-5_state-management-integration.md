# Step 5: State Management Integration

## Objective

Integrate filtering system into the main component to:
1. Connect filter selectors to filter state
2. Wire filtered data to all widgets
3. Replace static mockup data with dynamic filtered data
4. Ensure smooth user experience when filters change

---

## Background

This step brings everything together:
- Filter state management (from Step 4)
- Filtered and transformed data (from Steps 3 & 4)
- UI components (existing widgets)
- Selector components (existing LocationSelector and YearSelector)

---

## Tasks

### Task 5.1: Update Component Imports

Update `_component.tsx` to import all necessary utilities:

```typescript
// Add these imports at the top of _component.tsx

// Raw dataset
import { rawDataset } from './data-just-for-1-time-test/raw-dataset';

// Filtering hooks
import { useFilterState, useFilteredData } from './hooks/useFilteredData';

// Keep existing imports for components and widgets
```

### Task 5.2: Replace State Management

Replace the current simple state with comprehensive filter state:

**Before** (Current):
```typescript
export const PageContent = () => {
  // State management for selected month
  const [selectedMonth, setSelectedMonth] = useState<string>("APR");

  // Handler for TrendChart node selection
  const handleNodeSelect = (label: string, seriesKey: string) => {
    if (seriesKey === 'used') {
      setSelectedMonth(label);
    }
  };

  // Get metrics for currently selected month
  const currentMetrics = metricsDataByMonth[selectedMonth] || metricsDataByMonth["APR"];
  
  return (
    // ... JSX
  );
};
```

**After** (Updated):
```typescript
export const PageContent = () => {
  // === Filter State Management ===
  const { 
    filterState, 
    handleLocationChange, 
    handleYearChange 
  } = useFilterState();

  // Get filtered and transformed data
  const filteredData = useFilteredData(rawDataset, filterState);

  // === Month Selection for Trend Chart ===
  const [selectedMonth, setSelectedMonth] = useState<string>("APR");

  // Handler for TrendChart node selection
  const handleNodeSelect = (label: string, seriesKey: string) => {
    if (seriesKey === 'used') {
      setSelectedMonth(label);
    }
  };

  // Get metrics for currently selected month (from filtered data)
  const currentMetrics = filteredData.monthlyMetrics[selectedMonth] 
    || filteredData.monthlyMetrics["APR"];

  // === Debug Logging (Optional - Remove in Production) ===
  React.useEffect(() => {
    console.log('[Filter Debug]', {
      filterState,
      stats: filteredData.filterStats,
      totalAmbassadors: filteredData.totalAmbassadors,
    });
  }, [filterState, filteredData]);

  return (
    // ... JSX
  );
};
```

### Task 5.3: Connect Selectors to State

Update the navigation bar selectors to use the new handlers:

**Before** (Current):
```typescript
navBar: {
  // ...
  last: [
    <LocationSelector locationData={location} />,
    <YearSelector yearData={allYears} />,
  ],
},
```

**After** (Updated):
```typescript
navBar: {
  // ...
  last: [
    <LocationSelector 
      locationData={location}
      value={filterState.location}
      onChange={handleLocationChange}
    />,
    <YearSelector 
      yearData={allYears}
      value={filterState.year}
      onChange={handleYearChange}
    />,
  ],
},
```

### Task 5.4: Update Roster Overview Section

Replace static data with filtered data:

**Before** (Current):
```typescript
<DocSection
  label="Apr 1, 2025 – Mar 31, 2026"
  title="Roster Overview"
  description={/* ... */}
>
  <BentoGrid gap={"md"} rowHeight={[[Infinity, 312]]}>
    <BentoItem res={/* ... */}>
      <BentoGrid gap={"md"} rowHeight={[[Infinity, 312]]}>
        {/* Ambassador Total */}
        <BentoItem res={/* ... */}>
          <WidgetFrame nav={{ icon: "accessibility_new", title: "Ambassador Total" }}>
            <TextMetric value={165} unit="pax" />
          </WidgetFrame>
        </BentoItem>

        {/* Activity Distribution (repeated 3 times with same data) */}
        <BentoItem res={/* ... */}>
          <WidgetFrame nav={{ icon: "pie_chart", title: "Activity Distribution" }}>
            <ActivityDistributionPieChart data={pieChartData} /* ... */ />
          </WidgetFrame>
        </BentoItem>
        {/* ... repeated ... */}
      </BentoGrid>
    </BentoItem>

    {/* Heat Map */}
    <BentoItem res={/* ... */}>
      <WidgetFrame nav={{ title: "Sports Activities Distribution" }}>
        <ChinaHeatMap
          categories={chinaHeatMapCategories}
          /* ... */
        />
      </WidgetFrame>
    </BentoItem>
  </BentoGrid>
</DocSection>
```

**After** (Updated):
```typescript
<DocSection
  label="Apr 1, 2025 – Mar 31, 2026"
  title="Roster Overview"
  description={/* ... */}
>
  <BentoGrid gap={"md"} rowHeight={[[Infinity, 312]]}>
    <BentoItem res={/* ... */}>
      <BentoGrid gap={"md"} rowHeight={[[Infinity, 312]]}>
        {/* Ambassador Total - Now using filtered data */}
        <BentoItem res={/* ... */}>
          <WidgetFrame nav={{ icon: "accessibility_new", title: "Ambassador Total" }}>
            <TextMetric 
              value={filteredData.totalAmbassadors} 
              unit="pax" 
            />
          </WidgetFrame>
        </BentoItem>

        {/* Activity Distribution - Now using filtered data */}
        <BentoItem res={/* ... */}>
          <WidgetFrame nav={{ icon: "pie_chart", title: "Activity Distribution" }}>
            <ActivityDistributionPieChart 
              data={filteredData.activityDistribution}
              alwaysShowLabels={true}
              showLegendValue={true}
              showLegendUnit={false}
              showLabelUnit={true}
            />
          </WidgetFrame>
        </BentoItem>

        {/* Show top 3 activities (optional: remove duplicates or show different views) */}
        {filteredData.activityDistribution.slice(0, 3).map((_, index) => (
          <BentoItem key={index} res={/* ... */}>
            <WidgetFrame nav={{ icon: "pie_chart", title: `Activity Distribution ${index + 1}` }}>
              <ActivityDistributionPieChart 
                data={filteredData.activityDistribution}
                alwaysShowLabels={true}
                showLegendValue={true}
                showLegendUnit={false}
                showLabelUnit={true}
              />
            </WidgetFrame>
          </BentoItem>
        ))}
      </BentoGrid>
    </BentoItem>

    {/* Heat Map - Uses year filter only (not location) */}
    <BentoItem res={/* ... */}>
      <WidgetFrame nav={{ title: "Sports Activities Distribution" }}>
        <ChinaHeatMap
          // TODO: Transform filteredData.heatMapData to proper format
          categories={chinaHeatMapCategories} // Placeholder
          defaultCategoryIndex={1}
          center={[33.8, 114.1]}
          zoom={4.2}
          designProperties={{ radiusFactor: 25000 }}
        />
      </WidgetFrame>
    </BentoItem>
  </BentoGrid>
</DocSection>
```

### Task 5.5: Update Engagement Overview Section

Replace static data with filtered data:

**Before** (Current):
```typescript
<DocSection
  label="Apr 1, 2025 – Mar 31, 2026"
  title="Engagement Overview"
  description={/* ... */}
>
  <BentoGrid gap={"md"} rowHeight={[[Infinity, 328]]}>
    {/* TrendChart */}
    <BentoItem res={/* ... */}>
      <WidgetFrame nav={{ icon: "bar_chart", title: "Resource Planning" }}>
        <TrendChart
          data={trendChartData}
          series={trendChartSeriesConfig}
          /* ... */
        />
      </WidgetFrame>
    </BentoItem>

    {/* Metrics */}
    <BentoItem res={/* ... */}>
      <WidgetFrame nav={{ icon: "bar_chart", title: "Total Service Days Used" }}>
        <EngagementOverviewMetric data={currentMetrics.serviceDays} />
      </WidgetFrame>
    </BentoItem>
    {/* ... */}
  </BentoGrid>

  {/* KPI Ring Charts */}
  <BentoGrid gap={"md"} rowHeight={[[Infinity, 250]]}>
    {kpiRingChartData.map((data, index) => (
      <BentoItem key={index} res={/* ... */}>
        <WidgetFrame>
          <KpiRingChart data={data} />
        </WidgetFrame>
      </BentoItem>
    ))}
  </BentoGrid>
</DocSection>
```

**After** (Updated):
```typescript
<DocSection
  label="Apr 1, 2025 – Mar 31, 2026"
  title="Engagement Overview"
  description={/* ... */}
>
  <BentoGrid gap={"md"} rowHeight={[[Infinity, 328]]}>
    {/* TrendChart - Now using filtered data */}
    <BentoItem res={/* ... */}>
      <WidgetFrame nav={{ icon: "bar_chart", title: "Resource Planning" }}>
        <TrendChart
          data={filteredData.trendChartData.data}
          series={trendChartSeriesConfig} // Keep existing series config
          xAxisPadding={{ left: 40, right: 40 }}
          enableSelection={true}
          defaultSelectedNode={{ label: "APR", seriesKey: "used" }}
          onNodeSelect={handleNodeSelect}
        />
      </WidgetFrame>
    </BentoItem>

    {/* Metrics - Now using filtered data */}
    <BentoItem res={/* ... */}>
      <WidgetFrame nav={{ icon: "bar_chart", title: "Total Service Days Used" }}>
        <EngagementOverviewMetric data={currentMetrics.serviceDays} />
      </WidgetFrame>
    </BentoItem>

    <BentoItem res={/* ... */}>
      <WidgetFrame nav={{ icon: "bar_chart", title: "% of Ambassadors Engaged" }}>
        <EngagementOverviewMetric data={currentMetrics.ambassadorsEngaged} />
      </WidgetFrame>
    </BentoItem>
  </BentoGrid>

  <TextHr>Engagement by Athletic Discipline</TextHr>

  {/* KPI Ring Charts - Now using filtered data */}
  <BentoGrid gap={"md"} rowHeight={[[Infinity, 250]]}>
    {filteredData.activityKpi.map((kpiData, index) => (
      <BentoItem 
        key={kpiData.title} 
        res={[
          [760, 12, 1],
          [1000, 6, 1],
          [Infinity, 4, 1],
        ]}
      >
        <WidgetFrame>
          <KpiRingChart data={kpiData} />
        </WidgetFrame>
      </BentoItem>
    ))}
  </BentoGrid>
</DocSection>
```

### Task 5.6: Update Pipeline Overview Section

Replace static data with filtered data:

**Before** (Current):
```typescript
<DocSection
  label="Apr 1, 2025 – Mar 31, 2026"
  title="Pipeline Overview"
  description={/* ... */}
>
  <BentoGrid gap={"md"} rowHeight={[[Infinity, 312]]}>
    {/* Summary */}
    <BentoItem res={[[Infinity, 6, 2]]}>
      <WidgetFrame nav={{ icon: "tornado", title: "Summary" }}>
        <SummaryActivityProgressCard data={summaryActivityProgressCardData} />
      </WidgetFrame>
    </BentoItem>

    {/* Individual activities */}
    <BentoItem res={[[Infinity, 2, 1]]}>
      <WidgetFrame nav={{ icon: "...", title: "..." }}>
        <ActivityProgressCard data={activityProgressCardDataObject.activityProgressCardData} />
      </WidgetFrame>
    </BentoItem>
    {/* ... more activities ... */}
  </BentoGrid>
</DocSection>
```

**After** (Updated):
```typescript
<DocSection
  label="Apr 1, 2025 – Mar 31, 2026"
  title="Pipeline Overview"
  description={/* ... */}
>
  <BentoGrid gap={"md"} rowHeight={[[Infinity, 312]]}>
    {/* Summary - Now using filtered data */}
    <BentoItem res={[[Infinity, 6, 2]]}>
      <WidgetFrame nav={{ icon: "tornado", title: "Summary" }}>
        <SummaryActivityProgressCard data={filteredData.pipelineData.summary} />
      </WidgetFrame>
    </BentoItem>

    {/* Individual activities - Now using filtered data */}
    {Object.entries(filteredData.pipelineData.byActivity).map(([activityType, data]) => (
      <BentoItem key={activityType} res={[[Infinity, 2, 1]]}>
        <WidgetFrame 
          nav={{ 
            icon: getActivityIcon(activityType), // Helper function
            title: formatActivityName(activityType), // Helper function
          }}
        >
          <ActivityProgressCard data={data} />
        </WidgetFrame>
      </BentoItem>
    ))}
  </BentoGrid>
</DocSection>
```

### Task 5.7: Add Helper Functions

Add helper functions at the top of the component file:

```typescript
/**
 * Get icon for activity type
 */
function getActivityIcon(activityType: string): string {
  const iconMap: Record<string, string> = {
    train: 'fitness_center',
    tennis: 'sports_tennis',
    yoga: 'self_improvement',
    ski: 'downhill_skiing',
    swimming: 'pool',
    running: 'directions_run',
    cycling: 'directions_bike',
    hiking: 'hiking',
    gym: 'fitness_center',
  };
  return iconMap[activityType] || 'sports';
}

/**
 * Format activity name for display
 */
function formatActivityName(activityType: string): string {
  return activityType.charAt(0).toUpperCase() + activityType.slice(1);
}
```

### Task 5.8: Add Empty State Handling (Optional)

Add a check for when filters produce no results:

```typescript
export const PageContent = () => {
  // ... existing code ...

  // Check if filtered data is empty
  const hasData = filteredData.totalAmbassadors > 0;

  if (!hasData) {
    return (
      <Layout
        contentDesign={{ widthMode: "large" }}
        elements={{
          navBar: {
            first: [/* ... */],
            last: [
              <LocationSelector 
                locationData={location}
                value={filterState.location}
                onChange={handleLocationChange}
              />,
              <YearSelector 
                yearData={allYears}
                value={filterState.year}
                onChange={handleYearChange}
              />,
            ],
          },
          content: (
            <div style={{ 
              padding: '40px', 
              textAlign: 'center',
              fontSize: '18px',
              color: '#666'
            }}>
              <p>No data matches the current filters.</p>
              <p style={{ marginTop: '20px' }}>
                Active filters: {filteredData.filterStats.activeFilters.join(', ')}
              </p>
            </div>
          ),
        }}
      />
    );
  }

  return (
    // ... normal layout with data ...
  );
};
```

---

## Acceptance Criteria

- [ ] Filter state is properly initialized
- [ ] Location selector updates filter state on change
- [ ] Year selector updates filter state on change
- [ ] All widgets display filtered data
- [ ] Heat map uses year-only filtering (not affected by location)
- [ ] Empty state is handled gracefully
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Filter changes trigger immediate UI updates

---

## Testing Checklist

### Functional Testing

Test each filter combination:

- [ ] **No filters**: All data displayed
- [ ] **Region only**: Data filtered to selected region
- [ ] **Region + Area**: Data filtered to selected area
- [ ] **Region + Area + City**: Data filtered to selected city
- [ ] **Year only**: Data filtered to selected year
- [ ] **Location + Year**: Combined filtering works correctly
- [ ] **Clear filters**: Resets to all data

### Widget-Specific Testing

- [ ] **Ambassador Total**: Updates with filters
- [ ] **Activity Distribution**: Shows only activities in filtered data
- [ ] **TrendChart**: Monthly data reflects filters
- [ ] **Engagement Metrics**: Percentages recalculate correctly
- [ ] **KPI Ring Charts**: Only shows activities present in filtered data
- [ ] **Pipeline Cards**: Numbers update per filter
- [ ] **Heat Map**: Only changes with year filter (not location)

### Edge Cases

- [ ] Empty result: Filters produce no data
- [ ] Single result: Only one data point matches
- [ ] All data: No filters applied
- [ ] Rapid filter changes: No performance issues

---

## Performance Verification

Add temporary performance logging:

```typescript
React.useEffect(() => {
  const renderStart = performance.now();
  
  // This runs after render
  requestAnimationFrame(() => {
    const renderEnd = performance.now();
    console.log(`[Render Performance] ${(renderEnd - renderStart).toFixed(2)}ms`);
  });
}, [filteredData]);
```

**Expected Performance:**
- Initial load: <500ms
- Filter change: <200ms (including re-render)
- Smooth animations and transitions

---

## Cleanup Tasks

Before finalizing:

1. **Remove debug logging**:
   ```typescript
   // Remove all console.log statements related to debugging
   ```

2. **Remove temporary imports**:
   ```typescript
   // Remove imports for old static data (if no longer used)
   // import { pieChartData, kpiRingChartData } from './data-just-for-1-time-test/some';
   ```

3. **Update imports**:
   ```typescript
   // Ensure all imports are used
   // Remove unused imports
   ```

4. **Format code**:
   ```bash
   npm run format
   # or
   npx prettier --write _component.tsx
   ```

---

## Next Steps

After completing this step:
1. Thoroughly test all filter combinations
2. Verify performance meets requirements
3. Check for any console errors or warnings
4. Proceed to **Step 6**: Testing & verification

---

## Troubleshooting

**Issue**: "Widgets don't update when filters change"
- **Solution**: Check that `filteredData` is derived from `filterState`; verify memoization dependencies

**Issue**: "Type errors when passing filtered data to widgets"
- **Solution**: Check transformer output types match widget prop types; add type assertions if needed

**Issue**: "Heat map changes with location filter"
- **Solution**: Verify heat map is using `filteredData.heatMapData` which comes from `applyYearFilterOnly`

**Issue**: "Performance is sluggish when changing filters"
- **Solution**: Profile with React DevTools; check that transformers are memoized; verify no infinite loops

**Issue**: "Selectors don't show selected values"
- **Solution**: Ensure `value` prop is passed to selectors; check that filter state is updating correctly

**Issue**: "Empty state never shows"
- **Solution**: Check `hasData` condition; verify filter combinations that should produce empty results
