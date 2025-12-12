# Data Schema Documentation

Complete reference for the `AmbassadorMockupData` structure.

## Top-Level Structure

```typescript
{
  "roster-overview": { timeInterval, widgets },
  "engagement-overview": { timeInterval, widgets },
  "pipeline-overview": { timeInterval, widgets }
}
```

## Common Fields

### Time Interval

```typescript
timeInterval: [string, string]
// Example: ["2025-4-1", "2026-3-31"]
// Rendered as: "Apr 1, 2025 – Mar 31, 2026"
```

### Widget Base Structure

```typescript
{
  title: string,
  icon: string,
  data: <varies by widget type>
}
```

---

## Roster Overview Widgets

### 1. Ambassador Total

**Widget Type**: Simple Metric

```typescript
{
  title: "Ambassador Total",
  icon: "accessibility_new",
  data: {
    value: number,    // e.g., 165
    unit: string      // e.g., "pax"
  }
}
```

**Component**: `<TextMetric />`

---

### 2-4. Pie Charts (By Athletic Discipline, Geographic Breakdown, By Tenure)

**Widget Type**: Activity Distribution

```typescript
{
  title: string,
  icon: "pie_chart",
  data: ActivityDistributionItem[]
}

interface ActivityDistributionItem {
  id: string,
  name: string,
  icon: string,
  count: number,
  unit: string,      // e.g., "pax"
  color: string      // Hex color, e.g., "#FF5252"
}
```

**Component**: `<ActivityDistributionPieChart />`

**Examples**:

- **By Athletic Discipline**: Train, Tennis, Yoga, Golf, Run, Other
- **Geographic Breakdown**: East, Central, North East
- **By Tenure**: New, Renew

---

### 5. Sports Activities Distribution

**Widget Type**: Heat Map

```typescript
{
  title: "Sports Activities Distribution",
  icon: "map",
  data: {
    categories: CategoryData[],
    center: [number, number],      // e.g., [33.8, 114.1]
    zoom: number,                  // e.g., 4.2
    designProperties: {
      radiusFactor: number         // e.g., 25000
    }
  }
}

interface CategoryData {
  icon: string,                    // e.g., "Σ", "🏃", "💪"
  term: string,                    // e.g., "Sum", "Run", "Train"
  locations: {
    name: string,                  // e.g., "East"
    coordinates: [number, number], // [lat, lng]
    radius: number                 // Size indicator
  }[]
}
```

**Component**: `<ChinaHeatMap />`

**Categories**:
- Sum (total)
- Run
- Train
- Yoga
- Tennis
- Golf
- Other
- Female
- Male

---

## Engagement Overview Widgets

### 1. Resource Planning

**Widget Type**: Trend Chart

```typescript
{
  title: "Resource Planning",
  icon: "bar_chart",
  data: {
    chartData: ChartDataPoint[],
    series: SeriesConfig[]
  }
}

interface ChartDataPoint {
  label: string,    // e.g., "APR"
  used: number,
  planned: number
}

interface SeriesConfig {
  key: string,
  title: string,
  icon: string,
  displayAs: 'column' | 'line',
  color: string,
  unit: string,
  selectable: boolean
}
```

**Component**: `<TrendChart />`

**Data Points**: 12 months (APR through MAR)

---

### 2. Total Service Days Used & % of Ambassadors Engaged

**Widget Type**: Metrics by Month

```typescript
{
  title: "Total Service Days Used",
  icon: "bar_chart",
  data: {
    byMonth: {
      [month: string]: {
        month: string,
        serviceDays: MetricData,
        ambassadorsEngaged: MetricData
      }
    }
  }
}

interface MetricData {
  current: number,
  total: number,
  unit: string,
  trendData: {
    label: string,
    color: string,
    value: number,
    total: number,
    unit: string
  }[],
  description: string
}
```

**Component**: `<EngagementOverviewMetric />`

**Months**: APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC, JAN, FEB, MAR

**Percentage Calculation**: Frontend should calculate `(current / total) * 100`

---

### 3. Engagement by Athletic Discipline

**Widget Type**: KPI Ring Charts

```typescript
{
  title: "Engagement by Athletic Discipline",
  icon: "sports",
  data: KpiData[]
}

interface KpiData {
  title: string,        // e.g., "Yoga", "Train"
  icon: string,
  metrics: {
    id: string,         // e.g., "service-days"
    label: string,      // e.g., "Service Days Used"
    current: number,
    total: number,
    unit: string,
    color: string
  }[]
}
```

**Component**: `<KpiRingChart />`

**Sports**: Yoga, Train, Run, Tennis, Golf, Other

**Special Case - 0/0 Handling**:

When `total === 0`, the frontend should display "—" instead of calculating a percentage.

```typescript
// Example handling in component
function formatValue(current: number, total: number): string {
  if (total === 0) {
    return "—";
  }
  return `${current}/${total}`;
}

function formatPercentage(current: number, total: number): string {
  if (total === 0) {
    return "—";
  }
  return `${Math.round((current / total) * 100)}%`;
}
```

