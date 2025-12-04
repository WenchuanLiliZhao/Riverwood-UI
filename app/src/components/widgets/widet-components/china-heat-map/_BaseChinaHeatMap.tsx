import * as React from "react";
import {
  MapContainer,
  GeoJSON,
  Circle,
  CircleMarker,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./chinaHeatMap.module.scss";
import { clsx } from "clsx";
import {
  ChinaHeatMapDefaultDesignProperties,
  type ChinaHeatMapDesignProperties,
} from "./designProperties";
import { ButtonGroup, type ButtonConfig } from "../../../general/button-group";
import {
  COMPONENT_VARIANTS,
  COMPONENT_SEMANTICS,
  COMPONENT_SIZES,
} from "../../../shared/tokens";

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

/**
 * Default Minecraft player count data for China regions
 * This serves as example data when categories prop is not provided
 * Only includes Beijing, Shanghai, and Guangzhou (北上广)
 */
const DEFAULT_MINECRAFT_CATEGORIES: CategoryData[] = [
  {
    icon: "videogame_asset",
    term: "Java Edition",
    locations: [
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 98000 },
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 125000 },
      { name: "Guangzhou", coordinates: [23.1291, 113.2644], radius: 87000 },
    ],
  },
  {
    icon: "phone_android",
    term: "Bedrock Edition",
    locations: [
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 152000 },
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 185000 },
      { name: "Guangzhou", coordinates: [23.1291, 113.2644], radius: 138000 },
    ],
  },
  {
    icon: "people",
    term: "Total Players",
    locations: [
      { name: "Beijing", coordinates: [39.9042, 116.4074], radius: 250000 },
      { name: "Shanghai", coordinates: [31.2304, 121.4737], radius: 310000 },
      { name: "Guangzhou", coordinates: [23.1291, 113.2644], radius: 225000 },
    ],
  },
];

/**
 * Default region mapping for Minecraft player data
 */
const DEFAULT_MINECRAFT_REGION_MAPPING: RegionMapping = {
  "Shanghai": "East",
  "Beijing": "East",
  "Shenzhen": "East",
  "Zhejiang": "East",
  "Jiangsu": "East",
  "South China": "Central",
  "Northwest China": "Central",
  "Southwest China": "Central",
  "Central": "Central",
  "North China": "North East",
  "Northeast China": "North East",
};

export interface BaseChinaHeatMapProps {
  /**
   * Title to display at the top of the map
   */
  title?: string;
  /**
   * Array of categories with their location data
   * If not provided, will use default Minecraft player count data
   */
  categories?: CategoryData[];
  /**
   * Region mapping for the table (maps location names to region names)
   * If not provided, will use default region mapping
   */
  regionMapping?: RegionMapping;
  /**
   * Default selected category index
   */
  defaultCategoryIndex?: number;
  /**
   * Map center coordinates [latitude, longitude]
   * @default [37.8, 111.1]
   */
  center?: [number, number];
  /**
   * Map zoom level
   * @default 4.1
   */
  zoom?: number;
  /**
   * Callback when map view changes
   */
  onViewChange?: (center: [number, number], zoom: number) => void;
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
 * Maps emoji/symbols to Material Icon names
 */
const iconMapping: Record<string, string> = {
  "🏃": "directions_run",
  "💪": "fitness_center",
  "⛳": "sports_golf",
  "Σ": "calculate",
  "♀": "female",
  "♂": "male",
};

/**
 * Converts icon string (emoji or Material Icon name) to Material Icon name
 */
const getMaterialIconName = (icon?: string): string | undefined => {
  if (!icon) return undefined;
  
  // Check if it's in the emoji/symbol mapping first
  if (iconMapping[icon]) {
    return iconMapping[icon];
  }
  
  // If it looks like a Material Icon name (contains only letters, numbers, underscores, no emoji)
  // Material Icon names are typically lowercase with underscores, or single words
  if (/^[a-z0-9_]+$/i.test(icon) && icon.length > 0 && icon.length < 50) {
    return icon;
  }
  
  // If it's an emoji or unknown symbol, return undefined (no icon)
  return undefined;
};

/**
 * Component to handle map animations and updates
 */
const MapController: React.FC<{
  locations: LocationPoint[];
  center: [number, number];
  zoom: number;
  onViewChange?: (center: [number, number], zoom: number) => void;
}> = ({ locations, center, zoom, onViewChange }) => {
  const map = useMap();

  React.useEffect(() => {
    // Invalidate size when locations change to ensure proper rendering
    map.invalidateSize();
  }, [locations, map]);

  // Update map view when center or zoom changes
  React.useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 0.5,
    });
  }, [center, zoom, map]);

  // Listen to map view changes and notify parent
  React.useEffect(() => {
    if (!onViewChange) return;

    const handleMoveEnd = () => {
      const mapCenter = map.getCenter();
      const mapZoom = map.getZoom();
      onViewChange([mapCenter.lat, mapCenter.lng], mapZoom);
    };

    map.on("moveend", handleMoveEnd);
    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [map, onViewChange]);

  return null;
};

