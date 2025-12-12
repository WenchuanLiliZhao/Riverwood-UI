import type { LocationData } from '../types/location';

export const location: LocationData = {
  "central": {
    name: "Central",
    coordinates: [30.5928, 114.3055],
    zoom: 8,
    areas: {
      "jiangsu": {
        name: "Jiangsu",
        coordinates: [32.0603, 118.7969],
        zoom: 10,
        cities: {
          "nanjing": {
            name: "Nanjing",
            coordinates: [32.0603, 118.7969],
            zoom: 10,
          },
          "suzhou": {
            name: "Suzhou",
            coordinates: [31.3042, 120.6186],
            zoom: 10,
          },
        },
      },
      "zhejiang": {
        name: "Zhejiang",
        coordinates: [30.2741, 120.1551],
        zoom: 10,
        cities: {
          "hangzhou": {
            name: "Hangzhou",
            coordinates: [30.2741, 120.1551],
            zoom: 10,
        },
        "ningbo": {
          name: "Ningbo",
          coordinates: [29.8798, 121.5491],
          zoom: 10,
          },
        },
      },
      "shanghai": {
        name: "Shanghai",
        coordinates: [31.2304, 121.4737],
        zoom: 10,
        cities: {
          "shanghai": {
            name: "Shanghai",
            coordinates: [31.2304, 121.4737],
            zoom: 10,
          },
        },
      },
      "beijing": {
        name: "Beijing",
        coordinates: [39.9042, 116.4074],
        zoom: 10,
        cities: {
          "beijing": {
            name: "Beijing",
            coordinates: [39.9042, 116.4074],
            zoom: 10,
          },
        },
      },
    }
  },
  "north": {
    name: "North",
    coordinates: [36.0671, 120.3826],
    zoom: 8,
    areas: {},
  },
};
