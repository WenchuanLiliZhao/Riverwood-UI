# Step 2: Mockup Raw Dataset

## Objective

Create a comprehensive mockup dataset that:
1. Covers all filter combinations (locations × years × months × activities)
2. Contains realistic values matching business logic
3. Provides enough data to test all filtering scenarios
4. Serves as a reference for backend data structure

---

## Background

The raw dataset is the foundation of the filtering system. It should mimic what a real backend API would return, but be generated locally for development/testing purposes.

---

## Data Requirements

### Coverage Matrix

The dataset must include data points for:

**Locations** (from existing `location.ts`):
- Central Region
  - Jiangsu Area → Nanjing City, Suzhou City
  - Zhejiang Area → Hangzhou City, Ningbo City
  - Shanghai Area → Shanghai City
  - Beijing Area → Beijing City
- North Region (no cities defined, area-level only)

**Years**:
- 2025
- 2026

**Months** (fiscal year: Apr 1 - Mar 31):
- APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC, JAN, FEB, MAR

**Activity Types**:
- train (Train)
- tennis (Tennis)
- yoga (Yoga)
- ski (Ski)
- swimming (Swimming)
- running (Running)
- cycling (Cycling)
- hiking (Hiking)
- gym (Gym)

**Total Data Points**: 
- 6 cities × 2 years × 12 months × 9 activities = **1,296 data points minimum**

---

## Tasks

### Task 2.1: Create Data Generation Utility

Create a helper file for generating realistic data:

```
utils/generate-mockup-data.ts
```

This will contain functions to generate randomized but realistic values.

```typescript
/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random decimal between min and max
 */
export function randomDecimal(min: number, max: number, decimals: number = 1): number {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

/**
 * Generate ambassador count based on city tier
 */
export function generateAmbassadorCount(city: string, activityType: string): number {
  // Tier 1 cities (larger populations)
  const tier1 = ['shanghai', 'beijing'];
  // Tier 2 cities
  const tier2 = ['nanjing', 'hangzhou', 'suzhou', 'ningbo'];
  
  // Popular activities have more ambassadors
  const popularActivities = ['train', 'running', 'gym'];
  
  let base = 10;
  if (tier1.includes(city)) base = 20;
  else if (tier2.includes(city)) base = 15;
  
  if (popularActivities.includes(activityType)) base *= 1.5;
  
  return randomInt(Math.floor(base * 0.7), Math.floor(base * 1.3));
}

/**
 * Generate service days based on ambassador count
 * Business rule: minimum 4 days per ambassador
 */
export function generateServiceDays(ambassadorCount: number, month: string): {
  used: number;
  total: number;
} {
  const total = ambassadorCount * 4;
  
  // Later months have higher utilization
  const monthOrder = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];
  const monthIndex = monthOrder.indexOf(month);
  const utilizationRate = 0.3 + (monthIndex / monthOrder.length) * 0.7; // 30% to 100%
  
  const used = randomDecimal(total * utilizationRate * 0.8, total * utilizationRate, 1);
  
  return { used: Math.min(used, total), total };
}

/**
 * Generate engagement metrics
 */
export function generateEngagementMetrics(ambassadorCount: number, serviceDaysUsed: number): {
  ambassadorsEngaged: number;
  sscRequests: number;
  storeCommunities: number;
  sscEngaged: number;
  storeCommunitiesEngaged: number;
} {
  // ~70-80% of ambassadors are engaged
  const ambassadorsEngaged = randomInt(
    Math.floor(ambassadorCount * 0.7),
    Math.floor(ambassadorCount * 0.8)
  );
  
  // Split service days between SSC and store communities (roughly 40/60)
  const sscRequests = randomDecimal(serviceDaysUsed * 0.35, serviceDaysUsed * 0.45, 1);
  const storeCommunities = parseFloat((serviceDaysUsed - sscRequests).toFixed(1));
  
  // Split engaged ambassadors similarly
  const sscEngaged = randomInt(
    Math.floor(ambassadorsEngaged * 0.35),
    Math.floor(ambassadorsEngaged * 0.45)
  );
  const storeCommunitiesEngaged = ambassadorsEngaged - sscEngaged;
  
  return {
    ambassadorsEngaged,
    sscRequests,
    storeCommunities,
    sscEngaged,
    storeCommunitiesEngaged,
  };
}

/**
 * Generate pipeline metrics
 */
export function generatePipelineMetrics(ambassadorCount: number): {
  referred: number;
  connecting: number;
  strong: number;
} {
  // Pipeline funnel: referred > connecting > strong
  const referred = randomInt(
    Math.floor(ambassadorCount * 0.3),
    Math.floor(ambassadorCount * 0.5)
  );
  const connecting = randomInt(
    Math.floor(referred * 0.4),
    Math.floor(referred * 0.6)
  );
  const strong = randomInt(
    Math.floor(connecting * 0.3),
    Math.floor(connecting * 0.5)
  );
  
  return { referred, connecting, strong };
}
```

