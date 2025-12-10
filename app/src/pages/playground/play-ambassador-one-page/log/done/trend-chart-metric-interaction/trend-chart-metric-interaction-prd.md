# PRD: TrendChart Interactive Metrics Update

## 1. Overview

### 1.1 Problem Statement
Currently, the `TrendChart` component in the "Engagement Overview" section displays monthly resource planning data with node selection capabilities. However, clicking on a column does not update the two metric cards below ("Total Service Days Used" and "% of Ambassadors Engaged"). These metrics remain static and don't reflect the selected month's data.

### 1.2 Goal
Implement an interactive data flow where:
- User clicks on a column in `TrendChart` (e.g., "APR" - red column)
- The two `EngagementOverviewMetric` components update to display data specific to the selected month
- The interaction feels seamless and provides immediate visual feedback

### 1.3 Success Criteria
- ✅ Clicking any selectable column in TrendChart triggers metric updates
- ✅ Default selection (APR) shows correct initial data
- ✅ Metric components display month-specific data with proper formatting
- ✅ Type-safe implementation with full TypeScript support
- ✅ No breaking changes to existing TrendChart API
- ✅ Clean separation of concerns between components

---

## 2. Technical Architecture

### 2.1 Component Interaction Flow

```
┌─────────────────────────────────────────────────────────┐
│  PageContent (Parent Component)                         │
│  - Manages selection state                              │
│  - Holds complete metrics data for all months          │
│  - Passes callbacks and filtered data to children      │
└──────────────┬──────────────────────────────────────────┘
               │
               ├─────────────────┬──────────────────────────┐
               │                 │                          │
               ▼                 ▼                          ▼
    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │  TrendChart      │  │ Metric Card 1    │  │ Metric Card 2    │
    │  - Displays data │  │ (Service Days)   │  │ (% Engaged)      │
    │  - emits         │  │ - Receives       │  │ - Receives       │
    │    onNodeSelect  │  │   filtered data  │  │   filtered data  │
    └──────────────────┘  └──────────────────┘  └──────────────────┘
```

### 2.2 Data Flow Architecture

**State Management:**
- Parent component maintains:
  - `selectedMonth: string` - Currently selected month (e.g., "APR")
  - `metricsDataByMonth: Record<string, MonthMetrics>` - Complete metrics dataset

**Data Transformation:**
- When selection changes → Parent looks up month-specific metrics → Passes to metric components

**Event Propagation:**
- TrendChart `onNodeSelect(label, seriesKey)` → Parent updates `selectedMonth` → Children re-render with new data

---

## 3. Component Implementation Plan

### 3.1 Extend TrendChart Component API

**File:** `Riverwood-UI/app/src/components/widgets/widet-components/trend-chart/_BaseTrendChart.tsx`

#### Changes Required:

**Add to `BaseTrendChartProps` interface:**
```typescript
export interface BaseTrendChartProps {
  // ... existing props
  onNodeSelect?: (label: string, seriesKey: string) => void; // NEW: Callback when node is selected
}
```

**Modify `useNodeSelection` hook:**

**File:** `Riverwood-UI/app/src/components/widgets/widet-components/trend-chart/useNodeSelection.ts`

```typescript
export const useNodeSelection = (
  data: ChartDataPoint[],
  enableSelection: boolean,
  series: SeriesConfig[],
  defaultSelectedNode?: DefaultSelectedNode,
  onNodeSelect?: (label: string, seriesKey: string) => void // NEW: Add callback parameter
) => {
  // ... existing state

  const toggleNodeSelection = (label: string, seriesKey: string) => {
    if (!enableSelection) return;
    if (!isSeriesSelectable(seriesKey)) return;
    
    const nodeId = `${label}-${seriesKey}`;
    setSelectedNode(prev => {
      if (prev === nodeId) {
        return prev;
      }
      
      // NEW: Call the callback before updating state
      onNodeSelect?.(label, seriesKey);
      
      return nodeId;
    });
  };

  // ... rest of the hook
};
```

**Update `BaseTrendChart` component:**
```typescript
export const BaseTrendChart = ({
  // ... existing props
  onNodeSelect, // NEW: Accept callback
}: BaseTrendChartProps) => {
  // ... existing validation

  const {
    toggleNodeSelection,
    // ... rest
  } = useNodeSelection(data, enableSelection, series, defaultSelectedNode, onNodeSelect); // NEW: Pass callback

  // ... rest of component
};
```

