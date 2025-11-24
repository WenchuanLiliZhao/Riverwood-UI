import type { ContentDesignProps, LayoutProps } from "../shared";
import { BaseContentContainer } from "./_BaseContentContainer";
import styles from "./content.module.scss";

export interface ContentProps {
  elements: LayoutProps["elements"];
  className?: string;
  contentDesign: ContentDesignProps;
}

export const Content = ({
  elements,
  className,
  contentDesign,
}: ContentProps) => {
  return (
    <BaseContentContainer
      as="div"
      contentDesign={contentDesign}
      outerClassName={`${styles["content"]} ${className || ""}`}
      innerClassName={styles["content-container"]}
    >
      {elements.content}
    </BaseContentContainer>
  );
};
