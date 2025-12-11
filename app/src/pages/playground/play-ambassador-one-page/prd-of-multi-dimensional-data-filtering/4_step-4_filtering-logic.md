# Step 4: Filtering Logic

## Objective

Implement filtering logic to:
1. Apply location and year filters to raw dataset
2. Handle special case: heat map filtered by year only
3. Create optimized hooks for use in React components
4. Ensure filtering is performant and type-safe

---

## Background

Filtering operates on the raw dataset to produce a subset matching the selected criteria:
- **Location Filter**: Match region, area, or city (hierarchical)
- **Year Filter**: Match specific year
- **Special Case**: Heat map data is filtered by year only, not location

---

## Tasks

### Task 4.1: Create Core Filtering Functions

Create file: `utils/data-filtering.ts`

```typescript
import type { RawDataPoint, FilterState, LocationFilter } from '../types/data-filtering';

/**
 * Check if a data point matches the location filter
 * Location filter is hierarchical: region > area > city
 */
export function matchesLocationFilter(
  dataPoint: RawDataPoint,
  filter: LocationFilter
): boolean {
  // If no location filter is set, match all
  if (!filter.region && !filter.area && !filter.city) {
    return true;
  }

  // Check region match (most general)
  if (filter.region && dataPoint.region !== filter.region) {
    return false;
  }

  // Check area match (more specific)
  if (filter.area && dataPoint.area !== filter.area) {
    return false;
  }

  // Check city match (most specific)
  if (filter.city && dataPoint.city !== filter.city) {
    return false;
  }

  return true;
}

/**
 * Check if a data point matches the year filter
 */
export function matchesYearFilter(
  dataPoint: RawDataPoint,
  year?: number
): boolean {
  // If no year filter is set, match all
  if (year === undefined) {
    return true;
  }

  return dataPoint.year === year;
}

/**
 * Apply filters to dataset
 * Main filtering function for dashboard widgets
 */
export function applyFilters(
  dataPoints: RawDataPoint[],
  filterState: FilterState
): RawDataPoint[] {
  return dataPoints.filter((point) => {
    const locationMatch = matchesLocationFilter(point, filterState.location);
    const yearMatch = matchesYearFilter(point, filterState.year);
    
    return locationMatch && yearMatch;
  });
}

/**
 * Apply year filter only (for heat map)
 * Special case: heat map is not filtered by location
 */
export function applyYearFilterOnly(
  dataPoints: RawDataPoint[],
  year?: number
): RawDataPoint[] {
  if (year === undefined) {
    return dataPoints;
  }

  return dataPoints.filter((point) => matchesYearFilter(point, year));
}

/**
 * Get filter summary statistics
 * Useful for debugging and displaying filter info
 */
export function getFilterStats(
  originalCount: number,
  filteredCount: number,
  filterState: FilterState
): {
  originalCount: number;
  filteredCount: number;
  reductionPercentage: number;
  activeFilters: string[];
  isFiltered: boolean;
} {
  const activeFilters: string[] = [];

  if (filterState.location.region) {
    activeFilters.push(`Region: ${filterState.location.region}`);
  }
  if (filterState.location.area) {
    activeFilters.push(`Area: ${filterState.location.area}`);
  }
  if (filterState.location.city) {
    activeFilters.push(`City: ${filterState.location.city}`);
  }
  if (filterState.year) {
    activeFilters.push(`Year: ${filterState.year}`);
  }

  const reductionPercentage =
    originalCount > 0
      ? Math.round(((originalCount - filteredCount) / originalCount) * 100)
      : 0;

  return {
    originalCount,
    filteredCount,
    reductionPercentage,
    activeFilters,
    isFiltered: activeFilters.length > 0,
  };
}
```

### Task 4.2: Create React Hook for Filtered Data

Create file: `hooks/useFilteredData.ts`