---

### 3.2 Create Metrics Data Type Definitions

**File:** `Riverwood-UI/app/src/pages/playground/play-ambassador-one-page/types/metrics.ts` (NEW FILE)

```typescript
/**
 * Represents metric data for a specific month
 */
export interface MonthMetrics {
  month: string; // e.g., "APR", "MAY"
  serviceDays: {
    percentage: number; // 0-100, e.g., 44
    current: number; // e.g., 288
    total: number; // e.g., 660
    unit: string; // e.g., "days"
    trendData: ProgressBarSegment[]; // Data for the two progress bars
    description: string; // Explanatory text
  };
  ambassadorsEngaged: {
    percentage: number; // 0-100, e.g., 68
    current: number; // e.g., 112
    total: number; // e.g., 165
    unit: string; // e.g., "pax"
    trendData: ProgressBarSegment[]; // Data for the two progress bars
    description: string; // Explanatory text
  };
}

/**
 * Progress bar segment configuration
 */
export interface ProgressBarSegment {
  color: string; // e.g., "#ef4444"
  value: number; // e.g., 288
  total: number; // e.g., 660
}

/**
 * Complete metrics dataset indexed by month
 */
export type MetricsDataByMonth = Record<string, MonthMetrics>;
```

---

### 3.3 Refactor EngagementOverviewMetric Component

**File:** `Riverwood-UI/app/src/pages/playground/play-ambassador-one-page/play-components/engagement-overview-metric/index.tsx`

**Current State (Static):**
```typescript
export const EngagementOverviewMetric = () => {
  return (
    <div className={styles["engagement-overview-metric"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>44%</div>
        <div className={styles["value"]}>288/660 days</div>
      </div>
      {/* ... */}
    </div>
  );
};
```

**Updated (Dynamic with Props):**
```typescript
import type { ProgressBarData } from "../../../../../components";
import type { MonthMetrics } from "../../types/metrics";

export interface EngagementOverviewMetricProps {
  data: MonthMetrics['serviceDays'] | MonthMetrics['ambassadorsEngaged'];
}

export const EngagementOverviewMetric = ({ data }: EngagementOverviewMetricProps) => {
  const { percentage, current, total, unit, trendData, description } = data;

  return (
    <div className={styles["engagement-overview-metric"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>{percentage}%</div>
        <div className={styles["value"]}>
          {current}/{total} {unit}
        </div>
      </div>

      <div className={styles["progress-bar-container"]}>
        <div className={styles["content"]}>
          {trendData.map((segmentData, index) => (
            <ProgressBar 
              key={index}
              progressData={{
                label: "", // No label needed for this design
                value: segmentData.value,
                total: segmentData.total,
                unit: unit,
                color: segmentData.color,
              }}
              designProperties={{ height: 4 }}
            />
          ))}

          <p className={styles["description"]}>{description}</p>
        </div>
      </div>
    </div>
  );
};
```

---

### 3.4 Update Parent Component (PageContent)

**File:** `Riverwood-UI/app/src/pages/playground/play-ambassador-one-page/_component.tsx`

#### Add State Management:

