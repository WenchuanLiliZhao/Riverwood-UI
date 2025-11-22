import type { BasicLayoutProps } from "../../basic-layout";
import styles from "./rightSidebar.module.scss";

export const RightSidebar = ({
  elements,
  className,
}: {
  elements: BasicLayoutProps["elements"];
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

