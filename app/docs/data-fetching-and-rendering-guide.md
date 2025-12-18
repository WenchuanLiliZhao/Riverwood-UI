# Frontend Data Fetching and Rendering Guide

## Overview

This document explains the complete frontend architecture needed to fetch data from the backend and render it to the page when user interactions (like location selection) trigger data updates.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [State Management](#state-management)
3. [Data Request Flow](#data-request-flow)
4. [Data Structure Design](#data-structure-design)
5. [Component Update Mechanism](#component-update-mechanism)
6. [Loading and Error States](#loading-and-error-states)
7. [Complete Implementation Example](#complete-implementation-example)
8. [Best Practices](#best-practices)

---

## Architecture Overview

When user selects a different location, the following flow occurs:

```
User Action (Location Change)
    ↓
Trigger onChange Handler
    ↓
Update State (Loading = true)
    ↓
Send API Request with Parameters
    ↓
Receive Response
    ↓
Update State (Data + Loading = false)
    ↓
React Re-renders Components
    ↓
Display Updated UI
```

---

## State Management

### Required State Variables

You need to manage several pieces of state in your component:

```typescript
// 1. Filter states - what user has selected
const [selectedLocation, setSelectedLocation] = useState<LocationSelection>({});
const [selectedYear, setSelectedYear] = useState<string | undefined>();

// 2. Data states - the actual data to display
const [ambassadorData, setAmbassadorData] = useState<AmbassadorData | null>(null);

// 3. UI states - loading, error handling
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<Error | null>(null);

// 4. Interactive states - for user interactions within data
const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonthLabel());
```

### State Organization Pattern

For larger applications, consider organizing related states together:

```typescript
// Filter State
interface FilterState {
  location: LocationSelection;
  year?: string;
  // Add more filters as needed
}

// Data State
interface DataState {
  rosterOverview: RosterOverviewData | null;
  engagementOverview: EngagementOverviewData | null;
  pipelineOverview: PipelineOverviewData | null;
}

// Request State (for tracking API calls)
interface RequestState {
  isLoading: boolean;
  error: Error | null;
  lastUpdated?: Date;
}
```

---

## Data Request Flow

### Step 1: Define Your API Request Function

Create a centralized API function to fetch data:

```typescript
// api/ambassador.ts

export interface FetchAmbassadorDataParams {
  region?: string;
  area?: string;
  city?: string;
  year?: string;
}

export async function fetchAmbassadorData(
  params: FetchAmbassadorDataParams
): Promise<AmbassadorData> {
  const queryParams = new URLSearchParams();
  
  if (params.region) queryParams.append('region', params.region);
  if (params.area) queryParams.append('area', params.area);
  if (params.city) queryParams.append('city', params.city);
  if (params.year) queryParams.append('year', params.year);

  const response = await fetch(
    `/api/ambassador-data?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}
```

### Step 2: Create Event Handlers

Handle user interactions that trigger data fetching:

```typescript
const handleLocationChange = async (newLocation: LocationSelection) => {
  // 1. Update filter state
  setSelectedLocation(newLocation);
  
  // 2. Fetch new data
  await refetchData(newLocation, selectedYear);
};

const handleYearChange = async (newYear: string) => {
  // 1. Update filter state
  setSelectedYear(newYear);
  
  // 2. Fetch new data
  await refetchData(selectedLocation, newYear);
};
```

### Step 3: Implement Data Fetching Logic

Create a reusable function to fetch and update data:

```typescript
const refetchData = async (
  location: LocationSelection,
  year?: string
) => {
  try {
    // 1. Set loading state
    setIsLoading(true);
    setError(null);

    // 2. Build request parameters
    const params: FetchAmbassadorDataParams = {
      region: location.region,
      area: location.area,
      city: location.city,
      year: year,
    };

    // 3. Fetch data from API
    const newData = await fetchAmbassadorData(params);

    // 4. Update data state
    setAmbassadorData(newData);

  } catch (err) {
    // 5. Handle errors
    setError(err instanceof Error ? err : new Error('Unknown error'));
    console.error('Failed to fetch ambassador data:', err);
  } finally {
    // 6. Clear loading state
    setIsLoading(false);
  }
};
```

---

## Data Structure Design

### Backend Response Format

Your API should return data in a structured format that matches your frontend needs:

```typescript
// Expected API Response Structure
export interface AmbassadorData {
  "roster-overview": {
    timeInterval: [string, string];
    widgets: Array<{
      title: string;
      icon: string;
      data: any; // Specific type depends on widget
    }>;
  };
  "engagement-overview": {
    timeInterval: [string, string];
    widgets: Array<{
      title: string;
      icon: string;
      data: any;
    }>;
  };
  "pipeline-overview": {
    timeInterval: [string, string];
    widgets: Array<{
      title: string;
      icon: string;
      data: any;
    }>;
  };
}
```

### Data Transformation Layer (Optional but Recommended)

Sometimes backend data structure doesn't match frontend needs. Add a transformation layer:

```typescript
// utils/dataTransformers.ts

export function transformAmbassadorData(
  rawData: BackendAmbassadorData
): AmbassadorData {
  return {
    "roster-overview": {
      timeInterval: rawData.roster.time_interval,
      widgets: rawData.roster.widgets.map(widget => ({
        title: widget.title,
        icon: widget.icon,
        data: transformWidgetData(widget),
      })),
    },
    // ... transform other sections
  };
}
```

---

## Component Update Mechanism

### How React Re-renders Work

When state changes, React automatically:
1. **Detects** state update via `setState` functions
2. **Compares** new state with previous state
3. **Re-renders** component with new data
4. **Updates** DOM efficiently (only changed parts)

### Key Points for Your Implementation

#### Current Static Implementation:

```typescript
// ❌ Current: Hard-coded data
const rosterOverview = AmbassadorMockupData["roster-overview"];
const ambassadorTotalWidget = rosterOverview.widgets[0];
```

#### Updated Dynamic Implementation:

```typescript
// ✅ New: Data from state
const rosterOverview = ambassadorData?.["roster-overview"];
const ambassadorTotalWidget = rosterOverview?.widgets[0];

// Add null checks or default values
if (!rosterOverview || !ambassadorTotalWidget) {
  return <LoadingSpinner />;
}
```

### Conditional Rendering Pattern

```typescript
// Handle different data states
if (isLoading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage error={error} onRetry={refetchData} />;
}

if (!ambassadorData) {
  return <EmptyState message="No data available" />;
}

// Render actual content
return <DataDisplay data={ambassadorData} />;
```

---

## Loading and Error States

### Loading State UI

```typescript
// Simple loading spinner
const LoadingOverlay = () => (
  <div className={styles["loading-overlay"]}>
    <Spinner size="large" />
    <p>Loading ambassador data...</p>
  </div>
);

// Or skeleton loading for better UX
const SkeletonLoader = () => (
  <div className={styles["skeleton-container"]}>
    <SkeletonCard count={3} />
    <SkeletonChart />
  </div>
);
```

### Error Handling UI

```typescript
const ErrorDisplay: React.FC<{
  error: Error;
  onRetry: () => void;
}> = ({ error, onRetry }) => (
  <div className={styles["error-container"]}>
    <Icon name="error" size="large" color="error" />
    <h3>Failed to load data</h3>
    <p>{error.message}</p>
    <Button onClick={onRetry} variant="primary">
      Retry
    </Button>
  </div>
);
```

### Progressive Loading Strategy

For large datasets, consider loading data in stages:

```typescript
const [loadingStages, setLoadingStages] = useState({
  roster: false,
  engagement: false,
  pipeline: false,
});

// Fetch data in stages
async function fetchDataProgressively() {
  try {
    setLoadingStages({ roster: true, engagement: false, pipeline: false });
    const roster = await fetchRosterData(params);
    setRosterData(roster);
    
    setLoadingStages({ roster: false, engagement: true, pipeline: false });
    const engagement = await fetchEngagementData(params);
    setEngagementData(engagement);
    
    setLoadingStages({ roster: false, engagement: false, pipeline: true });
    const pipeline = await fetchPipelineData(params);
    setPipelineData(pipeline);
    
    setLoadingStages({ roster: false, engagement: false, pipeline: false });
  } catch (error) {
    // Handle error
  }
}
```

---

## Complete Implementation Example

### Full Component Structure

```typescript
import { useState, useEffect } from "react";
import { LocationSelector, YearSelector } from "./play-components/universal-selectors";
import { fetchAmbassadorData } from "./api/ambassador";
import type { LocationSelection } from "./types/location";
import type { AmbassadorData } from "./types/ambassador";

export const PageContent = () => {
  // ===== STATE MANAGEMENT =====
  
  // Filter states
  const [selectedLocation, setSelectedLocation] = useState<LocationSelection>({});
  const [selectedYear, setSelectedYear] = useState<string>();
  
  // Data state
  const [ambassadorData, setAmbassadorData] = useState<AmbassadorData | null>(null);
  
  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Interactive states
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonthLabel());

  // ===== DATA FETCHING =====
  
  const refetchData = async (
    location: LocationSelection,
    year?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = {
        region: location.region,
        area: location.area,
        city: location.city,
        year: year,
      };

      const newData = await fetchAmbassadorData(params);
      setAmbassadorData(newData);

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  // ===== EVENT HANDLERS =====
  
  const handleLocationChange = async (newLocation: LocationSelection) => {
    setSelectedLocation(newLocation);
    await refetchData(newLocation, selectedYear);
  };

  const handleYearChange = async (newYear: string) => {
    setSelectedYear(newYear);
    await refetchData(selectedLocation, newYear);
  };

  const handleNodeSelect = (label: string, seriesKey: string) => {
    if (seriesKey === 'used') {
      setSelectedMonth(label);
    }
  };

  // ===== INITIAL DATA LOAD =====
  
  useEffect(() => {
    // Load initial data when component mounts
    refetchData(selectedLocation, selectedYear);
  }, []); // Empty dependency array = run once on mount

  // ===== RENDER LOGIC =====
  
  // Loading state
  if (isLoading && !ambassadorData) {
    return (
      <Layout>
        <LoadingOverlay />
      </Layout>
    );
  }

  // Error state
  if (error && !ambassadorData) {
    return (
      <Layout>
        <ErrorDisplay error={error} onRetry={() => refetchData(selectedLocation, selectedYear)} />
      </Layout>
    );
  }

  // No data state
  if (!ambassadorData) {
    return (
      <Layout>
        <EmptyState message="No data available" />
      </Layout>
    );
  }

  // ===== DATA EXTRACTION =====
  
  const rosterOverview = ambassadorData["roster-overview"];
  const engagementOverview = ambassadorData["engagement-overview"];
  const pipelineOverview = ambassadorData["pipeline-overview"];

  // Extract widgets with safe navigation
  const ambassadorTotalWidget = rosterOverview.widgets[0];
  const ambassadorTotalData = ambassadorTotalWidget.data as { value: number; unit: string };
  
  // ... extract other widgets

  // ===== RENDER UI =====
  
  return (
    <Layout
      contentDesign={{ widthMode: "large" }}
      elements={{
        navBar: {
          first: [
            <Avatar src="../../../../public/vite.svg" alt="Avatar" size="medium" />,
            <NavTitle title="Ambassador One Page" />,
          ],
          last: [
            {/* 🔥 KEY CHANGE: Add onChange handlers */}
            <LocationSelector 
              locationData={location} 
              value={selectedLocation}
              onChange={handleLocationChange}
            />,
            <YearSelector 
              yearData={allYears}
              value={selectedYear}
              onChange={handleYearChange}
            />,
          ],
        },
        content: (
          <div className={styles["content-container"]}>
            {/* Show loading overlay when refreshing data */}
            {isLoading && <LoadingOverlay />}
            
            <DocSection
              label={formatTimeInterval(rosterOverview.timeInterval)}
              title="Roster Overview"
              description={<p>...</p>}
            >
              {/* Your existing widgets here */}
              <WidgetFrame nav={{ icon: ambassadorTotalWidget.icon, title: ambassadorTotalWidget.title }}>
                <TextMetric value={ambassadorTotalData.value} unit={ambassadorTotalData.unit} />
              </WidgetFrame>
              
              {/* ... rest of widgets */}
            </DocSection>

            <DocSection
              label={formatTimeInterval(engagementOverview.timeInterval)}
              title="Engagement Overview"
              description={<p>...</p>}
            >
              {/* Engagement widgets */}
            </DocSection>

            <DocSection
              label={formatTimeInterval(pipelineOverview.timeInterval)}
              title="Pipeline Overview"
              description={<p>...</p>}
            >
              {/* Pipeline widgets */}
            </DocSection>
          </div>
        ),
      }}
    />
  );
};
```

---

## Best Practices

### 1. **Debounce Rapid Changes**

If user changes filters quickly, debounce requests to avoid unnecessary API calls:

```typescript
import { useDebounce } from './hooks/useDebounce';

const debouncedLocation = useDebounce(selectedLocation, 500); // 500ms delay

useEffect(() => {
  refetchData(debouncedLocation, selectedYear);
}, [debouncedLocation, selectedYear]);
```

### 2. **Cache Data Locally**

Store fetched data to avoid re-fetching when user goes back to previous filters:

```typescript
const dataCache = useRef<Map<string, AmbassadorData>>(new Map());

const getCacheKey = (location: LocationSelection, year?: string) => {
  return JSON.stringify({ location, year });
};

const refetchData = async (location: LocationSelection, year?: string) => {
  const cacheKey = getCacheKey(location, year);
  
  // Check cache first
  const cachedData = dataCache.current.get(cacheKey);
  if (cachedData) {
    setAmbassadorData(cachedData);
    return;
  }

  // Fetch from API
  try {
    setIsLoading(true);
    const newData = await fetchAmbassadorData({ ...location, year });
    
    // Store in cache
    dataCache.current.set(cacheKey, newData);
    setAmbassadorData(newData);
  } catch (err) {
    setError(err);
  } finally {
    setIsLoading(false);
  }
};
```

### 3. **Optimistic UI Updates**

For better perceived performance, show expected changes immediately:

```typescript
const handleLocationChange = async (newLocation: LocationSelection) => {
  // Update UI immediately
  setSelectedLocation(newLocation);
  
  // Show loading indicator (but keep current data visible)
  setIsLoading(true);
  
  try {
    // Fetch in background
    const newData = await fetchAmbassadorData({ ...newLocation });
    setAmbassadorData(newData);
  } catch (err) {
    // Rollback on error
    setError(err);
    // Optionally: revert to previous location
  } finally {
    setIsLoading(false);
  }
};
```

### 4. **Handle Race Conditions**

Ensure latest request wins if multiple requests are in flight:

```typescript
const requestIdRef = useRef(0);

const refetchData = async (location: LocationSelection, year?: string) => {
  const requestId = ++requestIdRef.current;
  
  try {
    setIsLoading(true);
    const newData = await fetchAmbassadorData({ ...location, year });
    
    // Only update if this is still the latest request
    if (requestId === requestIdRef.current) {
      setAmbassadorData(newData);
    }
  } catch (err) {
    if (requestId === requestIdRef.current) {
      setError(err);
    }
  } finally {
    if (requestId === requestIdRef.current) {
      setIsLoading(false);
    }
  }
};
```

### 5. **Type Safety**

Ensure type safety throughout the data flow:

```typescript
// Define strict types for API responses
export interface AmbassadorApiResponse {
  roster_overview: {
    time_interval: [string, string];
    widgets: WidgetData[];
  };
  // ... other fields
}

// Validate API response
function validateAmbassadorData(data: unknown): data is AmbassadorApiResponse {
  // Add validation logic
  return true; // Replace with actual validation
}

// Use in fetch function
const response = await fetch(url);
const data = await response.json();

if (!validateAmbassadorData(data)) {
  throw new Error('Invalid data format received from API');
}
```

### 6. **Error Recovery**

Provide multiple recovery options:

```typescript
const ErrorDisplay = ({ error, onRetry, onReset }) => (
  <div>
    <h3>Something went wrong</h3>
    <p>{error.message}</p>
    <Button onClick={onRetry}>Retry Request</Button>
    <Button onClick={onReset} variant="outlined">
      Reset Filters
    </Button>
    <Button onClick={() => window.location.reload()} variant="text">
      Reload Page
    </Button>
  </div>
);
```

---

## Summary Checklist

When implementing data fetching and rendering, ensure you have:

- [ ] **State Management**: States for filters, data, loading, and errors
- [ ] **API Integration**: Centralized fetch functions with proper error handling
- [ ] **Event Handlers**: Functions to handle user interactions
- [ ] **Data Flow**: Clear path from user action → API call → state update → re-render
- [ ] **Loading States**: Visual feedback during data fetching
- [ ] **Error Handling**: Graceful error display and recovery options
- [ ] **Type Safety**: TypeScript types for all data structures
- [ ] **Performance**: Debouncing, caching, and race condition handling
- [ ] **User Experience**: Smooth transitions and optimistic updates

---

## Related Files in Your Project

- **Component**: `_component.tsx` - Main page component
- **Selector**: `location-selector/index.tsx` - Location selector component
- **Types**: `types/location.ts` - Location-related types
- **Data**: `data-mockup/ambassador-data.ts` - Current mockup data structure (use as reference for API response format)

---

## Next Steps

1. **Create API endpoint** on backend that accepts location/year parameters
2. **Implement fetch function** following the patterns in this guide
3. **Add state management** to your component
4. **Connect event handlers** to LocationSelector and YearSelector
5. **Test with different filters** to ensure data updates correctly
6. **Add loading and error UI** for better user experience
7. **Optimize performance** with caching and debouncing
