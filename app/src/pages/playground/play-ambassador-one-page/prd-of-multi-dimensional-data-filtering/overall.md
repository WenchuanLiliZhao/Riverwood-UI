# PRD: Multi-Dimensional Data Filtering System

## Executive Summary

This PRD outlines the implementation of a comprehensive data filtering system for the Ambassador One Page dashboard. The system allows users to filter data by **Location** (Region → Area → City) and **Year**, with all dashboard widgets dynamically updating based on the selected filters.

---

## Problem Statement

Currently, the dashboard displays static mockup data without filtering capabilities. The selectors in the navigation bar (`LocationSelector` and `YearSelector`) exist but don't trigger any data updates. We need to:

1. Design a **frontend data structure** that mimics real-world backend API responses
2. Implement **state management** for filter selections
3. Create **filtered data derivation logic** that updates all dashboard widgets
4. Provide **backend data table specifications** (2D Excel format) for backend engineers
5. Ensure **mockup data** is realistic and comprehensive enough for testing

---

## Key Requirements

### Functional Requirements

1. **Location Filtering (3-Level Hierarchy)**
   - User can select: Region → Area → City
   - Filtering is cumulative (selecting Area filters to that Area, selecting City further narrows down)
   - Location filtering affects: all metrics, charts, and progress cards
   - **Exception**: Location filtering does NOT affect the heat map data

2. **Year Filtering**
   - User can select a specific year from available years
   - Year filtering affects: all metrics, charts, progress cards, AND the heat map
   - Default behavior: no year selected = show aggregated data across all years

3. **Combined Filtering**
   - Both filters work together (intersection of conditions)
   - Example: "Jiangsu Area + 2025" = show only Jiangsu data from 2025

4. **Data Refresh**
   - All widgets update simultaneously when filters change
   - No loading states needed (client-side filtering from pre-loaded data)

### Non-Functional Requirements

1. **Performance**: Filtering operations should complete within 100ms
2. **Type Safety**: All data structures must be fully typed with TypeScript
3. **Maintainability**: Clear separation between raw data and filtered data
4. **Backend Compatibility**: Data structure should align with typical REST API responses

---

## Technical Architecture

### 1. Data Structure Design

#### Raw Data Format (mimics backend API response)

```typescript
interface DataPoint {
  // Dimensional attributes (filters)
  region: string;      // e.g., "central"
  area: string;        // e.g., "jiangsu"
  city: string;        // e.g., "nanjing"
  year: number;        // e.g., 2025
  month: string;       // e.g., "APR"
  
  // Categorical attributes
  activityType: string; // e.g., "train", "tennis"
  
  // Metric values
  ambassadorCount: number;
  serviceDays: number;
  // ... other metrics
}

interface RawDataset {
  dataPoints: DataPoint[];
  metadata: {
    lastUpdated: string;
    version: string;
  };
}
```

#### Aggregated Data Format (frontend computed)

After filtering, we aggregate data points to match widget requirements:

```typescript
interface AggregatedData {
  // Roster Overview Section
  totalAmbassadors: number;
  activityDistribution: ActivityDistributionItem[];
  
  // Engagement Overview Section
  metricsByMonth: MetricsDataByMonth;
  kpiByActivity: KpiData[];
  
  // Pipeline Overview Section
  pipelineData: PipelineData;
  
  // Heat Map (special: only filtered by year)
  heatMapCategories: CategoryData[];
}
```

### 2. State Management

Use React's `useState` and `useMemo` for simple, performant state management:

```typescript
// Filter state
const [locationFilter, setLocationFilter] = useState<LocationSelection>({});
const [yearFilter, setYearFilter] = useState<number | undefined>(undefined);

// Derived data (memoized)
const filteredData = useMemo(() => {
  return computeFilteredData(rawDataset, locationFilter, yearFilter);
}, [rawDataset, locationFilter, yearFilter]);
```

### 3. Data Flow

```
┌─────────────────┐
│  Raw Dataset    │ (loaded from data file)
│  (DataPoint[])  │
└────────┬────────┘
         │
         ├─────────────────────────────┐
         │                             │
    ┌────▼─────────┐          ┌────────▼─────────┐
    │ Filter Logic │          │  Heat Map Filter │
    │ (Location +  │          │  (Year only)     │
    │  Year)       │          │                  │
    └────┬─────────┘          └────────┬─────────┘
         │                             │
    ┌────▼──────────────┐     ┌────────▼──────────┐
    │ Aggregation Logic │     │  Heat Map Data    │
    │ (Group by month,  │     │                   │
    │  activity, etc.)  │     │                   │
    └────┬──────────────┘     └────────┬──────────┘
         │                             │
         ├─────────────────────────────┘
         │
    ┌────▼─────────┐
    │   Render     │
    │  All Widgets │
    └──────────────┘
```

---

## Backend Data Table Specification

### Excel Table Structure

The backend should provide data in a **normalized 2D table** format (Excel/CSV), which will be transformed into the `DataPoint[]` array on the frontend.

#### Table: `ambassador_data.xlsx`

