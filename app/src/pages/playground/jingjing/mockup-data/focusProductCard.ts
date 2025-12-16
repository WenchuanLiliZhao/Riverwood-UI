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
};

