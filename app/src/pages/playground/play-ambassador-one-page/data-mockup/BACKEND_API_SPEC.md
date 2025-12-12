# Ambassador One Page - 后端 API 数据结构规范

## 概述

本文档详细说明了 Ambassador One Page 所需的数据结构和 API 接口规范。

### 重要提醒 ⚠️

1. **数据分块传输**: 数据应该按照三个主要模块分别传输，而不是一次性传输所有数据
2. **页面刷新机制**: 导航栏的两个筛选器（地理位置和年份）在用户操作后会**触发页面刷新并重新获取数据**

---

## 一、筛选参数

### 导航栏筛选器

用户可以通过导航栏的两个筛选器来选择数据范围，**每次更改都会重新请求数据**。

| 参数名 | 类型 | 说明 | 示例值 |
|--------|------|------|--------|
| `year` | string | 年份范围标识 | `"2025-2026"` |
| `region` | string | 地理区域 | `"central"`, `"north"`, `"all"` |

### API 请求示例

```typescript
GET /api/ambassador-data?year=2025-2026&region=central
```

---

## 二、数据结构总览

所有数据被分为 **三个独立的模块**，建议分别传输：

1. **Roster Overview**
2. **Engagement Overview**
3. **Pipeline Overview**

### 顶层数据结构

```typescript
{
  "roster-overview": { /* 模块 1 */ },
  "engagement-overview": { /* 模块 2 */ },
  "pipeline-overview": { /* 模块 3 */ }
}
```

---

## 三、模块 1: Roster Overview (花名册概览)

### 3.1 数据表结构

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `timeInterval` | `[string, string]` | ✅ | 时间范围，格式: `["YYYY-M-D", "YYYY-M-D"]` |
| `widgets` | `Widget[]` | ✅ | 包含 5 个 widget 的数组 |

### 3.2 Widget 列表

#### Widget 1: Ambassador Total (大使总数)

**数据表:**

| 字段 | 类型 | 示例值 | 说明 |
|------|------|--------|------|
| `title` | string | `"Ambassador Total"` | Widget 标题 |
| `icon` | string | `"accessibility_new"` | Material Icon 名称 |
| `data.value` | number | `165` | 大使总数 |
| `data.unit` | string | `"pax"` | 单位 |

**JSON 示例:**
```json
{
  "title": "Ambassador Total",
  "icon": "accessibility_new",
  "data": {
    "value": 165,
    "unit": "pax"
  }
}
```

---

#### Widget 2-4: 三个饼图 (By Athletic Discipline, Geographic Breakdown, By Tenure)

**数据表结构 (通用):**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | Widget 标题 |
| `icon` | string | ✅ | `"pie_chart"` |
| `data` | `PieItem[]` | ✅ | 饼图数据数组 |

**PieItem 数据表:**

| 字段 | 类型 | 示例值 | 说明 |
|------|------|--------|------|
| `id` | string | `"1"` | 唯一标识 |
| `name` | string | `"Train"` | 分类名称 |
| `icon` | string | `"fitness_center"` | Material Icon |
| `count` | number | `78` | 数量 |
| `unit` | string | `"pax"` | 单位 |
| `color` | string | `"#FF5252"` | 颜色值 (Hex) |

**Widget 2: By Athletic Discipline - 数据二维表**

| id  | name   | icon             | count | unit | color   |
| --- | ------ | ---------------- | ----- | ---- | ------- |
| 1   | Train  | fitness_center   | 78    | pax  | #FF5252 |
| 2   | Tennis | sports_tennis    | 2     | pax  | #FF8A80 |
| 3   | Yoga   | self_improvement | 61    | pax  | #FFCDD2 |
| 4   | Golf   | golf_course      | 0     | pax  | #90CAF9 |
| 5   | Run    | directions_run   | 21    | pax  | #EF9A9A |
| 6   | Other  | search           | 3     | pax  | #E0E0E0 |

**Widget 3: Geographic Breakdown - 数据二维表**

| id | name | icon | count | unit | color |
|----|------|------|-------|------|-------|
| 1 | East | place | 92 | pax | #FF5252 |
| 2 | Central | place | 48 | pax | #FF8A80 |
| 3 | North East | place | 25 | pax | #FFCDD2 |

**Widget 4: By Tenure - 数据二维表**

| id | name | icon | count | unit | color |
|----|------|------|-------|------|-------|
| 1 | New | fiber_new | 87 | pax | #FF5252 |
| 2 | Renew | autorenew | 78 | pax | #FF8A80 |

---

