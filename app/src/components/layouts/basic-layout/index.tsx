/**
 * BasicLayout uses an internal scrolling pattern where the content container
 * handles scrolling internally. Therefore, body scroll is disabled to prevent
 * page-level scrolling conflicts.
 */
import styles from "./styles.module.scss";
import { closeBodyScroll } from "../../utils";
import { useEffect } from "react";
import { AppBar } from "./components/appBar";
import { NavBar } from "./components/navBar";
import { Footer } from "./components/footer";
import { LeftSidebar } from "./components/leftSidebar";
import { RightSidebar } from "./components/rightSidebar";
import { Content } from "./components/content";
import type { BarElements } from "./shared";

export interface BasicLayoutProps {
  elements: {
    content: React.ReactNode; // The content of the layout, will be the main content of the page
    appBar?: BarElements;
    navBar?: BarElements;
    footer?: React.ReactNode;
    leftSidebar?: React.ReactNode;
    rightSidebar?: React.ReactNode;
  };
}



export const BasicLayout: React.FC<BasicLayoutProps> = ({ elements }) => {
  useEffect(() => closeBodyScroll(), []); // Disable body scroll when layout mounts
  
  return (
    <div className={styles["basic-layout"]}>
      <AppBar elements={elements} className={styles["app-bar"]} />
      <div className={styles["page-body"]}>
        <NavBar elements={elements} className={styles["nav-bar"]} />
        <main className={styles["page-body-content"]}>
          <LeftSidebar elements={elements} className={styles["left-sidebar"]} />
          <div className={styles["content-container"]}>
            <div className={styles["content-container-main"]}>
              <Content elements={elements} className={styles["content"]} />
              <Footer elements={elements} className={styles["footer"]} />
            </div>
            <RightSidebar elements={elements} className={styles["right-sidebar"]} />
          </div>
        </main>
        
      </div>
    </div>
  );
};