```typescript
import { useMemo } from 'react';
import type { RawDataset, FilterState } from '../types/data-filtering';
import type { MetricsDataByMonth } from '../types/metrics';
import type { ActivityDistributionItem } from '../play-components/activity-distribution-pie-chart';
import type { KpiData } from '../../../components/widgets/widet-components/kpi-ring-chart';
import {
  applyFilters,
  applyYearFilterOnly,
  getFilterStats,
} from '../utils/data-filtering';
import {
  transformToMonthlyMetrics,
  transformToActivityDistribution,
  transformToActivityKpi,
  transformToTrendChart,
  calculateTotalAmbassadors,
  transformToActivityProgress,
} from '../utils/data-transformers';

/**
 * Complete filtered and transformed data for all dashboard widgets
 */
export interface FilteredDashboardData {
  // Roster Overview Section
  totalAmbassadors: number;
  activityDistribution: ActivityDistributionItem[];

  // Engagement Overview Section
  monthlyMetrics: MetricsDataByMonth;
  trendChartData: {
    data: Array<{ label: string; used: number; total: number }>;
    totalUsed: number;
    totalAvailable: number;
  };
  activityKpi: KpiData[];

  // Pipeline Overview Section
  pipelineData: {
    summary: any;
    byActivity: Record<string, any>;
  };

  // Heat Map (special: year filter only)
  heatMapData: any; // Type depends on heat map component requirements

  // Metadata
  filterStats: {
    originalCount: number;
    filteredCount: number;
    reductionPercentage: number;
    activeFilters: string[];
    isFiltered: boolean;
  };
}

/**
 * Hook to get filtered and transformed dashboard data
 * Automatically memoizes to prevent unnecessary recalculations
 */
export function useFilteredData(
  rawDataset: RawDataset,
  filterState: FilterState
): FilteredDashboardData {
  // Apply filters (memoized)
  const filteredDataPoints = useMemo(() => {
    return applyFilters(rawDataset.dataPoints, filterState);
  }, [rawDataset.dataPoints, filterState]);

  // Apply year filter only for heat map (memoized)
  const heatMapFilteredPoints = useMemo(() => {
    return applyYearFilterOnly(rawDataset.dataPoints, filterState.year);
  }, [rawDataset.dataPoints, filterState.year]);

  // Transform data for each widget (all memoized)
  const transformedData = useMemo(() => {
    return {
      totalAmbassadors: calculateTotalAmbassadors(filteredDataPoints),
      activityDistribution: transformToActivityDistribution(filteredDataPoints),
      monthlyMetrics: transformToMonthlyMetrics(filteredDataPoints),
      trendChartData: transformToTrendChart(filteredDataPoints),
      activityKpi: transformToActivityKpi(filteredDataPoints),
      pipelineData: transformToActivityProgress(filteredDataPoints),
      heatMapData: heatMapFilteredPoints, // TODO: Transform to heat map format
      filterStats: getFilterStats(
        rawDataset.dataPoints.length,
        filteredDataPoints.length,
        filterState
      ),
    };
  }, [filteredDataPoints, heatMapFilteredPoints, rawDataset.dataPoints.length, filterState]);

  return transformedData;
}
```

### Task 4.3: Create Hook for Filter State Management

```typescript
/**
 * Hook to manage filter state and provide handlers
 * Centralizes filter state logic
 */
export function useFilterState(
  initialLocation?: LocationFilter,
  initialYear?: number
) {
  const [filterState, setFilterState] = React.useState<FilterState>({
    location: initialLocation || {},
    year: initialYear,
  });

  // Handler for location selector
  const handleLocationChange = React.useCallback((location: LocationFilter) => {
    setFilterState((prev) => ({
      ...prev,
      location,
    }));
  }, []);

  // Handler for year selector
  const handleYearChange = React.useCallback((year?: number) => {
    setFilterState((prev) => ({
      ...prev,
      year,
    }));
  }, []);

  // Reset all filters
  const resetFilters = React.useCallback(() => {
    setFilterState({
      location: {},
      year: undefined,
    });
  }, []);

  return {
    filterState,
    handleLocationChange,
    handleYearChange,
    resetFilters,
  };
}
```

### Task 4.4: Add Performance Monitoring (Optional)

