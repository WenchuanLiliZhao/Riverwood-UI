# Mockup Data Processing Rules

This document describes the rules and conventions for processing mockup data in the jingjing playground components.

## Data Structure Convention

### Use Objects, Not Arrays

**Rule**: Always use objects (`Record<string, T>`) instead of arrays for mockup data collections.

**Rationale**: 
- Objects provide semantic keys that are more readable and maintainable
- Avoids magic number indices (e.g., `data[0]`, `data[1]`)
- Better IDE autocomplete and type safety

**Example**:
```typescript
// ✅ Good: Use object with meaningful keys
export const kpiMetricsData: Record<string, KPIMetricData> = {
  txn: { title: "TXN", value: 185, ... },
  aov: { title: "AOV", value: 1519, ... },
  // ...
};

// ❌ Bad: Using array with numeric indices
export const kpiMetricsData: KPIMetricData[] = [
  { title: "TXN", value: 185, ... },
  { title: "AOV", value: 1519, ... },
  // ...
];
```

## Percentage Symbol Handling

### Rule 1: Value Display Percentage

**When to add `%` to values**:
- Use `valueIsPercentage: true` flag in data structure
- Component checks this flag to decide whether to append `%` symbol

**Formatting rules**:
- If `valueIsPercentage: true`: Display as `"8.4%"` or `"100%"` (no decimal for integers)
- If `valueIsPercentage: false`: Display as `"185"` or `"1,519"` (with comma formatting)

**Example** (KPIMetric):
```typescript
{
  title: "CR",
  value: 8.4,
  valueIsPercentage: true,  // → displays as "8.4%"
  // ...
}

{
  title: "TXN",
  value: 185,
  valueIsPercentage: false, // → displays as "185"
  // ...
}
```

### Rule 2: Change Unit Display

**Two types of change units**:
- `"percentage"`: Display as `"6%"` (relative percentage change)
- `"points"`: Display as `"6pts"` (absolute percentage points change)

**When to use each**:
- Use `"percentage"` for relative changes (e.g., "6% decrease")
- Use `"points"` for absolute changes in percentage metrics (e.g., "6pts decrease" for conversion rate)

**Example**:
```typescript
{
  title: "CR",
  value: 8.4,
  valueIsPercentage: true,
  change: {
    value: 6,
    unit: "points",  // → displays as "▼ 6pts"
    direction: "down",
  },
}

{
  title: "TXN",
  value: 185,
  valueIsPercentage: false,
  change: {
    value: 6,
    unit: "percentage", // → displays as "▼ 6%"
    direction: "down",
  },
}
```

## Sign Symbol Handling

### Rule 3: Variance Type (OutLookCard)

**For `type: "variance"`**:
- **Main value**: Always show sign (`+` or `-`) with currency symbol
  - Format: `"+ ¥11,553"` or `"- ¥5,775"`
- **Breakdown items**: Show sign without currency symbol
  - Format: `"+17,328"` or `"-5,775"`

**Color logic**:
- Positive values (`>= 0`) → Green (`COLOR_SEMANTICS.success`)
- Negative values (`< 0`) → Red (`COLOR_SEMANTICS.failure`)

### Rule 4: Percentage Type (OutLookCard)

**For `type: "percentage"`**:
- **No sign symbols**: Values are displayed as percentages without `+` or `-`
- Format: `"104.1%"` or `"63.2%"`
- **Decimal handling**: Show decimal only if needed (e.g., `"106%"` not `"106.0%"`)

**Color logic**:
- Values `>= 100` → Green (`COLOR_SEMANTICS.success`) - above outlook
- Values `< 100` → Red (`COLOR_SEMANTICS.failure`) - below outlook

## Color Semantics

### Rule 5: Direction to Color Mapping

**Color constants** (defined in `color-semantics.ts`):
- `success`: `"#66BD98"` (Green) - for upward trends/increases
- `failure`: `"#FF4646"` (Red) - for downward trends/decreases

**Direction mapping**:
- Data uses `"up" | "down"` for direction
- Components map to color semantics: `"up" → "success"`, `"down" → "failure"`

**Helper function**:
```typescript
const mapDirectionToColorSemantic = (direction: "up" | "down"): ColorDirection => {
  return direction === "up" ? "success" : "failure";
};
```

## Component-Specific Rules

### NetSalesOutlook

**Distribution segments**:
- Use `segments.map()` to render repeated items
- Each segment has its own color (for label) and change indicator color (for change value)
- Change symbol: `"▲"` for up, `"▼"` for down

**Lower items**:
- Use `lowerItems.map()` to render repeated items
- Format numbers with commas: `"220,976"`
- Change display: `"▲ 12%"` or `"▼ 10%"`

### OutLookCard

**Two card types**:
1. **Variance card** (`varianceToOutlookData`):
   - Shows absolute difference from outlook
   - Main value: `"+ ¥11,553"` (with currency)
   - Breakdown: `"+17,328"` (without currency)

2. **Percentage card** (`percentageToOutlookData`):
   - Shows percentage of outlook achieved
   - Main value: `"104.1%"`
   - Breakdown: `"106%"` or `"63.2%"`

**Breakdown items**:
- Use `breakdownItems.map()` to render repeated items
- Formatting differs based on card type

### KPIMetric

**Value formatting**:
- Check `valueIsPercentage` flag
- If true: Format as percentage with `%` symbol
- If false: Format as number with comma separators

**Change formatting**:
- Check `change.unit` (`"percentage"` or `"points"`)
- Display symbol: `"▲"` for up, `"▼"` for down
- Append unit: `"%"` or `"pts"`

**Example output**:
- `"185"` with `"▼ 6%"` (non-percentage value, percentage change)
- `"8.4%"` with `"▼ 6pts"` (percentage value, points change)

## Number Formatting

### Rule 6: Decimal Display

**For percentage values**:
- If integer: Display without decimal (`"100%"` not `"100.0%"`)
- If decimal: Display one decimal place (`"8.4%"` not `"8.40%"`)

**For non-percentage values**:
- Use `toLocaleString("en-US")` with appropriate decimal places
- Show decimals only when needed (e.g., `"1.6"` for UPT)

### Rule 7: Comma Formatting

**For large numbers**:
- Use `toLocaleString("en-US")` to add comma separators
- Example: `2203` → `"2,203"`, `290909` → `"290,909"`

## Summary Checklist

When creating mockup data, ensure:

- [ ] Use object structure (`Record<string, T>`) instead of arrays
- [ ] Set `valueIsPercentage` flag correctly for values that should display `%`
- [ ] Use `"percentage"` unit for relative changes, `"points"` for absolute changes
- [ ] For variance type: include sign symbols (`+`/`-`) and currency where appropriate
- [ ] For percentage type: no sign symbols, only percentage values
- [ ] Map `"up"`/`"down"` directions to `"success"`/`"failure"` colors
- [ ] Format decimals appropriately (no unnecessary `.0` for integers)
- [ ] Use comma formatting for large numbers
- [ ] Use mapping functions (`map()`) for repeated elements in components

