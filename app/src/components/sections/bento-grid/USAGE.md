# Bento Grid Quick Start Guide

## Installation

The Bento Grid component is already included in the layout components. No additional installation needed.

---

## Basic Import

```tsx
// Option 1: Import from layout index
import { BentoGrid, BentoItem } from "@/components/layout";

// Option 2: Direct import
import { BentoGrid, BentoItem } from "@/components/layout/bento-grid";
```

---

## Simplest Example

```tsx
import { BentoGrid, BentoItem } from "@/components/layout";

function MyPage() {
  return (
    <BentoGrid>
      <BentoItem res={[[Infinity, 6, 1]]}>Left Half</BentoItem>
      <BentoItem res={[[Infinity, 6, 1]]}>Right Half</BentoItem>
    </BentoGrid>
  );
}
```

**Note:** The `res` prop is required. Each item must define at least one breakpoint configuration.

---

## Common Patterns

### Pattern 1: Hero + Grid (Featured Content Layout)

```tsx
<BentoGrid gap="md">
  {/* Full-width hero */}
  <BentoItem res={[[Infinity, 12, 1]]}>
    <div className="hero">Featured Story</div>
  </BentoItem>
  
  {/* 4 equal items below */}
  <BentoItem res={[[640, 6, 1], [1024, 3, 1], [Infinity, 3, 1]]}>
    Story 1
  </BentoItem>
  <BentoItem res={[[640, 6, 1], [1024, 3, 1], [Infinity, 3, 1]]}>
    Story 2
  </BentoItem>
  <BentoItem res={[[640, 6, 1], [1024, 3, 1], [Infinity, 3, 1]]}>
    Story 3
  </BentoItem>
  <BentoItem res={[[640, 6, 1], [1024, 3, 1], [Infinity, 3, 1]]}>
    Story 4
  </BentoItem>
</BentoGrid>
```

### Pattern 2: Asymmetric Layout (Dashboard Style)

```tsx
<BentoGrid gap="md">
  {/* Large main panel */}
  <BentoItem res={[[640, 6, 2], [1024, 8, 2], [Infinity, 8, 2]]}>
    <div className="main-chart">Analytics Chart</div>
  </BentoItem>
  
  {/* Small side widgets */}
  <BentoItem res={[[640, 6, 1], [1024, 4, 1], [Infinity, 4, 1]]}>
    <div className="widget">Users: 1,234</div>
  </BentoItem>
  <BentoItem res={[[640, 6, 1], [1024, 4, 1], [Infinity, 4, 1]]}>
    <div className="widget">Revenue: $5,678</div>
  </BentoItem>
</BentoGrid>
```

### Pattern 3: Equal Grid (Gallery Layout)

```tsx
<BentoGrid gap="md">
  {photos.map((photo, i) => (
    <BentoItem 
      key={i} 
      res={[[640, 6, 1], [1024, 4, 1], [Infinity, 4, 1]]}
    >
      <img src={photo.url} alt={photo.title} />
    </BentoItem>
  ))}
</BentoGrid>
```

### Pattern 4: Product Feature Grid (Marketing Page)

```tsx
<BentoGrid gap="lg">
  {/* Main feature */}
  <BentoItem res={[[640, 6, 2], [1024, 7, 2], [Infinity, 7, 2]]}>
    <div className="feature-hero">
      <h2>AI-Powered Analytics</h2>
      <p>Revolutionary insights...</p>
    </div>
  </BentoItem>
  
  {/* Supporting features */}
  <BentoItem res={[[640, 6, 1], [1024, 5, 1], [Infinity, 5, 1]]}>
    <div className="feature">Real-time Updates</div>
  </BentoItem>
  <BentoItem res={[[640, 6, 1], [1024, 5, 1], [Infinity, 5, 1]]}>
    <div className="feature">Cloud Sync</div>
  </BentoItem>
  
  {/* More features */}
  <BentoItem res={[[640, 6, 1], [1024, 4, 1], [Infinity, 4, 1]]}>
    Security
  </BentoItem>
  <BentoItem res={[[640, 6, 1], [1024, 4, 1], [Infinity, 4, 1]]}>
    Integrations
  </BentoItem>
  <BentoItem res={[[640, 6, 1], [1024, 4, 1], [Infinity, 4, 1]]}>
    Support
  </BentoItem>
</BentoGrid>
```

---

## Props Reference

### BentoGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Space between items |
| `rowHeight` | `number \| string` | `180px` | Minimum row height |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | BentoItem components |

### BentoItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `res` | `[number, number, number][]` | **Required** | Responsive config: `[breakpoint, colSpan, rowSpan][]` |
| `asChild` | `boolean` | `false` | Polymorphic rendering |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Content to display |

---

## Column Span Quick Reference

| Columns | Percentage | Use Case |
|---------|-----------|----------|
| 1 | 8.33% | Small icon/badge |
| 2 | 16.67% | Small card |
| 3 | 25% | Quarter width |
| 4 | 33.33% | Third width (3-column grid) |
| 6 | 50% | Half width |
| 8 | 66.67% | Two-thirds width |
| 12 | 100% | Full width |

---

## Responsive Behavior

Each item can define its own responsive breakpoints using the `res` prop:

```tsx
// This item will be:
// - 4 columns wide when container is 0-640px
// - 6 columns wide when container is 641-1024px
// - 8 columns wide when container is 1025px+
<BentoItem res={[
  [640, 4, 2],        // breakpoint, colSpan, rowSpan
  [1024, 6, 2],
  [Infinity, 8, 2]
]}>
  Content
</BentoItem>
```

**Tips:**
- Breakpoints are automatically sorted (ascending)
- Use `Infinity` for the largest breakpoint
- Each item can have different breakpoints
- Container width is monitored via `ResizeObserver`

---

## Styling Tips

### Adding Background Color

```tsx
<BentoItem 
  res={[[Infinity, 6, 2]]}
  style={{ backgroundColor: '#f0f0f0' }}
>
  Content
</BentoItem>
```

### Custom Padding

```tsx
<BentoItem 
  res={[[Infinity, 4, 1]]}
  className="p-6" // Use your utility classes
>
  Content
</BentoItem>
```

### Hover Effects

```scss
// In your SCSS module
.myItem {
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}
```

```tsx
<BentoItem res={[[Infinity, 4, 1]]} className={styles.myItem}>
  Hover me!
</BentoItem>
```

---

## Advanced: Polymorphic Rendering

### As a Link

```tsx
<BentoItem res={[[Infinity, 6, 2]]} asChild>
  <a href="/feature">
    <div className="card">Click to learn more</div>
  </a>
</BentoItem>
```

### As a Button

```tsx
<BentoItem res={[[Infinity, 4, 1]]} asChild>
  <button onClick={handleClick}>
    <div className="card">Interactive Card</div>
  </button>
</BentoItem>
```

---

## Common Mistakes

### ❌ Wrong: Spans exceed 12 columns in one row

```tsx
<BentoGrid>
  <BentoItem res={[[Infinity, 8, 1]]}>Item 1</BentoItem>
  <BentoItem res={[[Infinity, 6, 1]]}>Item 2</BentoItem> {/* Wraps to next row */}
</BentoGrid>
```

### ✅ Correct: Spans add up to 12

```tsx
<BentoGrid>
  <BentoItem res={[[Infinity, 8, 1]]}>Item 1</BentoItem>
  <BentoItem res={[[Infinity, 4, 1]]}>Item 2</BentoItem> {/* Same row */}
</BentoGrid>
```

### ❌ Wrong: Forgetting min-height for content

```tsx
<BentoItem res={[[Infinity, 4, 1]]}>
  {/* Empty - will have default min-height */}
</BentoItem>
```

### ✅ Correct: Add content or explicit height

```tsx
<BentoItem res={[[Infinity, 4, 1]]} style={{ minHeight: '200px' }}>
  <div className="flex items-center justify-center h-full">
    Content
  </div>
</BentoItem>
```

---

## Testing Your Layout

1. **Check the debug page**: Navigate to `/debug-bento-grid`
2. **Resize browser**: Test responsive breakpoints
3. **Inspect gaps**: Try different `gap` values (sm, md, lg)
4. **Test in context**: Place grid in sidebar or constrained container

---

## Need More Examples?

Visit the debug page at `/debug-bento-grid` to see 8+ different patterns in action.

---

## Performance Tips

1. **Avoid nesting grids** - Keep layouts flat when possible
2. **Use semantic HTML** - Leverage `asChild` for proper HTML tags
3. **Minimize custom styles** - Use built-in variants first
4. **Consider virtualization** - For large grids (100+ items), consider windowing

---

## Getting Help

- **Component README**: See `README.md` for full API documentation
- **Implementation Details**: See `IMPLEMENTATION.md` for architecture
- **Debug Page**: `/debug-bento-grid` for visual examples
- **Source Code**: Check `index.tsx` for implementation reference
