# Quick Reference Card

## 🎯 One-Page Cheat Sheet

### Data Flow
```
Raw Data → Filter → Aggregate → Transform → Widget
```

---

## 📦 Key Data Types

```typescript
// Single data point (finest granularity)
interface RawDataPoint {
  // Filters
  region: string;
  area: string;
  city: string;
  year: number;
  month: string;
  activityType: string;
  
  // Metrics
  ambassadorCount: number;
  serviceDaysUsed: number;
  serviceDaysTotal: number;
  // ... more metrics
}

// Filter state
interface FilterState {
  location: {
    region?: string;
    area?: string;
    city?: string;
  };
  year?: number;
}
```

---

## 🔧 Core Functions

### Filtering
```typescript
// Main filter (location + year)
applyFilters(dataPoints, filterState) → RawDataPoint[]

// Heat map special case (year only)
applyYearFilterOnly(dataPoints, year) → RawDataPoint[]

// Check individual matches
matchesLocationFilter(point, location) → boolean
matchesYearFilter(point, year) → boolean
```

### Aggregation
```typescript
// Sum all metrics across points
aggregateMetrics(dataPoints) → AggregatedMetrics

// Group points by field
groupBy(array, getKey) → Map<string, T[]>

// Calculate percentage safely
calculatePercentage(current, total) → number
```

### Transformation
```typescript
// For widgets
transformToMonthlyMetrics(points) → MetricsDataByMonth
transformToActivityDistribution(points) → ActivityDistributionItem[]
transformToActivityKpi(points) → KpiData[]
transformToTrendChart(points) → TrendChartData
calculateTotalAmbassadors(points) → number
```

---

## 🎣 React Hooks

```typescript
// Filter state management
const { filterState, handleLocationChange, handleYearChange } 
  = useFilterState();

// Get filtered & transformed data
const filteredData = useFilteredData(rawDataset, filterState);

// Available in filteredData:
// - totalAmbassadors
// - activityDistribution
// - monthlyMetrics
// - trendChartData
// - activityKpi
// - pipelineData
// - heatMapData
// - filterStats
```

---

## 🗺️ Filter Hierarchy

```
Location (3 levels):
  Region (most general)
    └─ Area (more specific)
        └─ City (most specific)

Year (independent):
  2025, 2026, or undefined (all years)

Special Case:
  Heat Map = Year filter ONLY (location ignored)
```

---

## 📊 Widget Data Mapping

| Widget | Data Source | Key Metrics |
|--------|-------------|-------------|
| TextMetric (Ambassador Total) | `totalAmbassadors` | Count |
| ActivityDistributionPieChart | `activityDistribution` | Count per activity |
| TrendChart | `trendChartData` | Monthly used/total |
| EngagementOverviewMetric | `monthlyMetrics[month]` | Service days, % engaged |
| KpiRingChart | `activityKpi` | Distribution, service days |
| ActivityProgressCard | `pipelineData.byActivity` | Pipeline funnel |
| SummaryActivityProgressCard | `pipelineData.summary` | Total pipeline |
| ChinaHeatMap | `heatMapData` | Geographic distribution |

---

## ⚡ Performance Targets

| Operation | Target | Status Check |
|-----------|--------|--------------|
| Filtering | <50ms | ✅ if <50ms, ⚠️ if >100ms |
| Transformation | <50ms | ✅ if <50ms, ⚠️ if >100ms |
| Full Pipeline | <100ms | ✅ if <100ms, ⚠️ if >200ms |

---

## 🧪 Testing Quick Commands

```bash
# Run unit tests
npm test data-filtering.test.ts

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Format
npm run format
```

---

## 🐛 Debug Checklist

**Filters not working?**
- [ ] Check filter state is updating
- [ ] Verify `filteredData` depends on `filterState`
- [ ] Check memoization dependencies

**Wrong numbers?**
- [ ] Validate raw data
- [ ] Check aggregation logic
- [ ] Verify no duplicate counting

**Performance issues?**
- [ ] Profile with DevTools
- [ ] Check memoization is working
- [ ] Verify no infinite loops

**Type errors?**
- [ ] Ensure all types are imported
- [ ] Check transformer output types match widget props
- [ ] Verify data structure consistency

---

## 📝 Implementation Checklist

- [ ] **Step 1**: Types defined in `types/data-filtering.ts`
- [ ] **Step 2**: Dataset generated in `data-just-for-1-time-test/raw-dataset.ts`
- [ ] **Step 3**: Transformers created in `utils/data-transformers.ts`
- [ ] **Step 4**: Filters implemented in `utils/data-filtering.ts`
- [ ] **Step 5**: Component updated in `_component.tsx`
- [ ] **Step 6**: All tests passing

---

## 🔗 File Import Map

```typescript
// Types
import type { RawDataPoint, FilterState } from './types/data-filtering';

// Data
import { rawDataset } from './data-just-for-1-time-test/raw-dataset';
import { location } from './data-just-for-1-time-test/location';
import { allYears } from './data-just-for-1-time-test/year';

// Filtering
import { applyFilters, applyYearFilterOnly } from './utils/data-filtering';

// Transformation
import { 
  transformToMonthlyMetrics,
  transformToActivityDistribution,
  transformToActivityKpi
} from './utils/data-transformers';

// Hooks
import { useFilterState, useFilteredData } from './hooks/useFilteredData';

// Components
import { LocationSelector, YearSelector } from './play-components/universal-selectors';
```

---

## 💡 Common Patterns

### Safe Division
```typescript
const percentage = total === 0 ? 0 : (current / total) * 100;
```

### Safe Array Access
```typescript
const data = monthlyMetrics[month] || monthlyMetrics["APR"];
```

### Memoization
```typescript
const result = useMemo(() => {
  return expensiveOperation(dependency);
}, [dependency]);
```

### Empty State Check
```typescript
if (dataPoints.length === 0) {
  return []; // or default value
}
```

---

## 🎨 Color Palette (for charts)

```typescript
const colors = [
  '#FF5252', // Red
  '#FF8A80', // Light Red
  '#FFCDD2', // Pale Red
  '#90CAF9', // Blue
  '#81C784', // Green
  '#FFD54F', // Yellow
  '#BA68C8', // Purple
  '#4DD0E1', // Cyan
  '#E0E0E0', // Gray
];
```

---

## 📐 Business Rules

1. **Service Days**: `total = ambassadorCount × 4`
2. **Used ≤ Total**: `serviceDaysUsed ≤ serviceDaysTotal`
3. **Engagement**: `ambassadorsEngaged ≤ ambassadorCount`
4. **Channel Split**: `sscRequests + storeCommunities ≈ serviceDaysUsed`
5. **Pipeline Funnel**: `referred > connecting > strong`

---

## 🚨 Edge Cases to Handle

- ✅ Empty filter results
- ✅ Single data point
- ✅ Division by zero
- ✅ Missing data fields
- ✅ Invalid filter combinations
- ✅ Rapid filter changes
- ✅ Null/undefined values

---

## 📞 Emergency Commands

```typescript
// Reset everything
localStorage.clear();
location.reload();

// Force re-render
setFilterState({ ...filterState });

// Check raw data
console.log(rawDataset);

// Check filtered count
console.log(filteredData.filterStats);
```

---

## ✨ Optimization Tips

1. **Memoize expensive calculations**
2. **Use early returns for empty arrays**
3. **Avoid inline object creation in dependencies**
4. **Batch state updates when possible**
5. **Profile before optimizing**

---

This reference card should be kept handy during implementation! 🚀
