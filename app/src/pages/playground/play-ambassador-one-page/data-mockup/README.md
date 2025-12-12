# 关于 Data Mockup

## 整体需求

在这个 dir 中，数据被分成三个大组：

1. Roster Overview
2. Engagement Overview
3. Pipeline Overview

每个大组是一个 Object，例如：

```typescript
export const AmbassadorMockupData = {
  "roseter-overview": {
    // 注意，不需要 title
    timeInterval: ["2025-4-1", "2026-3-31"], // this render Apr 1, 2025 – Mar 31, 2026
    // 注意，不需要 description，这个由前端处理
    widgets: [
      {
        title: "Ambassador Total",
        icon: "some icon...",
        data: <corresponding data>,
      },
      {
        title: "Activity Distribution",
        icon: "some icon...",
        data: <corresponding data>,
      },
      // 剩下的两个以及那个地图
    ]
  }
}
```

## 目标

现在，我们的任务是解除 [_component](../_component.tsx) 与 [data-just-for-1-time-test](../data-just-for-1-time-test/) 直接的链接，而使用当前 dir 中的数据。因此，我们需要创造新的 mockup data 在这个 dir 中。

## 实现状态

✅ **已完成** - 新的 mockup data 已创建在 `ambassador-data.ts` 中。

### 如何使用

```typescript
import { AmbassadorMockupData, formatTimeInterval } from './data-mockup';

// 获取 Roster Overview 数据
const rosterOverview = AmbassadorMockupData["roster-overview"];
const timeLabel = formatTimeInterval(rosterOverview.timeInterval); // "Apr 1, 2025 – Mar 31, 2026"

// 获取 Ambassador Total
const ambassadorTotal = rosterOverview.widgets[0].data;
console.log(ambassadorTotal); // { value: 165, unit: "pax" }

// 获取 By Athletic Discipline
const byAthleticDiscipline = rosterOverview.widgets[1].data;
// 这是一个 ActivityDistributionItem[] 数组

// 获取 Engagement Overview 数据
const engagementOverview = AmbassadorMockupData["engagement-overview"];

// 获取 Engagement by Athletic Discipline（KPI Ring Charts）
const engagementByDiscipline = engagementOverview.widgets[2].data;
// 这是一个 KpiData[] 数组，包含 Yoga, Train, Run, Tennis, Golf, Other

// 获取 Pipeline Overview 数据
const pipelineOverview = AmbassadorMockupData["pipeline-overview"];
```

## 注意事项

### 关于数据拟真

#### Roster overview

Ambassador Total 数据不用发生变化，剩下三个 piechart 的数据分别为

- By Athletic Discipline，其中包括以下 legends：
  - Train
  - Tenis
  - Yoga
  - Golf
  - Run
  - Others
- Geographic Dreakdown，其中包括以下 legend：
  - East
  - Central
  - North East
- By Tenure，其中包括以下 legends：
  - New
  - Renew
- the map, 其中的选择 bottom 只包含：
  - Sum (也就是下面的总和)
  - Run
  - Train
  - Yoga
  - Tenis
  - Golf
  - Other
  - Female
  - Male
  而 table 上有三列
  - East
  - Central
  - North East
  Table 最后保留那个 Total 计算

#### Engagement Overview

- Resource Planning 级其产生交互的两个 widgets 保持当前真实度（数据不用改）；
- Engagement by Athletic Discipline 参见截图数据，并且注意，你需要处理 0/0 这种在数学上为定义的情况（截图中使用“—”来表示）

#### Pipeline Overview

全部保持当前真实度（数据不用改）

### 百分比计算

注意，mockup data 当中不应该出现百分比计算，这部分是前端的工作；

### 色值

所有图形化展示中的颜色均由 mockup data 给出，并且，你需要保证这些颜色会对界面产生影响

### 关于 Widgets 的 input 数据类型

我需要保证 input 数据类型的可读性和统一性。因此，如果你发现某个 widget 的 input 数据类型设计比较混乱，可以修改其 input data 的 interface 或 type

## 数据结构详解

### Roster Overview

包含以下 widgets：

1. **Ambassador Total**: Simple metric with value and unit
2. **By Athletic Discipline**: Pie chart showing distribution by sports (Train, Tennis, Yoga, Golf, Run, Other)
3. **Geographic Breakdown**: Pie chart showing distribution by region (East, Central, North East)
4. **By Tenure**: Pie chart showing distribution by tenure type (New, Renew)
5. **Sports Activities Distribution**: Heat map with multiple categories (Sum, Run, Train, Yoga, Tennis, Golf, Other, Female, Male)

### Engagement Overview

包含以下 widgets：

1. **Resource Planning**: Trend chart showing service days used vs planned by month
2. **Total Service Days Used**: Metrics data broken down by month with trend data
3. **Engagement by Athletic Discipline**: KPI ring charts for each sport showing:
   - Service Days Used (current/total)
   - Ambassadors Engaged (current/total)
   - **Special handling**: Golf has 0/0 for both metrics (frontend should display "—")

### Pipeline Overview

包含以下 widgets：

1. **Summary**: Aggregated progress card
2. **Individual sport cards**: Yoga, Swimming, Running, Cycling, Hiking, Gym Training
   - Each shows R&D, Referred, Connecting, Pipeline progress bars

## 关于 0/0 处理

在 `Engagement by Athletic Discipline` 中，Golf 的数据为：
- Service Days Used: 0/0
- Ambassadors Engaged: 0/0

前端需要处理这种情况，当 `total === 0` 时，显示 "—" 而不是百分比。

示例逻辑：

```typescript
function formatPercentage(current: number, total: number): string {
  if (total === 0) {
    return "—";
  }
  return `${Math.round((current / total) * 100)}%`;
}
```