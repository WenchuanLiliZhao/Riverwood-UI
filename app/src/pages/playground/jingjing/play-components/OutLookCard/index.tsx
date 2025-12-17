import styles from "./styles.module.scss";
import { COLOR_SEMANTICS } from "../../mockup-data/color-semantics";
import { type OutlookCardData } from "../../mockup-data/outlookCard";
import { NumberRoll } from "../../../../../components";

export interface OutLookCardProps {
  data: OutlookCardData;
}

export const OutLookCard = ({ data }: OutLookCardProps) => {
  const { type, title, mainValue, currency, breakdownItems } = data;

  // Get main value formatting info based on type
  const getMainValueInfo = (): {
    value: number;
    sign?: string;
    currency?: string;
    suffix?: string;
    color: string;
  } => {
    if (type === "variance") {
      const isPositive = mainValue >= 0;
      const sign = isPositive ? "+" : "-";
      const color = isPositive ? COLOR_SEMANTICS.success : COLOR_SEMANTICS.failure;
      return {
        value: Math.abs(mainValue),
        sign,
        currency,
        color,
      };
    } else {
      // percentage type
      const isAboveOutlook = mainValue >= 100;
      const color = isAboveOutlook ? COLOR_SEMANTICS.success : COLOR_SEMANTICS.failure;
      return {
        value: mainValue,
        suffix: "%",
        color,
      };
    }
  };

  // Get breakdown item value formatting info based on type
  const getBreakdownValueInfo = (value: number): {
    value: number;
    sign?: string;
    suffix?: string;
    color: string;
  } => {
    if (type === "variance") {
      const isPositive = value >= 0;
      const sign = isPositive ? "+" : "-";
      const color = isPositive ? COLOR_SEMANTICS.success : COLOR_SEMANTICS.failure;
      // Breakdown items for variance don't include currency symbol, only sign and number
      return {
        value: Math.abs(value),
        sign,
        color,
      };
    } else {
      // percentage type
      const isAboveOutlook = value >= 100;
      const color = isAboveOutlook ? COLOR_SEMANTICS.success : COLOR_SEMANTICS.failure;
      return {
        value,
        suffix: "%",
        color,
      };
    }
  };

  const mainValueInfo = getMainValueInfo();

  return (
    <div className={styles["outlook-card"]}>
      <div className={styles["upper"]}>
        <div className={styles["header"]}>{title}</div>
        <div className={styles["value"]} style={{ color: mainValueInfo.color }}>
          {mainValueInfo.sign && `${mainValueInfo.sign} `}
          {mainValueInfo.currency}
          <NumberRoll value={mainValueInfo.value} useThousandsSeparator={true} />
          {mainValueInfo.suffix}
        </div>
      </div>
      <div className={styles["lower"]}>
        {breakdownItems.map((item, index) => {
          const itemValueInfo = getBreakdownValueInfo(item.value);
          return (
            <div key={index} className={styles["lower-item"]}>
              <div className={styles["title"]}>{item.title}</div>
              <div className={styles["value"]} style={{ color: itemValueInfo.color }}>
                {itemValueInfo.sign}
                <NumberRoll value={itemValueInfo.value} useThousandsSeparator={true} />
                {itemValueInfo.suffix}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
