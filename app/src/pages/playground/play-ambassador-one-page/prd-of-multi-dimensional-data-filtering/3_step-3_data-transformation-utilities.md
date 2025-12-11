# Step 3: Data Transformation Utilities

## Objective

Create utility functions to:
1. Transform raw data points into widget-specific formats
2. Aggregate data across different dimensions (sum, average, group by)
3. Handle edge cases (empty results, missing data)
4. Maintain type safety throughout transformations

---

## Background

Raw data points are at the finest granularity (city × month × activity). Widgets need data at various aggregation levels:
- **Total ambassadors**: Sum across ALL dimensions
- **Activity distribution**: Group by activity, sum ambassadors
- **Monthly metrics**: Group by month, sum service days and engagement
- **KPI by activity**: Group by activity, calculate percentages

---

## Tasks

### Task 3.1: Create Aggregation Utilities

Create file: `utils/data-aggregation.ts`

```typescript
import type { RawDataPoint, AggregatedMetrics } from '../types/data-filtering';

/**
 * Sum numeric metrics across an array of data points
 */
export function aggregateMetrics(dataPoints: RawDataPoint[]): AggregatedMetrics {
  if (dataPoints.length === 0) {
    return {
      ambassadorCount: 0,
      serviceDaysUsed: 0,
      serviceDaysTotal: 0,
      ambassadorsEngaged: 0,
      sscRequests: 0,
      storeCommunities: 0,
      sscEngaged: 0,
      storeCommunitiesEngaged: 0,
      pipelineReferred: 0,
      pipelineConnecting: 0,
      pipelineStrong: 0,
    };
  }

  return {
    ambassadorCount: sumBy(dataPoints, 'ambassadorCount'),
    serviceDaysUsed: sumBy(dataPoints, 'serviceDaysUsed'),
    serviceDaysTotal: sumBy(dataPoints, 'serviceDaysTotal'),
    ambassadorsEngaged: sumBy(dataPoints, 'ambassadorsEngaged'),
    sscRequests: sumBy(dataPoints, 'sscRequests'),
    storeCommunities: sumBy(dataPoints, 'storeCommunities'),
    sscEngaged: sumBy(dataPoints, 'sscEngaged'),
    storeCommunitiesEngaged: sumBy(dataPoints, 'storeCommunitiesEngaged'),
    pipelineReferred: sumBy(dataPoints, 'pipelineReferred'),
    pipelineConnecting: sumBy(dataPoints, 'pipelineConnecting'),
    pipelineStrong: sumBy(dataPoints, 'pipelineStrong'),
  };
}

/**
 * Sum a specific numeric field across data points
 */
function sumBy<T>(array: T[], key: keyof T): number {
  return array.reduce((sum, item) => {
    const value = item[key];
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);
}

/**
 * Group data points by a specific field
 */
export function groupBy<T>(
  array: T[],
  getKey: (item: T) => string
): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  
  for (const item of array) {
    const key = getKey(item);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(item);
  }
  
  return groups;
}

/**
 * Calculate percentage (handles division by zero)
 */
export function calculatePercentage(
  current: number,
  total: number,
  decimals: number = 0
): number {
  if (total === 0) return 0;
  const percentage = (current / total) * 100;
  return parseFloat(percentage.toFixed(decimals));
}

/**
 * Round number to specified decimal places
 */
export function roundTo(value: number, decimals: number = 1): number {
  return parseFloat(value.toFixed(decimals));
}
```

### Task 3.2: Create Widget-Specific Transformers

Create file: `utils/data-transformers.ts`

