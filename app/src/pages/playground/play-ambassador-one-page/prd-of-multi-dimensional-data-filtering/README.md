# Multi-Dimensional Data Filtering PRD

## 📋 Quick Navigation

This folder contains a comprehensive Product Requirements Document (PRD) for implementing a multi-dimensional data filtering system in the Ambassador One Page dashboard.

### 📁 Document Structure

```
prd-of-multi-dimensional-data-filtering/
├── README.md                                  ← You are here
├── overall.md                                 ← Start here: Overview & architecture
├── 1_step-1_data-type-definitions.md         ← Define TypeScript interfaces
├── 2_step-2_mockup-raw-dataset.md            ← Generate mockup data
├── 3_step-3_data-transformation-utilities.md ← Transform data for widgets
├── 4_step-4_filtering-logic.md               ← Implement filter functions
├── 5_step-5_state-management-integration.md  ← Connect to UI components
└── 6_step-6_testing-and-verification.md      ← Test everything
```

---

## 🚀 Getting Started

### For First-Time Readers

1. **Read `overall.md`** - Understand the problem, architecture, and approach
2. **Review the step files** in order (1 through 6)
3. **Execute one step at a time** - Each step is designed to be completed independently

### For Implementation

Start with Step 1 and proceed sequentially:

```bash
# Step 1: ~30 minutes
# Create TypeScript type definitions

# Step 2: ~2 hours
# Generate comprehensive mockup dataset

# Step 3: ~1.5 hours
# Build data transformation utilities

# Step 4: ~1 hour
# Implement filtering logic

# Step 5: ~1 hour
# Integrate with UI components

# Step 6: ~1 hour
# Test and verify everything
```

**Total estimated time: ~7 hours**

---

## 🎯 What This PRD Covers

### Problem
The dashboard currently displays static mockup data. Users need to filter data by **Location** (Region → Area → City) and **Year**, with all widgets updating dynamically.

### Solution
A comprehensive filtering system that:
- Filters raw data based on user selections
- Transforms filtered data into widget-specific formats
- Updates all dashboard widgets in real-time
- Maintains type safety throughout
- Performs efficiently (<100ms filtering + transformation)

### Special Cases
- **Heat Map**: Filtered by year only, not affected by location filters
- **Month Selection**: Independent from location/year filters (trend chart interaction)

---

## 📊 Architecture Overview

```
┌─────────────────┐
│  Raw Dataset    │  (Excel-like 2D table)
│  (1000+ rows)   │  [region, area, city, year, month, activity, metrics...]
└────────┬────────┘
         │
         ├─────────────────────────────┐
         │                             │
    ┌────▼─────────┐          ┌────────▼─────────┐
    │ Apply Filters│          │  Heat Map Filter │
    │ (Location +  │          │  (Year Only)     │
    │  Year)       │          │                  │
    └────┬─────────┘          └────────┬─────────┘
         │                             │
         │ Filtered Data               │ Heat Map Data
         │                             │
    ┌────▼──────────────┐     ┌────────▼──────────┐
    │ Transform Data    │     │  Heat Map Data    │
    │ - By Month        │     │                   │
    │ - By Activity     │     │                   │
    │ - By Metric Type  │     │                   │
    └────┬──────────────┘     └────────┬──────────┘
         │                             │
         ├─────────────────────────────┘
         │
    ┌────▼─────────┐
    │  Render      │
    │  Dashboard   │
    │  Widgets     │
    └──────────────┘
```

---

## 🗂️ File Structure (After Implementation)

```
play-ambassador-one-page/
├── _component.tsx                    ← Main component (updated in Step 5)
│
├── types/
│   ├── metrics.ts                    ← Existing types
│   └── data-filtering.ts            ← NEW: Filter & data types (Step 1)
│
├── data-just-for-1-time-test/
│   ├── location.ts                   ← Existing location data
│   ├── year.ts                       ← Existing year data
│   └── raw-dataset.ts               ← NEW: Complete mockup dataset (Step 2)
│
├── utils/
│   ├── generate-mockup-data.ts      ← NEW: Data generation helpers (Step 2)
│   ├── data-aggregation.ts          ← NEW: Aggregation functions (Step 3)
│   ├── data-transformers.ts         ← NEW: Widget transformers (Step 3)
│   └── data-filtering.ts            ← NEW: Filter logic (Step 4)
│
├── hooks/
│   └── useFilteredData.ts           ← NEW: React hooks (Step 4)
│
└── play-components/
    └── universal-selectors/
        ├── location-selector/        ← Existing (connect in Step 5)
        └── year-selector/            ← Existing (connect in Step 5)
```

