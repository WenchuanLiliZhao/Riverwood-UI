# BasicLayout

A flexible layout component with responsive content containers, navigation bars, and sidebars.

## Directory Structure

```
basic-layout/
├── index.tsx                    # Main layout component
├── shared.tsx                   # Shared types and utility functions
├── styles.module.scss           # Global styles (layout, spacing, max-width)
│
└── components/
    ├── bars/                    # Navigation bar components
    │   ├── appBar.tsx
    │   ├── appBar.module.scss
    │   ├── navBar.tsx
    │   └── navBar.module.scss
    │
    ├── sidebars/                # Sidebar components
    │   ├── leftSidebar.tsx
    │   ├── leftSidebar.module.scss
    │   ├── rightSidebar.tsx
    │   └── rightSidebar.module.scss
    │
    └── content/                 # Content area components
        ├── _BaseContentContainer.tsx      # Core component (internal use, _ prefix)
        ├── _BaseContentContainer.module.scss
        ├── content.tsx
        ├── content.module.scss
        ├── footer.tsx
        └── footer.module.scss
```

## Component Organization

### Bars (`components/bars/`)
Navigation-related components:
- **AppBar**: Left-side application bar
- **NavBar**: Top navigation bar

### Sidebars (`components/sidebars/`)
Sidebar components:
- **LeftSidebar**: Left sidebar panel
- **RightSidebar**: Right sidebar panel

### Content (`components/content/`)
Content area components:
- **_BaseContentContainer**: Core component providing responsive padding and max-width logic (internal use, `_` prefix indicates private)
- **Content**: Main content container (uses _BaseContentContainer)
- **Footer**: Footer component (uses _BaseContentContainer)

## Core Component Pattern

`_BaseContentContainer` (note the `_` prefix indicating internal use) follows the **Core Component Pattern** to eliminate code duplication:
- Shared logic for responsive padding
- Shared max-width handling
- Polymorphic `as` prop for different HTML elements
- Used by both `Content` and `Footer` components

## Usage

```tsx
import { BasicLayout } from '@/components/layouts/basic-layout';

<BasicLayout
  elements={{
    content: <YourContent />,
    appBar: { first: [...], center: [...], last: [...] },
    navBar: { first: [...], center: [...], last: [...] },
    footer: <YourFooter />,
    leftSidebar: <YourSidebar />,
    rightSidebar: <YourSidebar />,
  }}
  contentDesign={{ widthMode: "medium" }}
/>
```

