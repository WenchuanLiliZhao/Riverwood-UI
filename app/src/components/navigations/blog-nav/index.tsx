import styles from './styles.module.scss';

export interface BlogNavProps {
  mode: "default" | "fixed-to-top";
  left?: React.ReactNode[];
  center?: React.ReactNode[];
  right?: React.ReactNode[];
  className?: string;
}

export const BlogNav: React.FC<BlogNavProps> = ({ mode, left, center, right, className }) => {
  return (
    <div className={`${styles["blog-nav"]} ${styles[`mode--${mode}`]} ${className}`}>
      <div className={styles["left"]}>
        {left && left.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className={styles["center"]}>
        {center && center.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className={styles["right"]}>
        {right && right.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  )
}