import React, { useState, useMemo } from "react";
import { Modal } from "../Modal";
import { MaterialIcon, Button, COMPONENT_VARIANTS, COMPONENT_SIZES, COMPONENT_SEMANTICS } from "../../../../../components";
import { FocusProductCard } from "../FocusProductCard";
import { SearchBar } from "../SearchBar";
import type { FocusProductCardData } from "../../mockup-data/focusProductCard";
import { sortOptions, getSortOptionLabel } from "../../mockup-data/sortOptions";
import styles from "./styles.module.scss";

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  focusProducts: FocusProductCardData[];
  allProducts: FocusProductCardData[];
  maxFocusProducts?: number;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  focusProducts,
  allProducts,
  maxFocusProducts = 10,
}) => {
  const [focusSearchQuery, setFocusSearchQuery] = useState("");
  const [productsSearchQuery, setProductsSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("feature");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setSortBy(e.target.value);
  };

  const filteredFocusProducts = useMemo(() => {
    if (!focusSearchQuery) return focusProducts;
    const query = focusSearchQuery.toLowerCase();
    return focusProducts.filter(
      (product) =>
        product.productName.toLowerCase().includes(query) ||
        product.colorName.toLowerCase().includes(query)
    );
  }, [focusProducts, focusSearchQuery]);

  const filteredAllProducts = useMemo(() => {
    let filtered = allProducts.filter(
      (product) =>
        !focusProducts.some(
          (fp) => fp.productName === product.productName && fp.colorName === product.colorName
        )
    );

    if (productsSearchQuery) {
      const query = productsSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(query) ||
          product.colorName.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allProducts, focusProducts, productsSearchQuery]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles["add-product-modal"]}>
      <div className={styles["modal-header"]}>
        <div className={styles["modal-title"]}>Pick Your Focus</div>
        <button 
          className={styles["close-button"]} 
          onClick={onClose}
          aria-label="Close modal"
        >
          <MaterialIcon icon="close" size={24} />
        </button>
      </div>

      <div className={styles["modal-body"]}>
        {/* Left Section: Pick Your Focus */}
        <div className={styles["focus-section"]}>
          <div className={styles["section-header"]}>
            <h2 className={styles["section-title"]}>Focus Products ({focusProducts.length}/{maxFocusProducts})</h2>
          </div>
          <div className={styles["search-wrapper"]}>
            <SearchBar
              value={focusSearchQuery}
              onChange={setFocusSearchQuery}
              placeholder="Search in Focus Products"
            />
          </div>
          <div className={styles["product-list"]}>
            {filteredFocusProducts.length > 0 ? (
              filteredFocusProducts.map((product, index) => (
                <FocusProductCard key={`focus-${index}`} data={product} />
              ))
            ) : (
              <div className={styles["empty-state"]}>No focus products found</div>
            )}
          </div>
        </div>

        {/* Right Section: Products List */}
        <div className={styles["products-section"]}>
          <div className={styles["section-header"]}>
            <h2 className={styles["section-title"]}>Products List</h2>
            <div className={styles["sort-container"]}>
              <Button
                content={{
                  icon: "sort",
                  text: `Sort by ${getSortOptionLabel(sortBy)}`,
                  decoIcon: "arrow_drop_down",
                }}
                design={{
                  variant: COMPONENT_VARIANTS.ghost,
                  size: COMPONENT_SIZES.medium,
                  semantic: COMPONENT_SEMANTICS.secondary,
                }}
                className={styles["sort-button"]}
              >
                <select
                  className={styles["dropdown-overlay"]}
                  value={sortBy}
                  onChange={handleSortChange}
                  aria-label="Sort products by"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Button>
            </div>
          </div>
          <div className={styles["controls-row"]}>
            <SearchBar
              value={productsSearchQuery}
              onChange={setProductsSearchQuery}
              placeholder="Tank Tops, Fittings"
              className={styles["flex-search"]}
            />
          </div>
          <div className={styles["product-list"]}>
            {filteredAllProducts.length > 0 ? (
              filteredAllProducts.map((product, index) => (
                <FocusProductCard key={`product-${index}`} data={product} />
              ))
            ) : (
              <div className={styles["empty-state"]}>No products found</div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

