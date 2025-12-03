import { ProgressBar } from "../../../../../components";
import { progressBarData } from "../../data/data-just-for-1-time-test";
import styles from "./_styles.module.scss"

export const EngagementOverviewMetric = () => {
  return (
    <div className={styles["engagement-overview-metric"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>44%</div>
        <div className={styles["value"]}>288/660 days</div>
      </div>

      <div className={styles["progress-bar-container"]}>
        <div className={styles["content"]}>
          <ProgressBar progressData={progressBarData} designProperties={{ height: 4 }} />

          <ProgressBar progressData={progressBarData} designProperties={{ height: 4 }} />

          <p className={styles["description"]}>A measure showing how much of the expected service commitment has been fulfilled so far</p>
        </div>
      </div>
    </div>
  );
};