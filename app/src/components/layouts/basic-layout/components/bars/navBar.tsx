import type { BasicLayoutProps } from "../..";
import { BaseBar } from "./_BaseBar";
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
      <BaseBar
        elements={elements.navBar}
        className={`${styles["nav-bar"]} ${className || ""}`}
        direction="row"
        as="nav"
      />
    );
  } else {
    return <></>;
  }
};

