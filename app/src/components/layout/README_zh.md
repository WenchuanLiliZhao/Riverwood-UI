# Layout 布局组件

这个文件夹包含了应用的主要布局系统。它负责管理顶部导航栏（AppBar/NavBar）、侧边栏、主要内容区域和页脚的位置。

## 如何使用

使用 `<Layout />` 组件来包裹你的页面内容。

```tsx
<Layout
  // 1. 定义每个位置放什么组件
  elements={{
    navBar: {
      first: [<Logo />], // 左侧内容
      last: [<UserMenu />] // 右侧内容
    },
    content: <div>我的页面内容</div>,
    footer: <FooterContent />
  }}
  // 2. 控制内容区域的宽度和内边距
  contentDesign={{
    widthMode: "large", // 可选: "small" | "medium" | "large" | "full"
    enablePadding: true // 默认为 true，设为 false 可移除内边距
  }}
/>
```

## 重要 Props 说明

### `contentDesign`
该属性控制主要内容区域的布局行为。

- **`widthMode`**: 决定内容的最大宽度。
  - `small`, `medium`, `large`: 限制最大宽度并居中显示。
  - `full`: 允许内容撑满容器宽度。

- **`enablePadding`**: (默认为 `true`)
  - 控制是否应用标准的响应式内边距。
  - 如果你需要完全控制内边距（例如实现全宽 Banner 或自定义布局），请将其设为 `false`。

## 技术说明：响应式原理
**注意**：内容区域的响应式内边距（当 `enablePadding` 为 true 时）是通过 JavaScript (`ResizeObserver`) 实现的，而不是 CSS `@media` 查询。

- **为什么？** 这样可以让 padding 根据**容器**的宽度进行调整，而不仅仅是窗口宽度。这在有侧边栏存在时非常重要，因为侧边栏会压缩内容的可用空间。
- **在哪看？** 查看 `_BaseContentContainer.tsx` 以及 `responsive()` 工具函数。

## 如何修改

### 1. 我想修改页面整体结构（网格布局）
- 查看 `index.tsx` 和 `styles.module.scss`。
- 这里定义了侧边栏的位置、头部的高度以及整体的 CSS Grid 布局。

### 2. 我想修改内容宽度或边距规则
- 查看 `shared.tsx` 和 `content/_BaseContentContainer.tsx`。
- `shared.tsx`: 定义了配置（如 `getContentPaddingConfig`）和辅助函数。
- `content/_BaseContentContainer.tsx`: 负责应用边距和最大宽度的底层逻辑代码。

### 3. 我想修改某个具体部分
- **NavBar / AppBar**: 在 `bars/` 文件夹中查找。
- **Footer / Content**: 在 `content/` 文件夹中查找。
- **侧边栏**: 在 `sidebars/` 文件夹中查找。

### 核心概念：基础组件 (Base Components)
你会看到以 `_Base` 开头的文件（如 `_BaseBar.tsx` 或 `_BaseContentContainer.tsx`）。
- **它们是什么？** 它们是“引擎”，负责处理多个组件共用的逻辑（比如响应式处理或结构包裹）。
- **什么时候修改？** 只有当你希望改变**所有**使用该组件的地方的行为时（例如，想同时改变 Content 和 Footer 的 padding 逻辑）。
- **什么时候不修改？** 如果你只想改变某个特定组件的样式（例如，只想改 Footer 的背景色），请直接修改那个具体的文件（如 `footer.tsx`），不要动基础组件。
