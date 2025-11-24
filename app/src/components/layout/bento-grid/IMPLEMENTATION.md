# Bento Grid Implementation Summary

This document provides a comprehensive overview of the Bento Grid component implementation.

---

## Architecture

### File Structure

```
bento-grid/
├── styles.module.scss        # CSS styles
├── style.ts                   # CVA variant definitions
├── _BaseBentoItem.tsx        # Core item component
├── index.tsx                  # Public API exports
├── README.md                  # User documentation
└── IMPLEMENTATION.md          # This file
```

### Component Hierarchy

```
BentoGrid (Container)
  ├── Monitors width via ResizeObserver
  ├── Provides BentoGridContext (container width)
  └── Children: BentoItem components
      ↓
BentoItem (Public API)
  ↓
BaseBentoItem (Core Component)
  ├── Consumes BentoGridContext
  ├── Evaluates res prop
  └── Applies responsive colSpan/rowSpan
```

---

## Key Design Decisions

### 1. 12-Column Grid System

**Why 12 columns?**

- Highly divisible (1, 2, 3, 4, 6, 12)
- Common standard in web design (Bootstrap, Material Design)
- Flexible enough for most layouts
- Easy mental model for designers

**Why not 24 columns?**

- Excessive granularity for typical use cases
- Harder to reason about
- More CSS classes to maintain

### 2. Container-Based Responsive (Not Viewport)

**Implementation:**

Uses `ResizeObserver` directly in `BentoGrid` to monitor container width and provides it via React Context.

**Advantages:**

1. **Component-level responsive** - Each grid responds to its own container
2. **Works in sidebars** - Correct behavior in constrained layouts
3. **Predictable** - Not affected by viewport size
4. **Per-item control** - Each item can define its own breakpoints

**How it works:**

```typescript
// BentoGrid monitors width
const [containerWidth, setContainerWidth] = useState(0);

useEffect(() => {
  const resizeObserver = new ResizeObserver(() => {
    setContainerWidth(element.offsetWidth);
  });
  resizeObserver.observe(element);
  return () => resizeObserver.disconnect();
}, []);

// Provides width via context
<BentoGridContext.Provider value={containerWidth}>
  {children}
</BentoGridContext.Provider>

// BentoItem consumes width
const containerWidth = useContext(BentoGridContext);
const spans = getResponsiveSpans(containerWidth, res);
```

### 3. Per-Item Responsive Configuration

**Implementation:**

Each `BentoItem` can define its own responsive breakpoints using the `res` prop:

```typescript
<BentoItem res={[
  [640, 4, 2],        // When width 0-640px: colSpan=4, rowSpan=2
  [1024, 6, 2],      // When width 641-1024px: colSpan=6, rowSpan=2
  [Infinity, 8, 2]   // When width 1025px+: colSpan=8, rowSpan=2
]} />
```

**Advantages:**

- **Flexibility** - Each item can have different responsive behavior
- **Precision** - Fine-grained control over layout at different widths
- **Simplicity** - No need for complex CSS media queries

**Breakpoint Evaluation:**

1. Sort `res` array by breakpoint (ascending)
2. Find first breakpoint where `width <= breakpoint` or `breakpoint === Infinity`
3. Use that configuration's `colSpan` and `rowSpan`
4. Validate and clamp values to valid ranges (1-12 for colSpan, 1-6 for rowSpan)

### 4. CVA for Style Variants

**Why CVA?**

1. **Type Safety** - Automatic TypeScript types for all variants
2. **Maintainability** - Single source of truth for variant logic
3. **Consistency** - Same pattern used across all components

```typescript
export const bentoItemVariants = cva(
  styles.item, // base class
  {
    variants: {
      colSpan: { 1: styles["col-span-1"], /* ... */ },
      rowSpan: { 1: styles["row-span-1"], /* ... */ },
    },
    defaultVariants: { colSpan: 1, rowSpan: 1 },
  }
);
```

### 5. Core Component Pattern

**Structure:**

- `BaseBentoItem`: Contains all logic and structure
- `BentoItem`: Public wrapper providing clean API

**Benefits:**

1. **Single source of truth** - All logic in one place
2. **Extensibility** - Easy to create specialized variants
3. **Testability** - Core logic isolated from API layer

### 6. Polymorphism via asChild

**Implementation:**

Uses Radix UI's `Slot` component for polymorphic rendering.

```tsx
const Comp = asChild ? Slot : "div";
return <Comp {...props} />;
```

**Use Cases:**

- Render item as `<a>` for links
- Render item as `<button>` for interactive elements
- Maintain semantic HTML while preserving grid styling

---

## Responsive Behavior Details

