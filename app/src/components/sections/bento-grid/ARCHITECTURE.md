# Bento Grid Architecture Diagram

## Visual Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User's React App                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │ imports
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Public API (index.tsx)                        │
│  ┌────────────────────┐          ┌─────────────────────┐        │
│  │   <BentoGrid />    │          │   <BentoItem />     │        │
│  │   - Container      │          │   - Grid Item       │        │
│  │   - Width Monitor │          │   - Responsive       │        │
│  └────────┬───────────┘          └──────────┬──────────┘        │
└───────────┼──────────────────────────────────┼──────────────────┘
            │                                  │
            │ provides context                 │ uses context
            ▼                                  ▼
┌───────────────────────┐          ┌─────────────────────────────┐
│  BentoGridContext     │          │  <BaseBentoItem />          │
│  - Container width    │          │                             │
│  - ResizeObserver     │          │  - res prop evaluation       │
│                       │          │  - asChild support          │
│                       │          │  - Polymorphic rendering    │
│                       │          │  - CVA variants             │
└───────────────────────┘          └───────────┬─────────────────┘
                                               │ uses
                                               ▼
┌────────────────────────────────────────────────────────────────┐
│                    style.ts (CVA Config)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  bentoGridVariants: gap (sm, md, lg)                     │  │
│  │  bentoItemVariants: colSpan (1-12), rowSpan (1-6)        │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬───────────────────────────────────────┘
                         │ maps to
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              styles.module.scss (CSS Grid)                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Grid Container Classes:                                 │  │
│  │    .grid - base 12-column grid                           │  │
│  │                                                           │  │
│  │  Item Classes:                                           │  │
│  │    .item - base item styles                              │  │
│  │    .col-span-{1-12} - column spanning                    │  │
│  │    .row-span-{1-6} - row spanning                       │  │
│  │    .gap-{sm,md,lg} - gap variants                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
<BentoGrid>
  │
  ├── Props: gap, rowHeight, className
  │
  ├── Uses: ResizeObserver to monitor width
  │   └── Provides: BentoGridContext (container width)
  │
  ├── Renders: <div> with grid classes
  │
  └── Children: <BentoItem> components
      │
      ├── Props: res, asChild, className
      │
      ├── Uses: BaseBentoItem (internal)
      │   ├── Consumes: BentoGridContext (container width)
      │   ├── Evaluates: res prop based on width
      │   └── Uses: CVA bentoItemVariants
      │       └── Returns: CSS classes
      │
      └── Renders: <div> or <Slot> (if asChild)
```

---

## Data Flow

### Responsive Behavior

```
User resizes container
         │
         ▼
ResizeObserver detects width change
         │
         ▼
BentoGrid updates context value
         │
         ▼
BentoItem receives new width via context
         │
         ▼
BaseBentoItem evaluates res prop
         │
         ▼
Selects matching breakpoint configuration
         │
         ▼
Updates colSpan and rowSpan
         │
         ▼
CVA generates new CSS classes
         │
         ▼
CSS Grid recalculates layout
         │
         ▼
Items reflow to new grid
```

### Variant Resolution

```
User sets props
         │
         ▼
<BentoItem res={[[640, 4, 2], [1024, 6, 2], [Infinity, 8, 2]]} />
         │
         ▼
BaseBentoItem receives props
         │
         ▼
Gets container width from BentoGridContext
         │
         ▼
Evaluates res array (e.g., width=800px)
         │
         ▼
Matches breakpoint: [1024, 6, 2]
         │
         ▼
CVA bentoItemVariants({ colSpan: 6, rowSpan: 2 })
         │
         ▼
Returns: "item col-span-6 row-span-2"
         │
         ▼
clsx combines with user className
         │
         ▼
Final className applied to element
```

---

## File Dependencies

```
index.tsx
  ├── imports: React, clsx
  ├── imports: bentoGridVariants, BentoGridVariantsProps (from ./style)
  ├── imports: BaseBentoItem, BaseBentoItemProps (from ./_BaseBentoItem)
  ├── Creates: BentoGridContext
  └── Exports: BentoGrid, BentoItem, BentoGridContext

_BaseBentoItem.tsx
  ├── imports: React
  ├── imports: Slot (from @radix-ui/react-slot)
  ├── imports: clsx
  ├── imports: bentoItemVariants (from ./style)
  ├── imports: BentoGridContext (from ./index)
  └── Exports: BaseBentoItem, BaseBentoItemProps

style.ts
  ├── imports: cva, VariantProps (from class-variance-authority)
  └── imports: styles (from ./styles.module.scss)

styles.module.scss
  └── pure CSS, no imports
```

---

## Type Flow

```
User writes JSX
         │
         ▼
