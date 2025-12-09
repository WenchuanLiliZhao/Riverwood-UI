# Riverwood UI

A modern React UI component library built with TypeScript and SCSS Modules.

## Installation

```bash
npm install riverwood-ui
```

## Peer Dependencies

Riverwood UI requires React 18+ or React 19+:

```bash
npm install react react-dom
```

## Usage

### Basic Example

```tsx
import { Button } from 'riverwood-ui';
import 'riverwood-ui/styles';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

### Importing Components

```tsx
import { 
  Button, 
  Tooltip, 
  // ... other components
} from 'riverwood-ui';
```

### Importing Styles

You can import the global styles:

```tsx
import 'riverwood-ui/styles';
```

Or import specific style utilities:

```tsx
import { colorVariants } from 'riverwood-ui/styles';
```

## Components

### General Components
- `Button` - Button component with variants and sizes
- `ButtonGroup` - Group of buttons
- `Tooltip` - Tooltip component
- `Avatar` - Avatar component
- `Hr` - Horizontal rule component

### Layout Components
- `AppBar` - Application bar
- `NavBar` - Navigation bar
- `Content` - Content container
- `Footer` - Footer component
- `LeftSidebar` - Left sidebar
- `RightSidebar` - Right sidebar

### Widgets
- `ChinaHeatMap` - China heat map visualization
- `KpiRingChart` - KPI ring chart
- `PieChart` - Pie chart component
- `ProgressBar` - Progress bar component
- `TrendChart` - Trend chart component
- `WidgetFrame` - Widget frame container

### Sections
- `BentoGrid` - Bento grid layout
- `DocSection` - Documentation section

### Utilities
- `Responsive` - Responsive wrapper component
- `useResponsive` - Responsive hook
- `useDisableBodyScroll` - Hook to disable body scroll

## Features

- 🎨 **SCSS Modules** - Scoped styling with CSS Modules
- 📦 **TypeScript** - Full TypeScript support
- 🎯 **CVA Integration** - Type-safe variant management with class-variance-authority
- 🔧 **Polymorphic Components** - Flexible component composition with `asChild` pattern
- 📱 **Responsive** - Built-in responsive utilities
- ♿ **Accessible** - Built with accessibility in mind

## Architecture

Riverwood UI follows a **Core Component Pattern**:

- **Base Components** (`_Base*.tsx`) - Core implementation with shared logic
- **Public Components** - Semantic wrappers around base components
- **SCSS Modules** - Component-scoped styles
- **Style Variants** - Type-safe variant management with CVA

## License

MIT
