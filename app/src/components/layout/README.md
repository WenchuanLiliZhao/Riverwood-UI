# Layout Component

This folder contains the main layout system for the application. It handles the positioning of the AppBar, NavBar, Sidebars, Content area, and Footer.

## How to Use

Use the `<Layout />` component to wrap your page content.

```tsx
<Layout
  // 1. Define what goes into each slot
  elements={{
    navBar: {
      first: [<Logo />],
      last: [<UserMenu />]
    },
    content: <div>My Page Content</div>,
    footer: <FooterContent />
  }}
  // 2. Control the content width and padding
  contentDesign={{
    widthMode: "large", // "small" | "medium" | "large" | "full"
    enablePadding: true // Set to false to disable default padding
  }}
/>
```

## Important Props

### `contentDesign`
This prop controls the layout behavior of the main content area.

- **`widthMode`**: Determines the maximum width of the content.
  - `small`, `medium`, `large`: Centers the content with a max-width.
  - `full`: Allows the content to stretch to the full width of the container.

- **`enablePadding`**: (Default: `true`)
  - Controls whether the standard responsive padding is applied to the content area.
  - Set this to `false` if you want full control over padding (e.g., for full-width banners or custom layouts).

## Technical Note: Responsiveness
**Important**: The responsive behavior of the Content padding (when `enablePadding` is true) is handled via JavaScript (`ResizeObserver`), NOT CSS `@media` queries.

- **Why?** This allows the padding to respond to the *container's* width, not just the window's width. This is crucial when sidebars are present, as they reduce the available space for content.
- **Where is it?** Check `_BaseContentContainer.tsx` and the `responsive()` utility function.

## How to Modify

### 1. I want to change the Page Structure (Grid)
- Go to `index.tsx` and `styles.module.scss`.
- This defines where the sidebar sits, how tall the header is, and the overall CSS Grid layout.

### 2. I want to change the Widths or Padding
- Go to `shared.tsx` and `content/_BaseContentContainer.tsx`.
- `shared.tsx`: Defines the configuration (like `getContentPaddingConfig`) and helper functions.
- `content/_BaseContentContainer.tsx`: The logic that applies the padding and max-width classes.

### 3. I want to change a specific part
- **NavBar / AppBar**: Look in the `bars/` folder.
- **Footer / Content**: Look in the `content/` folder.
- **Sidebars**: Look in the `sidebars/` folder.

### Key Concept: Base Components
You will see files starting with `_Base` (like `_BaseBar.tsx` or `_BaseContentContainer.tsx`).
- **What are they?** They act as the "engine" handling shared logic (like responsiveness or structural wrapping) for multiple components.
- **When to edit them?** Only when you want to change the behavior for *all* components that use them (e.g., changing how padding works for both Content and Footer).
- **When to avoid them?** If you only want to change the specific look of one component (e.g., just the Footer's background color), edit that specific component file (e.g., `footer.tsx`) instead.
