# Step 6: Testing & Verification

## Objective

Comprehensively test the filtering system to:
1. Verify all filter combinations work correctly
2. Validate data accuracy and consistency
3. Test edge cases and error conditions
4. Measure and optimize performance
5. Document any issues and their resolutions

---

## Background

This final step ensures the filtering system is production-ready. It involves systematic testing of all features, edge cases, and performance characteristics.

---

## Testing Strategy

### 1. Unit Testing (Data Layer)
Test individual functions in isolation

### 2. Integration Testing (Filter + Transform)
Test the full data pipeline

### 3. Component Testing (UI Interactions)
Test user interactions with selectors

### 4. End-to-End Testing (Full Flow)
Test complete user scenarios

### 5. Performance Testing
Measure and optimize performance

---

## Task 6.1: Data Layer Unit Tests

Create test file: `utils/__tests__/data-filtering.test.ts`

```typescript
import {
  matchesLocationFilter,
  matchesYearFilter,
  applyFilters,
  applyYearFilterOnly,
  getFilterStats,
} from '../data-filtering';
import type { RawDataPoint, FilterState } from '../../types/data-filtering';

describe('Location Filter Matching', () => {
  const testPoint: RawDataPoint = {
    region: 'central',
    regionName: 'Central',
    area: 'jiangsu',
    areaName: 'Jiangsu',
    city: 'nanjing',
    cityName: 'Nanjing',
    year: 2025,
    month: 'APR',
    activityType: 'train',
    activityName: 'Train',
    ambassadorCount: 20,
    serviceDaysUsed: 40,
    serviceDaysTotal: 80,
    ambassadorsEngaged: 16,
    sscRequests: 16,
    storeCommunities: 24,
    sscEngaged: 6,
    storeCommunitiesEngaged: 10,
    pipelineReferred: 8,
    pipelineConnecting: 5,
    pipelineStrong: 2,
  };

  test('matches when no location filter is set', () => {
    expect(matchesLocationFilter(testPoint, {})).toBe(true);
  });

  test('matches correct region', () => {
    expect(matchesLocationFilter(testPoint, { region: 'central' })).toBe(true);
  });

  test('does not match wrong region', () => {
    expect(matchesLocationFilter(testPoint, { region: 'north' })).toBe(false);
  });

  test('matches correct area', () => {
    expect(matchesLocationFilter(testPoint, { area: 'jiangsu' })).toBe(true);
  });

  test('does not match wrong area', () => {
    expect(matchesLocationFilter(testPoint, { area: 'zhejiang' })).toBe(false);
  });

  test('matches correct city', () => {
    expect(matchesLocationFilter(testPoint, { city: 'nanjing' })).toBe(true);
  });

  test('does not match wrong city', () => {
    expect(matchesLocationFilter(testPoint, { city: 'suzhou' })).toBe(false);
  });

  test('matches hierarchical filter (region + area)', () => {
    expect(
      matchesLocationFilter(testPoint, { region: 'central', area: 'jiangsu' })
    ).toBe(true);
  });

  test('does not match mismatched hierarchical filter', () => {
    expect(
      matchesLocationFilter(testPoint, { region: 'central', area: 'zhejiang' })
    ).toBe(false);
  });

  test('matches full hierarchical filter', () => {
    expect(
      matchesLocationFilter(testPoint, {
        region: 'central',
        area: 'jiangsu',
        city: 'nanjing',
      })
    ).toBe(true);
  });
});

describe('Year Filter Matching', () => {
  const testPoint: RawDataPoint = {
    year: 2025,
    // ... other required fields
  } as RawDataPoint;

  test('matches when no year filter is set', () => {
    expect(matchesYearFilter(testPoint, undefined)).toBe(true);
  });

  test('matches correct year', () => {
    expect(matchesYearFilter(testPoint, 2025)).toBe(true);
  });

  test('does not match wrong year', () => {
    expect(matchesYearFilter(testPoint, 2026)).toBe(false);
  });
});

describe('Combined Filtering', () => {
  const testData: RawDataPoint[] = [
    {
      region: 'central',
      area: 'jiangsu',
      city: 'nanjing',
      year: 2025,
      ambassadorCount: 10,
      // ... other fields
    } as RawDataPoint,
    {
      region: 'central',
      area: 'jiangsu',
      city: 'suzhou',
      year: 2025,
      ambassadorCount: 15,
      // ... other fields
    } as RawDataPoint,
    {
      region: 'central',
      area: 'zhejiang',
      city: 'hangzhou',
      year: 2025,
      ambassadorCount: 12,
      // ... other fields
    } as RawDataPoint,
    {
      region: 'central',
      area: 'jiangsu',
      city: 'nanjing',
      year: 2026,
      ambassadorCount: 11,
      // ... other fields
    } as RawDataPoint,
  ];

  test('filters by area only', () => {
    const result = applyFilters(testData, {
      location: { area: 'jiangsu' },
      year: undefined,
    });
    expect(result).toHaveLength(3); // nanjing 2025, suzhou 2025, nanjing 2026
  });

  test('filters by area and year', () => {
    const result = applyFilters(testData, {
      location: { area: 'jiangsu' },
      year: 2025,
    });
    expect(result).toHaveLength(2); // nanjing 2025, suzhou 2025
  });

  test('filters by city and year', () => {
    const result = applyFilters(testData, {
      location: { city: 'nanjing' },
      year: 2025,
    });
    expect(result).toHaveLength(1);
    expect(result[0].ambassadorCount).toBe(10);
  });

  test('returns all when no filters are set', () => {
    const result = applyFilters(testData, {
      location: {},
      year: undefined,
    });
    expect(result).toHaveLength(4);
  });

  test('returns empty array when no matches', () => {
    const result = applyFilters(testData, {
      location: { region: 'north' },
      year: undefined,
    });
    expect(result).toHaveLength(0);
  });
});

describe('Heat Map Year-Only Filtering', () => {
  const testData: RawDataPoint[] = [
    { region: 'central', area: 'jiangsu', city: 'nanjing', year: 2025 } as RawDataPoint,
    { region: 'central', area: 'zhejiang', city: 'hangzhou', year: 2025 } as RawDataPoint,
    { region: 'north', area: 'shandong', city: 'jinan', year: 2025 } as RawDataPoint,
    { region: 'central', area: 'jiangsu', city: 'nanjing', year: 2026 } as RawDataPoint,
  ];

  test('filters by year only, ignoring location', () => {
    const result = applyYearFilterOnly(testData, 2025);
    expect(result).toHaveLength(3); // All 2025 entries, regardless of location
  });

  test('returns all when no year filter', () => {
    const result = applyYearFilterOnly(testData, undefined);
    expect(result).toHaveLength(4);
  });
});

describe('Filter Statistics', () => {
  test('calculates stats correctly', () => {
    const filterState: FilterState = {
      location: { region: 'central', area: 'jiangsu' },
      year: 2025,
    };

    const stats = getFilterStats(1000, 250, filterState);

    expect(stats.originalCount).toBe(1000);
    expect(stats.filteredCount).toBe(250);
    expect(stats.reductionPercentage).toBe(75);
    expect(stats.activeFilters).toHaveLength(3); // region, area, year
    expect(stats.isFiltered).toBe(true);
  });

  test('handles no filters', () => {
    const filterState: FilterState = {
      location: {},
      year: undefined,
    };

    const stats = getFilterStats(1000, 1000, filterState);

    expect(stats.reductionPercentage).toBe(0);
    expect(stats.activeFilters).toHaveLength(0);
    expect(stats.isFiltered).toBe(false);
  });
});
```

