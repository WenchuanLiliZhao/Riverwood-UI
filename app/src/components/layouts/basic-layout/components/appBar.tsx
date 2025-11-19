import type { BasicLayoutProps } from "..";
import styles from "./appBar.module.scss";

export const AppBar = ({
  elements,
  className,
}: {
  elements: BasicLayoutProps["elements"];
  className?: string;
}) => {
  if (elements.appBar !== undefined) {
    return (
      <nav className={`${styles["app-bar"]} ${className}`}>
        <div className={styles["top"]}>
          {elements.appBar.top.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div className={styles["center"]}>
          {elements.appBar.center.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div className={styles["bottom"]}>
          {elements.appBar.bottom.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
      </nav>
    );
  } else {
    return <></>;
  }
};
