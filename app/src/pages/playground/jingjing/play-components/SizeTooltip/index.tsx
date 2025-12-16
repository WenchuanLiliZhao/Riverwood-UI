import React from "react";
import styles from "./styles.module.scss";

export interface SizeQuantity {
  size: string;
  quantity: number;
}

export interface SizeTooltipProps {
  sizes: SizeQuantity[];
  isVisible: boolean;
}

export const SizeTooltip: React.FC<SizeTooltipProps> = ({
  sizes,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles["size-tooltip"]}>
      <div className={styles["size-row"]}>
        {sizes.map((item, index) => (
          <div
            key={`size-${index}`}
            className={`${styles["size-cell"]} ${
              item.quantity > 0 ? styles["available"] : styles["unavailable"]
            }`}
          >
            {item.size}
          </div>
        ))}
      </div>
      <div className={styles["quantity-row"]}>
        {sizes.map((item, index) => (
          <div
            key={`quantity-${index}`}
            className={`${styles["quantity-cell"]} ${
              item.quantity > 0 ? styles["available"] : styles["unavailable"]
            }`}
          >
            {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

