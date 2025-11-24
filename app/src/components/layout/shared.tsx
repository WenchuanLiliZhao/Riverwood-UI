import React from "react";
import type { ResponsiveConfig } from "../utils/useResponsive";
import styles from "./styles.module.scss";

export interface LayoutProps {
  elements: LayoutElements;
  contentDesign: ContentDesignProps;
}


export interface BarElements {
  first?: React.ReactNode[];
  center?: React.ReactNode[];
  last?: React.ReactNode[];
}

export interface LayoutElements {
  appBar?: BarElements;
  navBar?: BarElements;
  footer?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  content?: React.ReactNode;
}

export interface ContentDesignProps {
  widthMode: "small" | "medium" | "large" | "full";
}

/**
 * Creates responsive configuration for content padding classes
 * Uses padding classes from styles.module.scss
 * @returns ResponsiveConfig for use with the responsive() utility
 */
export const getContentPaddingConfig = (): ResponsiveConfig => [
  { interval: [0, 640], output: `${styles["padding"]} ${styles["small-padding"]}` },
  { interval: [641, 1024], output: `${styles["padding"]} ${styles["medium-padding"]}` },
  { interval: [1025, 1408], output: `${styles["padding"]} ${styles["large-padding"]}` },
  { interval: [1409, undefined], output: `${styles["padding"]} ${styles["full-padding"]}` },
];

/**
 * Gets the max-width class name based on spacing widthMode
 * @param spacing - ContentSpacingProps with widthMode
 * @returns The corresponding max-width class name from styles.module.scss
 */
export const getMaxWidthClassName = (spacing: ContentDesignProps): string => {
  return spacing.widthMode === "small"
    ? styles["small"]
    : spacing.widthMode === "medium"
    ? styles["medium"]
    : spacing.widthMode === "large"
    ? styles["large"]
    : styles["full"];
};