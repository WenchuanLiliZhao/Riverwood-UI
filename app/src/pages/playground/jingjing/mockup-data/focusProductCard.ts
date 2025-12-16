export interface InventoryMetric {
  onHand: number;
  tryOnCount: number;
  tryOnCR: number; // Percentage value (0-100)
}

export interface PerformanceMetric {
  value: number;
  regionAvg: number;
}

export interface SizeQuantity {
  size: string;
  quantity: number;
}

export interface FocusProductCardData {
  productImage: string;
  productName: string;
  colorName: string;
  colorValue: string; // CSS color value for the color dot
  inventoryMetrics: InventoryMetric;
  performanceMetrics: {
    todayUnits: PerformanceMetric;
    wtdUnits: PerformanceMetric;
    stPercent: PerformanceMetric; // Percentage value (0-100)
  };
  isFavorite: boolean;
  sizes: SizeQuantity[]; // Array of size and quantity pairs
}

/**
 * Mockup data for Focus Product Cards
 * Based on the product focus widget design
 */
export const focusProductCardsData: Record<string, FocusProductCardData> = {
  womensSleevelessTankPink: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Women's Sleeveless & Tank Tops",
    colorName: "Pink",
    colorValue: "#FFB6C1", // Light pink color
    inventoryMetrics: {
      onHand: 99,
      tryOnCount: 10,
      tryOnCR: 20, // 20%
    },
    performanceMetrics: {
      todayUnits: {
        value: 12,
        regionAvg: 16,
      },
      wtdUnits: {
        value: 127,
        regionAvg: 67,
      },
      stPercent: {
        value: 57, // 57%
        regionAvg: 46,
      },
    },
    isFavorite: true,
    sizes: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 0 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 0 },
      { size: "XXL", quantity: 8 },
    ],
  },
  swiftlyTechLongSleeveBlack: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Swiftly Tech Long-Sleeve Shirt 2.0",
    colorName: "Black",
    colorValue: "#000000", // Black color
    inventoryMetrics: {
      onHand: 99,
      tryOnCount: 12,
      tryOnCR: 20, // 20%
    },
    performanceMetrics: {
      todayUnits: {
        value: 11,
        regionAvg: 13,
      },
      wtdUnits: {
        value: 87,
        regionAvg: 57,
      },
      stPercent: {
        value: 55, // 55%
        regionAvg: 56,
      },
    },
    isFavorite: true,
    sizes: [
      { size: "XS", quantity: 11 },
      { size: "S", quantity: 7 },
      { size: "M", quantity: 9 },
      { size: "XL", quantity: 5 },
      { size: "XXL", quantity: 3 },
    ],
  },
  ebbToStreetTankPink: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Ebb to Street Tank Top Light Support",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 85,
      tryOnCount: 15,
      tryOnCR: 25,
    },
    performanceMetrics: {
      todayUnits: {
        value: 18,
        regionAvg: 22,
      },
      wtdUnits: {
        value: 145,
        regionAvg: 98,
      },
      stPercent: {
        value: 62,
        regionAvg: 51,
      },
    },
    isFavorite: true,
    sizes: [
      { size: "XS", quantity: 12 },
      { size: "S", quantity: 8 },
      { size: "M", quantity: 6 },
      { size: "XL", quantity: 3 },
      { size: "XXL", quantity: 5 },
    ],
  },
  alignTankTopPink: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align™ Tank Top Light Support",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 92,
      tryOnCount: 18,
      tryOnCR: 28,
    },
    performanceMetrics: {
      todayUnits: {
        value: 15,
        regionAvg: 19,
      },
      wtdUnits: {
        value: 132,
        regionAvg: 85,
      },
      stPercent: {
        value: 59,
        regionAvg: 48,
      },
    },
    isFavorite: true,
    sizes: [
      { size: "XS", quantity: 15 },
      { size: "S", quantity: 10 },
      { size: "M", quantity: 8 },
      { size: "XL", quantity: 4 },
      { size: "XXL", quantity: 6 },
    ],
  },
  alignCroppedCamiPink: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align™ Cropped Cami Tank Top Light Support",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 78,
      tryOnCount: 14,
      tryOnCR: 23,
    },
    performanceMetrics: {
      todayUnits: {
        value: 13,
        regionAvg: 17,
      },
      wtdUnits: {
        value: 118,
        regionAvg: 72,
      },
      stPercent: {
        value: 54,
        regionAvg: 43,
      },
    },
    isFavorite: true,
    sizes: [
      { size: "XS", quantity: 10 },
      { size: "S", quantity: 6 },
      { size: "M", quantity: 5 },
      { size: "XL", quantity: 2 },
      { size: "XXL", quantity: 4 },
    ],
  },
  loveTankTopPink: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Love Tank Top",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 88,
      tryOnCount: 16,
      tryOnCR: 26,
    },
    performanceMetrics: {
      todayUnits: {
        value: 16,
        regionAvg: 21,
      },
      wtdUnits: {
        value: 138,
        regionAvg: 91,
      },
      stPercent: {
        value: 61,
        regionAvg: 49,
      },
    },
    isFavorite: true,
    sizes: [
      { size: "XS", quantity: 13 },
      { size: "S", quantity: 9 },
      { size: "M", quantity: 7 },
      { size: "XL", quantity: 3 },
      { size: "XXL", quantity: 5 },
    ],
  },
  jerseyTrainingTankPink: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Jersey Training Tank Top",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 95,
      tryOnCount: 20,
      tryOnCR: 30,
    },
    performanceMetrics: {
      todayUnits: {
        value: 20,
        regionAvg: 25,
      },
      wtdUnits: {
        value: 152,
        regionAvg: 105,
      },
      stPercent: {
        value: 65,
        regionAvg: 53,
      },
    },
    isFavorite: true,
    sizes: [
      { size: "XS", quantity: 16 },
      { size: "S", quantity: 11 },
      { size: "M", quantity: 9 },
      { size: "XL", quantity: 5 },
      { size: "XXL", quantity: 7 },
    ],
  },
  swiftlyTechLongSleeveNavy: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Swiftly Tech Long-Sleeve Shirt 2.0",
    colorName: "Navy",
    colorValue: "#000080",
    inventoryMetrics: {
      onHand: 82,
      tryOnCount: 13,
      tryOnCR: 22,
    },
    performanceMetrics: {
      todayUnits: {
        value: 14,
        regionAvg: 18,
      },
      wtdUnits: {
        value: 125,
        regionAvg: 78,
      },
      stPercent: {
        value: 56,
        regionAvg: 45,
      },
    },
    isFavorite: true,
    sizes: [
      { size: "XS", quantity: 11 },
      { size: "S", quantity: 7 },
      { size: "M", quantity: 6 },
      { size: "XL", quantity: 4 },
      { size: "XXL", quantity: 3 },
    ],
  },
  swiftlyTechLongSleeveGray: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Swiftly Tech Long-Sleeve Shirt 2.0",
    colorName: "Gray",
    colorValue: "#808080",
    inventoryMetrics: {
      onHand: 90,
      tryOnCount: 17,
      tryOnCR: 27,
    },
    performanceMetrics: {
      todayUnits: {
        value: 17,
        regionAvg: 20,
      },
      wtdUnits: {
        value: 142,
        regionAvg: 94,
      },
      stPercent: {
        value: 63,
        regionAvg: 50,
      },
    },
    isFavorite: true,
    sizes: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 10 },
      { size: "M", quantity: 8 },
      { size: "XL", quantity: 4 },
      { size: "XXL", quantity: 6 },
    ],
  },
};

