import { getChangeColor, type ColorDirection } from "../../mockup-data";
import styles from "./styles.module.scss";
import { type KPIMetricData } from "../../mockup-data/kpiMetric";

export interface KPIMetricProps {
  data: KPIMetricData;
}

export const KPIMetric = ({ data }: KPIMetricProps) => {
  const { title, value, valueIsPercentage, change } = data;

  // Map "up"/"down" to "success"/"failure" for color semantics
  const mapDirectionToColorSemantic = (direction: "up" | "down"): ColorDirection => {
    return direction === "up" ? "success" : "failure";
  };

  // Format the main value - add % if valueIsPercentage is true
  const formatValue = (): string => {
    // For percentage values, show decimal only if needed (e.g., 8.4% not 8.40%)
    if (valueIsPercentage) {
      const displayValue = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
      return `${displayValue}%`;
    }
    // For non-percentage values, format with commas if needed
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
  };

  // Format the change value
  const formatChange = (): { display: string; color: string } => {
    const changeSymbol = change.direction === "up" ? "▲" : "▼";
    const color = getChangeColor(mapDirectionToColorSemantic(change.direction));
    
    let unitDisplay: string;
    if (change.unit === "percentage") {
      unitDisplay = "%";
    } else {
      // points
      unitDisplay = "pts";
    }

    return {
      display: `${changeSymbol} ${change.value}${unitDisplay}`,
      color,
    };
  };

  const changeFormatted = formatChange();

  return (
    <div className={styles["kpi-metric"]}>
      <div className={styles["upper"]}>
        <div className={styles["header"]}>{title}</div>
        <div className={styles["value"]}>{formatValue()}</div>
      </div>
      <div className={styles["lower"]}>
        <div className={styles["change"]} style={{ color: changeFormatted.color }}>
          {changeFormatted.display}
        </div>
        <div className={styles["vs"]}>vs LY</div>
      </div>
    </div>
  );
};