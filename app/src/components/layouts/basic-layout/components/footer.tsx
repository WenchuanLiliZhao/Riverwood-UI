import type { BasicLayoutProps } from "..";
import {
  getContentPaddingConfig,
  getMaxWidthClassName,
  type ContentDesignProps,
} from "../shared";
import styles from "./footer.module.scss";
import { responsive } from "../../../utils";

export interface FooterProps {
  elements: BasicLayoutProps["elements"];
  className?: string;
  contentDesign: ContentDesignProps;
}

export const Footer = ({
  elements,
  className,
  contentDesign,
}: FooterProps) => {
  // Use responsive utility for automatic width-based padding class selection
  const [footerRef, responsiveClassName] = responsive(getContentPaddingConfig());

  // Get max-width class based on spacing.widthMode
  const maxWidthClassName = getMaxWidthClassName(contentDesign);

  if (elements.footer !== undefined) {
    return (
      <footer className={`${styles["footer"]} ${className || ""}`}>
        <div
          ref={footerRef as React.RefObject<HTMLDivElement>}
          className={`${styles["footer-content"]} ${maxWidthClassName} ${responsiveClassName}`}
        >
          {elements.footer}
        </div>
      </footer>
    );
  } else {
    return <></>;
  }
};