```typescript
/**
 * Hook to monitor filtering performance
 * Useful for development/debugging
 */
export function useFilterPerformance(
  rawDataset: RawDataset,
  filterState: FilterState
) {
  React.useEffect(() => {
    const startTime = performance.now();

    // Simulate filtering
    const filtered = applyFilters(rawDataset.dataPoints, filterState);

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`[Filter Performance]`, {
      duration: `${duration.toFixed(2)}ms`,
      originalPoints: rawDataset.dataPoints.length,
      filteredPoints: filtered.length,
      filterState,
    });

    // Warn if filtering is slow
    if (duration > 100) {
      console.warn(
        `⚠️ Filtering took ${duration.toFixed(2)}ms (threshold: 100ms)`
      );
    }
  }, [rawDataset.dataPoints, filterState]);
}
```

---

## Acceptance Criteria

- [ ] File `utils/data-filtering.ts` exists with all filtering functions
- [ ] File `hooks/useFilteredData.ts` exists with memoized data hook
- [ ] Location filtering works hierarchically (region > area > city)
- [ ] Year filtering works independently
- [ ] Heat map correctly uses year-only filtering
- [ ] All functions are properly typed
- [ ] Memoization is correctly implemented (useMemo with proper dependencies)
- [ ] Performance is acceptable (<100ms for typical filtering)

---

## Testing

### Unit Tests

```typescript
import { matchesLocationFilter, matchesYearFilter, applyFilters } from '../utils/data-filtering';
import type { RawDataPoint, FilterState } from '../types/data-filtering';

describe('Location Filtering', () => {
  const testPoint: RawDataPoint = {
    region: 'central',
    area: 'jiangsu',
    city: 'nanjing',
    year: 2025,
    // ... other fields
  };

  it('should match when no filter is set', () => {
    expect(matchesLocationFilter(testPoint, {})).toBe(true);
  });

  it('should match region filter', () => {
    expect(matchesLocationFilter(testPoint, { region: 'central' })).toBe(true);
    expect(matchesLocationFilter(testPoint, { region: 'north' })).toBe(false);
  });

  it('should match area filter', () => {
    expect(matchesLocationFilter(testPoint, { area: 'jiangsu' })).toBe(true);
    expect(matchesLocationFilter(testPoint, { area: 'zhejiang' })).toBe(false);
  });

  it('should match city filter', () => {
    expect(matchesLocationFilter(testPoint, { city: 'nanjing' })).toBe(true);
    expect(matchesLocationFilter(testPoint, { city: 'suzhou' })).toBe(false);
  });

  it('should match hierarchical filter (region + area)', () => {
    expect(
      matchesLocationFilter(testPoint, { region: 'central', area: 'jiangsu' })
    ).toBe(true);
    expect(
      matchesLocationFilter(testPoint, { region: 'central', area: 'zhejiang' })
    ).toBe(false);
  });
});

describe('Year Filtering', () => {
  const testPoint: RawDataPoint = {
    year: 2025,
    // ... other fields
  };

  it('should match when no year filter is set', () => {
    expect(matchesYearFilter(testPoint, undefined)).toBe(true);
  });

  it('should match year filter', () => {
    expect(matchesYearFilter(testPoint, 2025)).toBe(true);
    expect(matchesYearFilter(testPoint, 2026)).toBe(false);
  });
});

describe('Combined Filtering', () => {
  const testData: RawDataPoint[] = [
    { region: 'central', area: 'jiangsu', city: 'nanjing', year: 2025, /* ... */ },
    { region: 'central', area: 'jiangsu', city: 'suzhou', year: 2025, /* ... */ },
    { region: 'central', area: 'zhejiang', city: 'hangzhou', year: 2025, /* ... */ },
    { region: 'central', area: 'jiangsu', city: 'nanjing', year: 2026, /* ... */ },
  ];

  it('should filter by area only', () => {
    const result = applyFilters(testData, {
      location: { area: 'jiangsu' },
      year: undefined,
    });
    expect(result).toHaveLength(3); // 2 from 2025 + 1 from 2026
  });

  it('should filter by area and year', () => {
    const result = applyFilters(testData, {
      location: { area: 'jiangsu' },
      year: 2025,
    });
    expect(result).toHaveLength(2); // Nanjing + Suzhou in 2025
  });

  it('should return all when no filters are set', () => {
    const result = applyFilters(testData, {
      location: {},
      year: undefined,
    });
    expect(result).toHaveLength(4);
  });
});
```

