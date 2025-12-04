import * as React from "react";

import styles from "./_styles.module.scss";
import {
  ChinaHeatMap,
  WidetFrame,
  type CategoryData,
} from "../../../components";
import { BentoGrid, BentoItem } from "../../../components/sections/bento-grid";

/**
 * Sample category data for testing
 * Based on the original demo but adapted for the new region structure
 */
const sampleCategories: CategoryData[] = [
  {
    icon: "🏃",
    term: "Run",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 15 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 12 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 11 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 10 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 9 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 9 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 8 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 11 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 10 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 8 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 0 },
    ],
  },
  {
    icon: "💪",
    term: "Train",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 13 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 14 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 10 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 11 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 9 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 11 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 12 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 10 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 9 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 9 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 8 },
    ],
  },
  {
    icon: "🧘",
    term: "Yoga",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 11 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 8 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 10 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 12 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 10 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 9 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 13 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 9 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 8 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 7 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 7 },
    ],
  },
  {
    icon: "🤸",
    term: "Other",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 7 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 6 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 5 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 5 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 5 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 5 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 6 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 5 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 4 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 4 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 4 },
    ],
  },
  {
    icon: "🎾",
    term: "Tennis",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 28 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 7 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 6 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 7 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 6 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 6 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 5 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 6 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 5 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 5 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 4 },
    ],
  },
  {
    icon: "⛳",
    term: "Golf",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 6 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 5 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 7 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 6 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 5 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 6 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 4 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 5 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 4 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 5 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 3 },
    ],
  },
  {
    icon: "Σ",
    term: "Total",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 20 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 18 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 17 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 17 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 15 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 16 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 18 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 16 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 14 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 13 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 12 },
    ],
  },
  {
    icon: "♀",
    term: "Female",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 11 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 9 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 9 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 10 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 7 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 8 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 10 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 8 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 7 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 6 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 6 },
    ],
  },
  {
    icon: "♂",
    term: "Male",
    locations: [
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 9 },
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 9 },
      { name: "Shenzhen", coordinates: [22.5431, 114.0579], radius: 8 },
      { name: "Zhejiang", coordinates: [30.2741, 120.1551], radius: 7 },
      { name: "Jiangsu", coordinates: [32.0603, 118.7969], radius: 8 },
      { name: "South China", coordinates: [23.1291, 113.2644], radius: 8 },
      { name: "Northwest China", coordinates: [30.5728, 104.0668], radius: 8 },
      { name: "Southwest China", coordinates: [29.4316, 106.9123], radius: 8 },
      { name: "Central", coordinates: [30.5928, 114.3055], radius: 7 },
      { name: "North China", coordinates: [36.0671, 120.3826], radius: 6 },
      { name: "Northeast China", coordinates: [41.8057, 123.4328], radius: 6 },
    ],
  },
];

/**
 * Region definitions for zooming
 */
type MapRegion = {
  name: string;
  center: [number, number];
  zoom: number;
};

const CHINA_REGIONS: Record<string, MapRegion> = {
  all: { name: "All China", center: [37.8, 111.1], zoom: 4.1 },
  east: { name: "East", center: [31.5, 120.5], zoom: 6.5 },
  central: { name: "Central", center: [30.5, 111.5], zoom: 6 },
  northEast: { name: "North East", center: [43, 125], zoom: 6 },
  south: { name: "South", center: [23.5, 113.5], zoom: 6.5 },
  north: { name: "North", center: [40, 116], zoom: 6 },
  northwest: { name: "Northwest", center: [36.5, 103], zoom: 5.5 },
  southwest: { name: "Southwest", center: [28.5, 103.5], zoom: 5.5 },
};

export const Page_Debug_ChinaHeatMapComponent: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = React.useState<string>("all");
  const [mapCenter, setMapCenter] = React.useState<[number, number]>(
    CHINA_REGIONS.all.center
  );
  const [mapZoom, setMapZoom] = React.useState<number>(CHINA_REGIONS.all.zoom);

  const handleCategoryChange = (index: number, category: CategoryData) => {
    console.log(`Category changed to: ${category.term} (index: ${index})`);
  };

  const handleRegionChange = (regionKey: string) => {
    const region = CHINA_REGIONS[regionKey];
    if (region) {
      setSelectedRegion(regionKey);
      setMapCenter(region.center);
      setMapZoom(region.zoom);
      console.log(`Region changed to: ${region.name}`);
    }
  };

  const handleViewChange = (center: [number, number], zoom: number) => {
    console.log(`Map view changed - Center: ${center}, Zoom: ${zoom}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>China Heat Map Component</h1>
        <p>Interactive map showing ambassador distribution across China</p>
      </div>

      {/* Region Selector */}
      <div className={styles.controls}>
        <h3>Region Selector</h3>
        <div className={styles.regionButtons}>
          {Object.entries(CHINA_REGIONS).map(([key, region]) => (
            <button
              key={key}
              className={`${styles.regionBtn} ${
                selectedRegion === key ? styles.active : ""
              }`}
              onClick={() => handleRegionChange(key)}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.mapWrapper}>
        <BentoGrid gap="md" rowHeight={[[Infinity, 640]]}>
          <BentoItem res={[
            [Infinity, 12, 1],
          ]}>
            <WidetFrame nav={{ title: "Heat-map of Ambassadors" }}>
              <ChinaHeatMap
                categories={sampleCategories}
                defaultCategoryIndex={1}
                center={mapCenter}
                zoom={mapZoom}
                onCategoryChange={handleCategoryChange}
                onViewChange={handleViewChange}
              />
            </WidetFrame>
          </BentoItem>
        </BentoGrid>
      </div>

      <div className={styles.info}>
        <h2>Component Features</h2>
        <ul>
          <li>Interactive map with smooth animations</li>
          <li>Multiple category filters (Run, Train, Yoga, etc.)</li>
          <li>Regional aggregation (East, Central, North East)</li>
          <li>Controllable map view (center and zoom)</li>
          <li>Smooth animated transitions between regions</li>
          <li>Responsive design with customizable properties</li>
        </ul>

        <h2>Basic Usage</h2>
        <pre>
          {`<ChinaHeatMap
  title="Heat-map of Ambassadors"
  categories={categoryData}
  defaultCategoryIndex={0}
  onCategoryChange={(index, category) => {
    console.log('Category changed:', category.term);
  }}
/>`}
        </pre>

        <h2>Advanced Usage with Region Control</h2>
        <pre>
          {`const [mapCenter, setMapCenter] = useState<[number, number]>([37.8, 111.1]);
const [mapZoom, setMapZoom] = useState<number>(4.1);

// Define regions
const regions = {
  all: { center: [37.8, 111.1], zoom: 4.1 },
  east: { center: [31.5, 120.5], zoom: 6.5 },
  central: { center: [30.5, 111.5], zoom: 6 },
};

// Switch to a region
const handleRegionChange = (region) => {
  setMapCenter(region.center);
  setMapZoom(region.zoom);
};

<ChinaHeatMap
  categories={categoryData}
  center={mapCenter}
  zoom={mapZoom}
  onViewChange={(center, zoom) => {
    console.log('View changed:', center, zoom);
  }}
/>`}
        </pre>
      </div>
    </div>
  );
};