#### Widget 5: Sports Activities Distribution (地图)

**数据表结构:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | `"Sports Activities Distribution"` |
| `icon` | string | ✅ | `"map"` |
| `data.categories` | `Category[]` | ✅ | 地图分类数组 (9个) |
| `data.center` | `[number, number]` | ✅ | 地图中心坐标 `[纬度, 经度]` |
| `data.zoom` | number | ✅ | 地图缩放级别 |
| `data.designProperties.radiusFactor` | number | ✅ | 半径系数 |

**Category 数据表:**

| 字段 | 类型 | 示例值 | 说明 |
|------|------|--------|------|
| `icon` | string | `"Σ"` | 图标 (emoji 或 符号) |
| `term` | string | `"Sum"` | 分类名称 |
| `locations` | `Location[]` | ... | 位置数据数组 (11个城市) |

**Location 数据表:**

| 字段 | 类型 | 示例值 | 说明 |
|------|------|--------|------|
| `name` | string | `"Shanghai"` | 城市名称 |
| `coordinates` | `[number, number]` | `[31.2304, 121.4737]` | 坐标 `[纬度, 经度]` |
| `radius` | number | `35` | 圆圈半径值 |

**地图数据二维表示例 (Category: Sum):**

| 区域 | 城市 | 纬度 | 经度 | 半径 |
|------|------|------|------|------|
| East | Shanghai | 31.2304 | 121.4737 | 35 |
| East | Zhejiang | 30.2741 | 120.1551 | 20 |
| East | Jiangsu | 32.0603 | 118.7969 | 18 |
| East | Shenzhen | 22.5431 | 114.0579 | 19 |
| North East | Beijing | 39.9042 | 116.4074 | 15 |
| North East | North China | 36.0671 | 120.3826 | 5 |
| North East | Northeast China | 41.8057 | 123.4328 | 5 |
| Central | Central | 30.5928 | 114.3055 | 16 |
| Central | South China | 23.1291 | 113.2644 | 14 |
| Central | Southwest China | 29.4316 | 106.9123 | 10 |
| Central | Northwest China | 30.5728 | 104.0668 | 8 |

**注意事项:**
- 共有 **9 个 Category**: Sum, Run, Train, Yoga, Tennis, Golf, Other, Female, Male
- 每个 Category 包含 **11 个城市**
- 城市顺序必须是: **East (4个) → North East (3个) → Central (4个)**

---

## 四、模块 2: Engagement Overview (参与度概览)

### 4.1 数据表结构

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `timeInterval` | `[string, string]` | ✅ | 时间范围 |
| `widgets` | `Widget[]` | ✅ | 包含 3 个 widget 的数组 |

### 4.2 Widget 列表

#### Widget 1: Resource Planning (资源规划趋势图)

**数据表结构:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | `"Resource Planning"` |
| `icon` | string | ✅ | `"bar_chart"` |
| `data.chartData` | `DataPoint[]` | ✅ | 12个月的数据点 |
| `data.series` | `SeriesConfig[]` | ✅ | 系列配置 (2个) |

**DataPoint 数据二维表:**

| month | used | planned |
|-------|------|---------|
| APR | 32 | 0 |
| MAY | 21 | 0 |
| JUN | 33 | 0 |
| JUL | 46 | 0 |
| AUG | 55 | 0 |
| SEP | 18 | 0 |
| OCT | 44 | 0 |
| NOV | 15 | 0 |
| DEC | 0 | 6 |
| JAN | 0 | 0 |
| FEB | 0 | 0 |
| MAR | 0 | 0 |

**SeriesConfig 数据表:**

| key | title | icon | displayAs | color | unit | selectable |
|-----|-------|------|-----------|-------|------|------------|
| used | Used | crop_square | column | #ef4444 | hrs | true |
| planned | Planned | crop_square | column | #e5e7eb | hrs | false |

---

#### Widget 2: Total Service Days Used & % of Ambassadors Engaged

**数据结构说明:**

这个 Widget 包含 **12 个月** 的数据，每个月有两个指标：
1. `serviceDays` (服务天数使用情况)
2. `ambassadorsEngaged` (参与的大使比例)

**月度数据表结构:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `month` | string | ✅ | 月份标识 (APR-MAR) |
| `serviceDays` | `MetricData` | ✅ | 服务天数指标 |
| `ambassadorsEngaged` | `MetricData` | ✅ | 大使参与指标 |

**MetricData 数据表:**

