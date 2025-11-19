import type { BasicLayoutProps } from "..";
import styles from "./content.module.scss";

export const Content = ({
  elements,
  className,
}: {
  elements: BasicLayoutProps["elements"];
  className?: string;
}) => {
  return (
    <div className={`${styles["content"]} ${className}`}>
      {elements.content}
    </div>
  );
};

