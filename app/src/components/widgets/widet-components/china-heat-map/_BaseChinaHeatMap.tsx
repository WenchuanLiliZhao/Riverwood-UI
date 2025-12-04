import * as React from "react";
import { MapContainer, GeoJSON, Circle, CircleMarker, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./chinaHeatMap.module.scss";
import { clsx } from "clsx";
import {
  ChinaHeatMapDefaultDesignProperties,
  type ChinaHeatMapDesignProperties,
} from "./designProperties";

/* -------------------------------------------------------------------------- */
/*                             Type Definitions                               */
/* -------------------------------------------------------------------------- */

/**
 * Represents a location point on the map
 */
export type LocationPoint = {
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  radius: number;
};

/**
 * Represents a category with its locations
 */
export type CategoryData = {
  icon?: string;
  term: string;
  locations: LocationPoint[];
};

/**
 * Region mapping type for table display
 */
export type RegionMapping = {
  [key: string]: string; // Maps location name to region name
};

/* -------------------------------------------------------------------------- */
/*                             Main Component                                 */
/* -------------------------------------------------------------------------- */

export interface BaseChinaHeatMapProps {
  /**
   * Title to display at the top of the map
   */
  title?: string;
  /**
   * Array of categories with their location data
   */
  categories: CategoryData[];
  /**
   * Region mapping for the table (maps location names to region names)
   * If not provided, will show regions: East, Central, North East
   */
  regionMapping?: RegionMapping;
  /**
   * Default selected category index
   */
  defaultCategoryIndex?: number;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Custom design properties to override defaults
   */
  designProperties?: ChinaHeatMapDesignProperties;
  /**
   * Callback when category changes
   */
  onCategoryChange?: (categoryIndex: number, category: CategoryData) => void;
}

/**
 * China GeoJSON data URL
 */
const CHINA_GEOJSON_URL =
  "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json";

/**
 * Component to handle map animations and updates
 */
const MapController: React.FC<{
  locations: LocationPoint[];
}> = ({ locations }) => {
  const map = useMap();

  React.useEffect(() => {
    // Invalidate size when locations change to ensure proper rendering
    map.invalidateSize();
  }, [locations, map]);

  return null;
};

/**
 * Animated Circle Component
 */
const AnimatedCircle: React.FC<{
  location: LocationPoint;
  index: number;
  design: Required<ChinaHeatMapDesignProperties>;
}> = ({ location, index, design }) => {
  const [radius, setRadius] = React.useState(1);
  const [opacity, setOpacity] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const adjustedRadius = location.radius * design.radiusFactor;

  React.useEffect(() => {
    const duration = 600;
    const startTime = Date.now();
    const delay = index * 50;
    let animationFrameId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime - delay;

      if (elapsed < 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setRadius(Math.max(1, adjustedRadius * easeProgress));
      setOpacity(design.circleOpacity * easeProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [adjustedRadius, design.circleOpacity, index]);

  // Skip if adjusted radius is 0 or negative
  if (adjustedRadius <= 0) {
    return null;
  }

  const eventHandlers = {
    mouseover: () => setIsHovered(true),
    mouseout: () => setIsHovered(false),
  };

  return (
    <>
      <Circle
        center={location.coordinates as LatLngExpression}
        radius={radius}
        pathOptions={{
          color: "#666666",
          fillColor: design.circleColor,
          fillOpacity: isHovered ? 0.3 : opacity,
          opacity: design.circleBorderOpacity,
          weight: 0,
        }}
        pane="shadowPane"
        eventHandlers={eventHandlers}
      >
        <CircleMarker
          center={location.coordinates as LatLngExpression}
          radius={design.dotRadius}
          pathOptions={{
            fillColor: design.circleColor,
            color: "#333333",
            weight: 0,
            opacity: 1,
            fillOpacity: 1,
          }}
          pane="markerPane"
        />
      </Circle>
    </>
  );
};

export const BaseChinaHeatMap = React.forwardRef<
  HTMLDivElement,
  BaseChinaHeatMapProps
>(
  (
    {
      title = "Heat-map of Ambassadors",
      categories,
      regionMapping,
      defaultCategoryIndex = 0,
      className,
      designProperties,
      onCategoryChange,
    },
    ref
  ) => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = React.useState(
      defaultCategoryIndex
    );
    const [chinaGeoJson, setChinaGeoJson] = React.useState<unknown | null>(null);

    // Merge custom design properties with defaults
    const design = {
      width:
        designProperties?.width ?? ChinaHeatMapDefaultDesignProperties.width,
      height:
        designProperties?.height ?? ChinaHeatMapDefaultDesignProperties.height,
      backgroundColor:
        designProperties?.backgroundColor ??
        ChinaHeatMapDefaultDesignProperties.backgroundColor,
      landColor:
        designProperties?.landColor ??
        ChinaHeatMapDefaultDesignProperties.landColor,
      borderColor:
        designProperties?.borderColor ??
        ChinaHeatMapDefaultDesignProperties.borderColor,
      borderWidth:
        designProperties?.borderWidth ??
        ChinaHeatMapDefaultDesignProperties.borderWidth,
      radiusFactor:
        designProperties?.radiusFactor ??
        ChinaHeatMapDefaultDesignProperties.radiusFactor,
      circleColor:
        designProperties?.circleColor ??
        ChinaHeatMapDefaultDesignProperties.circleColor,
      circleOpacity:
        designProperties?.circleOpacity ??
        ChinaHeatMapDefaultDesignProperties.circleOpacity,
      circleBorderOpacity:
        designProperties?.circleBorderOpacity ??
        ChinaHeatMapDefaultDesignProperties.circleBorderOpacity,
      dotRadius:
        designProperties?.dotRadius ??
        ChinaHeatMapDefaultDesignProperties.dotRadius,
      hoverLineColor:
        designProperties?.hoverLineColor ??
        ChinaHeatMapDefaultDesignProperties.hoverLineColor,
      hoverLineOpacity:
        designProperties?.hoverLineOpacity ??
        ChinaHeatMapDefaultDesignProperties.hoverLineOpacity,
    };

    // Get current category data (memoized to avoid unnecessary re-renders)
    const currentLocations = React.useMemo(() => {
      const currentCategory = categories[currentCategoryIndex];
      return currentCategory?.locations || [];
    }, [categories, currentCategoryIndex]);

    // Default region mapping
    const defaultRegionMapping: RegionMapping = {
      Shanghai: "East",
      Beijing: "East",
      Shenzhen: "East",
      Zhejiang: "East",
      Jiangsu: "East",
      "South China": "Central",
      "Northwest China": "Central",
      "Southwest China": "Central",
      Central: "Central",
      "North China": "North East",
      "Northeast China": "North East",
    };

    const activeRegionMapping = regionMapping || defaultRegionMapping;

    // Calculate table data based on active categories
    const tableData = React.useMemo(() => {
      const regionTotals: { [key: string]: number } = {};

      // Aggregate data by region
      currentLocations.forEach((location) => {
        const regionName = activeRegionMapping[location.name];
        if (regionName) {
          regionTotals[regionName] =
            (regionTotals[regionName] || 0) + location.radius;
        }
      });

      // Convert to array
      const regions = Object.keys(regionTotals).map((name) => ({
        name,
        value: regionTotals[name],
      }));

      // Sort by value descending
      regions.sort((a, b) => b.value - a.value);

      const total = regions.reduce((sum, region) => sum + region.value, 0);

      return { regions, total };
    }, [currentLocations, activeRegionMapping]);

    // Load China GeoJSON data
    React.useEffect(() => {
      fetch(CHINA_GEOJSON_URL)
        .then((response) => response.json())
        .then((data) => setChinaGeoJson(data))
        .catch((error) => {
          console.error("Failed to load China GeoJSON:", error);
        });
    }, []);

    // Handle category switch
    const handleCategorySwitch = (index: number) => {
      setCurrentCategoryIndex(index);
      if (onCategoryChange) {
        onCategoryChange(index, categories[index]);
      }
    };

    return (
      <div
        ref={ref}
        className={clsx(styles.container, className)}
        style={
          {
            "--background-color": design.backgroundColor,
            width: `${design.width}px`,
            height: `${design.height}px`,
          } as React.CSSProperties
        }
      >
        {/* Map Container */}
        <div className={styles.map}>
          <MapContainer
            center={[37.8, 111.1]}
            zoom={4.1}
            minZoom={4}
            maxZoom={10}
            zoomControl={false}
            attributionControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            touchZoom={false}
            boxZoom={false}
            keyboard={false}
            style={{ width: "100%", height: "100%" }}
          >
            <MapController locations={currentLocations} />

            {/* China GeoJSON Layer */}
            {chinaGeoJson && (
              <GeoJSON
                data={chinaGeoJson}
                style={{
                  fillColor: design.landColor,
                  fillOpacity: 1,
                  color: design.borderColor,
                  weight: design.borderWidth,
                  opacity: 1,
                }}
              />
            )}

            {/* Location Markers */}
            {currentLocations.map((location, index) => (
              <AnimatedCircle
                key={`${location.name}-${index}`}
                location={location}
                index={index}
                design={design}
              />
            ))}
          </MapContainer>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
          </div>
        </div>

        {/* Category Selector */}
        <div className={styles.categorySelector}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={clsx(styles.categoryBtn, {
                [styles.active]: index === currentCategoryIndex,
              })}
              onClick={() => handleCategorySwitch(index)}
              aria-label={`Switch to ${category.term} category`}
            >
              {category.icon && (
                <span className={styles.categoryIcon}>{category.icon}</span>
              )}
              <span className={styles.categoryLabel}>{category.term}</span>
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className={styles.dataTable}>
          <div className={styles.dataTableHeader}>
            <div className={clsx(styles.dataTableHeaderCell, styles.left)}>
              Region
            </div>
            <div className={clsx(styles.dataTableHeaderCell, styles.right)}>
              Count
            </div>
          </div>
          <div className={styles.dataTableContent}>
            {tableData.regions.length === 0 ? (
              <div className={styles.dataTableEmpty}>No data</div>
            ) : (
              <>
                {tableData.regions.map((region, idx) => (
                  <div key={idx} className={styles.dataTableRow}>
                    <div className={styles.dataTableName}>{region.name}</div>
                    <div className={styles.dataTableValue}>{region.value}</div>
                  </div>
                ))}
                <div className={styles.dataTableTotal}>
                  <div className={styles.dataTableTotalLabel}>Total</div>
                  <div className={styles.dataTableTotalValue}>
                    {tableData.total}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

BaseChinaHeatMap.displayName = "BaseChinaHeatMap";