| 字段 | 类型 | 示例值 | 说明 |
|------|------|--------|------|
| `percentage` | number | `44` | 百分比 (0-100) |
| `current` | number | `288` | 当前值 |
| `total` | number | `660` | 总计值 |
| `unit` | string | `"days"` | 单位 |
| `trendData` | `TrendItem[]` | ... | 趋势细分数据 (2项) |
| `description` | string | ... | 描述文本 |

**TrendItem 数据表:**

| label | color | value | total | unit |
|-------|-------|-------|-------|------|
| SSC Requests | #ef4444 | 110 | 660 | days |
| Store Communities | #ef4444 | 178 | 660 | days |

**示例: APR 月数据二维表**

**ServiceDays 表:**

| 指标 | 值 |
|------|-----|
| percentage | 44 |
| current | 288 |
| total | 660 |
| unit | days |
| description | A measure showing... |

**ServiceDays TrendData 子表:**

| label | color | value | total | unit |
|-------|-------|-------|-------|------|
| SSC Requests | #ef4444 | 110 | 660 | days |
| Store Communities | #ef4444 | 178 | 660 | days |

**AmbassadorsEngaged 表:**

| 指标 | 值 |
|------|-----|
| percentage | 68 |
| current | 112 |
| total | 165 |
| unit | pax |
| description | Percentage of ambassadors... |

**AmbassadorsEngaged TrendData 子表:**

| label | color | value | total | unit |
|-------|-------|-------|-------|------|
| SSC Engaged | #ef4444 | 74 | 165 | pax |
| Store Communities Engaged | #ef4444 | 79 | 165 | pax |

**重要提示:**
- 必须提供 **全部 12 个月** 的数据 (APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC, JAN, FEB, MAR)
- 每个月的数据结构完全相同

---

#### Widget 3: Engagement by Athletic Discipline (运动分类参与度)

**数据结构说明:**

包含 **6 个运动项目** 的 KPI Ring Chart 数据。

**项目列表:**
1. Yoga (瑜伽)
2. Train (训练)
3. Run (跑步)
4. Tennis (网球)
5. Golf (高尔夫)
6. Other (其他)

**KpiData 数据表:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 运动项目名称 |
| `icon` | string | ✅ | Material Icon 名称 |
| `metrics` | `Metric[]` | ✅ | 指标数组 (2项) |

**Metric 数据表:**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 指标 ID |
| `label` | string | 指标标签 |
| `percentage` | number | **百分比 (0-100)** ⚠️ 必须计算 |
| `current` | number | 当前值 |
| `total` | number | 总计值 |
| `unit` | string | 单位 |
| `color` | string | 颜色 (Hex) |

**示例: Yoga 数据二维表**

| 指标 | id | label | percentage | current | total | unit | color |
|------|-----|-------|------------|---------|-------|------|-------|
| 1 | service-days | Service Days Used | 41 | 101 | 244 | days | #FF5252 |
| 2 | ambassadors | Ambassadors Engaged | 75 | 46 | 61 | pax | #F48FB1 |

**完整数据汇总表:**

| 运动 | icon | Service Days % | Service Days (current/total) | Ambassadors % | Ambassadors (current/total) |
|------|------|----------------|------------------------------|---------------|------------------------------|
| Yoga | self_improvement | 41% | 101/244 | 75% | 46/61 |
| Train | fitness_center | 35% | 131/372 | 74% | 58/78 |
| Run | directions_run | 52% | 44/84 | 76% | 16/21 |
| Tennis | sports_tennis | 50% | 4/8 | 100% | 2/2 |
| Golf | golf_course | 0% | 0/0 | 0% | 0/0 |
| Other | search | 8% | 1/12 | 33% | 1/3 |

**⚠️ 特别注意: 0/0 处理**

Golf 项目存在 `0/0` 的情况（分母为 0），此时：
- `percentage` 应该返回 `0`
- 前端会处理为显示 "—" 而不是百分比

---

## 五、模块 3: Pipeline Overview (人才储备概览)

### 5.1 数据表结构

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `timeInterval` | `[string, string]` | ✅ | 时间范围 |
| `widgets` | `Widget[]` | ✅ | 包含 7 个 widget 的数组 |

### 5.2 Widget 列表

**Widget 列表:**
1. Summary (汇总)
2. Yoga
3. Swimming
4. Running
5. Cycling
6. Hiking
7. Gym Training

**所有 Widget 共用相同的数据结构。**

**ActivityProgressCardData 数据表:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | Widget 标题 |
| `icon` | string | ✅ | Material Icon 名称 |
| `data.items` | `ProgressItem[]` | ✅ | 进度项数组 (4项) |

**ProgressItem 数据表:**