| Column Name | Data Type | Description | Example |
|------------|-----------|-------------|---------|
| **region** | String | Region identifier (lowercase key) | central |
| **region_name** | String | Display name for region | Central |
| **area** | String | Area identifier (lowercase key) | jiangsu |
| **area_name** | String | Display name for area | Jiangsu |
| **city** | String | City identifier (lowercase key) | nanjing |
| **city_name** | String | Display name for city | Nanjing |
| **year** | Integer | Fiscal year | 2025 |
| **month** | String | Month abbreviation (3 letters, uppercase) | APR |
| **activity_type** | String | Type of activity | train |
| **activity_name** | String | Display name for activity | Train |
| **ambassador_count** | Integer | Number of ambassadors in this segment | 15 |
| **service_days_used** | Decimal | Service days consumed | 32.5 |
| **service_days_total** | Decimal | Total allocated service days | 60.0 |
| **ambassadors_engaged** | Integer | Number of ambassadors who participated | 12 |
| **ssc_requests** | Decimal | Service days from SSC requests | 15.0 |
| **store_communities** | Decimal | Service days from store communities | 17.5 |
| **ssc_engaged** | Integer | Ambassadors engaged via SSC | 8 |
| **store_communities_engaged** | Integer | Ambassadors engaged via stores | 7 |
| **pipeline_referred** | Integer | Referred candidates | 5 |
| **pipeline_connecting** | Integer | Candidates being connected with | 3 |
| **pipeline_strong** | Integer | Strong pipeline candidates | 2 |

#### Example Rows

| region | region_name | area | area_name | city | city_name | year | month | activity_type | activity_name | ambassador_count | service_days_used | service_days_total | ambassadors_engaged | ... |
|--------|-------------|------|-----------|------|-----------|------|-------|---------------|---------------|------------------|-------------------|--------------------|--------------------|-----|
| central | Central | jiangsu | Jiangsu | nanjing | Nanjing | 2025 | APR | train | Train | 15 | 32.5 | 60.0 | 12 | ... |
| central | Central | jiangsu | Jiangsu | nanjing | Nanjing | 2025 | APR | tennis | Tennis | 10 | 20.0 | 40.0 | 8 | ... |
| central | Central | jiangsu | Jiangsu | suzhou | Suzhou | 2025 | APR | train | Train | 12 | 28.0 | 48.0 | 10 | ... |
| central | Central | zhejiang | Zhejiang | hangzhou | Hangzhou | 2025 | MAY | train | Train | 18 | 42.0 | 72.0 | 15 | ... |

#### Notes for Backend Engineers

1. **Granularity**: Each row represents the finest granularity (City + Year + Month + Activity Type)
2. **Aggregation**: Frontend will aggregate data as needed (e.g., sum across all cities for area-level view)
3. **Completeness**: Include all combinations even if some metrics are zero
4. **Consistency**: Ensure `ambassador_count` and related metrics are consistent across related rows
5. **Heat Map Data**: Include latitude/longitude coordinates for cities (can be in a separate reference table)

---

## Implementation Steps

This implementation is broken down into **6 sequential steps**:

### Step 1: Data Type Definitions
- Define TypeScript interfaces for raw data and aggregated data
- Create type definitions that align with backend table structure
- **Deliverable**: `types/data-filtering.ts`

### Step 2: Mockup Raw Dataset
- Create comprehensive mockup data covering all filter combinations
- Generate realistic values for all metrics
- **Deliverable**: `data-just-for-1-time-test/raw-dataset.ts`

### Step 3: Data Transformation Utilities
- Implement functions to transform raw data to widget-specific formats
- Create aggregation utilities (sum, average, group by)
- **Deliverable**: `utils/data-transformers.ts`

### Step 4: Filtering Logic
- Implement filter application logic
- Create memoized data derivation hooks
- **Deliverable**: `hooks/useFilteredData.ts`

### Step 5: State Management Integration
- Connect filter selectors to state
- Wire up filtered data to all widgets
- Update component to use filtered data
- **Deliverable**: Updated `_component.tsx`

### Step 6: Testing & Verification
- Verify all filter combinations work correctly
- Test edge cases (empty results, single item, etc.)
- Validate data consistency
- **Deliverable**: Testing checklist + any bug fixes

---

## Success Criteria

### Must Have
- ✅ Location selector filters all data except heat map
- ✅ Year selector filters all data including heat map
- ✅ All widgets update when filters change
- ✅ No console errors or type errors
- ✅ Mockup data is comprehensive and realistic

### Nice to Have
- ✅ Smooth transition animations when data updates
- ✅ Display message when no data matches filters
- ✅ Performance monitoring (ensure <100ms filtering)

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Data structure doesn't match backend reality** | Medium | High | Review with backend team; design is based on common patterns |
| **Performance issues with large datasets** | Low | Medium | Use memoization; pre-aggregate data |
| **Edge cases cause crashes** | Medium | Medium | Defensive programming; default values; comprehensive testing |
| **Heat map special handling adds complexity** | Low | Low | Clearly document exception; separate filter function |

---

## Timeline Estimate

- **Step 1**: 30 minutes
- **Step 2**: 2 hours (data generation is tedious)
- **Step 3**: 1.5 hours
- **Step 4**: 1 hour
- **Step 5**: 1 hour
- **Step 6**: 1 hour

**Total Estimated Time**: ~7 hours

---

## Next Steps

1. Review this PRD for any missing requirements or concerns
2. Proceed to **Step 1** (`1_step-1_data-type-definitions.md`)
3. Execute each step sequentially
4. Review and iterate based on findings

---

## Appendix

### A. Related Files

- Current component: `_component.tsx`
- Current selectors: `play-components/universal-selectors/`
- Current data files: `data-just-for-1-time-test/`
- Current types: `types/metrics.ts`

### B. Terminology

- **Raw Data**: Data in the format received from backend (or mockup equivalent)
- **Filtered Data**: Subset of raw data matching current filter criteria
- **Aggregated Data**: Filtered data grouped and computed into widget-specific formats
- **Data Point**: Single row in the raw dataset table

### C. References

- React Memoization: https://react.dev/reference/react/useMemo
- TypeScript Utility Types: https://www.typescriptlang.org/docs/handbook/utility-types.html
