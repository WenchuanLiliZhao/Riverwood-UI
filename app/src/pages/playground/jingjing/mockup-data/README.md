# Mockup 数据使用说明

本文档用于说明 `mockup-data` 目录中的数据结构及其在界面上的使用方式，供后端工程师参考。

## 目录结构

```
mockup-data/
├── hourlyRetailPulse.ts      # 每小时零售脉搏数据（表格视图和图表视图）
├── netSalesOutlook.ts        # 净销售额展望数据
├── outlookCard.ts            # 展望卡片数据（差异和百分比）
├── kpiMetric.ts             # KPI 指标数据
├── focusProductCard.ts      # 焦点产品卡片数据
├── heroProductCard.ts       # 主要产品卡片数据
├── allProducts.ts           # 所有产品数据
├── filterOptions.ts         # 筛选选项数据
├── sortOptions.ts           # 排序选项数据
├── color-semantics.ts       # 颜色语义工具函数
└── DATA_PROCESSING_RULES.md # 数据处理规则文档
```

---

## 1. Hourly Retail Pulse

**数据文件**: `hourlyRetailPulse.ts`

**使用位置**: `play-widgets/HourlyRetailPulse/` 组件

### 1.1 表格视图数据

**数据结构**: `HourlyRetailPulseData`

**界面展示**:
- 显示每小时时间段（如 "06:00–08:00"）的销售数据
- 包含字段：净销售额、展望值、完成百分比、交易数、交易目标、客单价(AOV)、件单价(UPT)、转化率(CR)
- 支持用户反馈（点赞/点踩）
- 最后一行显示汇总数据（Summary）

![pic/Pasted image 20251216133459.png](pic/Pasted%20image%2020251216133459.png)

**关键字段说明**:
- `timeSlot`: 时间段字符串，如 "06:00–08:00"
- `netSales`: 净销售额（数值，可能为 null）
- `netSalesOutlook`: 净销售额展望值（数值，可能为 null）
- `percentToOutlook`: 完成百分比（如 95.5 表示 95.5%）
- `txn`: 交易数（数值，可能为 null）
- `txnGoal`: 交易目标（数值，可能为 null）
- `aov`: 客单价（数值，可能为 null）
- `upt`: 件单价（数值，可能为 null）
- `cr`: 转化率（百分比值，如 8.4 表示 8.4%）
- `isSummary`: 是否为汇总行（布尔值）
- `feedback`: 用户反馈类型（"thumbsUp" | "thumbsDown" | null）

### 1.2 图表视图数据

**数据结构**: `hourlyRetailPulseChartData` (Record<ChartMetric, ChartMetricData>)

**界面展示**:
- 支持切换不同的指标进行图表展示
- 指标类型：净销售额(Net Sales)、流量转化率(Traffic-CR)、交易数(TXN)、客单价(AOV)、件单价(UPT)
- 每个数据点包含：当前值、上周同期值、展望值

![pic/Pasted image 20251216133549.png](pic/Pasted%20image%2020251216133549.png)

**关键字段说明**:
- `metric`: 指标类型（"netSales" | "trafficCR" | "txn" | "aov" | "upt"）
- `label`: 指标显示名称
- `unit`: 单位（"¥" | "%" | ""）
- `data`: 数据点数组，每个数据点包含：
  - `label`: 时间段标签（如 "10:00 ~ 12:00"）
  - `current`: 当前值
  - `lastWeek`: 上周同期值
  - `outlook`: 展望值

### 1.3 反馈相关数据

**数据结构**: `FEEDBACK_PRESET_REASONS` 和 `FEEDBACK_THUMBS_DOWN_CATEGORIES`

**界面展示**:
- 用户点击点赞/点踩按钮时，弹出反馈模态框
- 点赞时显示预设原因列表
- 点踩时显示分类的原因列表（流量转化、产品相关、人力相关）

![pic/Pasted image 20251216133758.png](pic/Pasted%20image%2020251216133758.png)

![pic/Pasted image 20251216133820.png](pic/Pasted%20image%2020251216133820.png)

---

## 2. Today's Outlook（今日展望）

**数据文件**: `netSalesOutlook.ts`, `outlookCard.ts`, `kpiMetric.ts`

**使用位置**: `play-widgets/TodaysOutlook.tsx` 组件

### 2.1 净销售额展望

**数据结构**: `NetSalesOutlookData`

**界面展示**:
- 顶部显示当前销售额和目标销售额
- 中间显示分布饼图，展示不同类别的占比（Women、Men、Acc、FTW）
- 底部显示子项列表（XStore 等）

![pic/Pasted image 20251216133859.png](pic/Pasted%20image%2020251216133859.png)

（图中左上角）

**关键字段说明**:
- `currency`: 货币符号（如 "¥"）
- `valueCurrent`: 当前销售额
- `valueTarget`: 目标销售额
- `distributionUnit`: 分布单位（如 "pts"）
- `segments`: 分布段数组，每个段包含：
  - `id`: 类别标识
  - `value`: 占比值
  - `color`: 颜色值（十六进制）
  - `label`: 类别名称
  - `change`: 变化信息（值 + 方向）
- `lowerItems`: 子项列表，每个子项包含：
  - `title`: 标题
  - `valueCurrent`: 当前值
  - `change`: 变化信息

