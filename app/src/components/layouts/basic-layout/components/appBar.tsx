import type { BasicLayoutProps } from "..";
import styles from "./appBar.module.scss";

export interface AppBarProps {
  elements: BasicLayoutProps["elements"];
  className?: string;
}


export const AppBar = ({ elements, className }: AppBarProps) => {
  if (elements.appBar !== undefined) {
    return (
      <nav className={`${styles["app-bar"]} ${className}`}>
        <div className={styles["first"]}>
          {elements.appBar.first.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div className={styles["center"]}>
          {elements.appBar.center.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div className={styles["last"]}>
          {elements.appBar.last.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
      </nav>
    );
  } else {
    return <></>;
  }
};
