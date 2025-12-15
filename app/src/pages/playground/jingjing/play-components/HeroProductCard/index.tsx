import styles from "./styles.module.scss";
import type { HeroProductCardData } from "../../mockup-data/heroProductCard";

export interface HeroProductCardProps {
  data: HeroProductCardData;
}

export const HeroProductCard = ({ data }: HeroProductCardProps) => {
  const {
    productImage,
    productName,
    colorName,
    colorValue,
    inventoryMetrics,
    thumbnails,
  } = data;

  return (
    <div className={styles["hero-product-card"]}>
      <div className={styles["product-image"]}>
        <img src={productImage} alt={productName} />
        <div className={styles["color-tag"]}>
          <span
            className={styles["color-dot"]}
            style={{ backgroundColor: colorValue }}
          ></span>
          <span className={styles["color-tag-text"]}>{colorName}</span>
        </div>
      </div>

      <div className={styles["product-info"]}>
        <div className={styles["product-name"]}>{productName}</div>
        <div className={styles["inventory-metrics"]}>
          <div className={styles["inventory-metric"]}>
            <span className={styles["inventory-metric-label"]}>Sold:</span>
            <span className={styles["inventory-metric-value"]}>
              {inventoryMetrics.sold}
            </span>
          </div>
          <div className={styles["inventory-metric"]}>
            <span className={styles["inventory-metric-label"]}>On Hand:</span>
            <span className={styles["inventory-metric-value"]}>
              {inventoryMetrics.onHand}
            </span>
          </div>
          <div className={styles["inventory-metric"]}>
            <span className={styles["inventory-metric-label"]}>
              In Transit:
            </span>
            <span className={styles["inventory-metric-value"]}>
              {inventoryMetrics.inTransit}
            </span>
          </div>
          <div className={styles["inventory-metric"]}>
            <span className={styles["inventory-metric-label"]}>
              Omni Sold:
            </span>
            <span className={styles["inventory-metric-value"]}>
              {inventoryMetrics.omniSold}
            </span>
          </div>
          <div className={styles["inventory-metric"]}>
            <span className={styles["inventory-metric-label"]}>
              Omni On Hand:
            </span>
            <span className={styles["inventory-metric-value"]}>
              {inventoryMetrics.omniOnHand}
            </span>
          </div>
        </div>
      </div>

      <div className={styles["thumbnails"]}>
        {thumbnails.map((thumbnail, index) => (
          <div key={index} className={styles["thumbnail"]}>
            <img src={thumbnail.image} alt={`Thumbnail ${index + 1}`} />
            <div className={styles["thumbnail-info"]}>
              <div className={styles["thumbnail-percentage"]}>
                {thumbnail.percentage}%
              </div>
              <div className={styles["thumbnail-on-hand"]}>
                On Hand {thumbnail.onHand}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

