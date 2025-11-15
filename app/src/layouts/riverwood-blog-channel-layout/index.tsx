
import { BlogNav, type BlogNavProps } from "../../components";
import type { SharedLayoutProps } from "../sharedProps";
import styles from "./styles.module.scss";
interface BasicLayoutProps extends SharedLayoutProps {
  blogNav: Omit<BlogNavProps, "mode">;
}

export const BasicLayout: React.FC<BasicLayoutProps> = ({
  blogNav,
  children,
}) => {
  return (
    <div className={styles["layout"]}>
      <BlogNav mode="fixed-to-top" {...blogNav} className={styles["nav"]} />

      <main className={styles["main"]}>
        {children}
      </main>
    </div>
  );
};
