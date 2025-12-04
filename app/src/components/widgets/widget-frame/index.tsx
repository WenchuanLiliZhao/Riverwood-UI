import { MaterialIcon } from "../..";
import styles from "./_styles.module.scss";

export interface WidgetFrameProps {
  nav?: {
    icon?: string;
    title?: string;
    left?: React.ReactNode[];
    controls?: React.ReactNode[];
  };
  children: React.ReactNode;
}

export const WidgetFrame: React.FC<WidgetFrameProps> = ({ nav, children }) => {
  return (
    <div className={styles["widget-frame"]}>
      {nav && <div className={styles["widget-frame-nav"]}>
        <div className={styles["title-container"]}>
          {nav.icon && (
            <div className={styles["icon-container"]}>
              <MaterialIcon icon={nav.icon} />
            </div>
          )}
          {nav.title && (
            <div className={styles["title-container"]}>{nav.title}</div>
          )}
        </div>
        <div className={styles["controls-container"]}>
          {nav.controls?.map((item, index) => (
            <div key={index} className={styles["control-container"]}>
              {item}
            </div>
          ))}
        </div>
      </div>}

      <div className={styles["widget-frame-content"]}>{children}</div>
    </div>
  );
};