```typescript
import type { RawDataPoint } from '../types/data-filtering';
import type { MetricsDataByMonth } from '../types/metrics';
import type { ActivityDistributionItem } from '../play-components/activity-distribution-pie-chart';
import type { KpiData } from '../../../components/widgets/widet-components/kpi-ring-chart';
import {
  aggregateMetrics,
  groupBy,
  calculatePercentage,
  roundTo,
} from './data-aggregation';

/**
 * Transform data points to monthly engagement metrics
 * Used for: EngagementOverviewMetric widgets
 */
export function transformToMonthlyMetrics(
  dataPoints: RawDataPoint[]
): MetricsDataByMonth {
  const monthlyGroups = groupBy(dataPoints, (p) => p.month);
  const result: MetricsDataByMonth = {};

  // Month order for fiscal year
  const months = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];

  for (const month of months) {
    const monthData = monthlyGroups.get(month) || [];
    const metrics = aggregateMetrics(monthData);

    result[month] = {
      month,
      serviceDays: {
        percentage: calculatePercentage(metrics.serviceDaysUsed, metrics.serviceDaysTotal),
        current: roundTo(metrics.serviceDaysUsed),
        total: roundTo(metrics.serviceDaysTotal),
        unit: 'days',
        trendData: [
          {
            label: 'SSC Requests',
            color: '#ef4444',
            value: roundTo(metrics.sscRequests),
            total: roundTo(metrics.serviceDaysTotal),
            unit: 'days',
          },
          {
            label: 'Store Communities',
            color: '#ef4444',
            value: roundTo(metrics.storeCommunities),
            total: roundTo(metrics.serviceDaysTotal),
            unit: 'days',
          },
        ],
        description: 'A measure showing how much of the expected service commitment has been fulfilled so far',
      },
      ambassadorsEngaged: {
        percentage: calculatePercentage(metrics.ambassadorsEngaged, metrics.ambassadorCount),
        current: metrics.ambassadorsEngaged,
        total: metrics.ambassadorCount,
        unit: 'pax',
        trendData: [
          {
            label: 'SSC Engaged',
            color: '#ef4444',
            value: metrics.sscEngaged,
            total: metrics.ambassadorCount,
            unit: 'pax',
          },
          {
            label: 'Store Communities Engaged',
            color: '#ef4444',
            value: metrics.storeCommunitiesEngaged,
            total: metrics.ambassadorCount,
            unit: 'pax',
          },
        ],
        description: 'Percentage of ambassadors who have participated in at least one engagement this term',
      },
    };
  }

  return result;
}

/**
 * Transform data points to activity distribution (pie chart)
 * Used for: ActivityDistributionPieChart widget
 */
export function transformToActivityDistribution(
  dataPoints: RawDataPoint[]
): ActivityDistributionItem[] {
  const activityGroups = groupBy(dataPoints, (p) => p.activityType);
  const totalAmbassadors = aggregateMetrics(dataPoints).ambassadorCount;

  // Activity icon mapping
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

  // Color palette
  const colors = [
    '#FF5252', '#FF8A80', '#FFCDD2', '#90CAF9',
    '#81C784', '#FFD54F', '#BA68C8', '#4DD0E1', '#E0E0E0'
  ];

  const result: ActivityDistributionItem[] = [];
  let colorIndex = 0;

  for (const [activityType, activityData] of activityGroups.entries()) {
    const metrics = aggregateMetrics(activityData);
    const activityName = activityData[0]?.activityName || activityType;

    result.push({
      id: activityType,
      name: activityName,
      icon: iconMap[activityType] || 'sports',
      count: metrics.ambassadorCount,
      unit: 'pax',
      color: colors[colorIndex % colors.length],
    });

    colorIndex++;
  }

  // Sort by count descending
  result.sort((a, b) => b.count - a.count);

  return result;
}

/**
 * Transform data points to KPI ring chart data (by activity)
 * Used for: KpiRingChart widgets
 */
export function transformToActivityKpi(
  dataPoints: RawDataPoint[]
): KpiData[] {
  const activityGroups = groupBy(dataPoints, (p) => p.activityType);
  const totalMetrics = aggregateMetrics(dataPoints);

  // Activity icon mapping (same as above)
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

  const result: KpiData[] = [];

  for (const [activityType, activityData] of activityGroups.entries()) {
    const metrics = aggregateMetrics(activityData);
    const activityName = activityData[0]?.activityName || activityType;

    result.push({
      title: activityName,
      icon: iconMap[activityType] || 'sports',
      metrics: [
        {
          id: 'distribution',
          label: 'Distribution',
          percentage: calculatePercentage(metrics.ambassadorCount, totalMetrics.ambassadorCount),
          current: metrics.ambassadorCount,
          total: totalMetrics.ambassadorCount,
          unit: 'pax',
          color: '#FF5252',
        },
        {
          id: 'service-days',
          label: 'Service Days',
          percentage: calculatePercentage(metrics.serviceDaysUsed, metrics.serviceDaysTotal),
          current: roundTo(metrics.serviceDaysUsed),
          total: roundTo(metrics.serviceDaysTotal),
          unit: 'days',
          color: '#F48FB1',
        },
      ],
    });
  }

  // Sort by ambassador count descending
  result.sort((a, b) => b.metrics[0].current - a.metrics[0].current);

  return result;
}

/**
 * Transform data to trend chart format
 * Used for: TrendChart widget (Resource Planning)
 */
export function transformToTrendChart(
  dataPoints: RawDataPoint[]
): {
  data: Array<{ label: string; used: number; total: number }>;
  totalUsed: number;
  totalAvailable: number;
} {
  const monthlyGroups = groupBy(dataPoints, (p) => p.month);

  // Month order
  const months = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];

  const data = months.map((month) => {
    const monthData = monthlyGroups.get(month) || [];
    const metrics = aggregateMetrics(monthData);

    return {
      label: month,
      used: roundTo(metrics.serviceDaysUsed),
      total: roundTo(metrics.serviceDaysTotal),
    };
  });

  const totalMetrics = aggregateMetrics(dataPoints);

  return {
    data,
    totalUsed: roundTo(totalMetrics.serviceDaysUsed),
    totalAvailable: roundTo(totalMetrics.serviceDaysTotal),
  };
}

/**
 * Calculate total ambassador count
 * Used for: TextMetric widget (Ambassador Total)
 */
export function calculateTotalAmbassadors(dataPoints: RawDataPoint[]): number {
  // For total ambassadors, we need unique count per location/activity
  // Not a simple sum, as same ambassador might appear in multiple months
  // For mockup: assume data is already deduplicated at month level
  // Take average across months, or use a specific month
  
  const monthlyGroups = groupBy(dataPoints, (p) => p.month);
  const monthCounts = Array.from(monthlyGroups.values()).map(monthData => 
    aggregateMetrics(monthData).ambassadorCount
  );
  
  // Use the first month's count (assuming roster is relatively stable)
  return monthCounts[0] || 0;
}
```

