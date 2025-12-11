# Step 1: Data Type Definitions

## Objective

Create comprehensive TypeScript type definitions that:
1. Match the backend data table structure (Excel format)
2. Support frontend filtering and aggregation operations
3. Ensure type safety throughout the application

---

## Background

Before implementing any data or logic, we need a solid type foundation. These types will serve as the "contract" between:
- Backend API and frontend data layer
- Raw data and filtered data
- Filtered data and UI components

---

## Tasks

### Task 1.1: Create `types/data-filtering.ts`

Create a new file at:
```
types/data-filtering.ts
```

This file will contain all type definitions related to data filtering.

### Task 1.2: Define `RawDataPoint` Interface

This represents a single row from the backend table.

```typescript
/**
 * Represents a single row from the backend data table.
 * Each row contains dimensional attributes (for filtering)
 * and metric values (for aggregation).
 */
export interface RawDataPoint {
  // ====================
  // Dimensional Attributes (used for filtering)
  // ====================
  
  /** Region identifier (lowercase key) */
  region: string;
  
  /** Display name for region */
  regionName: string;
  
  /** Area identifier (lowercase key) */
  area: string;
  
  /** Display name for area */
  areaName: string;
  
  /** City identifier (lowercase key) */
  city: string;
  
  /** Display name for city */
  cityName: string;
  
  /** Fiscal year (e.g., 2025) */
  year: number;
  
  /** Month abbreviation (3 letters, uppercase, e.g., "APR") */
  month: string;
  
  /** Activity type identifier (lowercase key) */
  activityType: string;
  
  /** Display name for activity */
  activityName: string;
  
  // ====================
  // Metric Values (used for aggregation)
  // ====================
  
  /** Number of ambassadors in this segment */
  ambassadorCount: number;
  
  /** Service days consumed */
  serviceDaysUsed: number;
  
  /** Total allocated service days */
  serviceDaysTotal: number;
  
  /** Number of ambassadors who participated */
  ambassadorsEngaged: number;
  
  /** Service days from SSC requests */
  sscRequests: number;
  
  /** Service days from store communities */
  storeCommunities: number;
  
  /** Ambassadors engaged via SSC */
  sscEngaged: number;
  
  /** Ambassadors engaged via stores */
  storeCommunitiesEngaged: number;
  
  /** Referred candidates */
  pipelineReferred: number;
  
  /** Candidates being connected with */
  pipelineConnecting: number;
  
  /** Strong pipeline candidates */
  pipelineStrong: number;
}
```

### Task 1.3: Define `RawDataset` Interface

This wraps the array of data points with metadata.

```typescript
/**
 * Complete raw dataset as received from backend
 */
export interface RawDataset {
  /** Array of all data points */
  dataPoints: RawDataPoint[];
  
  /** Metadata about the dataset */
  metadata: {
    /** ISO timestamp of last update */
    lastUpdated: string;
    
    /** Data version identifier */
    version: string;
    
    /** Optional notes or description */
    description?: string;
  };
}
```

### Task 1.4: Define Filter Interfaces

```typescript
/**
 * Location filter selection state
 * Reuses existing type from location-selector
 */
export interface LocationFilter {
  region?: string;
  area?: string;
  city?: string;
}

/**
 * Complete filter state
 */
export interface FilterState {
  location: LocationFilter;
  year?: number;
}
```

### Task 1.5: Define Aggregation Helper Types

These types help with intermediate data processing.

```typescript
/**
 * Helper type for grouping data points
 */
export type DataPointGroup = {
  key: string;
  dataPoints: RawDataPoint[];
};

/**
 * Aggregation function type
 */
export type AggregationFunction = (dataPoints: RawDataPoint[]) => any;

/**
 * Aggregated metrics for a specific dimension
 */
export interface AggregatedMetrics {
  ambassadorCount: number;
  serviceDaysUsed: number;
  serviceDaysTotal: number;
  ambassadorsEngaged: number;
  sscRequests: number;
  storeCommunities: number;
  sscEngaged: number;
  storeCommunitiesEngaged: number;
  pipelineReferred: number;
  pipelineConnecting: number;
  pipelineStrong: number;
}
```

### Task 1.6: Define Widget-Specific Data Types

These connect aggregated data to specific widget requirements.

```typescript
/**
 * Data format for the Engagement Overview metrics
 * Maps to existing MetricData type but includes the source data reference
 */
export interface EngagementMetrics {
  serviceDays: {
    percentage: number;
    current: number;
    total: number;
    unit: string;
    trendData: Array<{
      label: string;
      color: string;
      value: number;
      total: number;
      unit: string;
    }>;
    description: string;
  };
  ambassadorsEngaged: {
    percentage: number;
    current: number;
    total: number;
    unit: string;
    trendData: Array<{
      label: string;
      color: string;
      value: number;
      total: number;
      unit: string;
    }>;
    description: string;
  };
}

/**
 * Data format for Activity Distribution (pie chart)
 */
export interface ActivityDistribution {
  activityType: string;
  activityName: string;
  count: number;
  percentage: number;
}

/**
 * Data format for KPI Ring Charts (by activity)
 */
export interface ActivityKpiData {
  activityType: string;
  activityName: string;
  ambassadorCount: number;
  ambassadorTotal: number;
  serviceDaysUsed: number;
  serviceDaysTotal: number;
}
```

---

## Acceptance Criteria

- [ ] File `types/data-filtering.ts` exists
- [ ] All interfaces are properly documented with JSDoc comments
- [ ] No TypeScript errors in the file
- [ ] Types align with the backend table specification in `overall.md`
- [ ] Types can be imported and used in other files

---

## Implementation Notes

### Import Strategy

Other files should import from this centralized location:

```typescript
import type { 
  RawDataPoint, 
  RawDataset, 
  FilterState,
  AggregatedMetrics 
} from '../types/data-filtering';
```

### Relationship to Existing Types

- Keep existing `types/metrics.ts` for now (backward compatibility)
- New types in `data-filtering.ts` are more granular and flexible
- Future refactor: migrate existing code to use new types

### Design Decisions

1. **String identifiers**: Use lowercase keys (e.g., `"jiangsu"`) for programmatic access, separate display names for UI
2. **Granularity**: Each data point represents the finest level (city + month + activity)
3. **Nullable fields**: Use `?` for optional dimensions (region, area) that might be aggregated at higher levels
4. **Number types**: All metrics are `number` (not `string`), even though they might be displayed with units

---

## Next Steps

After completing this step:
1. Verify no TypeScript errors
2. Proceed to **Step 2**: Creating the mockup raw dataset
3. The dataset will implement these interfaces

---

## Validation Commands

```bash
# Check TypeScript compilation
npx tsc --noEmit

# If using a linter
npm run lint types/data-filtering.ts
```

---

## Questions & Edge Cases

**Q: What if backend uses different field names?**
A: Create a transformation layer that maps backend field names to these types. Keep these types as the "canonical" frontend representation.

**Q: What about nested objects vs flat structure?**
A: We chose a flat structure to match Excel/CSV format and simplify aggregation logic. If backend sends nested JSON, flatten it during data loading.

**Q: Should we validate data at runtime?**
A: Yes, consider adding Zod or similar schema validation in Step 3 when transforming data.

---

## Reference

- TypeScript Handbook: [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- JSDoc Comments: [TypeScript Documentation](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
