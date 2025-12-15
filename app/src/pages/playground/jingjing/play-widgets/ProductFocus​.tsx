import styles from "./ProductFocus.module.scss";
import { Button, MaterialIcon, WidgetFrame } from "../../../../components";
import { FocusProductCard } from "../play-components/FocusProductCard";
import type { FocusProductCardData } from "../mockup-data/focusProductCard";

export interface ProductFocusProps {
  data: FocusProductCardData[];
}

export const ProductFocus = ({ data }: ProductFocusProps) => {
  return (
    <WidgetFrame
      nav={{
        icon: "cards_star",
        title: "Product Focus",
      }}
    >
      <div className={styles["y-scroll-container"]}>
        <div className={styles["product-list"]}>
          <div className={styles["focus-products"]}>
            <div className={styles["header"]}>
              <div className={styles["header-content"]}>
                <MaterialIcon icon="mystery" size={24} />
                <span className={styles["header-title"]}>Focus Products</span>
              </div>
              <div className={styles["header-actions"]}>
                <Button   
                  content={{
                    icon: "add",
                    text: "Add Product",
                  }}
                  design={{
                    variant: "outlined",
                    size: "medium",
                    semantic: "secondary",
                  }}
                />
              </div>
            </div>
            <div className={styles["product-cards"]}>
              {data.map((productData, index) => (
                <FocusProductCard key={index} data={productData} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
};