### Run Unit Tests

```bash
npm test -- data-filtering.test.ts
# or
npx jest utils/__tests__/data-filtering.test.ts
```

---

## Task 6.2: Integration Testing Checklist

### Manual Integration Tests

Create a testing checklist file: `testing-checklist.md`

```markdown
# Integration Testing Checklist

## Data Pipeline Tests

- [ ] Raw dataset loads without errors
- [ ] Dataset contains expected number of data points (>1000)
- [ ] All data points have valid values
- [ ] Filtering reduces dataset size appropriately
- [ ] Transformers produce valid widget data

## Filter Combinations

### Location Only
- [ ] Region filter works
- [ ] Area filter works
- [ ] City filter works
- [ ] Hierarchical filters work (region → area → city)

### Year Only
- [ ] Year 2025 filter works
- [ ] Year 2026 filter works
- [ ] No year filter shows all years

### Combined Filters
- [ ] Region + Year works
- [ ] Area + Year works
- [ ] City + Year works
- [ ] All filters combined work

### Clear/Reset
- [ ] Clear button resets location filter
- [ ] Clearing location shows all locations
- [ ] Clearing year shows all years

## Widget Data Accuracy

### Roster Overview
- [ ] Total ambassadors updates with filters
- [ ] Activity distribution shows correct counts
- [ ] Activity distribution percentages sum to 100%
- [ ] Heat map only changes with year filter

### Engagement Overview
- [ ] TrendChart shows 12 months
- [ ] Monthly totals match aggregated data
- [ ] Service days metrics update correctly
- [ ] Ambassador engagement percentages are accurate
- [ ] KPI ring charts show correct activities

### Pipeline Overview
- [ ] Summary card updates with filters
- [ ] Activity cards update with filters
- [ ] Pipeline funnel logic is preserved (referred > connecting > strong)

## Edge Cases

- [ ] Empty filter results handled gracefully
- [ ] Single data point result displays correctly
- [ ] Filters with no matching data show empty state
- [ ] Rapid filter changes don't cause errors
- [ ] Invalid filter combinations are handled

## Performance

- [ ] Initial load completes in <1 second
- [ ] Filter changes update in <300ms
- [ ] No noticeable lag or freezing
- [ ] Browser console shows acceptable performance logs
```