/**
 * Animated Circle Component
 */
const AnimatedCircle: React.FC<{
  location: LocationPoint;
  index: number;
  design: {
    width?: number;
    height?: number;
    backgroundColor: string;
    landColor: string;
    borderColor: string;
    borderWidth: number;
    radiusFactor: number;
    circleColor: string;
    circleOpacity: number;
    dotRadius: number;
  };
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
      title,
      categories,
      regionMapping,
      defaultCategoryIndex = 0,
      center = [37.8, 111.1],
      zoom = 4.1,
      onViewChange,
      className,
      designProperties,
      onCategoryChange,
    },
    ref
  ) => {
    const [chinaGeoJson, setChinaGeoJson] = React.useState<unknown | null>(
      null
    );

    // Merge custom design properties with defaults
    const design = {
      width: designProperties?.width,
      height: designProperties?.height,
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
      dotRadius:
        designProperties?.dotRadius ??
        ChinaHeatMapDefaultDesignProperties.dotRadius,
    };

    // Use provided categories or default Minecraft data
    const activeCategories = categories || DEFAULT_MINECRAFT_CATEGORIES;
    const isUsingDefaultData = !categories;
    
    // Ensure defaultCategoryIndex is within valid range
    const validDefaultIndex = React.useMemo(() => {
      const maxIndex = activeCategories.length - 1;
      return defaultCategoryIndex >= 0 && defaultCategoryIndex <= maxIndex
        ? defaultCategoryIndex
        : 0;
    }, [defaultCategoryIndex, activeCategories]);
    
    const [currentCategoryIndex, setCurrentCategoryIndex] =
      React.useState(validDefaultIndex);
    
    // Get current category data (memoized to avoid unnecessary re-renders)
    const currentLocations = React.useMemo(() => {
      const currentCategory = activeCategories[currentCategoryIndex];
      return currentCategory?.locations || [];
    }, [activeCategories, currentCategoryIndex]);

    // Use provided region mapping or default
    const activeRegionMapping = regionMapping || DEFAULT_MINECRAFT_REGION_MAPPING;

    // Calculate table data based on active categories
    const tableData = React.useMemo(() => {
      // For default data, show cities directly instead of regions
      if (isUsingDefaultData) {
        const cities = currentLocations.map((location) => ({
          name: location.name,
          value: location.radius,
        }));

        // Sort by value descending
        cities.sort((a, b) => b.value - a.value);

        const total = cities.reduce((sum, city) => sum + city.value, 0);

        return { regions: cities, total, isCityMode: true };
      }

      // For custom data, aggregate by region
      const regionTotals: { [key: string]: number } = {};

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

      return { regions, total, isCityMode: false };
    }, [currentLocations, activeRegionMapping, isUsingDefaultData]);

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
        onCategoryChange(index, activeCategories[index]);
      }
    };

    // Prepare button group elements
    const buttonGroupElements = React.useMemo(() => {
      const buttonConfigs: ButtonConfig[] = activeCategories.map((category, index) => ({
        content: {
          icon: getMaterialIconName(category.icon),
          text: category.term,
        },
        value: String(index),
        design: {
          variant: COMPONENT_VARIANTS.outlined,
          semantic: COMPONENT_SEMANTICS.primary,
          size: COMPONENT_SIZES.small,
        },
      }));
      return [buttonConfigs];
    }, [activeCategories]);

    return (
      <div
        ref={ref}
        className={clsx(styles.container, className)}
        style={
          {
            "--background-color": design.backgroundColor,
            ...(design.width && { width: `${design.width}px` }),
            ...(design.height && { height: `${design.height}px` }),
          } as React.CSSProperties
        }
      >
        {/* Map Container */}
        <div className={styles.map}>
          <MapContainer
            center={center}
            zoom={zoom}
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
            <MapController
              locations={currentLocations}
              center={center}
              zoom={zoom}
              onViewChange={onViewChange}
            />

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
          {title && (
            <div className={styles.header}>
              <div className={styles.title}>{title}</div>
            </div>
          )}
        </div>

        {/* Category Selector */}
        <div className={styles.categorySelector}>
          <ButtonGroup
            elements={buttonGroupElements}
            mode="switch"
            value={String(currentCategoryIndex)}
            onChange={(value) => {
              const index = typeof value === "string" ? parseInt(value, 10) : parseInt(value[0] || "0", 10);
              if (!isNaN(index)) {
                handleCategorySwitch(index);
              }
            }}
          />
        </div>

        {/* Data Table */}
        <div className={styles.dataTable}>
          <div className={styles.dataTableHeader}>
            <div className={clsx(styles.dataTableHeaderCell, styles.left)}>
              {tableData.isCityMode ? "City" : "Region"}
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