### Task 2.2: Create Main Dataset File

Create the mockup dataset file:

```
data-just-for-1-time-test/raw-dataset.ts
```

```typescript
import type { RawDataPoint, RawDataset } from '../types/data-filtering';
import { location } from './location';
import { allYears } from './year';
import {
  generateAmbassadorCount,
  generateServiceDays,
  generateEngagementMetrics,
  generatePipelineMetrics,
} from '../utils/generate-mockup-data';

/**
 * Activity types configuration
 */
const activityTypes = [
  { type: 'train', name: 'Train' },
  { type: 'tennis', name: 'Tennis' },
  { type: 'yoga', name: 'Yoga' },
  { type: 'ski', name: 'Ski' },
  { type: 'swimming', name: 'Swimming' },
  { type: 'running', name: 'Running' },
  { type: 'cycling', name: 'Cycling' },
  { type: 'hiking', name: 'Hiking' },
  { type: 'gym', name: 'Gym' },
];

/**
 * Month order for fiscal year (Apr 1 - Mar 31)
 */
const months = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];

/**
 * Generate all data points
 */
function generateDataPoints(): RawDataPoint[] {
  const dataPoints: RawDataPoint[] = [];
  
  // Iterate through all dimensions
  for (const [regionKey, regionData] of Object.entries(location)) {
    for (const [areaKey, areaData] of Object.entries(regionData.areas)) {
      // Handle areas with cities vs without
      const cities = Object.entries(areaData.cities).length > 0
        ? Object.entries(areaData.cities)
        : [[areaKey, { name: areaData.name }]]; // Use area as city if no cities defined
      
      for (const [cityKey, cityData] of cities) {
        for (const yearItem of allYears) {
          for (const month of months) {
            for (const activity of activityTypes) {
              // Generate metrics for this data point
              const ambassadorCount = generateAmbassadorCount(cityKey, activity.type);
              const serviceDays = generateServiceDays(ambassadorCount, month);
              const engagement = generateEngagementMetrics(ambassadorCount, serviceDays.used);
              const pipeline = generatePipelineMetrics(ambassadorCount);
              
              dataPoints.push({
                // Dimensional attributes
                region: regionKey,
                regionName: regionData.name,
                area: areaKey,
                areaName: areaData.name,
                city: cityKey,
                cityName: typeof cityData === 'object' && 'name' in cityData 
                  ? cityData.name 
                  : areaData.name,
                year: yearItem.year,
                month: month,
                activityType: activity.type,
                activityName: activity.name,
                
                // Metric values
                ambassadorCount,
                serviceDaysUsed: serviceDays.used,
                serviceDaysTotal: serviceDays.total,
                ambassadorsEngaged: engagement.ambassadorsEngaged,
                sscRequests: engagement.sscRequests,
                storeCommunities: engagement.storeCommunities,
                sscEngaged: engagement.sscEngaged,
                storeCommunitiesEngaged: engagement.storeCommunitiesEngaged,
                pipelineReferred: pipeline.referred,
                pipelineConnecting: pipeline.connecting,
                pipelineStrong: pipeline.strong,
              });
            }
          }
        }
      }
    }
  }
  
  return dataPoints;
}

/**
 * Complete raw dataset with metadata
 */
export const rawDataset: RawDataset = {
  dataPoints: generateDataPoints(),
  metadata: {
    lastUpdated: new Date().toISOString(),
    version: '1.0.0',
    description: 'Mockup dataset for Ambassador One Page dashboard filtering',
  },
};

// Log dataset size for verification
console.log(`Generated ${rawDataset.dataPoints.length} data points`);
```

### Task 2.3: Add Data Verification

Add a verification function to ensure data quality:

```typescript
/**
 * Verify data integrity
 */
export function verifyDataset(dataset: RawDataset): {
  isValid: boolean;
  errors: string[];
  stats: {
    totalPoints: number;
    uniqueLocations: number;
    uniqueYears: number;
    uniqueMonths: number;
    uniqueActivities: number;
  };
} {
  const errors: string[] = [];
  const dataPoints = dataset.dataPoints;
  
  // Check for required fields
  for (let i = 0; i < dataPoints.length; i++) {
    const point = dataPoints[i];
    
    if (!point.region || !point.area || !point.city) {
      errors.push(`Data point ${i}: Missing location fields`);
    }
    
    if (!point.year || !point.month || !point.activityType) {
      errors.push(`Data point ${i}: Missing temporal/activity fields`);
    }
    
    if (point.ambassadorCount < 0 || point.serviceDaysUsed < 0) {
      errors.push(`Data point ${i}: Negative values detected`);
    }
    
    if (point.serviceDaysUsed > point.serviceDaysTotal) {
      errors.push(`Data point ${i}: Used days exceed total days`);
    }
  }
  
  // Calculate stats
  const uniqueLocations = new Set(dataPoints.map(p => `${p.region}-${p.area}-${p.city}`)).size;
  const uniqueYears = new Set(dataPoints.map(p => p.year)).size;
  const uniqueMonths = new Set(dataPoints.map(p => p.month)).size;
  const uniqueActivities = new Set(dataPoints.map(p => p.activityType)).size;
  
  return {
    isValid: errors.length === 0,
    errors,
    stats: {
      totalPoints: dataPoints.length,
      uniqueLocations,
      uniqueYears,
      uniqueMonths,
      uniqueActivities,
    },
  };
}

// Run verification
const verification = verifyDataset(rawDataset);
console.log('Dataset verification:', verification);

if (!verification.isValid) {
  console.error('Dataset validation failed:', verification.errors);
}
```

