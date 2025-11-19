/**
 * BasicLayout uses an internal scrolling pattern where the content container
 * handles scrolling internally. Therefore, body scroll is disabled to prevent
 * page-level scrolling conflicts.
 */
import styles from "./styles.module.scss";
import { closeBodyScroll } from "../../utils";
import { useEffect } from "react";
import { AppBar } from "./components/appBar";

export interface BasicLayoutProps {
  elements: {
    content: React.ReactNode; // The content of the layout, will be the main content of the page
    appBar?: {
      top: React.ReactNode[];
      center: React.ReactNode[];
      bottom: React.ReactNode[];
    };
    navBar?: React.ReactNode;
    footer?: React.ReactNode;
    leftSidebar?: React.ReactNode;
    rightSidebar?: React.ReactNode;
  };
}



export const BasicLayout: React.FC<BasicLayoutProps> = ({ elements }) => {
  useEffect(() => closeBodyScroll(), []); // Disable body scroll when layout mounts
  
  console.log(elements);
  return (
    <div className={styles["basic-layout"]}>
      <AppBar elements={elements} className={styles["app-bar"]} />
      <div className={styles["page-body"]}>
        {elements.navBar && (
          <nav className={styles["nav-bar"]}>{elements.navBar}</nav>
        )}
        <main className={styles["page-body-content"]}>
          {elements.leftSidebar && (
            <aside className={styles["left-sidebar"]}>
              {elements.leftSidebar}
            </aside>
          )}
          <div className={styles["content-container"]}>
            <div className={styles["content-container-main"]}>
              {elements.content}
            </div>
            {elements.rightSidebar && (
              <aside className={styles["right-sidebar"]}>
                {elements.rightSidebar}
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
