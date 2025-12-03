import styles from "./_styles.module.scss";

export interface DocSectionProps {
  label?: string | React.ReactNode;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
}

export const DocSection: React.FC<DocSectionProps> = ({
  label,
  title,
  description,
  children,
}) => {
  return (
    <section className={styles["doc-section"]}>
      <div className={styles["header"]}>
        <div className={styles["title-group"]}>
          {label && <div className={styles["label"]}>{label}</div>}
          <div className={styles["title"]}>{title}</div>
        </div>
        {description && <div className={styles["description"]}>{description}</div>}
      </div>
      <div className={styles["content"]}>{children}</div>
    </section>
  );
};

export default DocSection;
