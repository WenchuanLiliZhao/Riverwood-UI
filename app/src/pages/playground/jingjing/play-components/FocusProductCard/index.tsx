import { Button } from "../../../../../components";
import styles from "./styles.module.scss";
import type { FocusProductCardData } from "../../mockup-data/focusProductCard";

export interface FocusProductCardProps {
  data: FocusProductCardData;
}

export const FocusProductCard = ({ data }: FocusProductCardProps) => {
  const {
    productImage,
    productName,
    colorName,
    colorValue,
    inventoryMetrics,
    performanceMetrics,
    isFavorite,
  } = data;

  return (
    <div className={styles["focus-product-card"]}>
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
        <div className={styles["header"]}>
          <div className={styles["product-basic-info"]}>
            <div className={styles["product-name"]}>{productName}</div>
            <div className={styles["inventory-infos"]}>
              <div className={styles["inventory-info"]}>
                <div className={styles["inventory-info-label"]}>On Hand:</div>
                <div className={styles["inventory-info-value"]}>
                  {inventoryMetrics.onHand}
                </div>
              </div>
              <div className={styles["inventory-info"]}>
                <div className={styles["inventory-info-label"]}>
                  Try-On Count:
                </div>
                <div className={styles["inventory-info-value"]}>
                  {inventoryMetrics.tryOnCount}
                </div>
              </div>
              <div className={styles["inventory-info"]}>
                <div className={styles["inventory-info-label"]}>
                  Try-On CR %:
                </div>
                <div className={styles["inventory-info-value"]}>
                  {inventoryMetrics.tryOnCR}%
                </div>
              </div>
            </div>
          </div>
          <div className={styles["product-actions"]}>
            <Button
              content={{
                icon: "favorite",
              }}
              design={{
                variant: "ghost",
                semantic: isFavorite ? "brand" : "negative",
              }}
            />
          </div>
        </div>

        <div className={styles["caption-infos"]}>
          <div className={styles["caption-info"]}>
            <div className={styles["caption-info-label"]}>Today-Units</div>
            <div className={styles["caption-info-value"]}>
              {performanceMetrics.todayUnits.value}
            </div>
            <div className={styles["caption-info-change"]}>
              vs {performanceMetrics.todayUnits.regionAvg} region avg
            </div>
          </div>
          <div className={styles["caption-info"]}>
            <div className={styles["caption-info-label"]}>WTD-Units</div>
            <div className={styles["caption-info-value"]}>
              {performanceMetrics.wtdUnits.value}
            </div>
            <div className={styles["caption-info-change"]}>
              vs {performanceMetrics.wtdUnits.regionAvg} region avg
            </div>
          </div>
          <div className={styles["caption-info"]}>
            <div className={styles["caption-info-label"]}>ST %</div>
            <div className={styles["caption-info-value"]}>
              {performanceMetrics.stPercent.value}%
            </div>
            <div className={styles["caption-info-change"]}>
              vs {performanceMetrics.stPercent.regionAvg}% region avg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
