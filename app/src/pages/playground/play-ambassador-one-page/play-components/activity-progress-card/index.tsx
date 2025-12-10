import * as React from "react";
import { MaterialIcon, ProgressBar, WidgetFrame } from "../../../../../components";
import type { ActivityProgressCardData } from "../../data-just-for-1-time-test/activity-progress-card";
import type { DistributionBarData } from "../../../../../components";
import styles from "./_styles.module.scss";

export interface ActivityProgressCardProps {
  data: ActivityProgressCardData;
}

export const ActivityProgressCard: React.FC<ActivityProgressCardProps> = ({ data }) => {
  return (
    <WidgetFrame
      nav={{
        icon: typeof data.icon === "string" ? data.icon : undefined,
        title: data.title,
        controls: [<MaterialIcon key="menu" icon="more_vert" />],
      }}
    >
      <div className={styles["activity-progress-card-content"]}>

        {/* Progress Items List */}
        <div className={styles["items-list"]}>
          {data.items.map((item, index) => {
            const percentage = (item.totalValue / item.maxValue) * 100;
            const roundedPercentage = Math.round(percentage);

            // Convert segments to DistributionSegment format
            const distributionData: DistributionBarData = {
              label: item.label,
              segments: item.segments.map((segment, segmentIndex) => ({
                id: `${index}-${segmentIndex}`,
                value: segment.value,
                color: segment.color,
              })),
              total: item.maxValue,
              unit: "",
            };

            return (
              <div key={index} className={styles["progress-item"]}>
                <div className={styles["item-header"]}>
                  <div className={styles["label"]}>{item.label}</div>
                  <div className={styles["value-container"]}>
                    <span className={styles["value"]}>{item.totalValue}</span>
                    <span className={styles["percentage"]}>({roundedPercentage}%)</span>
                  </div>
                </div>
              <div className={styles["progress-bar-wrapper"]}>
                <ProgressBar
                  distributionData={distributionData}
                  designProperties={{ height: 6, showHeader: false }}
                />
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </WidgetFrame>
  );
};

ActivityProgressCard.displayName = "ActivityProgressCard";