| 字段 | 类型 | 说明 |
|------|------|------|
| `label` | string | 阶段名称 |
| `totalValue` | number | 总值 (segments 的总和) |
| `maxValue` | number | 最大值 (用于计算进度条长度) |
| `segments` | `Segment[]` | 分段数据 |

**Segment 数据表:**

| 字段 | 类型 | 示例值 | 说明 |
|------|------|--------|------|
| `value` | number | `164` | 分段值 |
| `color` | string | `"rgba(255, 70, 70, 1)"` | 颜色 (RGBA) |

**示例: Yoga Widget 数据二维表**

| label | totalValue | maxValue | segments |
|-------|------------|----------|----------|
| R&D | 164 | 300 | [{ value: 164, color: "rgba(255, 70, 70, 1)" }] |
| Referred | 72 | 300 | [{ value: 50, color: "rgba(255, 70, 70, 1)" }, { value: 22, color: "rgba(255, 70, 70, 0.5)" }] |
| Connecting | 32 | 300 | [{ value: 32, color: "rgba(255, 70, 70, 1)" }] |
| Pipeline | 12 | 300 | [{ value: 12, color: "rgba(255, 70, 70, 1)" }] |

**颜色规则:**

| Segment Index | 颜色 |
|---------------|------|
| 0 | rgba(255, 70, 70, 1) |
| 1 | rgba(255, 70, 70, 0.5) |
| 2 | rgba(255, 70, 70, 0.25) |
| 3+ | rgba(255, 70, 70, 0.1) |

**Summary Widget 计算规则:**

Summary 是所有其他 6 个活动的汇总，计算方式：
- 对于每个 label (R&D, Referred, Connecting, Pipeline)
- 将所有活动中相同 label 的 `totalValue` 相加
- segments 也需要按 index 位置相加

---

## 六、API 接口设计建议

### 6.1 分块传输方案

**方案 A: 三个独立接口**

```typescript
GET /api/ambassador/roster-overview?year=2025-2026&region=central
GET /api/ambassador/engagement-overview?year=2025-2026&region=central
GET /api/ambassador/pipeline-overview?year=2025-2026&region=central
```

**方案 B: 单一接口，分块返回**

```typescript
GET /api/ambassador-data?year=2025-2026&region=central&module=roster-overview
GET /api/ambassador-data?year=2025-2026&region=central&module=engagement-overview
GET /api/ambassador-data?year=2025-2026&region=central&module=pipeline-overview
```

**推荐: 方案 A**，语义更清晰。

---

### 6.2 响应格式

**成功响应:**

```json
{
  "success": true,
  "data": {
    "timeInterval": ["2025-4-1", "2026-3-31"],
    "widgets": [ /* widget 数组 */ ]
  },
  "timestamp": "2025-12-12T10:00:00Z"
}
```

**错误响应:**

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid year parameter"
  },
  "timestamp": "2025-12-12T10:00:00Z"
}
```

---

## 七、数据验证清单

### 前端会进行以下验证，请确保：

- [ ] 所有必填字段都存在
- [ ] 数字类型字段不能为负数
- [ ] 颜色值使用 Hex 格式 (`#RRGGBB`) 或 RGBA 格式
- [ ] 坐标格式正确 `[纬度, 经度]`
- [ ] 时间范围格式正确 `["YYYY-M-D", "YYYY-M-D"]`
- [ ] 百分比在 0-100 之间
- [ ] Material Icon 名称有效
- [ ] 月份标识符正确 (APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC, JAN, FEB, MAR)

---

## 八、常见问题

### Q1: 百分比需要后端计算吗？

**A:** 是的。以下位置需要后端计算百分比：
- Engagement Overview 的月度数据中的 `percentage` 字段
- Engagement by Athletic Discipline 的 KPI 数据中的 `percentage` 字段

计算公式: `percentage = Math.round((current / total) * 100)`

### Q2: 0/0 的情况如何处理？

**A:** 当 `total === 0` 时，返回 `percentage: 0`。前端会处理显示为 "—"。

### Q3: 地图数据的城市数量和顺序重要吗？

**A:** 是的。必须：
- 包含 **11 个城市**
- 顺序为: East (4个) → North East (3个) → Central (4个)
- 每个 Category 的城市列表必须一致

### Q4: 数据更新频率是多少？

**A:** 当用户切换年份或地理位置筛选器时，前端会重新请求数据。建议实现缓存机制。

### Q5: Material Icon 名称在哪里查找？

**A:** 参考 Google Material Icons: https://fonts.google.com/icons

