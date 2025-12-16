export interface InventoryMetrics {
  sold: number;
  onHand: number;
  inTransit: number;
  omniSold: number;
  omniOnHand: number;
}

export interface ThumbnailItem {
  image: string;
  percentage: number; // Percentage value (0-100)
  onHand: number;
}

export interface SizeQuantity {
  size: string;
  quantity: number;
}

export interface HeroProductCardData {
  productImage: string;
  productName: string;
  colorName: string;
  colorValue: string; // CSS color value for the color dot
  inventoryMetrics: InventoryMetrics;
  thumbnails: ThumbnailItem[]; // Array of related product variations
  sizes: SizeQuantity[]; // Array of size and quantity pairs
}

/**
 * Mockup data for Hero Product Cards
 * Based on the hero products widget design
 */
export const heroProductCardsData: Record<string, HeroProductCardData> = {
  alignNoLineHighRisePantBlack: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align No Line™ High-Rise Pant",
    colorName: "Black",
    colorValue: "#000000",
    inventoryMetrics: {
      sold: 45,
      onHand: 60,
      inTransit: 75,
      omniSold: 75,
      omniOnHand: 75,
    },
    sizes: [
      { size: "XS", quantity: 14 },
      { size: "S", quantity: 0 },
      { size: "M", quantity: 4 },
      { size: "XL", quantity: 0 },
      { size: "XXL", quantity: 8 },
    ],
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 15,
        onHand: 120,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 42,
        onHand: 65,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 67,
        onHand: 95,
      },
    ],
  },
  defineNuluJacketDarkBlue: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Define Nulu™ Jacket",
    colorName: "Dark Blue",
    colorValue: "#000080",
    inventoryMetrics: {
      sold: 45,
      onHand: 60,
      inTransit: 75,
      omniSold: 75,
      omniOnHand: 75,
    },
    sizes: [
      { size: "XS", quantity: 10 },
      { size: "S", quantity: 5 },
      { size: "M", quantity: 8 },
      { size: "XL", quantity: 3 },
      { size: "XXL", quantity: 2 },
    ],
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 8,
        onHand: 150,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 31,
        onHand: 88,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 56,
        onHand: 72,
      },
    ],
  },
  alignHighRisePantBlack: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align™ High-Rise Pant",
    colorName: "Black",
    colorValue: "#000000",
    inventoryMetrics: {
      sold: 45,
      onHand: 60,
      inTransit: 75,
      omniSold: 75,
      omniOnHand: 75,
    },
    sizes: [
      { size: "XS", quantity: 12 },
      { size: "S", quantity: 6 },
      { size: "M", quantity: 9 },
      { size: "XL", quantity: 4 },
      { size: "XXL", quantity: 3 },
    ],
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 19,
        onHand: 105,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 38,
        onHand: 55,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 74,
        onHand: 130,
      },
    ],
  },
  focuserScoopNeckBraNuluOlive: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Focuser Scoop-Neck Bra Nulu",
    colorName: "Olive",
    colorValue: "#808000",
    inventoryMetrics: {
      sold: 45,
      onHand: 60,
      inTransit: 75,
      omniSold: 75,
      omniOnHand: 75,
    },
    sizes: [
      { size: "XS", quantity: 8 },
      { size: "S", quantity: 12 },
      { size: "M", quantity: 15 },
      { size: "XL", quantity: 7 },
      { size: "XXL", quantity: 5 },
    ],
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 12,
        onHand: 140,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 29,
        onHand: 78,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 51,
        onHand: 112,
      },
    ],
  },
  alignNoLineHighRisePantBlack2: {
    productImage:
      "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
    productName: "Align No Line™ High-Rise Pant",
    colorName: "Black",
    colorValue: "#000000",
    inventoryMetrics: {
      sold: 45,
      onHand: 60,
      inTransit: 75,
      omniSold: 75,
      omniOnHand: 75,
    },
    sizes: [
      { size: "XS", quantity: 16 },
      { size: "S", quantity: 2 },
      { size: "M", quantity: 6 },
      { size: "XL", quantity: 1 },
      { size: "XXL", quantity: 10 },
    ],
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 33,
        onHand: 92,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 47,
        onHand: 63,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 61,
        onHand: 85,
      },
    ],
  },
};