```typescript
import { useState } from 'react';
import { metricsDataByMonth } from './data-just-for-1-time-test/metrics';

export const PageContent = () => {
  // Initialize with default selected month
  const [selectedMonth, setSelectedMonth] = useState<string>("APR");

  // Handler for TrendChart node selection
  const handleNodeSelect = (label: string, seriesKey: string) => {
    // Only update if selecting from the "used" series
    if (seriesKey === 'used') {
      setSelectedMonth(label);
    }
  };

  // Get metrics for currently selected month
  const currentMetrics = metricsDataByMonth[selectedMonth];

  return (
    <Layout>
      {/* ... other sections ... */}
      
      <DocSection title="Engagement Overview">
        <BentoGrid gap={"md"} rowHeight={[[Infinity, 328]]}>
          {/* TrendChart with callback */}
          <BentoItem>
            <WidgetFrame nav={{ icon: "bar_chart", title: "Resource Planning" }}>
              <TrendChart
                data={trendChartData}
                series={trendChartSeriesConfig}
                xAxisPadding={{ left: 40, right: 40 }}
                enableSelection={true}
                defaultSelectedNode={{ label: "APR", seriesKey: "used" }}
                onNodeSelect={handleNodeSelect} // NEW: Add callback
              />
            </WidgetFrame>
          </BentoItem>

          {/* Metric 1: Service Days - Now receives dynamic data */}
          <BentoItem>
            <WidgetFrame nav={{ icon: "bar_chart", title: "Total Service Days Used" }}>
              <EngagementOverviewMetric data={currentMetrics.serviceDays} />
            </WidgetFrame>
          </BentoItem>

          {/* Metric 2: Ambassadors Engaged - Now receives dynamic data */}
          <BentoItem>
            <WidgetFrame nav={{ icon: "bar_chart", title: "% of Ambassadors Engaged" }}>
              <EngagementOverviewMetric data={currentMetrics.ambassadorsEngaged} />
            </WidgetFrame>
          </BentoItem>
        </BentoGrid>
      </DocSection>
    </Layout>
  );
};
```

---

## 4. Mockup Data Structure

### 4.1 Complete Metrics Dataset

**File:** `Riverwood-UI/app/src/pages/playground/play-ambassador-one-page/data-just-for-1-time-test/metrics.ts` (NEW FILE)

This file contains realistic mock data for all 12 months.

```typescript
import type { MetricsDataByMonth } from '../types/metrics';

/**
 * Complete metrics data for all months in the fiscal year
 * 
 * Business Rules:
 * - Total service days = 660 (165 ambassadors × 4 days minimum)
 * - Service days accumulate over the year (cumulative)
 * - Engagement percentage reflects unique ambassadors who have participated
 * - Progress bars show both completed work and specific category breakdowns
 */
export const metricsDataByMonth: MetricsDataByMonth = {
  APR: {
    month: "APR",
    serviceDays: {
      percentage: 44,
      current: 288,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 288, total: 660 }, // Main progress (red)
        { color: "#fb923c", value: 150, total: 660 }, // Sub-category (orange)
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 68,
      current: 112,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 112, total: 165 },
        { color: "#fb923c", value: 65, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  MAY: {
    month: "MAY",
    serviceDays: {
      percentage: 47,
      current: 309,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 309, total: 660 },
        { color: "#fb923c", value: 163, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 71,
      current: 117,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 117, total: 165 },
        { color: "#fb923c", value: 70, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  JUN: {
    month: "JUN",
    serviceDays: {
      percentage: 52,
      current: 342,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 342, total: 660 },
        { color: "#fb923c", value: 180, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 75,
      current: 124,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 124, total: 165 },
        { color: "#fb923c", value: 75, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  JUL: {
    month: "JUL",
    serviceDays: {
      percentage: 59,
      current: 388,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 388, total: 660 },
        { color: "#fb923c", value: 205, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 79,
      current: 130,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 130, total: 165 },
        { color: "#fb923c", value: 82, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  AUG: {
    month: "AUG",
    serviceDays: {
      percentage: 67,
      current: 443,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 443, total: 660 },
        { color: "#fb923c", value: 235, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 83,
      current: 137,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 137, total: 165 },
        { color: "#fb923c", value: 88, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  SEP: {
    month: "SEP",
    serviceDays: {
      percentage: 70,
      current: 461,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 461, total: 660 },
        { color: "#fb923c", value: 245, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 85,
      current: 140,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 140, total: 165 },
        { color: "#fb923c", value: 90, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  OCT: {
    month: "OCT",
    serviceDays: {
      percentage: 77,
      current: 505,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 505, total: 660 },
        { color: "#fb923c", value: 268, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 88,
      current: 145,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 145, total: 165 },
        { color: "#fb923c", value: 95, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  NOV: {
    month: "NOV",
    serviceDays: {
      percentage: 79,
      current: 520,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 520, total: 660 },
        { color: "#fb923c", value: 275, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far"
    },
    ambassadorsEngaged: {
      percentage: 89,
      current: 147,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 147, total: 165 },
        { color: "#fb923c", value: 97, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term"
    }
  },
  DEC: {
    month: "DEC",
    serviceDays: {
      percentage: 80,
      current: 526,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 526, total: 660 },
        { color: "#fb923c", value: 280, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far (projected)"
    },
    ambassadorsEngaged: {
      percentage: 90,
      current: 149,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 149, total: 165 },
        { color: "#fb923c", value: 98, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term (projected)"
    }
  },
  JAN: {
    month: "JAN",
    serviceDays: {
      percentage: 82,
      current: 540,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 540, total: 660 },
        { color: "#fb923c", value: 290, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far (projected)"
    },
    ambassadorsEngaged: {
      percentage: 92,
      current: 152,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 152, total: 165 },
        { color: "#fb923c", value: 100, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term (projected)"
    }
  },
  FEB: {
    month: "FEB",
    serviceDays: {
      percentage: 88,
      current: 580,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 580, total: 660 },
        { color: "#fb923c", value: 310, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far (projected)"
    },
    ambassadorsEngaged: {
      percentage: 94,
      current: 155,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 155, total: 165 },
        { color: "#fb923c", value: 103, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term (projected)"
    }
  },
  MAR: {
    month: "MAR",
    serviceDays: {
      percentage: 95,
      current: 627,
      total: 660,
      unit: "days",
      trendData: [
        { color: "#ef4444", value: 627, total: 660 },
        { color: "#fb923c", value: 335, total: 660 },
      ],
      description: "A measure showing how much of the expected service commitment has been fulfilled so far (projected)"
    },
    ambassadorsEngaged: {
      percentage: 97,
      current: 160,
      total: 165,
      unit: "pax",
      trendData: [
        { color: "#ef4444", value: 160, total: 165 },
        { color: "#fb923c", value: 106, total: 165 },
      ],
      description: "Percentage of ambassadors who have participated in at least one engagement this term (projected)"
    }
  }
};
```

