import styles from "./styles.module.scss";
import { COLOR_SEMANTICS } from "../../mockup-data/color-semantics";

export const OutLookCard = () => {
  return (
    <div className={styles["outlook-card"]}>
      <div className={styles["upper"]}>
        <div className={styles["header"]}>Var. to Outlook %</div>

        {/* AI Context: Green for success, Red for failure */}
        <div
          className={styles["value"]}
          style={{ color: COLOR_SEMANTICS.success }}
        >
          + ¥11,553
        </div>
      </div>
      <div className={styles["lower"]}>
        {/* AI Context: Use Object or Array mapping to render the lower items */}
        <div className={styles["lower-item"]}>
          <div className={styles["title"]}>XStore</div>
          <div
            className={styles["value"]}
            style={{ color: COLOR_SEMANTICS.success }}
          >
            +17,328
          </div>
        </div>
        <div className={styles["lower-item"]}>
          <div className={styles["title"]}>WeCom&VS</div>
          <div
            className={styles["value"]}
            style={{ color: COLOR_SEMANTICS.failure }}
          >
            -5,328
          </div>
        </div>
      </div>
    </div>
  );
};
