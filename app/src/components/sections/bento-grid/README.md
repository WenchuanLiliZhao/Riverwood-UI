# Bento Grid Component

## Overview

A flexible 12-column grid system inspired by Bento Box layouts, featuring responsive behavior based on container width (not viewport).

## Features

- **12-Column Grid System**: Full flexibility with 1-12 column spans
- **Row Spanning**: Support for 1-6 row spans
- **Container-Based Responsive**: Uses `ResizeObserver` to monitor container width, not viewport
- **Per-Item Responsive**: Each item can define its own responsive breakpoints
- **Gap Variants**: Small, medium, and large gap sizes
- **Type-Safe**: Full TypeScript support with CVA-generated types
- **Polymorphic**: Support for `asChild` pattern via Radix UI Slot

## Basic Usage

```tsx
import { BentoGrid, BentoItem } from "@/components/layout/bento-grid";

function MyComponent() {
  return (
    <BentoGrid gap="md">
      {/* Responsive item with breakpoints */}
      <BentoItem res={[
        [640, 4, 2],      // When width 0-640px: colSpan=4, rowSpan=2
        [1024, 6, 2],     // When width 641-1024px: colSpan=6, rowSpan=2
        [Infinity, 8, 2]   // When width 1025px+: colSpan=8, rowSpan=2
      ]}>
        <div>Content A</div>
      </BentoItem>
      
      {/* Another responsive item */}
      <BentoItem res={[[Infinity, 8, 2]]}>
        <div>Featured Content</div>
      </BentoItem>
    </BentoGrid>
  );
}
```

## API Reference

### BentoGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | Gap size between items |
| `rowHeight` | `number \| string` | `180px` | Minimum row height for grid items |
| `className` | `string` | - | Additional CSS classes |

### BentoItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `res` | `[number, number, number][]` | **Required** | Responsive configuration: `[breakpoint, colSpan, rowSpan][]` |
| `asChild` | `boolean` | `false` | Render child as root element |
| `className` | `string` | - | Additional CSS classes |

#### Responsive Configuration (`res` prop)

The `res` prop accepts an array of tuples, where each tuple is `[breakpoint, colSpan, rowSpan]`:

- **breakpoint**: The maximum width (in pixels) for this configuration. Use `Infinity` for the largest breakpoint.
- **colSpan**: Number of columns to span (1-12 or "full")
- **rowSpan**: Number of rows to span (1-6)

The breakpoints are evaluated from smallest to largest. When the container width is within a breakpoint range, that configuration is used.

**Example:**
```tsx
<BentoItem res={[
  [640, 4, 2],        // 0-640px: 4 columns, 2 rows
  [1024, 6, 2],       // 641-1024px: 6 columns, 2 rows
  [Infinity, 8, 2]    // 1025px+: 8 columns, 2 rows
]}>
```

## Examples

### Pattern 1: Responsive Asymmetric Layout

```tsx
<BentoGrid gap="md">
  <BentoItem res={[[640, 3, 1], [1024, 3, 1], [Infinity, 3, 1]]}>
    Item 1
  </BentoItem>
  <BentoItem res={[[640, 3, 1], [1024, 3, 1], [Infinity, 3, 1]]}>
    Item 2
  </BentoItem>
  <BentoItem res={[[640, 6, 2], [1024, 6, 2], [Infinity, 6, 2]]}>
    Large Item
  </BentoItem>
  <BentoItem res={[[640, 3, 1], [1024, 3, 1], [Infinity, 3, 1]]}>
    Item 3
  </BentoItem>
  <BentoItem res={[[640, 3, 1], [1024, 3, 1], [Infinity, 3, 1]]}>
    Item 4
  </BentoItem>
</BentoGrid>
```

### Pattern 2: Equal Grid with Responsive Behavior

```tsx
<BentoGrid gap="md">
  {[1, 2, 3, 4, 5, 6].map((i) => (
    <BentoItem 
      key={i} 
      res={[
        [640, 6, 1],        // Mobile: 2 items per row
        [1024, 4, 1],       // Tablet: 3 items per row
        [Infinity, 4, 1]    // Desktop: 3 items per row
      ]}
    >
      Item {i}
    </BentoItem>
  ))}
</BentoGrid>
```

### Pattern 3: Full-Width Header

```tsx
<BentoGrid gap="md">
  <BentoItem res={[[Infinity, 12, 1]]}>
    Header
  </BentoItem>
  {[1, 2, 3, 4].map((i) => (
    <BentoItem key={i} res={[[640, 6, 1], [1024, 3, 1], [Infinity, 3, 1]]}>
      Item {i}
    </BentoItem>
  ))}
</BentoGrid>
```

### Using asChild for Polymorphism

```tsx
<BentoGrid gap="md">
  {/* Render as a link */}
  <BentoItem res={[[Infinity, 6, 2]]} asChild>
    <a href="/feature">
      <div>Click me!</div>
    </a>
  </BentoItem>
  
  {/* Render as a button */}
  <BentoItem res={[[Infinity, 6, 2]]} asChild>
    <button onClick={handleClick}>
      <div>Interactive</div>
    </button>
  </BentoItem>
</BentoGrid>
```

## Responsive Behavior

Each `BentoItem` can define its own responsive breakpoints using the `res` prop. The grid container monitors its width using `ResizeObserver` and provides this width to all child items via React Context.

### How It Works

1. `BentoGrid` monitors its own width using `ResizeObserver`
2. The width is provided to all `BentoItem` children via React Context
3. Each `BentoItem` evaluates its `res` configuration based on the container width
4. The appropriate `colSpan` and `rowSpan` are applied dynamically

### Why Container-Based Responsive?

Unlike traditional `@media` queries that respond to viewport width, this grid uses `ResizeObserver` to monitor the container's width. This enables:

- **Component-Level Responsive**: Each grid responds to its own container
- **Sidebar-Friendly**: Works correctly inside sidebars or constrained layouts
- **Predictable**: Behavior is consistent regardless of viewport size
- **Flexible**: Each item can have its own responsive behavior

## Architecture

This component follows the **Core Component Pattern**:

1. **`styles.module.scss`**: Defines all CSS classes for grid and items
2. **`style.ts`**: Uses CVA to map SCSS classes to TypeScript variants
3. **`_BaseBentoItem.tsx`**: Core component with all logic and structure
4. **`index.tsx`**: Public API exports with `BentoGrid` and `BentoItem`

## Debug Page

Visit `/debug-bento-grid` to see all patterns and test responsive behavior.

## Notes

- Grid items use `grid-column: span N` and `grid-row: span N`
- Auto-flow is `row` (default), items fill horizontally first
- For complex manual placement, consider using `gridArea` CSS property
- Breakpoints in `res` are sorted automatically (ascending order)
- If container width is not available yet, the first breakpoint configuration is used