### 4.2 Data Generation Logic

**Key Principles:**
1. **Cumulative Nature**: Service days accumulate throughout the year
   - APR starts at 288 days (44%)
   - Each month adds more service days as events happen
   - By MAR, should reach ~95% of the 660 total target

2. **Realistic Distribution**:
   - Higher activity in summer months (JUL-AUG)
   - Slower periods in winter (DEC-JAN)
   - Final push in Q4 (FEB-MAR) to reach annual targets

3. **Two Progress Bars**:
   - First bar: Total accumulated service days
   - Second bar: Sub-category (e.g., specific sport or tier breakdown)
   - Both use same base color family but different shades

4. **Engagement Percentage**:
   - Tracks unique ambassadors who participated
   - Also cumulative (once engaged, stays in count)
   - Starts at 68% (112/165) in APR
   - Gradually reaches 97% (160/165) by MAR

---

## 5. Implementation Steps

### Phase 1: Extend TrendChart Component (No Breaking Changes)
1. ✅ Add `onNodeSelect` prop to `BaseTrendChartProps` (optional)
2. ✅ Update `useNodeSelection` hook to accept callback
3. ✅ Call callback in `toggleNodeSelection` before state update
4. ✅ Export updated types from index.tsx

### Phase 2: Create Data Infrastructure
1. ✅ Create `types/metrics.ts` with type definitions
2. ✅ Create `data-just-for-1-time-test/metrics.ts` with complete mock data
3. ✅ Validate data structure matches type definitions

### Phase 3: Refactor EngagementOverviewMetric
1. ✅ Add props interface to component
2. ✅ Replace hardcoded values with prop-based rendering
3. ✅ Update ProgressBar rendering to handle dynamic data array
4. ✅ Test component in isolation

### Phase 4: Integrate in Parent Component
1. ✅ Import metrics data and types
2. ✅ Add `useState` for selected month
3. ✅ Create `handleNodeSelect` callback
4. ✅ Pass callback to TrendChart
5. ✅ Pass filtered metrics to both EngagementOverviewMetric instances

### Phase 5: Testing & Refinement
1. ✅ Test clicking each month in TrendChart
2. ✅ Verify metrics update correctly
3. ✅ Check default selection (APR) works on load
4. ✅ Verify no console errors or type warnings
5. ✅ Test edge cases (clicking same node, non-selectable series)

---