---

## 🔑 Key Concepts

### 1. Raw Data Point
The finest granularity of data (single row from backend table):
- **Dimensions**: region, area, city, year, month, activityType
- **Metrics**: ambassadorCount, serviceDaysUsed, etc.

### 2. Filter State
User's current filter selections:
```typescript
{
  location: { region?: string, area?: string, city?: string },
  year?: number
}
```

### 3. Filtered Data
Subset of raw data matching current filters

### 4. Aggregated Data
Filtered data grouped and summed for specific widgets

### 5. Transformed Data
Aggregated data formatted for specific widget prop types

---

## 📝 Backend Data Specification

### Excel Table Format

The backend should provide data in this structure:

| Column | Type | Example | Description |
|--------|------|---------|-------------|
| region | String | central | Region identifier |
| area | String | jiangsu | Area identifier |
| city | String | nanjing | City identifier |
| year | Integer | 2025 | Fiscal year |
| month | String | APR | Month (3-letter) |
| activity_type | String | train | Activity identifier |
| ambassador_count | Integer | 15 | Number of ambassadors |
| service_days_used | Decimal | 32.5 | Days consumed |
| service_days_total | Decimal | 60.0 | Days allocated |
| ... | ... | ... | (see overall.md for complete spec) |

**Key Points for Backend Engineers:**
1. Each row = finest granularity (city + month + activity)
2. Frontend will aggregate as needed
3. Include all combinations (even if metrics are zero)
4. Ensure data consistency across related rows

---

## ✅ Success Metrics

### Performance
- ✅ Filtering: <50ms for 1,000+ data points
- ✅ Transformation: <50ms per widget type
- ✅ Full pipeline: <100ms (filter + all transforms)
- ✅ UI update: <300ms (including re-render)

### Functionality
- ✅ All filter combinations work correctly
- ✅ All widgets update when filters change
- ✅ Heat map special case (year-only) works
- ✅ Empty states handled gracefully
- ✅ No console errors

### Data Quality
- ✅ Type-safe throughout
- ✅ Calculations are accurate
- ✅ No inconsistencies (e.g., used > total)
- ✅ Business rules enforced

---

## 🐛 Common Issues & Solutions

### "Type errors when importing new types"
→ Ensure Step 1 is complete; check import paths

### "Dataset is empty or undefined"
→ Verify Step 2 completed; check data generation logic

### "Widgets don't update when filters change"
→ Check filter state is passed correctly; verify memoization dependencies

### "Performance is slow"
→ Profile with DevTools; check memoization is working; verify no infinite loops

### "Heat map changes with location filter"
→ Ensure heat map uses `applyYearFilterOnly`, not `applyFilters`

---

## 📚 Additional Resources

### Related Documentation
- React Memoization: https://react.dev/reference/react/useMemo
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- Testing Best Practices: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

### Project-Specific
- Existing component structure: `_component.tsx`
- Widget prop types: `src/components/`
- Current mockup data: `data-just-for-1-time-test/`

---

## 🤝 Contributing

When implementing:
1. ✅ Follow TypeScript best practices
2. ✅ Add JSDoc comments for all functions
3. ✅ Handle edge cases (empty arrays, null values)
4. ✅ Write defensive code (validate inputs)
5. ✅ Test thoroughly before moving to next step

---

## 📧 Questions?

If anything is unclear:
1. Re-read the relevant step document
2. Check `overall.md` for architecture context
3. Review troubleshooting sections
4. Add a TODO comment and continue (document blockers)

---

## 🎉 Final Note

This PRD is designed to be comprehensive yet approachable. Each step can be completed by an AI assistant or human developer independently, as long as they understand the overall architecture.

**Good luck with implementation!** 🚀
