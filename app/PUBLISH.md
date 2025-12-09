# Publishing Guide

## Prerequisites

1. Make sure you have an npm account
2. Login to npm: `npm login`

## Build the Library

Before publishing, build the library:

```bash
npm run build:lib
```

This will:
- Generate TypeScript type definitions in `dist/`
- Build the library bundle (ES and UMD formats) in `dist/`

## Verify the Build

Check that the `dist` folder contains:
- `riverwood-ui.js` (ES module)
- `riverwood-ui.umd.js` (UMD module)
- `index.d.ts` (TypeScript definitions)
- Other necessary files

## Publishing

### First Time Publishing

```bash
npm publish --access public
```

### Updating Version

1. Update version in `package.json`:
   ```bash
   npm version patch  # for 1.0.0 -> 1.0.1
   npm version minor  # for 1.0.0 -> 1.1.0
   npm version major  # for 1.0.0 -> 2.0.0
   ```

2. Publish:
   ```bash
   npm publish
   ```

The `prepublishOnly` script will automatically run `build:lib` before publishing.

## Package Information

- **Package Name**: `riverwood-ui`
- **Entry Point**: `src/components/index.ts`
- **Output Formats**: ES Module and UMD
- **Type Definitions**: Included in `dist/index.d.ts`

## After Publishing

Users can install your package:

```bash
npm install riverwood-ui
```

And use it in their projects:

```tsx
import { Button } from 'riverwood-ui';
```
