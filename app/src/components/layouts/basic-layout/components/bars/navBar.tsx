import type { BasicLayoutProps } from "../..";
import styles from "./navBar.module.scss";

export const NavBar = ({
  elements,
  className,
}: {
  elements: BasicLayoutProps["elements"];
  className?: string;
}) => {
  if (elements.navBar !== undefined) {
    return (
      <nav className={`${styles["nav-bar"]} ${className}`}>
        <div className={styles["first"]}>
          {elements.navBar.first.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div className={styles["center"]}>
          {elements.navBar.center.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
        <div className={styles["last"]}>
          {elements.navBar.last.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </div>
      </nav>
    );
  } else {
    return <></>;
  }
};

