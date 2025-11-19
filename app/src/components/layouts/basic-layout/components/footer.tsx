import type { BasicLayoutProps } from "..";
import styles from "./footer.module.scss";

export const Footer = ({
  elements,
  className,
}: {
  elements: BasicLayoutProps["elements"];
  className?: string;
}) => {
  if (elements.footer !== undefined) {
    return (
      <footer className={`${styles["footer"]} ${className}`}>
        {elements.footer}
      </footer>
    );
  } else {
    return <></>;
  }
};

