import type { BasicLayoutProps } from "..";
import {
  getContentPaddingConfig,
  getMaxWidthClassName,
  type ContentDesignProps,
} from "../shared";
import styles from "./content.module.scss";
import { responsive } from "../../../utils";

export interface ContentProps {
  elements: BasicLayoutProps["elements"];
  className?: string;
  contentDesign: ContentDesignProps;
}

export const Content = ({
  elements,
  className,
  contentDesign,
}: ContentProps) => {
  // Always use responsive utility for automatic width-based padding class selection
  const [containerRef, responsiveClassName] = responsive(
    getContentPaddingConfig()
  );

  // Get max-width class based on spacing.widthMode
  const maxWidthClassName = getMaxWidthClassName(contentDesign);

  return (
    <div className={`${styles["content"]} ${className || ""}`}>
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className={`${styles["content-container"]} ${maxWidthClassName} ${responsiveClassName}`}
      >
        {elements.content}
      </div>
    </div>
  );
};
