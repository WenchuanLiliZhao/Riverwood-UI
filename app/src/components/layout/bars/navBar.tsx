
import { BaseBar } from "./_BaseBar";
import styles from "./navBar.module.scss";
import type { LayoutProps } from "../shared";

export const NavBar = ({
  elements,
  className,
}: {
  elements: LayoutProps["elements"];
  className?: string;
}) => {
  if (elements.navBar !== undefined) {
    return (
      <div className={`${styles["nav-bar-container"]} ${className || ""}`}>
        <BaseBar
          elements={elements.navBar}
          className={styles["nav-bar"]}
          direction="row"
          as="nav"
        />
      </div>
    );
  } else {
    return <></>;
  }
};
