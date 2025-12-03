import styles from "./_styles.module.scss";

export interface TextMetricProps {
  value: number;
  unit: string;
}

export const TextMetric: React.FC<TextMetricProps> = ({ value, unit }) => {
  return (
    <div className={styles["text-metric"]}>
      <div className={styles["value-container"]}>
        <div className={styles["value"]}>{value}</div>
        <div className={styles["unit"]}>{unit}</div>
      </div>
    </div>
  );
};
