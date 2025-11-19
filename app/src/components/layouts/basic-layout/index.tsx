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

  // Layout spacing configuration
  // This object centralizes all layout dimensions in TypeScript, making them easy to maintain and update.
  const spacing = {
    appBar: {
      width: 56,
    },
    navBar: {
      height: 56,
    },
    leftSidebar: {
      width: 256,
    },
    rightSidebar: {
      width: 320,
    },
  }

  // Check if navBar is present
  // This determines whether to subtract navBar height from content-container-main height calculation.
  const hasNavBar = elements.navBar !== undefined
  
  return (
    <div 
      className={styles["basic-layout"]}
      style={{
        // Pass spacing values to CSS via CSS custom properties
        // This allows SCSS to use these values while keeping the source of truth in TypeScript.
        '--spacing-app-bar-width': `${spacing.appBar.width}px`,
        '--spacing-nav-height': `${spacing.navBar.height}px`,
        '--spacing-left-sidebar-width': `${spacing.leftSidebar.width}px`,
        '--spacing-right-sidebar-width': `${spacing.rightSidebar.width}px`,
        // Dynamic navBar height for content height calculation
        // If navBar exists, use its height (56px); otherwise, use 0px.
        // This enables calc(100vh - var(--nav-bar-height)) to work correctly:
        // - With navBar: calc(100vh - 56px)
        // - Without navBar: calc(100vh - 0px) = 100vh
        '--nav-bar-height': hasNavBar ? `${spacing.navBar.height}px` : '0px',
      } as React.CSSProperties}
    >
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
