import type { BasicLayoutProps } from "../../basic-layout";
import type { ContentDesignProps } from "../../basic-layout/shared";
import { BaseContentContainer } from "./_BaseContentContainer";
import styles from "./footer.module.scss";

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
  if (elements.footer !== undefined) {
    return (
      <BaseContentContainer
        as="footer"
        contentDesign={contentDesign}
        outerClassName={`${styles["footer"]} ${className || ""}`}
        innerClassName={styles["footer-content"]}
      >
        {elements.footer}
      </BaseContentContainer>
    );
  } else {
    return <></>;
  }
};

