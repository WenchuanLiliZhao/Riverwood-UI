# China Heat Map - Region Zoom Control Guide

This guide demonstrates how to implement custom region zoom controls for the `ChinaHeatMap` component.

## Table of Contents

- [Overview](#overview)
- [Basic Concepts](#basic-concepts)
- [Implementation Methods](#implementation-methods)
  - [1. Button Controls (Current Implementation)](#1-button-controls-current-implementation)
  - [2. Dropdown Selector](#2-dropdown-selector)
  - [3. Radio Group](#3-radio-group)
  - [4. Tabs](#4-tabs)
  - [5. Search/Autocomplete](#5-searchautocomplete)
- [Custom Region Definitions](#custom-region-definitions)
- [Advanced Usage](#advanced-usage)

---

## Overview

The `ChinaHeatMap` component is a **controlled component** that accepts `center` and `zoom` props. This means the parent component has full control over the map view, allowing you to implement any UI pattern for region selection.

## Basic Concepts

### Component Props

```typescript
<ChinaHeatMap
  center={[latitude, longitude]}  // Map center coordinates
  zoom={zoomLevel}                 // Zoom level (4-10)
  onViewChange={(center, zoom) => {}} // Callback when view changes
/>
```

### Region Definition

A region is simply an object with three properties:

```typescript
type MapRegion = {
  name: string;              // Display name
  center: [number, number];  // [latitude, longitude]
  zoom: number;              // Zoom level (4-10)
};
```

---

## Implementation Methods

### 1. Button Controls (Current Implementation)

**Best for:** 5-10 predefined regions

```tsx
import * as React from "react";
import { ChinaHeatMap } from "@/components/widgets/widet-components";

const REGIONS = {
  all: { name: "All China", center: [37.8, 111.1], zoom: 4.1 },
  east: { name: "East", center: [31.5, 120.5], zoom: 6.5 },
  central: { name: "Central", center: [30.5, 111.5], zoom: 6 },
};

export const MapWithButtons: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = React.useState("all");
  const [mapCenter, setMapCenter] = React.useState(REGIONS.all.center);
  const [mapZoom, setMapZoom] = React.useState(REGIONS.all.zoom);

  const handleRegionChange = (regionKey: string) => {
    const region = REGIONS[regionKey];
    setSelectedRegion(regionKey);
    setMapCenter(region.center);
    setMapZoom(region.zoom);
  };

  return (
    <div>
      {/* Button Controls */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {Object.entries(REGIONS).map(([key, region]) => (
          <button
            key={key}
            onClick={() => handleRegionChange(key)}
            style={{
              padding: "10px 20px",
              background: selectedRegion === key ? "#ff4646" : "#f5f5f5",
              color: selectedRegion === key ? "white" : "#666",
              border: "2px solid",
              borderColor: selectedRegion === key ? "#ff4646" : "#e0e0e0",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {region.name}
          </button>
        ))}
      </div>

      {/* Map */}
      <ChinaHeatMap
        categories={categoryData}
        center={mapCenter}
        zoom={mapZoom}
        onViewChange={(center, zoom) => {
          console.log("View changed:", { center, zoom });
        }}
      />
    </div>
  );
};
```

**Pros:**
- ✅ Visual and intuitive
- ✅ Good for small number of regions
- ✅ Easy to scan all options

**Cons:**
- ❌ Takes up space with many regions
- ❌ Not ideal for 10+ regions

---

### 2. Dropdown Selector

**Best for:** 10+ regions, space-constrained layouts

```tsx
import * as React from "react";
import { ChinaHeatMap } from "@/components/widgets/widet-components";

const REGIONS = {
  all: { name: "All China", center: [37.8, 111.1], zoom: 4.1 },
  east: { name: "East", center: [31.5, 120.5], zoom: 6.5 },
  central: { name: "Central", center: [30.5, 111.5], zoom: 6 },
  northEast: { name: "North East", center: [43, 125], zoom: 6 },
  south: { name: "South", center: [23.5, 113.5], zoom: 6.5 },
  north: { name: "North", center: [40, 116], zoom: 6 },
  northwest: { name: "Northwest", center: [36.5, 103], zoom: 5.5 },
  southwest: { name: "Southwest", center: [28.5, 103.5], zoom: 5.5 },
  // ... many more regions
};

export const MapWithDropdown: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = React.useState("all");
  const [mapCenter, setMapCenter] = React.useState(REGIONS.all.center);
  const [mapZoom, setMapZoom] = React.useState(REGIONS.all.zoom);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionKey = e.target.value;
    const region = REGIONS[regionKey];
    setSelectedRegion(regionKey);
    setMapCenter(region.center);
    setMapZoom(region.zoom);
  };

  return (
    <div>
      {/* Dropdown Control */}
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="region-select"
          style={{ marginRight: "12px", fontWeight: 500 }}
        >
          Select Region:
        </label>
        <select
          id="region-select"
          value={selectedRegion}
          onChange={handleRegionChange}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {Object.entries(REGIONS).map(([key, region]) => (
            <option key={key} value={key}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      {/* Map */}
      <ChinaHeatMap
        categories={categoryData}
        center={mapCenter}
        zoom={mapZoom}
      />
    </div>
  );
};
```

**Pros:**
- ✅ Compact, saves space
- ✅ Scales well with many regions
- ✅ Familiar UI pattern

**Cons:**
- ❌ Requires one more click to see options
- ❌ Less visual than buttons

---

### 3. Radio Group

**Best for:** 3-6 regions, form-like layouts

```tsx
import * as React from "react";
import { ChinaHeatMap } from "@/components/widgets/widet-components";

const REGIONS = {
  all: { name: "All China", center: [37.8, 111.1], zoom: 4.1 },
  east: { name: "Eastern Region", center: [31.5, 120.5], zoom: 6.5 },
  central: { name: "Central Region", center: [30.5, 111.5], zoom: 6 },
};

export const MapWithRadio: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = React.useState("all");
  const [mapCenter, setMapCenter] = React.useState(REGIONS.all.center);
  const [mapZoom, setMapZoom] = React.useState(REGIONS.all.zoom);

  const handleRegionChange = (regionKey: string) => {
    const region = REGIONS[regionKey];
    setSelectedRegion(regionKey);
    setMapCenter(region.center);
    setMapZoom(region.zoom);
  };

  return (
    <div>
      {/* Radio Group */}
      <fieldset
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <legend style={{ fontWeight: 600, padding: "0 8px" }}>
          Map Region
        </legend>
        {Object.entries(REGIONS).map(([key, region]) => (
          <div key={key} style={{ marginBottom: "8px" }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <input
                type="radio"
                name="region"
                value={key}
                checked={selectedRegion === key}
                onChange={() => handleRegionChange(key)}
                style={{ marginRight: "8px" }}
              />
              <span>{region.name}</span>
            </label>
          </div>
        ))}
      </fieldset>

      {/* Map */}
      <ChinaHeatMap
        categories={categoryData}
        center={mapCenter}
        zoom={mapZoom}
      />
    </div>
  );
};
```

**Pros:**
- ✅ Standard form control
- ✅ Clear single selection
- ✅ Accessible

**Cons:**
- ❌ Takes vertical space
- ❌ Less modern looking

---

### 4. Tabs

**Best for:** Distinct regional views with additional content

```tsx
import * as React from "react";
import { ChinaHeatMap } from "@/components/widgets/widet-components";

const REGIONS = {
  all: {
    name: "All China",
    center: [37.8, 111.1],
    zoom: 4.1,
    description: "Overview of entire China",
  },
  east: {
    name: "East",
    center: [31.5, 120.5],
    zoom: 6.5,
    description: "Shanghai, Jiangsu, Zhejiang",
  },
  central: {
    name: "Central",
    center: [30.5, 111.5],
    zoom: 6,
    description: "Hubei, Hunan, Henan",
  },
};

export const MapWithTabs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  const activeRegion = REGIONS[activeTab];

  return (
    <div>
      {/* Tab Controls */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #e0e0e0",
          marginBottom: "20px",
        }}
      >
        {Object.entries(REGIONS).map(([key, region]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: "12px 24px",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === key ? "3px solid #ff4646" : "3px solid transparent",
              color: activeTab === key ? "#ff4646" : "#666",
              fontWeight: activeTab === key ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {region.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ marginBottom: "12px", color: "#666" }}>
        {activeRegion.description}
      </div>

      {/* Map */}
      <ChinaHeatMap
        categories={categoryData}
        center={activeRegion.center}
        zoom={activeRegion.zoom}
      />
    </div>
  );
};
```

**Pros:**
- ✅ Good for content sections
- ✅ Modern UI pattern
- ✅ Can include additional info per region

**Cons:**
- ❌ More complex to style
- ❌ Takes horizontal space

---

### 5. Search/Autocomplete

**Best for:** Many regions (20+), city-level granularity

```tsx
import * as React from "react";
import { ChinaHeatMap } from "@/components/widgets/widet-components";

// Define many cities/regions
const LOCATIONS = {
  beijing: { name: "Beijing", center: [39.9042, 116.4074], zoom: 8 },
  shanghai: { name: "Shanghai", center: [31.2304, 121.4737], zoom: 8 },
  guangzhou: { name: "Guangzhou", center: [23.1291, 113.2644], zoom: 8 },
  shenzhen: { name: "Shenzhen", center: [22.5431, 114.0579], zoom: 8 },
  chengdu: { name: "Chengdu", center: [30.5728, 104.0668], zoom: 8 },
  hangzhou: { name: "Hangzhou", center: [30.2741, 120.1551], zoom: 8 },
  wuhan: { name: "Wuhan", center: [30.5928, 114.3055], zoom: 8 },
  xian: { name: "Xi'an", center: [34.2658, 108.9541], zoom: 8 },
  // ... 50+ more cities
};

export const MapWithSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("beijing");
  const [mapCenter, setMapCenter] = React.useState(LOCATIONS.beijing.center);
  const [mapZoom, setMapZoom] = React.useState(LOCATIONS.beijing.zoom);

  // Filter locations based on search
  const filteredLocations = React.useMemo(() => {
    return Object.entries(LOCATIONS).filter(([_, location]) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleLocationSelect = (locationKey: string) => {
    const location = LOCATIONS[locationKey];
    setSelectedLocation(locationKey);
    setMapCenter(location.center);
    setMapZoom(location.zoom);
    setSearchQuery("");
  };

  return (
    <div>
      {/* Search Box */}
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <input
          type="text"
          placeholder="Search for a city or region..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "14px",
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
          }}
        />

        {/* Dropdown Results */}
        {searchQuery && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              maxHeight: "200px",
              overflowY: "auto",
              background: "white",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              marginTop: "4px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            {filteredLocations.map(([key, location]) => (
              <div
                key={key}
                onClick={() => handleLocationSelect(key)}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f0f0f0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                }}
              >
                {location.name}
              </div>
            ))}
            {filteredLocations.length === 0 && (
              <div style={{ padding: "16px", color: "#999", textAlign: "center" }}>
                No locations found
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "12px", color: "#666" }}>
        Current: <strong>{LOCATIONS[selectedLocation].name}</strong>
      </div>

      {/* Map */}
      <ChinaHeatMap
        categories={categoryData}
        center={mapCenter}
        zoom={mapZoom}
      />
    </div>
  );
};
```

**Pros:**
- ✅ Scales to hundreds of locations
- ✅ Fast to find specific location
- ✅ Great UX for power users

**Cons:**
- ❌ More complex to implement
- ❌ Requires typing

---

## Custom Region Definitions

### Basic Region Structure

```typescript
type MapRegion = {
  name: string;              // Display name
  center: [number, number];  // [latitude, longitude]
  zoom: number;              // Zoom level
};
```

### Example: Province-Level Regions

```typescript
const PROVINCE_REGIONS = {
  guangdong: {
    name: "Guangdong Province",
    center: [23.3, 113.3],
    zoom: 7,
  },
  sichuan: {
    name: "Sichuan Province",
    center: [30.6, 102.7],
    zoom: 6.5,
  },
  xinjiang: {
    name: "Xinjiang",
    center: [43.8, 87.6],
    zoom: 5,
  },
};
```

### Example: City-Level Regions

```typescript
const CITY_REGIONS = {
  beijing: {
    name: "Beijing",
    center: [39.9042, 116.4074],
    zoom: 8,
  },
  shanghai: {
    name: "Shanghai",
    center: [31.2304, 121.4737],
    zoom: 8,
  },
  // Tier 2 cities with different zoom
  chengdu: {
    name: "Chengdu",
    center: [30.5728, 104.0668],
    zoom: 9,
  },
};
```

### Example: Economic Zones

```typescript
const ECONOMIC_ZONES = {
  yangtzeRiverDelta: {
    name: "Yangtze River Delta",
    center: [31.5, 120.5],
    zoom: 6.5,
  },
  pearlRiverDelta: {
    name: "Pearl River Delta",
    center: [23.1, 113.3],
    zoom: 7,
  },
  jingJinJi: {
    name: "Jing-Jin-Ji (Beijing-Tianjin-Hebei)",
    center: [39.5, 116.5],
    zoom: 6.5,
  },
};
```

### Finding Coordinates

**Method 1: Google Maps**
1. Go to [Google Maps](https://maps.google.com)
2. Right-click on a location
3. Click the coordinates to copy them
4. Format: `[latitude, longitude]`

**Method 2: OpenStreetMap**
1. Go to [OpenStreetMap](https://www.openstreetmap.org)
2. Search for a location
3. Click "Share" → coordinates shown in URL

**Method 3: Use a coordinates finder**
```typescript
// Helper to log coordinates when clicking the map
<ChinaHeatMap
  onViewChange={(center, zoom) => {
    console.log(`Region: { center: [${center[0]}, ${center[1]}], zoom: ${zoom} }`);
  }}
/>
```

---

## Advanced Usage

### 1. Combining Multiple Controls

```tsx
export const AdvancedMapControl: React.FC = () => {
  const [region, setRegion] = React.useState("all");
  const [center, setCenter] = React.useState([37.8, 111.1]);
  const [zoom, setZoom] = React.useState(4.1);

  return (
    <div>
      {/* Quick Access Buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button onClick={() => handleRegionChange("all")}>全国</button>
        <button onClick={() => handleRegionChange("east")}>东部</button>
        <button onClick={() => handleRegionChange("central")}>中部</button>
      </div>

      {/* Detailed Dropdown */}
      <select onChange={handleDetailedRegionChange}>
        <optgroup label="Major Regions">
          <option value="all">All China</option>
          <option value="east">East</option>
        </optgroup>
        <optgroup label="Provinces">
          <option value="guangdong">Guangdong</option>
          <option value="sichuan">Sichuan</option>
        </optgroup>
        <optgroup label="Cities">
          <option value="beijing">Beijing</option>
          <option value="shanghai">Shanghai</option>
        </optgroup>
      </select>

      <ChinaHeatMap center={center} zoom={zoom} />
    </div>
  );
};
```

### 2. URL-Based Region Selection

```tsx
export const MapWithURLControl: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const regionKey = searchParams.get("region") || "all";
  const region = REGIONS[regionKey];

  const handleRegionChange = (key: string) => {
    setSearchParams({ region: key });
  };

  return (
    <ChinaHeatMap
      center={region.center}
      zoom={region.zoom}
    />
  );
};

// URL: /map?region=east
```

### 3. Animated Transitions with Custom Easing

```tsx
// The component already uses smooth animations (0.5s duration)
// But you can add custom effects:

const handleRegionChange = (key: string) => {
  // Zoom out first, then in (for dramatic effect)
  setZoom(3);
  setTimeout(() => {
    setCenter(REGIONS[key].center);
    setZoom(REGIONS[key].zoom);
  }, 250);
};
```

### 4. Keyboard Shortcuts

```tsx
React.useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    const regionKeys = Object.keys(REGIONS);
    const index = parseInt(e.key) - 1;
    
    if (index >= 0 && index < regionKeys.length) {
      handleRegionChange(regionKeys[index]);
    }
  };

  window.addEventListener("keypress", handleKeyPress);
  return () => window.removeEventListener("keypress", handleKeyPress);
}, []);
```

---

## Best Practices

### 1. **Choose the Right Control**
- **1-5 regions**: Buttons or Tabs
- **6-15 regions**: Dropdown or Radio
- **16+ regions**: Search/Autocomplete

### 2. **Provide Visual Feedback**
- Always highlight the selected region
- Show loading state during transitions
- Display current region name

### 3. **Performance**
- Use `React.useMemo` for filtered lists
- Debounce search inputs
- Limit region definitions to what's needed

### 4. **Accessibility**
- Use semantic HTML (`<label>`, `<select>`, etc.)
- Add ARIA labels
- Support keyboard navigation

### 5. **Mobile Considerations**
- Dropdown works better than buttons on mobile
- Ensure touch targets are 44x44px minimum
- Consider swipe gestures for region switching

---

## Summary

The `ChinaHeatMap` component gives you full control over map navigation through its `center` and `zoom` props. You can implement any UI pattern that fits your needs:

- **Buttons** for quick, visual access
- **Dropdown** for space efficiency
- **Search** for large datasets
- **Tabs** for content organization
- **Custom combinations** for complex requirements

The key is managing three pieces of state:
1. Selected region identifier
2. Map center coordinates
3. Zoom level

Everything else is just UI! 🎉

