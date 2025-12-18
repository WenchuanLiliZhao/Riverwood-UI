# ScaledViewport Component

A component that provides viewport scaling functionality, allowing content to maintain a fixed aspect ratio and scale proportionally to fit the available window space.

## Features

- **Fixed Aspect Ratio**: Maintains content at specified base dimensions while scaling to fit the viewport
- **Auto-Centering**: Automatically centers scaled content in the available space
- **Optional Frame**: Adds rounded corners, borders, and measurement rulers around scaled content
- **Container Queries**: Enables container query context for nested responsive elements
- **Customizable**: Configure ruler sizes and frame background

## Usage

### Basic Usage

```tsx
import { ScaledViewport } from '@/components';

function MyApp() {
  return (
    <ScaledViewport viewportMode={["scaled-from", 1920, 1080]}>
      <YourContent />
    </ScaledViewport>
  );
}
```

### With Frame

```tsx
<ScaledViewport
  viewportMode={["scaled-from", 1920, 1080]}
  enableFrame={true}
  frameBackground="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
>
  <YourContent />
</ScaledViewport>
```

### Custom Ruler Sizes

```tsx
<ScaledViewport
  viewportMode={["scaled-from", 1440, 900]}
  enableFrame={true}
  rulerSizes={[32, 32, 32, 32]} // [top, right, bottom, left]
  frameBackground="#f0f0f0"
>
  <YourContent />
</ScaledViewport>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to be rendered inside the scaled viewport |
| `viewportMode` | `ViewportMode` | `"default"` | Viewport scaling mode: `"default"` for normal layout or `["scaled-from", width, height]` for fixed scaling |
| `className` | `string` | `""` | Additional CSS class names |
| `enableFrame` | `boolean` | `false` | Enable framed viewport with rounded corners and rulers (only works with scaled mode) |
| `rulerSizes` | `[number, number, number, number]` | `[24, 24, 24, 24]` | Ruler sizes in pixels: [top, right, bottom, left] |
| `frameBackground` | `string` | `"var(--color-bg-sec)"` | Background color/style for the frame area |

## Types

### ViewportMode

```typescript
type ViewportMode = "default" | ["scaled-from", number, number];
```

- `"default"`: Normal responsive layout without scaling
- `["scaled-from", width, height]`: Fixed aspect ratio scaling from base dimensions

### Example Dimensions

Common viewport dimensions:
- Desktop: `["scaled-from", 1920, 1080]`
- Tablet: `["scaled-from", 1024, 768]`
- Custom: `["scaled-from", 1440, 900]`

## Implementation Details

### Scaling Algorithm

The component calculates the scale factor based on the smaller ratio of available width/height to base width/height, ensuring the content fits entirely within the viewport while maintaining its aspect ratio.

### Container Queries

The scaled content uses `container-type: size` to enable container queries, allowing nested elements to respond to the container's size instead of the viewport size.

### CSS Custom Properties

The component sets CSS custom properties on the content element:
- `--base-width`: Base width in pixels
- `--base-height`: Base height in pixels

These can be used by child components if needed.

## Best Practices

1. **Choose appropriate base dimensions**: Select dimensions that match your design mockups or target display size
2. **Use frame mode for demos**: Enable frame mode when showcasing designs or creating presentation views
3. **Test at different sizes**: Verify that your content scales well at both large and small viewport sizes
4. **Consider performance**: The component uses transform-based scaling which is GPU-accelerated

## See Also

- [Layout Components](../README.md)
- [Viewport Scaling Hook](./useViewportScaling.ts)
- [Styled Calculation Utility](./calculateScaledStyle.ts)