---

## Acceptance Criteria

- [ ] File `utils/generate-mockup-data.ts` exists with all helper functions
- [ ] File `data-just-for-1-time-test/raw-dataset.ts` exists and generates data
- [ ] Dataset contains at least 1,000 data points
- [ ] All data points have valid values (no nulls, negatives where inappropriate)
- [ ] Business rules are enforced (e.g., serviceDaysUsed ≤ serviceDaysTotal)
- [ ] Data verification passes without errors
- [ ] Console logs show dataset size and verification results

---

## Testing Commands

```typescript
// In _component.tsx or a test file, temporarily add:
import { rawDataset, verifyDataset } from './data-just-for-1-time-test/raw-dataset';

console.log('Raw dataset loaded:', rawDataset);
console.log('Verification:', verifyDataset(rawDataset));

// Test filtering manually
const jiangsuData = rawDataset.dataPoints.filter(p => p.area === 'jiangsu');
console.log(`Jiangsu has ${jiangsuData.length} data points`);

const year2025Data = rawDataset.dataPoints.filter(p => p.year === 2025);
console.log(`Year 2025 has ${year2025Data.length} data points`);
```

---

## Data Quality Guidelines

### Realistic Values

- **Ambassador Count**: 5-30 per city/activity combination
- **Service Days**: 4× ambassador count minimum, ~70-90% utilized
- **Engagement Rate**: 70-80% of ambassadors engaged
- **Pipeline Funnel**: Referred > Connecting > Strong (decreasing)

### Business Logic

1. **Service Days**: `used ≤ total`, `total = ambassadorCount × 4`
2. **Engagement**: `ambassadorsEngaged ≤ ambassadorCount`
3. **Channel Split**: SSC ~40%, Store Communities ~60%
4. **Monthly Accumulation**: Later months show higher utilization rates

### Consistency

- Same location should have roughly similar ambassador counts across months (±20%)
- Popular activities (train, running, gym) should have 1.5× more ambassadors
- Tier 1 cities (Shanghai, Beijing) should have 2× ambassadors compared to smaller cities

---

## Excel Export Reference

For backend engineers, here's how this data maps to Excel:

```typescript
/**
 * Export dataset to CSV format (for Excel)
 */
export function exportToCSV(dataset: RawDataset): string {
  const headers = [
    'region', 'region_name', 'area', 'area_name', 'city', 'city_name',
    'year', 'month', 'activity_type', 'activity_name',
    'ambassador_count', 'service_days_used', 'service_days_total',
    'ambassadors_engaged', 'ssc_requests', 'store_communities',
    'ssc_engaged', 'store_communities_engaged',
    'pipeline_referred', 'pipeline_connecting', 'pipeline_strong'
  ];
  
  const rows = dataset.dataPoints.map(point => [
    point.region, point.regionName, point.area, point.areaName,
    point.city, point.cityName, point.year, point.month,
    point.activityType, point.activityName,
    point.ambassadorCount, point.serviceDaysUsed, point.serviceDaysTotal,
    point.ambassadorsEngaged, point.sscRequests, point.storeCommunities,
    point.sscEngaged, point.storeCommunitiesEngaged,
    point.pipelineReferred, point.pipelineConnecting, point.pipelineStrong
  ].join(','));
  
  return [headers.join(','), ...rows].join('\n');
}
```

---

## Next Steps

After completing this step:
1. Verify dataset loads without errors
2. Check console for verification results
3. Optionally: export CSV and review in Excel
4. Proceed to **Step 3**: Data transformation utilities

---

## Troubleshooting

**Issue**: "Cannot find module '../types/data-filtering'"
- **Solution**: Ensure Step 1 is completed first

**Issue**: "Dataset has 0 data points"
- **Solution**: Check that `location.ts` and `year.ts` are properly imported

**Issue**: "Verification fails with negative values"
- **Solution**: Review generation functions for edge cases (e.g., rounding errors)

**Issue**: "Performance is slow (>1s to generate)"
- **Solution**: Normal for 1,000+ data points; consider caching the generated result