### Task 3.3: Create Activity Progress Card Transformer

```typescript
/**
 * Transform data to activity progress card format
 * Used for: ActivityProgressCard and SummaryActivityProgressCard
 */
export function transformToActivityProgress(
  dataPoints: RawDataPoint[]
): {
  summary: any; // Type from existing component
  byActivity: Record<string, any>; // Type from existing component
} {
  const activityGroups = groupBy(dataPoints, (p) => p.activityType);
  const totalMetrics = aggregateMetrics(dataPoints);

  // Summary card
  const summary = {
    referred: totalMetrics.pipelineReferred,
    connecting: totalMetrics.pipelineConnecting,
    strong: totalMetrics.pipelineStrong,
  };

  // By activity
  const byActivity: Record<string, any> = {};

  for (const [activityType, activityData] of activityGroups.entries()) {
    const metrics = aggregateMetrics(activityData);
    
    byActivity[activityType] = {
      referred: metrics.pipelineReferred,
      connecting: metrics.pipelineConnecting,
      strong: metrics.pipelineStrong,
    };
  }

  return { summary, byActivity };
}
```

---

## Acceptance Criteria

- [ ] File `utils/data-aggregation.ts` exists with aggregation functions
- [ ] File `utils/data-transformers.ts` exists with all transformer functions
- [ ] All functions have proper TypeScript types
- [ ] Functions handle edge cases (empty arrays, division by zero)
- [ ] Functions are pure (no side effects)
- [ ] All transformers match existing widget data formats

