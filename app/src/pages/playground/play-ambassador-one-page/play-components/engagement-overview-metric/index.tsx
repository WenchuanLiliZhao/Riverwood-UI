import { ProgressBar } from "../../../../../components";
import type { MetricData } from "../../types/metrics";
import styles from "./_styles.module.scss"

export interface EngagementOverviewMetricProps {
  data: MetricData;
}

export const EngagementOverviewMetric = ({ data }: EngagementOverviewMetricProps) => {
  const { percentage, current, total, unit, trendData, description } = data;

  return (
    <div className={styles["engagement-overview-metric"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>{percentage}%</div>
        <div className={styles["value"]}>
          {current}/{total} {unit}
        </div>
      </div>

      <div className={styles["progress-bar-container"]}>
        <div className={styles["content"]}>
          {trendData.map((segmentData, index) => (
            <ProgressBar 
              key={index}
              progressData={{
                label: segmentData.label,
                value: segmentData.value,
                total: segmentData.total,
                unit: segmentData.unit,
                color: segmentData.color,
              }}
              designProperties={{ height: 4 }}
            />
          ))}

          <p className={styles["description"]}>{description}</p>
        </div>
      </div>
    </div>
  );
};