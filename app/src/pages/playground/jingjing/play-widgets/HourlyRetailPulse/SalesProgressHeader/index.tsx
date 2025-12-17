import * as React from "react";
import { ProgressBar } from "../../../../../../components";
import styles from "./SalesProgressHeader.module.scss";

export interface SalesProgressHeaderProps {
  currentSales: number;
  targetSales: number;
  currency: string;
}

export const SalesProgressHeader: React.FC<SalesProgressHeaderProps> = ({
  currentSales,
  targetSales,
  currency,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles["text-labels"]}>
        <div className={styles["current-sales"]}>
          {currency}
          {currentSales.toLocaleString()}
        </div>
        <div className={styles["target-sales"]}>
          {currency}
          {targetSales.toLocaleString()}
        </div>
      </div>
      <div className={styles["progress-bar-wrapper"]}>
        <ProgressBar
          progressData={{
            label: "",
            value: currentSales,
            total: targetSales,
            unit: currency,
            color: "#FF4646",
            caption: "",
          }}
          designProperties={{
            showHeader: false,
            height: 8,
            cornerRadius: 4,
          }}
        />
      </div>
    </div>
  );
};