## 6. Edge Cases & Considerations

### 6.1 Error Handling
- **Missing month data**: Fallback to APR or show placeholder
  ```typescript
  const currentMetrics = metricsDataByMonth[selectedMonth] || metricsDataByMonth["APR"];
  ```

### 6.2 Non-Selectable Series
- Currently, only "used" series is selectable
- "planned" series has `selectable: false`
- Handler should check seriesKey and only respond to "used"

### 6.3 Performance
- Dataset is small (12 months), no memoization needed
- If dataset grows, consider `useMemo` for filtering

### 6.4 Accessibility
- TrendChart already has keyboard support via Recharts
- Metric components should maintain ARIA labels for screen readers

---

## 7. Testing Plan

### 7.1 Unit Tests (Optional but Recommended)
```typescript
describe('EngagementOverviewMetric', () => {
  it('renders percentage correctly', () => {
    const mockData = metricsDataByMonth.APR.serviceDays;
    render(<EngagementOverviewMetric data={mockData} />);
    expect(screen.getByText('44%')).toBeInTheDocument();
  });
});
```

### 7.2 Integration Tests
1. Load page → Verify APR is selected by default
2. Click MAY column → Verify metrics update to MAY data
3. Click same column again → No error, stays selected
4. Click planned column → No change (not selectable)

### 7.3 Visual Regression
- Take screenshots of all 12 month states
- Verify UI layout doesn't break with different data ranges

---

## 8. Future Enhancements

### 8.1 Animation
- Add smooth transitions when metrics update
- Use CSS transitions or Framer Motion

### 8.2 Tooltips
- Show month name on hover over metric cards
- Display trend indicators (▲ +12% vs last month)

### 8.3 Deep Linking
- URL parameter for selected month: `?month=MAY`
- Allow bookmarking specific month views

### 8.4 Export Functionality
- Download metric data as CSV/PDF
- Include currently selected month in export filename

---

## 9. Deliverables Checklist

- [ ] Updated `_BaseTrendChart.tsx` with `onNodeSelect` prop
- [ ] Updated `useNodeSelection.ts` to call callback
- [ ] Created `types/metrics.ts` with type definitions
- [ ] Created `data-just-for-1-time-test/metrics.ts` with 12 months of data
- [ ] Refactored `EngagementOverviewMetric` to accept props
- [ ] Updated `_component.tsx` with state management and callbacks
- [ ] Tested all 12 month selections
- [ ] Verified no TypeScript errors
- [ ] Verified no breaking changes to existing TrendChart usage

---

## 10. Timeline Estimate

**Total Effort: 3-4 hours**

- Phase 1 (TrendChart Extension): 45 minutes
- Phase 2 (Data Infrastructure): 30 minutes
- Phase 3 (Metric Component Refactor): 45 minutes
- Phase 4 (Parent Integration): 45 minutes
- Phase 5 (Testing): 45 minutes
- Documentation & Cleanup: 30 minutes

---

## Appendix A: Type Definitions Reference

```typescript
// Complete type hierarchy for this feature

import { ProgressBarData } from '@/components';

export interface ProgressBarSegment {
  color: string;
  value: number;
  total: number;
}

export interface MetricData {
  percentage: number;
  current: number;
  total: number;
  unit: string;
  trendData: ProgressBarSegment[];
  description: string;
}

export interface MonthMetrics {
  month: string;
  serviceDays: MetricData;
  ambassadorsEngaged: MetricData;
}

export type MetricsDataByMonth = Record<string, MonthMetrics>;
```

---

## Appendix B: Component Props Reference

```typescript
// TrendChart (Extended)
interface TrendChartProps {
  data: ChartDataPoint[];
  series: SeriesConfig[];
  enableSelection?: boolean;
  defaultSelectedNode?: DefaultSelectedNode;
  onNodeSelect?: (label: string, seriesKey: string) => void; // NEW
}

// EngagementOverviewMetric (Updated)
interface EngagementOverviewMetricProps {
  data: MonthMetrics['serviceDays'] | MonthMetrics['ambassadorsEngaged'];
}
```

---

**Document Version:** 1.0  
**Last Updated:** 2024-12-10  
**Author:** AI Assistant  
**Status:** Ready for Implementation
