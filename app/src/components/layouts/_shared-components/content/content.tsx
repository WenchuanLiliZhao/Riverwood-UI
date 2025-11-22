import type { BasicLayoutProps } from "../../basic-layout";
import type { ContentDesignProps } from "../../basic-layout/shared";
import { BaseContentContainer } from "./_BaseContentContainer";
import styles from "./content.module.scss";

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