<BentoItem res={[[640, 4, 2], [1024, 6, 2]]} />
         │
         ▼
TypeScript checks against BaseBentoItemProps
         │
         ├── res: [number, number, number][] (required)
         ├── asChild?: boolean
         └── extends React.HTMLAttributes<HTMLDivElement>
         │
         ▼
BaseBentoItem evaluates res prop
         │
         ▼
Returns ValidColSpan and ValidRowSpan
         │
         ├── ValidColSpan: 1 | 2 | ... | 12 | "full"
         └── ValidRowSpan: 1 | 2 | 3 | 4 | 5 | 6
         │
         ▼
Passed to bentoItemVariants
         │
         ▼
CVA generates type-safe classes
```

---

## Responsive Logic

### Configuration

Each `BentoItem` can define its own responsive breakpoints:

```typescript
<BentoItem res={[
  [640, 4, 2],        // When width 0-640px: colSpan=4, rowSpan=2
  [1024, 6, 2],       // When width 641-1024px: colSpan=6, rowSpan=2
  [Infinity, 8, 2]    // When width 1025px+: colSpan=8, rowSpan=2
]} />
```

### Evaluation

```
Container Width: 800px
                  │
                  ▼
BentoItem receives width via context
                  │
                  ▼
Sort res array by breakpoint (ascending)
                  │
                  ▼
Iterate through breakpoints:
  [640, 4, 2] → 800 > 640? ✓ Continue
  [1024, 6, 2] → 800 <= 1024? ✓ MATCH
                  │
                  ▼
Return { colSpan: 6, rowSpan: 2 }
                  │
                  ▼
Apply to CVA variants
                  │
                  ▼
CSS: .col-span-6 .row-span-2
```

### Breakpoint Matching Algorithm

1. Sort `res` array by breakpoint value (ascending)
2. If container width is `null` (not yet measured), use first config
3. Iterate through sorted breakpoints
4. Find first breakpoint where `width <= breakpoint` or `breakpoint === Infinity`
5. Use that configuration's `colSpan` and `rowSpan`
6. If no match, fallback to last config

---

## CSS Grid Layout

### 12-Column Grid (Default)

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

Example: res={[[Infinity, 4, 1]]}
┌───────────┐
│   Item    │  (Spans 4 columns)
│  (4 cols) │
└───────────┘
```

### Responsive Example

```
Container: 600px
Item config: res={[[640, 6, 1], [1024, 4, 1], [Infinity, 3, 1]]}

Result: colSpan=6 (matches [640, 6, 1])
┌──────────────┐
│     Item     │  (Spans 6 columns at 600px width)
│   (6 cols)   │
└──────────────┘
```

---

## Performance Characteristics

### Time Complexity

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Initial Render | O(n) | n = number of items |
| Resize Event | O(1) | ResizeObserver callback |
| Context Update | O(1) | React context update |
| Res Evaluation | O(m) | m = number of breakpoints per item |
| CSS Reflow | O(n) | Browser reflow |

### Memory

```
Base Memory per Grid:
- 1 ResizeObserver instance
- 1 ref object
- 1 context value (number)
- 1 state variable (container width)

Base Memory per Item:
- Props object
- 1 DOM element
- CSS classes (string)
- Context subscription

Total: ~1-2 KB per grid + ~100-200 bytes per item
```

### Optimization Points

1. **ResizeObserver** - Native, efficient, no debouncing needed

2. **CSS Grid** - Hardware accelerated, no JS calculations

3. **CVA** - Build-time optimization, zero runtime cost

4. **Context** - Single source of truth, efficient updates

5. **Breakpoint Sorting** - Cached after first evaluation

---

## Extension Points

### Adding New Column Span

```scss
// styles.module.scss
.col-span-13 { grid-column: span 13; }
```

```typescript
// style.ts
colSpan: {
  // ... existing
  13: styles["col-span-13"],
}
```

### Custom Item Variant

```scss
// styles.module.scss
.item-highlighted {
  border: 2px solid gold;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}
```

```typescript
// style.ts
export const bentoItemVariants = cva(styles.item, {
  variants: {
    colSpan: { /* ... */ },
    rowSpan: { /* ... */ },
    variant: {
      default: "",
      highlighted: styles["item-highlighted"],
    }
  }
});
```

---

## Conclusion

This architecture provides:

✅ **Separation of Concerns** - Logic, styles, and types are cleanly separated

✅ **Type Safety** - Full TypeScript support with CVA

✅ **Performance** - Efficient rendering with native browser APIs

✅ **Maintainability** - Clear structure with inline documentation

✅ **Extensibility** - Easy to add new features or variants

✅ **Flexibility** - Per-item responsive configuration

✅ **Container-Based** - Responds to container width, not viewport
