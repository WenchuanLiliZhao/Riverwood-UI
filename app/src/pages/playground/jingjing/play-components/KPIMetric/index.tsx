import { getChangeColor, type ColorDirection } from "../../mockup-data";
import styles from "./styles.module.scss";
import { type KPIMetricData } from "../../mockup-data/kpiMetric";
import { NumberRoll } from "../../../../../components";

export interface KPIMetricProps {
  data: KPIMetricData;
}

export const KPIMetric = ({ data }: KPIMetricProps) => {
  const { title, value, valueIsPercentage, change } = data;

  // Map "up"/"down" to "success"/"failure" for color semantics
  const mapDirectionToColorSemantic = (direction: "up" | "down"): ColorDirection => {
    return direction === "up" ? "success" : "failure";
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
        <div className={styles["value"]}>
          <NumberRoll value={value} useThousandsSeparator={!valueIsPercentage} />
          {valueIsPercentage && "%"}
        </div>
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