---

## Task 6.3: Component Testing (Manual UI Tests)

### UI Interaction Tests

Test the actual user interface:

#### Test Scenario 1: Basic Location Filtering

1. **Setup**: Open the dashboard with no filters
2. **Action**: Select "Central" region
3. **Expected**: 
   - Region selector shows "Central"
   - Ambassador total decreases
   - Activity distribution updates
   - Heat map unchanged

#### Test Scenario 2: Hierarchical Location Filtering

1. **Setup**: Select "Central" region
2. **Action**: Select "Jiangsu" area
3. **Expected**:
   - Area selector shows "Jiangsu"
   - Data further filtered to Jiangsu only
   - City selector becomes enabled

4. **Action**: Select "Nanjing" city
5. **Expected**:
   - City selector shows "Nanjing"
   - Data shows only Nanjing results

#### Test Scenario 3: Year Filtering

1. **Setup**: No filters applied
2. **Action**: Select "2025" from year selector
3. **Expected**:
   - Year selector shows "2025"
   - All widgets update (including heat map)
   - Data shows only 2025 results

#### Test Scenario 4: Combined Filtering

1. **Action**: Select "Central" > "Jiangsu" > "Nanjing" + "2025"
2. **Expected**:
   - All selectors show correct values
   - Data shows only Nanjing 2025 results
   - Heat map shows 2025 data (all locations)

#### Test Scenario 5: Clear Filters

1. **Setup**: Apply several filters
2. **Action**: Click "Clear" button
3. **Expected**:
   - All location selectors reset
   - Data returns to unfiltered state
   - Year selector unchanged (has separate clear)

#### Test Scenario 6: Month Selection (Trend Chart)

1. **Setup**: Apply area filter (e.g., Jiangsu)
2. **Action**: Click on "JUL" point in trend chart
3. **Expected**:
   - Service days metrics update to July data
   - Ambassador engagement updates to July data
   - Data reflects Jiangsu July combination

---

## Task 6.4: Data Validation Tests

### Verify Data Consistency

Create a validation script: `utils/validate-filtered-data.ts`