### Manual Testing in Component

Add to `_component.tsx` temporarily:

```typescript
import { rawDataset } from './data-just-for-1-time-test/raw-dataset';
import { useFilterState, useFilteredData } from './hooks/useFilteredData';

// Inside component:
const { filterState, handleLocationChange, handleYearChange } = useFilterState();
const filteredData = useFilteredData(rawDataset, filterState);

// Log when filters change
React.useEffect(() => {
  console.log('Filter State:', filterState);
  console.log('Filter Stats:', filteredData.filterStats);
  console.log('Total Ambassadors:', filteredData.totalAmbassadors);
}, [filterState, filteredData]);
```

---

## Performance Optimization

### Memoization Strategy

1. **Raw filtering** (`applyFilters`): Memoized in `useFilteredData`
2. **Each transformation**: Individually memoized
3. **Dependencies**: Only re-compute when filter state changes

### Expected Performance

- **Filtering 1,000 points**: ~10ms
- **All transformations**: ~50ms
- **Total (filter + transform)**: ~60ms ✅ Under 100ms threshold

### Performance Troubleshooting

If performance is slow:

1. **Check filter state dependencies**: Ensure filter objects are stable
2. **Verify memoization**: Use React DevTools Profiler
3. **Optimize transformers**: Profile individual transformer functions
4. **Consider pre-aggregation**: Pre-compute common aggregations

---

## Edge Cases to Handle

### Empty Results

When filters produce no matching data:

```typescript
// In transformers, always check for empty arrays
export function transformToActivityDistribution(
  dataPoints: RawDataPoint[]
): ActivityDistributionItem[] {
  if (dataPoints.length === 0) {
    return []; // Return empty array, not null
  }
  // ... rest of logic
}
```

### Invalid Filter Combinations

```typescript
// Example: filtering by city without area
const filter: LocationFilter = { city: 'nanjing' }; // Missing region/area

// Our filter still works because we check each level independently
// But consider adding validation:
export function validateFilter(filter: LocationFilter): string[] {
  const errors: string[] = [];
  
  if (filter.city && !filter.area) {
    errors.push('City filter requires area to be set');
  }
  if (filter.area && !filter.region) {
    errors.push('Area filter requires region to be set');
  }
  
  return errors;
}
```

### Performance with Large Datasets

```typescript
// For very large datasets (>10,000 points), consider:
// 1. Indexing by filter keys
// 2. Web Workers for filtering
// 3. Pagination/virtualization

// Example: Simple index
const dataIndex = useMemo(() => {
  const index = new Map<string, RawDataPoint[]>();
  
  for (const point of rawDataset.dataPoints) {
    const key = `${point.region}-${point.area}-${point.city}-${point.year}`;
    if (!index.has(key)) {
      index.set(key, []);
    }
    index.get(key)!.push(point);
  }
  
  return index;
}, [rawDataset.dataPoints]);
```

---

## Next Steps

After completing this step:
1. Test filtering with various filter combinations
2. Verify performance meets requirements
3. Check edge cases (empty results, all filters, no filters)
4. Proceed to **Step 5**: State management integration

---

## Troubleshooting

**Issue**: "Filters don't seem to work (all data still shown)"
- **Solution**: Check that filter state is being passed correctly; verify filter comparison logic

**Issue**: "Component re-renders too often"
- **Solution**: Ensure filter state objects are stable; use `useCallback` for handlers

**Issue**: "Performance degrades with multiple filters"
- **Solution**: Profile each filter check; consider early exit patterns

**Issue**: "Heat map data is empty when location is filtered"
- **Solution**: Verify heat map is using `applyYearFilterOnly`, not `applyFilters`
