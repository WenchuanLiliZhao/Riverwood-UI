import { BaseBar } from "./_BaseBar";
import styles from "./appBar.module.scss";
import type { LayoutProps } from "../shared";

export interface AppBarProps {
  elements: LayoutProps["elements"];
  className?: string;
}

export const AppBar = ({ elements, className }: AppBarProps) => {
  if (elements.appBar !== undefined) {
    return (
      <div className={`${styles["app-bar-container"]} ${className || ""}`}>
        <BaseBar
        elements={elements.appBar}
        className={styles["app-bar"]}
        direction="column"
        as="nav"
        />
      </div>
    );
  } else {
    return <></>;
  }
};