```typescript
import { rawDataset } from '../data-just-for-1-time-test/raw-dataset';
import { applyFilters } from '../utils/data-filtering';
import { transformToMonthlyMetrics, aggregateMetrics } from '../utils/data-transformers';

/**
 * Validation tests for filtered data
 */
export function runDataValidation() {
  console.log('=== Starting Data Validation ===\n');

  const errors: string[] = [];

  // Test 1: Total ambassadors should be consistent
  console.log('Test 1: Ambassador count consistency');
  const allData = rawDataset.dataPoints;
  const jiangsuData = applyFilters(allData, {
    location: { area: 'jiangsu' },
    year: undefined,
  });
  
  const allMetrics = aggregateMetrics(allData);
  const jiangsuMetrics = aggregateMetrics(jiangsuData);
  
  if (jiangsuMetrics.ambassadorCount > allMetrics.ambassadorCount) {
    errors.push('Filtered data has MORE ambassadors than total - impossible!');
  } else {
    console.log('✅ Passed: Filtered count <= Total count');
  }

  // Test 2: Service days used should never exceed total
  console.log('\nTest 2: Service days consistency');
  const monthlyData = transformToMonthlyMetrics(allData);
  
  for (const [month, metrics] of Object.entries(monthlyData)) {
    if (metrics.serviceDays.current > metrics.serviceDays.total) {
      errors.push(`${month}: Used days (${metrics.serviceDays.current}) > Total days (${metrics.serviceDays.total})`);
    }
  }
  
  if (errors.length === 0) {
    console.log('✅ Passed: All months have valid service days');
  }

  // Test 3: Percentages should be between 0 and 100
  console.log('\nTest 3: Percentage validity');
  
  for (const [month, metrics] of Object.entries(monthlyData)) {
    if (metrics.serviceDays.percentage < 0 || metrics.serviceDays.percentage > 100) {
      errors.push(`${month}: Invalid percentage ${metrics.serviceDays.percentage}%`);
    }
  }
  
  if (errors.length === 0) {
    console.log('✅ Passed: All percentages are valid');
  }

  // Test 4: Channel split should sum correctly
  console.log('\nTest 4: Channel split consistency');
  
  for (const [month, metrics] of Object.entries(monthlyData)) {
    const sscSum = metrics.serviceDays.trendData[0].value;
    const storeSum = metrics.serviceDays.trendData[1].value;
    const total = metrics.serviceDays.current;
    
    // Allow small rounding error (0.5)
    if (Math.abs((sscSum + storeSum) - total) > 0.5) {
      errors.push(`${month}: Channel split (${sscSum} + ${storeSum}) != Total (${total})`);
    }
  }
  
  if (errors.length === 0) {
    console.log('✅ Passed: Channel splits are consistent');
  }

  // Summary
  console.log('\n=== Validation Summary ===');
  if (errors.length === 0) {
    console.log('✅ All validation tests passed!');
  } else {
    console.log(`❌ ${errors.length} validation errors found:`);
    errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`);
    });
  }

  return { passed: errors.length === 0, errors };
}

// Run validation
runDataValidation();
```

### Run Validation

Add to `_component.tsx` temporarily:

```typescript
import { runDataValidation } from './utils/validate-filtered-data';

// Inside component or useEffect:
React.useEffect(() => {
  runDataValidation();
}, []);
```

---

## Task 6.5: Performance Testing

### Performance Measurement Script

Create: `utils/measure-performance.ts`

```typescript
import { rawDataset } from '../data-just-for-1-time-test/raw-dataset';
import { applyFilters } from '../utils/data-filtering';
import { transformToMonthlyMetrics, transformToActivityDistribution } from '../utils/data-transformers';

export function measurePerformance() {
  console.log('=== Performance Measurements ===\n');

  // Test 1: Filtering performance
  console.log('Test 1: Filtering 1000+ data points');
  const filterStart = performance.now();
  
  const filtered = applyFilters(rawDataset.dataPoints, {
    location: { area: 'jiangsu' },
    year: 2025,
  });
  
  const filterEnd = performance.now();
  const filterDuration = filterEnd - filterStart;
  
  console.log(`  Duration: ${filterDuration.toFixed(2)}ms`);
  console.log(`  Result: ${filtered.length} data points`);
  console.log(`  Status: ${filterDuration < 50 ? '✅ PASS' : '⚠️ SLOW'} (threshold: 50ms)`);

  // Test 2: Monthly metrics transformation
  console.log('\nTest 2: Monthly metrics transformation');
  const transformStart = performance.now();
  
  const monthlyMetrics = transformToMonthlyMetrics(filtered);
  
  const transformEnd = performance.now();
  const transformDuration = transformEnd - transformStart;
  
  console.log(`  Duration: ${transformDuration.toFixed(2)}ms`);
  console.log(`  Result: ${Object.keys(monthlyMetrics).length} months`);
  console.log(`  Status: ${transformDuration < 50 ? '✅ PASS' : '⚠️ SLOW'} (threshold: 50ms)`);

  // Test 3: Activity distribution transformation
  console.log('\nTest 3: Activity distribution transformation');
  const activityStart = performance.now();
  
  const activityDist = transformToActivityDistribution(filtered);
  
  const activityEnd = performance.now();
  const activityDuration = activityEnd - activityStart;
  
  console.log(`  Duration: ${activityDuration.toFixed(2)}ms`);
  console.log(`  Result: ${activityDist.length} activities`);
  console.log(`  Status: ${activityDuration < 20 ? '✅ PASS' : '⚠️ SLOW'} (threshold: 20ms)`);

  // Test 4: Full pipeline
  console.log('\nTest 4: Full pipeline (filter + all transforms)');
  const pipelineStart = performance.now();
  
  const filtered2 = applyFilters(rawDataset.dataPoints, {
    location: { city: 'nanjing' },
    year: 2025,
  });
  transformToMonthlyMetrics(filtered2);
  transformToActivityDistribution(filtered2);
  // Add other transformations...
  
  const pipelineEnd = performance.now();
  const pipelineDuration = pipelineEnd - pipelineStart;
  
  console.log(`  Duration: ${pipelineDuration.toFixed(2)}ms`);
  console.log(`  Status: ${pipelineDuration < 100 ? '✅ PASS' : '⚠️ SLOW'} (threshold: 100ms)`);

  // Summary
  const totalDuration = filterDuration + transformDuration + activityDuration;
  console.log('\n=== Summary ===');
  console.log(`Total processing time: ${totalDuration.toFixed(2)}ms`);
  console.log(`Status: ${totalDuration < 100 ? '✅ Performance goals met' : '⚠️ Optimization needed'}`);
}
```

### Performance Benchmarks

| Operation | Target | Acceptable | Poor |
|-----------|--------|------------|------|
| Filtering 1000 points | <20ms | <50ms | >50ms |
| Single transformation | <20ms | <50ms | >50ms |
| Full pipeline | <50ms | <100ms | >100ms |
| UI update after filter | <100ms | <300ms | >300ms |

---

## Task 6.6: Bug Tracking & Resolution

### Known Issues Template

Create: `testing-issues.md`

```markdown
# Testing Issues & Resolutions

