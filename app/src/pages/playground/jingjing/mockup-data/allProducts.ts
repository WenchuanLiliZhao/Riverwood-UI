import type { FocusProductCardData } from "./focusProductCard";

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Mockup data for all available products in the Add Product Modal
 * This includes products that are not yet in the focus list
 * Products are shuffled to randomize the display order
 */
const productsArray: FocusProductCardData[] = [
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Ebb to Street Tank Top Light Support",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 99,
      tryOnCount: 10,
      tryOnCR: 20,
    },
    performanceMetrics: {
      todayUnits: {
        value: 12,
        regionAvg: 81,
      },
      wtdUnits: {
        value: 127,
        regionAvg: 67,
      },
      stPercent: {
        value: 57,
        regionAvg: 46,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 0 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 0 },
      { size: "XXL", quantity: 8 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align™ Tank Top Light Support",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 99,
      tryOnCount: 10,
      tryOnCR: 20,
    },
    performanceMetrics: {
      todayUnits: {
        value: 12,
        regionAvg: 81,
      },
      wtdUnits: {
        value: 127,
        regionAvg: 67,
      },
      stPercent: {
        value: 57,
        regionAvg: 46,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 0 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 0 },
      { size: "XXL", quantity: 8 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align™ Cropped Cami Tank Top Light Support",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 99,
      tryOnCount: 10,
      tryOnCR: 20,
    },
    performanceMetrics: {
      todayUnits: {
        value: 12,
        regionAvg: 81,
      },
      wtdUnits: {
        value: 127,
        regionAvg: 67,
      },
      stPercent: {
        value: 57,
        regionAvg: 46,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 0 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 0 },
      { size: "XXL", quantity: 8 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Love Tank Top",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 99,
      tryOnCount: 10,
      tryOnCR: 20,
    },
    performanceMetrics: {
      todayUnits: {
        value: 12,
        regionAvg: 81,
      },
      wtdUnits: {
        value: 127,
        regionAvg: 67,
      },
      stPercent: {
        value: 57,
        regionAvg: 46,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 0 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 0 },
      { size: "XXL", quantity: 8 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Jersey Training Tank Top",
    colorName: "Pink",
    colorValue: "#FFB6C1",
    inventoryMetrics: {
      onHand: 99,
      tryOnCount: 10,
      tryOnCR: 20,
    },
    performanceMetrics: {
      todayUnits: {
        value: 12,
        regionAvg: 81,
      },
      wtdUnits: {
        value: 127,
        regionAvg: 67,
      },
      stPercent: {
        value: 57,
        regionAvg: 46,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 0 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 0 },
      { size: "XXL", quantity: 8 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Ebb to Street Tank Top Light Support",
    colorName: "Black",
    colorValue: "#000000",
    inventoryMetrics: {
      onHand: 76,
      tryOnCount: 12,
      tryOnCR: 24,
    },
    performanceMetrics: {
      todayUnits: {
        value: 14,
        regionAvg: 18,
      },
      wtdUnits: {
        value: 112,
        regionAvg: 75,
      },
      stPercent: {
        value: 52,
        regionAvg: 42,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 10 },
      { size: "S", quantity: 6 },
      { size: "M", quantity: 5 },
      { size: "XL", quantity: 2 },
      { size: "XXL", quantity: 4 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Ebb to Street Tank Top Light Support",
    colorName: "Navy",
    colorValue: "#000080",
    inventoryMetrics: {
      onHand: 81,
      tryOnCount: 14,
      tryOnCR: 26,
    },
    performanceMetrics: {
      todayUnits: {
        value: 16,
        regionAvg: 20,
      },
      wtdUnits: {
        value: 128,
        regionAvg: 82,
      },
      stPercent: {
        value: 58,
        regionAvg: 47,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 12 },
      { size: "S", quantity: 8 },
      { size: "M", quantity: 6 },
      { size: "XL", quantity: 3 },
      { size: "XXL", quantity: 5 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align™ Tank Top Light Support",
    colorName: "Black",
    colorValue: "#000000",
    inventoryMetrics: {
      onHand: 73,
      tryOnCount: 11,
      tryOnCR: 23,
    },
    performanceMetrics: {
      todayUnits: {
        value: 13,
        regionAvg: 17,
      },
      wtdUnits: {
        value: 108,
        regionAvg: 70,
      },
      stPercent: {
        value: 51,
        regionAvg: 41,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 9 },
      { size: "S", quantity: 5 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 2 },
      { size: "XXL", quantity: 3 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align™ Tank Top Light Support",
    colorName: "Navy",
    colorValue: "#000080",
    inventoryMetrics: {
      onHand: 79,
      tryOnCount: 13,
      tryOnCR: 25,
    },
    performanceMetrics: {
      todayUnits: {
        value: 15,
        regionAvg: 19,
      },
      wtdUnits: {
        value: 124,
        regionAvg: 80,
      },
      stPercent: {
        value: 57,
        regionAvg: 46,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 11 },
      { size: "S", quantity: 7 },
      { size: "M", quantity: 5 },
      { size: "XL", quantity: 3 },
      { size: "XXL", quantity: 4 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align™ Cropped Cami Tank Top Light Support",
    colorName: "Black",
    colorValue: "#000000",
    inventoryMetrics: {
      onHand: 68,
      tryOnCount: 10,
      tryOnCR: 21,
    },
    performanceMetrics: {
      todayUnits: {
        value: 12,
        regionAvg: 16,
      },
      wtdUnits: {
        value: 102,
        regionAvg: 65,
      },
      stPercent: {
        value: 49,
        regionAvg: 39,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 8 },
      { size: "S", quantity: 4 },
      { size: "M", quantity: 3 },
      { size: "XL", quantity: 1 },
      { size: "XXL", quantity: 2 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align™ Cropped Cami Tank Top Light Support",
    colorName: "Navy",
    colorValue: "#000080",
    inventoryMetrics: {
      onHand: 74,
      tryOnCount: 12,
      tryOnCR: 24,
    },
    performanceMetrics: {
      todayUnits: {
        value: 14,
        regionAvg: 18,
      },
      wtdUnits: {
        value: 116,
        regionAvg: 74,
      },
      stPercent: {
        value: 53,
        regionAvg: 43,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 10 },
      { size: "S", quantity: 6 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 2 },
      { size: "XXL", quantity: 3 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Love Tank Top",
    colorName: "Black",
    colorValue: "#000000",
    inventoryMetrics: {
      onHand: 71,
      tryOnCount: 11,
      tryOnCR: 22,
    },
    performanceMetrics: {
      todayUnits: {
        value: 13,
        regionAvg: 17,
      },
      wtdUnits: {
        value: 110,
        regionAvg: 71,
      },
      stPercent: {
        value: 50,
        regionAvg: 40,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 9 },
      { size: "S", quantity: 5 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 2 },
      { size: "XXL", quantity: 3 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Love Tank Top",
    colorName: "Navy",
    colorValue: "#000080",
    inventoryMetrics: {
      onHand: 77,
      tryOnCount: 13,
      tryOnCR: 25,
    },
    performanceMetrics: {
      todayUnits: {
        value: 15,
        regionAvg: 19,
      },
      wtdUnits: {
        value: 122,
        regionAvg: 79,
      },
      stPercent: {
        value: 56,
        regionAvg: 45,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 11 },
      { size: "S", quantity: 7 },
      { size: "M", quantity: 5 },
      { size: "XL", quantity: 3 },
      { size: "XXL", quantity: 4 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Jersey Training Tank Top",
    colorName: "Black",
    colorValue: "#000000",
    inventoryMetrics: {
      onHand: 84,
      tryOnCount: 15,
      tryOnCR: 27,
    },
    performanceMetrics: {
      todayUnits: {
        value: 17,
        regionAvg: 21,
      },
      wtdUnits: {
        value: 134,
        regionAvg: 87,
      },
      stPercent: {
        value: 60,
        regionAvg: 48,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 13 },
      { size: "S", quantity: 9 },
      { size: "M", quantity: 7 },
      { size: "XL", quantity: 4 },
      { size: "XXL", quantity: 5 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Jersey Training Tank Top",
    colorName: "Navy",
    colorValue: "#000080",
    inventoryMetrics: {
      onHand: 87,
      tryOnCount: 16,
      tryOnCR: 28,
    },
    performanceMetrics: {
      todayUnits: {
        value: 19,
        regionAvg: 23,
      },
      wtdUnits: {
        value: 146,
        regionAvg: 95,
      },
      stPercent: {
        value: 64,
        regionAvg: 52,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 10 },
      { size: "M", quantity: 8 },
      { size: "XL", quantity: 5 },
      { size: "XXL", quantity: 6 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Swiftly Tech Long-Sleeve Shirt 2.0",
    colorName: "White",
    colorValue: "#FFFFFF",
    inventoryMetrics: {
      onHand: 80,
      tryOnCount: 14,
      tryOnCR: 26,
    },
    performanceMetrics: {
      todayUnits: {
        value: 16,
        regionAvg: 20,
      },
      wtdUnits: {
        value: 130,
        regionAvg: 84,
      },
      stPercent: {
        value: 59,
        regionAvg: 48,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 12 },
      { size: "S", quantity: 8 },
      { size: "M", quantity: 6 },
      { size: "XL", quantity: 3 },
      { size: "XXL", quantity: 5 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Swiftly Tech Long-Sleeve Shirt 2.0",
    colorName: "Olive",
    colorValue: "#808000",
    inventoryMetrics: {
      onHand: 75,
      tryOnCount: 12,
      tryOnCR: 23,
    },
    performanceMetrics: {
      todayUnits: {
        value: 13,
        regionAvg: 17,
      },
      wtdUnits: {
        value: 106,
        regionAvg: 68,
      },
      stPercent: {
        value: 50,
        regionAvg: 40,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 10 },
      { size: "S", quantity: 6 },
      { size: "M", quantity: 5 },
      { size: "XL", quantity: 2 },
      { size: "XXL", quantity: 3 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Women's Sleeveless & Tank Tops",
    colorName: "Black",
    colorValue: "#000000",
    inventoryMetrics: {
      onHand: 91,
      tryOnCount: 17,
      tryOnCR: 29,
    },
    performanceMetrics: {
      todayUnits: {
        value: 19,
        regionAvg: 24,
      },
      wtdUnits: {
        value: 148,
        regionAvg: 97,
      },
      stPercent: {
        value: 66,
        regionAvg: 54,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 15 },
      { size: "S", quantity: 11 },
      { size: "M", quantity: 9 },
      { size: "XL", quantity: 5 },
      { size: "XXL", quantity: 7 },
    ],
  },
  {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Women's Sleeveless & Tank Tops",
    colorName: "Navy",
    colorValue: "#000080",
    inventoryMetrics: {
      onHand: 86,
      tryOnCount: 15,
      tryOnCR: 27,
    },
    performanceMetrics: {
      todayUnits: {
        value: 17,
        regionAvg: 22,
      },
      wtdUnits: {
        value: 140,
        regionAvg: 92,
      },
      stPercent: {
        value: 64,
        regionAvg: 52,
      },
    },
    isFavorite: false,
    sizes: [
      { size: "XS", quantity: 13 },
      { size: "S", quantity: 9 },
      { size: "M", quantity: 7 },
      { size: "XL", quantity: 4 },
      { size: "XXL", quantity: 6 },
    ],
  },
];

export const allProductsData: FocusProductCardData[] = shuffleArray(productsArray);