---

## Testing

### Unit Test Examples

Create a test file (optional): `utils/__tests__/data-transformers.test.ts`

```typescript
import { aggregateMetrics, calculatePercentage } from '../data-aggregation';
import { transformToMonthlyMetrics } from '../data-transformers';
import type { RawDataPoint } from '../../types/data-filtering';

describe('Data Aggregation', () => {
  it('should sum metrics correctly', () => {
    const testData: RawDataPoint[] = [
      { ambassadorCount: 10, serviceDaysUsed: 20, /* ... */ },
      { ambassadorCount: 15, serviceDaysUsed: 30, /* ... */ },
    ];

    const result = aggregateMetrics(testData);
    expect(result.ambassadorCount).toBe(25);
    expect(result.serviceDaysUsed).toBe(50);
  });

  it('should handle empty array', () => {
    const result = aggregateMetrics([]);
    expect(result.ambassadorCount).toBe(0);
  });

  it('should calculate percentage correctly', () => {
    expect(calculatePercentage(50, 100)).toBe(50);
    expect(calculatePercentage(1, 3, 2)).toBe(33.33);
    expect(calculatePercentage(0, 0)).toBe(0); // division by zero
  });
});
```

### Manual Testing

Add to `_component.tsx` temporarily:

```typescript
import { rawDataset } from './data-just-for-1-time-test/raw-dataset';
import {
  transformToMonthlyMetrics,
  transformToActivityDistribution,
  transformToActivityKpi,
} from './utils/data-transformers';

// Test transformations
console.log('Monthly Metrics:', transformToMonthlyMetrics(rawDataset.dataPoints));
console.log('Activity Distribution:', transformToActivityDistribution(rawDataset.dataPoints));
console.log('Activity KPI:', transformToActivityKpi(rawDataset.dataPoints));
```

---

## Performance Considerations

### Optimization Tips

1. **Memoization**: Use `useMemo` when calling these functions in React components
2. **Batch Operations**: Group multiple transformations together
3. **Early Return**: Handle empty arrays immediately
4. **Avoid Re-computation**: Cache results when filters don't change

### Expected Performance

- **Aggregation**: <10ms for 1,000 data points
- **Transformation**: <50ms for full dataset
- **Total filtering + transformation**: <100ms

---

## Data Validation

Add validation to catch data issues early:

```typescript
/**
 * Validate data point integrity
 */
export function validateDataPoint(point: RawDataPoint): string[] {
  const errors: string[] = [];

  if (point.serviceDaysUsed > point.serviceDaysTotal) {
    errors.push('Used days exceed total days');
  }

  if (point.ambassadorsEngaged > point.ambassadorCount) {
    errors.push('Engaged ambassadors exceed total ambassadors');
  }

  if (point.sscRequests + point.storeCommunities > point.serviceDaysUsed + 0.1) {
    // Allow small rounding error
    errors.push('Channel split exceeds total used days');
  }

  return errors;
}
```

---

## Next Steps

After completing this step:
1. Test all transformer functions manually
2. Verify output formats match existing widget requirements
3. Check performance with full dataset
4. Proceed to **Step 4**: Filtering logic implementation

---

## Troubleshooting

**Issue**: "Type mismatch between transformer output and widget props"
- **Solution**: Check existing widget type definitions; adjust transformer return types

**Issue**: "Percentage calculations are incorrect"
- **Solution**: Verify that aggregation is summing correctly; check for duplicate data points

**Issue**: "Performance is slow (>200ms)"
- **Solution**: Profile with browser DevTools; optimize groupBy or aggregation logic

**Issue**: "NaN or Infinity values in results"
- **Solution**: Add defensive checks for division by zero and invalid inputs
