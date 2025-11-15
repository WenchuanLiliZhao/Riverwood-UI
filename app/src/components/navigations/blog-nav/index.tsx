import styles from './styles.module.scss';

export interface BlogNavProps {
  left?: React.ReactNode[];
  center?: React.ReactNode[];
  right?: React.ReactNode[];
}

export const BlogNav: React.FC<BlogNavProps> = ({ left, center, right }) => {
  return (
    <div className={styles["blog-nav"]}>
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