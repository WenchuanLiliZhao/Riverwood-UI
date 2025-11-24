import { AppBar } from "../_shared-components/bars/appBar";
import { NavBar } from "../_shared-components/bars/navBar";
import { Content } from "../_shared-components/content/content";
import { Footer } from "../_shared-components/content/footer";
import { LeftSidebar } from "../_shared-components/sidebars/leftSidebar";
import { RightSidebar } from "../_shared-components/sidebars/rightSidebar";
import type { LayoutElements } from "../basic-layout/shared";
import styles from "./styles.module.scss";

export interface ContentDesignProps {
  widthMode: "small" | "medium" | "large" | "full";
}

export interface LayoutProps {
  elements: LayoutElements;
  contentDesign: ContentDesignProps;
}

export const Layout: React.FC<LayoutProps> = ({
  elements,
  contentDesign,
  ...props
}) => {
  const hasAppBar = elements.appBar !== undefined;
  const hasNavBar = elements.navBar !== undefined;
  const hasLeftSidebar = elements.leftSidebar !== undefined;
  const hasRightSidebar = elements.rightSidebar !== undefined;

  return (
    <div
      {...props}
      className={`${styles["layout"]} ${
        hasAppBar ? styles["has-app-bar"] : ""
      } ${hasNavBar ? styles["has-nav-bar"] : ""} ${
        hasLeftSidebar ? styles["has-left-sidebar"] : ""
      } ${hasRightSidebar ? styles["has-right-sidebar"] : ""}`}
    >
      <AppBar elements={elements} className={styles["app-bar"]} />
      <NavBar elements={elements} className={styles["nav-bar"]} />
      <LeftSidebar elements={elements} className={styles["left-sidebar"]} />
      <RightSidebar elements={elements} className={styles["right-sidebar"]} />
      <main className={styles["page-body-content"]}>

        {/* The content-start div is used to create a space for the nav-bar. Thus, when the user jumps to a specific id in the content, it will scroll to the top of the content-start div. */}
        <div className={styles["content-start"]} />
        <Content
          elements={elements}
          className={styles["content"]}
          contentDesign={contentDesign}
        />
        <Footer
          elements={elements}
          className={styles["footer"]}
          contentDesign={contentDesign}
        />
      </main>
    </div>
  );
};