## Issue #1: [Title]

**Severity**: Critical / High / Medium / Low

**Description**: 
[Clear description of the issue]

**Steps to Reproduce**:
1. Step 1
2. Step 2
3. ...

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Resolution**:
[How it was fixed, or status if unresolved]

---

## Issue #2: [Title]

...
```

---

## Task 6.7: Final Verification Checklist

Before marking Step 6 complete:

### Code Quality
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linter errors (`npm run lint`)
- [ ] No console errors in browser
- [ ] No console warnings (or documented/suppressed)
- [ ] Code is properly formatted

### Functionality
- [ ] All filter combinations work
- [ ] All widgets update correctly
- [ ] Heat map special case works
- [ ] Empty states handled
- [ ] Clear/reset functionality works

### Data Integrity
- [ ] Data validation tests pass
- [ ] No inconsistent calculations
- [ ] Percentages are accurate
- [ ] Aggregations are correct

### Performance
- [ ] Performance tests pass
- [ ] No noticeable lag
- [ ] Filter changes are instant
- [ ] No memory leaks (check DevTools Memory tab)

### Documentation
- [ ] Code comments are clear
- [ ] Complex logic is explained
- [ ] TODOs are addressed or documented
- [ ] README updated (if needed)

---

## Acceptance Criteria

- [ ] All unit tests pass
- [ ] Integration testing checklist complete
- [ ] UI testing scenarios verified
- [ ] Data validation tests pass
- [ ] Performance benchmarks met
- [ ] All critical and high-severity bugs resolved
- [ ] Final verification checklist complete

---

## Next Steps

After completing this step:
1. **Production Readiness**: System is ready for production use
2. **Documentation**: Update project documentation
3. **Handoff**: Provide documentation to backend engineers (Excel format spec)
4. **Future Enhancements**: Plan for additional features (if any)

---

## Troubleshooting Common Issues

### Tests Failing

**Symptom**: Jest tests fail with import errors
**Solution**: Configure Jest to handle TypeScript and module aliases

**Symptom**: Tests pass but real app fails
**Solution**: Test with actual component, not just isolated functions

### Performance Issues

**Symptom**: Filtering is slow (>100ms)
**Solution**: 
1. Profile with Chrome DevTools
2. Check for redundant calculations
3. Verify memoization is working
4. Consider pre-indexing data

### Data Inconsistencies

**Symptom**: Numbers don't add up
**Solution**:
1. Check aggregation logic
2. Verify no duplicate counting
3. Check for rounding errors
4. Validate source data

---

## Celebration! 🎉

If all tests pass and verification is complete, the multi-dimensional data filtering system is **production-ready**!

Key achievements:
- ✅ Comprehensive data filtering
- ✅ Type-safe implementation
- ✅ Performant operations
- ✅ Thoroughly tested
- ✅ Well-documented
