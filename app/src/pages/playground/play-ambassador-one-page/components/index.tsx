import styles from "./_styles.module.scss";

export interface TitleOnNavProps {
  title: string;
}

export const TitleOnNav = ({ title }: TitleOnNavProps) => {
  return (
    <div className={styles["title-on-nav"]}>
      <div className={styles["text"]}>{title}</div>
    </div>
  )
}