import type { ContentDesignProps, LayoutProps } from "../shared";
import { BaseContentContainer } from "./_BaseContentContainer";
import styles from "./footer.module.scss";

export interface FooterProps {
  elements: LayoutProps["elements"];
  className?: string;
  contentDesign: ContentDesignProps;
}

export const Footer = ({
  elements,
  className,
  contentDesign,
}: FooterProps) => {
  if (elements.footer !== undefined) {
    return (
      <BaseContentContainer
        as="footer"
        contentDesign={contentDesign}
        outerClassName={`${styles["footer"]} ${className || ""}`}
        innerClassName={styles["footer-content"]}
        enablePadding={contentDesign.enablePadding ?? true}
      >
        {elements.footer}
      </BaseContentContainer>
    );
  } else {
    return <></>;
  }
};

