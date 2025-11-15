
import { BlogNav, type BlogNavProps } from "../..";
import styles from "./styles.module.scss";

interface BasicLayoutProps {
  blogNav: Omit<BlogNavProps, "mode">;
  children: React.ReactNode;
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