**Metrics per Sport**:
1. Service Days Used (current/total days)
2. Ambassadors Engaged (current/total pax)

---

## Pipeline Overview Widgets

### 1. Summary

**Widget Type**: Activity Progress Card (Summary)

```typescript
{
  title: "Summary",
  icon: "tornado",
  data: ActivityProgressCardData
}

interface ActivityProgressCardData {
  items: ProgressItem[]
}

interface ProgressItem {
  label: string,          // e.g., "R&D", "Referred"
  totalValue: number,     // Sum of all segments
  maxValue: number,       // For progress bar scaling
  segments: {
    value: number,
    color: string         // RGBA format
  }[]
}
```

**Component**: `<SummaryActivityProgressCard />`

**Progress Stages**: R&D, Referred, Connecting, Pipeline

---

### 2-7. Individual Activity Cards

**Widget Type**: Activity Progress Card (Individual)

```typescript
{
  title: string,          // e.g., "Yoga", "Swimming"
  icon: string,
  data: ActivityProgressCardData  // Same structure as Summary
}
```

**Component**: `<ActivityProgressCard />`

**Activities**:
1. Yoga
2. Swimming
3. Running
4. Cycling
5. Hiking
6. Gym Training

**Color Scheme for Segments**:
- Index 0: `rgba(255, 70, 70, 1)` (Full opacity)
- Index 1: `rgba(255, 70, 70, 0.5)` (50% opacity)
- Index 2: `rgba(255, 70, 70, 0.25)` (25% opacity)
- Index 3+: `rgba(255, 70, 70, 0.1)` (10% opacity)

---

## Color Palette Reference

### Primary Colors

- **Red (Primary)**: `#FF5252` - Main accent color
- **Red Light**: `#FF8A80` - Secondary accent
- **Red Lighter**: `#FFCDD2` - Tertiary accent
- **Pink**: `#F48FB1` - Secondary metrics
- **Red Darker**: `#EF9A9A` - Alternative accent
- **Blue Light**: `#90CAF9` - Contrast color
- **Gray**: `#E0E0E0` - Neutral/Other

### Chart Colors

- **Used/Active**: `#ef4444` (Tailwind red-500)
- **Planned/Inactive**: `#e5e7eb` (Tailwind gray-200)

### Progress Bar Colors (RGBA)

- **Segment 1**: `rgba(255, 70, 70, 1)`
- **Segment 2**: `rgba(255, 70, 70, 0.5)`
- **Segment 3**: `rgba(255, 70, 70, 0.25)`
- **Segment 4+**: `rgba(255, 70, 70, 0.1)`

---

## Data Validation Rules

### Required Fields

All widgets must have:
- `title` (string)
- `icon` (string)
- `data` (structure varies by widget type)

### Color Values

- Must be valid CSS colors (hex, rgba, etc.)
- Hex colors should be uppercase (e.g., `#FF5252`)
- RGBA colors should specify all 4 values

### Numeric Values

- All counts, totals, and values must be non-negative
- Coordinates must be valid [latitude, longitude] pairs

### Time Intervals

- Must be in format: ["YYYY-M-D", "YYYY-M-D"]
- Start date must precede end date

---

## Usage Tips

### Accessing Data

```typescript
// Get a specific widget
const widget = AmbassadorMockupData["roster-overview"].widgets[0];

// Get widget by title (more maintainable)
const widget = AmbassadorMockupData["roster-overview"].widgets.find(
  w => w.title === "Ambassador Total"
);

// Iterate over all widgets in a section
AmbassadorMockupData["roster-overview"].widgets.forEach(widget => {
  console.log(widget.title, widget.data);
});
```

### Type Assertions

Since `data` varies by widget type, you may need type assertions:

```typescript
import type { ActivityDistributionItem } from '../play-components';

const pieWidget = rosterOverview.widgets[1];
const pieData = pieWidget.data as ActivityDistributionItem[];
```

### Rendering Time Intervals

```typescript
import { formatTimeInterval } from './data-mockup';

const label = formatTimeInterval(rosterOverview.timeInterval);
// Returns: "Apr 1, 2025 – Mar 31, 2026"
```

---

## Extension Guidelines

### Adding a New Widget

1. Add widget object to appropriate section's `widgets` array
2. Ensure `title`, `icon`, and `data` are all present
3. Use existing data structures when possible
4. Include colors in the data (not calculated by frontend)
5. Document the new widget type if it's a new pattern

### Modifying Existing Data

1. Update the data in `ambassador-data.ts`
2. Check that TypeScript types still match
3. Test the component that uses the data
4. Update this documentation if the structure changes

### Creating New Sections

1. Add new section to `AmbassadorMockupData` object
2. Include `timeInterval` and `widgets` array
3. Follow the established naming convention (kebab-case)
4. Document the new section in this file

