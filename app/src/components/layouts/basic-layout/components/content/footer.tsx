import type { BasicLayoutProps } from "../..";
import type { ContentDesignProps } from "../../shared";
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

