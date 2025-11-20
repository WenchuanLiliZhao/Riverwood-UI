import type { BasicLayoutProps } from "../..";
import { BaseBar } from "./_BaseBar";
import styles from "./appBar.module.scss";

export interface AppBarProps {
  elements: BasicLayoutProps["elements"];
  className?: string;
}

export const AppBar = ({ elements, className }: AppBarProps) => {
  if (elements.appBar !== undefined) {
    return (
      <BaseBar
        elements={elements.appBar}
        className={`${styles["app-bar"]} ${className || ""}`}
        direction="column"
        as="nav"
      />
    );
  } else {
    return <></>;
  }
};
