import type { BasicLayoutProps } from "..";
import styles from "./leftSidebar.module.scss";

export const LeftSidebar = ({
  elements,
  className,
}: {
  elements: BasicLayoutProps["elements"];
  className?: string;
}) => {
  if (elements.leftSidebar !== undefined) {
    return (
      <aside className={`${styles["left-sidebar"]} ${className}`}>
        {elements.leftSidebar}
      </aside>
    );
  } else {
    return <></>;
  }
};

