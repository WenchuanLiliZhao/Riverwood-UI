import { useState, useMemo } from "react";
import styles from "./ProductFocus.module.scss";
import { Button, MaterialIcon, WidgetFrame } from "../../../../components";
import { FocusProductCard } from "../play-components/FocusProductCard";
import { focusProductCardsData } from "../mockup-data/focusProductCard";
import { HeroProductCard } from "../play-components/HeroProductCard";
import { heroProductCardsData } from "../mockup-data/heroProductCard";
import { AddProductModal } from "../play-components/AddProductModal";
import { allProductsData } from "../mockup-data/allProducts";

const MAX_DISPLAY_PRODUCTS = 3;

export const ProductFocus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusProducts] = useState([
    focusProductCardsData.womensSleevelessTankPink,
    focusProductCardsData.swiftlyTechLongSleeveBlack,
    focusProductCardsData.ebbToStreetTankPink,
    focusProductCardsData.alignTankTopPink,
    focusProductCardsData.alignCroppedCamiPink,
    focusProductCardsData.loveTankTopPink,
    focusProductCardsData.jerseyTrainingTankPink,
    focusProductCardsData.swiftlyTechLongSleeveNavy,
    focusProductCardsData.swiftlyTechLongSleeveGray,
  ]);

  const visibleProducts = useMemo(
    () => focusProducts.slice(0, MAX_DISPLAY_PRODUCTS),
    [focusProducts]
  );

  const hasMoreProducts = useMemo(
    () => focusProducts.length > MAX_DISPLAY_PRODUCTS,
    [focusProducts]
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
                  onClick={handleOpenModal}
                />
              </div>
            </div>
            <div className={styles["product-cards"]}>
              {visibleProducts.map((product, index) => (
                <FocusProductCard key={`focus-${index}`} data={product} />
              ))}
            </div>
            {hasMoreProducts && (
              <div className={styles["more-button-container"]}>
                <Button
                  content={{
                    text: "More...",
                  }}
                  design={{
                    variant: "ghost",
                    size: "medium",
                    semantic: "secondary",
                  }}
                  onClick={handleOpenModal}
                  className={styles["more-button"]}
                />
              </div>
            )}
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
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        focusProducts={focusProducts}
        allProducts={allProductsData}
        maxFocusProducts={10}
      />
    </WidgetFrame>
  );
};
