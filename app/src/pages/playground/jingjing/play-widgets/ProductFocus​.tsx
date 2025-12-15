import styles from "./ProductFocus.module.scss";
import { Button, MaterialIcon, WidgetFrame } from "../../../../components";
import { FocusProductCard } from "../play-components/FocusProductCard";
import { focusProductCardsData } from "../mockup-data/focusProductCard";
import { HeroProductCard } from "../play-components/HeroProductCard";
import { heroProductCardsData } from "../mockup-data/heroProductCard";

export const ProductFocus = () => {
  
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
              <FocusProductCard
                data={focusProductCardsData.womensSleevelessTankPink}
              />
              <FocusProductCard
                data={focusProductCardsData.swiftlyTechLongSleeveBlack}
              />
            </div>
          </div>
          <div className={styles["hero-products"]}>
            <div className={styles["header"]}>
              <div className={styles["header-content"]}>
                <MaterialIcon icon="mystery" size={24} />
                <span className={styles["header-title"]}>Hero Products</span>
              </div>
              <div className={styles["header-actions"]}>
                <Button
                  content={{
                    icon: "bookmark",
                  }}
                  design={{
                    variant: "ghost",
                    size: "medium",
                    semantic: "secondary",
                  }}
                />
                <Button
                  content={{
                    icon: "place",
                  }}
                  design={{
                    variant: "ghost",
                    size: "medium",
                    semantic: "secondary",
                  }}
                />
                <Button
                  content={{
                    icon: "more_vert",
                  }}
                  design={{
                    variant: "ghost",
                    size: "medium",
                    semantic: "secondary",
                  }}
                />
              </div>
            </div>
            <div className={styles["product-cards"]}>
              <HeroProductCard
                data={heroProductCardsData.alignNoLineHighRisePantBlack}
              />
              <HeroProductCard
                data={heroProductCardsData.defineNuluJacketDarkBlue}
              />
              <HeroProductCard
                data={heroProductCardsData.alignHighRisePantBlack}
              />
              <HeroProductCard
                data={heroProductCardsData.focuserScoopNeckBraNuluOlive}
              />
              <HeroProductCard
                data={heroProductCardsData.alignNoLineHighRisePantBlack2}
              />
            </div>
          </div>
          <div style={{ height: "100px" }}>

          </div>
        </div>
      </div>
    </WidgetFrame>
  );
};
