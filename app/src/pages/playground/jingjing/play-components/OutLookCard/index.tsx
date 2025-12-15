import styles from "./styles.module.scss";
import { COLOR_SEMANTICS } from "../../mockup-data/color-semantics";
import { type OutlookCardData } from "../../mockup-data/outlookCard";

export interface OutLookCardProps {
  data: OutlookCardData;
}

export const OutLookCard = ({ data }: OutLookCardProps) => {
  const { type, title, mainValue, currency, breakdownItems } = data;

  // Format number with commas
  const formatNumber = (num: number): string => {
    return Math.abs(num).toLocaleString("en-US");
  };

  // Format main value based on type
  const formatMainValue = (): { display: string; color: string } => {
    if (type === "variance") {
      const isPositive = mainValue >= 0;
      const sign = isPositive ? "+" : "-";
      const color = isPositive ? COLOR_SEMANTICS.success : COLOR_SEMANTICS.failure;
      return {
        display: `${sign} ${currency}${formatNumber(mainValue)}`,
        color,
      };
    } else {
      // percentage type
      const isAboveOutlook = mainValue >= 100;
      const color = isAboveOutlook ? COLOR_SEMANTICS.success : COLOR_SEMANTICS.failure;
      // For percentage, show decimal only if needed (e.g., 104.1% not 104.0%)
      const displayValue = mainValue % 1 === 0 ? mainValue.toFixed(0) : mainValue.toFixed(1);
      return {
        display: `${displayValue}%`,
        color,
      };
    }
  };

  // Format breakdown item value based on type
  const formatBreakdownValue = (value: number): { display: string; color: string } => {
    if (type === "variance") {
      const isPositive = value >= 0;
      const sign = isPositive ? "+" : "-";
      const color = isPositive ? COLOR_SEMANTICS.success : COLOR_SEMANTICS.failure;
      // Breakdown items for variance don't include currency symbol, only sign and number
      return {
        display: `${sign}${formatNumber(value)}`,
        color,
      };
    } else {
      // percentage type
      const isAboveOutlook = value >= 100;
      const color = isAboveOutlook ? COLOR_SEMANTICS.success : COLOR_SEMANTICS.failure;
      // For percentage, show decimal only if needed (e.g., 106% not 106.0%)
      const displayValue = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
      return {
        display: `${displayValue}%`,
        color,
      };
    }
  };

  const mainValueFormatted = formatMainValue();

  return (
    <div className={styles["outlook-card"]}>
      <div className={styles["upper"]}>
        <div className={styles["header"]}>{title}</div>
        <div className={styles["value"]} style={{ color: mainValueFormatted.color }}>
          {mainValueFormatted.display}
        </div>
      </div>
      <div className={styles["lower"]}>
        {breakdownItems.map((item, index) => {
          const itemValueFormatted = formatBreakdownValue(item.value);
          return (
            <div key={index} className={styles["lower-item"]}>
              <div className={styles["title"]}>{item.title}</div>
              <div className={styles["value"]} style={{ color: itemValueFormatted.color }}>
                {itemValueFormatted.display}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