### Breakpoint Evaluation Algorithm

```typescript
function getResponsiveSpans(
  containerWidth: number | null,
  res?: ResponsiveConfig
): { colSpan: ValidColSpan; rowSpan: ValidRowSpan } | null {
  if (!res || res.length === 0) return null;

  // Sort by breakpoint ascending
  const sorted = [...res].sort((a, b) => {
    const aVal = a[0] === Infinity ? Number.MAX_SAFE_INTEGER : a[0];
    const bVal = b[0] === Infinity ? Number.MAX_SAFE_INTEGER : b[0];
    return aVal - bVal;
  });

  // Find matching breakpoint
  for (const [breakpoint, colSpan, rowSpan] of sorted) {
    if (containerWidth === null) {
      return { colSpan: validateColSpan(colSpan), rowSpan: validateRowSpan(rowSpan) };
    }
    const breakpointVal = breakpoint === Infinity ? Number.MAX_SAFE_INTEGER : breakpoint;
    if (containerWidth <= breakpointVal) {
      return { colSpan: validateColSpan(colSpan), rowSpan: validateRowSpan(rowSpan) };
    }
  }

  // Fallback to last config
  const last = sorted[sorted.length - 1];
  return { colSpan: validateColSpan(last[1]), rowSpan: validateRowSpan(last[2]) };
}
```

### Value Validation

All `colSpan` and `rowSpan` values are validated and clamped to valid ranges:

- **colSpan**: 1-12 or "full"
- **rowSpan**: 1-6

This ensures type safety and prevents invalid CSS values.

---

## Performance Considerations

### ResizeObserver

**Cost:**

- Minimal overhead
- Native browser API
- Only triggers on actual size changes

**Optimization:**

- No debouncing needed (browser handles this)
- Cleanup on unmount prevents memory leaks
- Single observer per grid (not per item)

### React Context

**Performance:**

- Context value is a primitive (number), minimal re-renders
- Only items that consume context will re-render
- Context updates are batched by React

### Breakpoint Evaluation

**Optimization:**

- Breakpoints are sorted once (cached)
- Early return on first match
- Validation happens only when needed

### CSS Grid

**Performance:**

- Hardware-accelerated by browsers
- More efficient than flexbox for 2D layouts
- No JavaScript layout calculations needed

---

## Testing Strategy

### Debug Page (`/debug-bento-grid`)

Demonstrates various patterns with the new `res` prop:

1. **Responsive Patterns** - Items with different breakpoints
2. **Equal Grid** - Uniform layout with responsive behavior
3. **Asymmetric Layouts** - Mixed sizes with responsive configs
4. **Gap Variants** - sm, md, lg gaps
5. **Vertical Spanning** - Different row spans
6. **Custom Row Height** - Testing rowHeight prop

### Manual Testing Checklist

- [ ] Resize browser window (test responsive breakpoints)
- [ ] Test in sidebar (constrained width)
- [ ] Verify different breakpoints per item
- [ ] Check gap variants (sm, md, lg)
- [ ] Test asChild polymorphism
- [ ] Verify TypeScript types work correctly
- [ ] Test with Infinity breakpoint
- [ ] Verify res prop is required (TypeScript error if missing)

---

---

## Future Enhancements

### Potential Features

1. **Grid Template Areas** - Named grid areas for complex layouts
2. **Auto-fit / Auto-fill** - Responsive columns without breakpoints
3. **Masonry Mode** - Pinterest-style layout
4. **Animation Variants** - Stagger animations for items
5. **Drag and Drop** - Reorderable items

### Why Not Implemented Now?

- Keep component focused and simple
- Avoid feature bloat
- Wait for real user needs

---

## Comparison with Alternatives

### vs. Tailwind Grid Classes

| Aspect | Bento Grid | Tailwind |
|--------|-----------|----------|
| Setup | Component-based | Utility classes |
| Responsive | Container-based, per-item | Viewport-based |
| Type Safety | Full TypeScript | None |
| Reusability | High | Medium |
| Learning Curve | Low | Medium |

### vs. Manual CSS Grid

| Aspect | Bento Grid | Manual Grid |
|--------|-----------|-------------|
| Maintenance | Centralized | Scattered |
| Consistency | Enforced | Manual |
| Responsive | Automatic, per-item | Manual |
| Debugging | Easy | Hard |

---

## Conclusion

The Bento Grid component provides a robust, type-safe, and maintainable solution for grid layouts in React applications. By leveraging:

- CSS Grid for layout
- CVA for variant management
- Container-based responsive design
- Per-item responsive configuration
- Core Component Pattern for architecture

We've created a component that is both powerful and easy to use, with fine-grained control over responsive behavior at the item level.