### 2.2 展望卡片

**数据结构**: `OutlookCardData`

**界面展示**:
- 显示两种类型的卡片：
  1. **差异展望** (Var. to Outlook): 显示与展望的绝对差异（正数表示高于展望，负数表示低于展望）
  2. **百分比展望** (% to Outlook): 显示完成展望的百分比（大于 100 表示高于展望，小于 100 表示低于展望）
- 每个卡片包含主值和分解项列表

![Pasted image 20251216133947.png](pic/Pasted%20image%2020251216133947.png)

**关键字段说明**:
- `type`: 卡片类型（"variance" | "percentage"）
- `title`: 卡片标题
- `mainValue`: 主值
- `currency`: 货币符号（仅用于差异类型）
- `breakdownItems`: 分解项数组，每个项包含：
  - `title`: 项标题
  - `value`: 项数值

### 2.3 KPI 指标

**数据结构**: `KPIMetricData` (Record<string, KPIMetricData>)

**界面展示**:
- 显示多个 KPI 指标卡片
- 每个指标显示：标题、当前值、变化值（带方向箭头和单位）

![pic/Pasted image 20251216134025.png](pic/Pasted%20image%2020251216134025.png)

**关键字段说明**:
- `title`: 指标标题（如 "TXN", "AOV", "UPT", "CR", "Traffic" 等）
- `value`: 当前值
- `valueIsPercentage`: 值本身是否为百分比（决定是否显示 % 符号）
- `change`: 变化信息
  - `value`: 变化值
  - `unit`: 变化单位（"percentage" 表示百分比，如 6%；"points" 表示百分点，如 6pts）
  - `direction`: 变化方向（"up" | "down"）

---

## 3. Product Focus（产品焦点）

**数据文件**: `focusProductCard.ts`, `heroProductCard.ts`, `allProducts.ts`, `filterOptions.ts`, `sortOptions.ts`

**使用位置**: `play-widgets/ProductFocus​.tsx` 组件

### 3.1 焦点产品卡片

**数据结构**: `FocusProductCardData` (Record<string, FocusProductCardData>)

**界面展示**:
- 显示产品列表，每个产品卡片包含：
  - 产品图片
  - 产品名称和颜色
  - 库存指标（在手数量、试穿次数、试穿转化率）
  - 表现指标（今日件数、周至今件数、ST 百分比）
  - 尺码库存分布
  - 收藏状态

![pic/Pasted image 20251216134106.png](pic/Pasted%20image%2020251216134106.png)

**关键字段说明**:
- `productImage`: 产品图片 URL
- `productName`: 产品名称
- `colorName`: 颜色名称
- `colorValue`: 颜色值（CSS 颜色值，用于显示颜色点）
- `inventoryMetrics`: 库存指标
  - `onHand`: 在手数量
  - `tryOnCount`: 试穿次数
  - `tryOnCR`: 试穿转化率（百分比值，0-100）
- `performanceMetrics`: 表现指标
  - `todayUnits`: 今日件数（值和区域平均值）
  - `wtdUnits`: 周至今件数（值和区域平均值）
  - `stPercent`: ST 百分比（值和区域平均值，百分比值 0-100）
- `isFavorite`: 是否为收藏
- `sizes`: 尺码库存数组，每个项包含：
  - `size`: 尺码（如 "XS", "S", "M", "XL", "XXL"）
  - `quantity`: 数量

### 3.2 主要产品卡片

**数据结构**: `HeroProductCardData`

**界面展示**:
- 显示主要/推荐产品的卡片
- 包含产品图片、名称、颜色、库存指标、表现指标等

![pic/Pasted image 20251216134129.png](pic/Pasted%20image%2020251216134129.png)

### 3.3 筛选和排序选项

**数据结构**: `FilterOption` 和 `SortOption`

**界面展示**:
- 筛选选项：范围筛选（Scope Filter）和关系筛选（Relationship Filter）
- 排序选项：支持多种排序方式

![Pasted image 20251216134153.png](pic/Pasted%20image%2020251216134153.png)

---

## 4. 颜色语义工具

**数据文件**: `color-semantics.ts`

**使用位置**: 多个组件用于根据数据变化方向显示不同颜色

**功能说明**:
- `COLOR_SEMANTICS`: 颜色语义常量（成功色、警告色、错误色等）
- `getChangeColor()`: 根据变化方向（up/down）返回对应的颜色

**使用场景**:
- KPI 指标的变化箭头颜色
- 数据变化值的文字颜色
- 图表中的趋势线颜色

---

## 5. 数据导出说明

所有数据通过 `index.ts` 文件统一导出，组件通过以下方式导入：

```typescript
import {
  hourlyRetailPulseData,
  hourlyRetailPulseChartData,
  netSalesOutlookData,
  kpiMetricsData,
  focusProductCardsData,
  // ... 其他数据
} from "../mockup-data";
```

---

## 6. 注意事项

1. **货币单位**: 当前支持 CNY（¥）和 USD（$），需要根据用户选择动态切换
2. **时区处理**: 所有时间数据需要考虑时区转换
3. **数据验证**: 后端应验证数据的完整性和合理性（如百分比值应在合理范围内）
4. **错误处理**: 当数据为 null 或缺失时，前端会显示空值，后端应确保关键字段不为空
