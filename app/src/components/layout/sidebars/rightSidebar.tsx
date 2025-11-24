import type { LayoutProps } from "../shared";
import styles from "./rightSidebar.module.scss";

export const RightSidebar = ({
  elements,
  className,
}: {
  elements: LayoutProps["elements"];
  className?: string;
}) => {
  if (elements.rightSidebar !== undefined) {
    return (
      <aside className={`${styles["right-sidebar"]} ${className}`}>
        {elements.rightSidebar}
      </aside>
    );
  } else {
    return <></>;
  }
};

