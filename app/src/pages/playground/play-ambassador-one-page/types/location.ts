/**
 * Type definitions for location data structure
 */

export interface LocationCity {
  name: string;
  coordinates: [number, number];
  zoom: number;
}

export interface LocationArea {
  name: string;
  coordinates: [number, number];
  zoom: number;
  cities: Record<string, LocationCity>;
}

export interface LocationRegion {
  name: string;
  coordinates: [number, number];
  zoom: number;
  areas: Record<string, LocationArea>;
}

export type LocationData = Record<string, LocationRegion>;
