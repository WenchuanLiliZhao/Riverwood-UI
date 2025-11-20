# Responsive Utility Usage Guide

The `responsive` utility provides a way to apply different outputs (classNames or ReactNodes) based on the element's width. It uses `ResizeObserver` to automatically track width changes and update the output accordingly.

## API Overview

### Types

```typescript
type ResponsiveConfig = {
  interval: [number, number] | [number, undefined];
  output: ReactNode | string;
}[];
```

- `interval`: A tuple `[min, max]` where:
  - `[number, number]`: Width range from `min` to `max` (inclusive)
  - `[number, undefined]`: Width range from `min` to infinity
- `output`: The value to return when the width falls within the interval
  - Can be a `string` (for className usage)
  - Can be a `ReactNode` (for rendering different components)

## Usage Patterns

### Pattern 1: Function-Based API (Recommended) ⭐

The simplest way to use the responsive utility is with the `responsive()` function:

```tsx
import { responsive } from '@/components/utils';

const MyComponent = () => {
  const [ref, className] = responsive([
    { interval: [0, 640], output: "classA" },
    { interval: [641, 1080], output: "classB" },
    { interval: [1081, undefined], output: "classC" },
  ]);

  return <div ref={ref} className={className}>Content</div>;
};
```

For rendering different content:

```tsx
import { responsive } from '@/components/utils';

const MyComponent = () => {
  const [ref, content] = responsive([
    { interval: [0, 640], output: <ElementA /> },
    { interval: [641, 1080], output: <ElementB /> },
    { interval: [1081, undefined], output: <ElementC /> },
  ]);

  return <div ref={ref}>{content}</div>;
};
```

Combining with existing classNames:

```tsx
import { responsive } from '@/components/utils';

const MyComponent = () => {
  const [ref, responsiveClassName] = responsive([
    { interval: [0, 640], output: "responsive-small" },
    { interval: [641, undefined], output: "responsive-large" },
  ]);

  return (
    <div ref={ref} className={`base-class ${responsiveClassName}`}>
      Content
    </div>
  );
};
```

### Pattern 2: Using the `Responsive` Component

When you prefer a component-based approach:

```tsx
import { Responsive } from '@/components/utils';

<Responsive
  config={[
    { interval: [0, 640], output: "classA" },
    { interval: [641, 1080], output: "classB" },
    { interval: [1081, undefined], output: "classC" },
  ]}
/>
```

### Pattern 3: Using the `useResponsive` Hook Directly

For more advanced usage with manual ref management:

```tsx
import { useResponsive } from '@/components/utils';
import { useRef } from 'react';

const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const className = useResponsive(
    [
      { interval: [0, 640], output: "classA" },
      { interval: [641, 1080], output: "classB" },
    ],
    ref
  );

  return <div ref={ref} className={className}>Content</div>;
};
```

## How It Works

1. The utility uses `ResizeObserver` to track the width of the element that the ref is attached to
2. When the width changes, it checks which interval the width falls into
3. It returns the corresponding `output` value
4. The component re-renders with the new value
5. The width is measured using `element.offsetWidth` in pixels

## Important Notes

- **Interval Coverage**: The intervals should be non-overlapping and cover the full range if you want complete coverage. Gaps between intervals will cause the fallback to be used.
- **Fallback Behavior**: If no interval matches, it falls back to the first config's output
- **Width Measurement**: The width is measured in pixels using `element.offsetWidth` (includes padding and border, excludes margin)
- **Infinity**: `undefined` in the interval means "infinity" (no upper bound). Use `[number, undefined]` for "from this width onwards"
- **Cleanup**: The component automatically handles cleanup of the ResizeObserver when the component unmounts or the config changes
- **Performance**: ResizeObserver is efficient and only fires when the element's size actually changes
- **Initial Value**: The hook uses the first config's output as the initial value before the first measurement

## Example: Content Component Integration

A real-world example from the `Content` component that uses responsive padding classes:

```tsx
import { responsive } from '@/components/utils';
import styles from './content.module.scss';

export const Content = ({ elements, className, spacing = { widthMode: "medium" } }) => {
  // Always use responsive utility for automatic width-based padding class selection
  const [containerRef, responsiveClassName] = responsive([
    { interval: [0, 640], output: styles["small-padding"] },
    { interval: [641, 1024], output: styles["medium-padding"] },
    { interval: [1025, 1408], output: styles["large-padding"] },
    { interval: [1409, undefined], output: styles["full-padding"] },
  ]);

  // Determine max-width class based on spacing.widthMode (separate concern)
  const maxWidthClassName =
    spacing.widthMode === "small"
      ? styles["small"]
      : spacing.widthMode === "medium"
      ? styles["medium"]
      : spacing.widthMode === "large"
      ? styles["large"]
      : styles["full"];

  return (
    <div className={`${styles["content"]} ${className || ""}`}>
      <div
        ref={containerRef}
        className={`${styles["content-container"]} ${maxWidthClassName} ${responsiveClassName}`}
      >
        {elements.content}
      </div>
    </div>
  );
};
```

**Key points from this example:**
- The `responsive()` function is called at the component level to get `[ref, className]`
- The `ref` is attached to the element whose width should be observed
- The responsive className is independent of other props (like `spacing.widthMode`)
- Multiple classNames can be combined in the same element
- The responsive utility automatically updates when the element's width changes

