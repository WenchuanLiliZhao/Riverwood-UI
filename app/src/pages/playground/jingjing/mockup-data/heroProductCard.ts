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

export interface HeroProductCardData {
  productImage: string;
  productName: string;
  colorName: string;
  colorValue: string; // CSS color value for the color dot
  inventoryMetrics: InventoryMetrics;
  thumbnails: ThumbnailItem[]; // Array of related product variations
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
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
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
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
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
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
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
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
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
    thumbnails: [
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
      {
        image:
          "https://i.pinimg.com/1200x/e3/6b/e2/e36be2973486ffb3e26e8e76aae84404.jpg",
        percentage: 23,
        onHand: 80,
      },
    ],
  },
};

