import { ProgressBar } from "../../../../../components";
import styles from "./styles.module.scss";
import { type NetSalesOutlookData } from "../../mockup-data/netSalesOutlook";
import { getChangeColor, type ColorDirection } from "../../mockup-data/color-semantics";

export interface NetSalesOutlookProps {
  data: NetSalesOutlookData;
}

export const NetSalesOutlook = ({ data }: NetSalesOutlookProps) => {
  const { currency, valueCurrent, valueTarget, distributionUnit, segments, lowerItems } = data;

  // Calculate total for percentage calculation
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);

  // Map "up"/"down" to "success"/"failure" for color semantics
  const mapDirectionToColorSemantic = (direction: "up" | "down"): ColorDirection => {
    return direction === "up" ? "success" : "failure";
  };

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US");
  };

  return (
    <div className={styles["net-sales-outlook"]}>
      <div className={styles["upper"]}>
        <div className={styles["header"]}>Net Sales Outlook</div>
        <div className={styles["value-container"]}>
          <span className={styles["value-current"]}>{currency}{formatNumber(valueCurrent)}</span>
          <span className={styles["separator"]}>/</span>
          <span className={styles["value-target"]}>{currency}{formatNumber(valueTarget)}</span>
        </div>
        <div className={styles["distribution"]}>
          <ProgressBar
            distributionData={{
              label: "",
              segments: segments.map(({ id, value, color, label }) => ({
                id,
                value,
                color,
                label,
              })),
              total: totalValue,
              unit: "",
            }}
            designProperties={{
              showHeader: false,
              height: 4,
              cornerRadius: 12,
              distributionGap: 1,
            }}
          />

          <div className={styles["distribution-caption"]}>
            {segments.map((segment) => {
              const percentage = ((segment.value / totalValue) * 100).toFixed(0);
              const changeColor = getChangeColor(mapDirectionToColorSemantic(segment.change.direction));
              const changeSymbol = segment.change.direction === "up" ? "▲" : "▼";

              return (
                <div key={segment.id} className={styles["distribution-caption-item"]}>
                  <div className={styles["distribution-caption-item-content"]}>
                    <span
                      className={styles["distribution-caption-item-label"]}
                      style={{ color: segment.color }}
                    >
                      {segment.label}
                    </span>
                    <span className={styles["distribution-caption-item-value"]}>
                      ({percentage}%)
                    </span>
                  </div>
                  <div className={styles["distribution-caption-item-change"]}>
                    <span className={styles["value"]} style={{ color: changeColor }}>
                      {changeSymbol} {segment.change.value}{distributionUnit}
                    </span>
                    <span className={styles["vs"]}>vs LY</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles["lower"]}>
        {lowerItems.map((item, index) => {
          const changeColor = getChangeColor(mapDirectionToColorSemantic(item.change.direction));
          const changeSymbol = item.change.direction === "up" ? "▲" : "▼";

          return (
            <div key={index} className={styles["lower-item"]}>
              <div className={styles["title"]}>{item.title}</div>
              <div className={styles["value"]}>
                <span className={styles["value-current"]}>
                  {currency}{formatNumber(item.valueCurrent)}
                </span>
                <span className={styles["value-change"]} style={{ color: changeColor }}>
                  {changeSymbol} {item.change.value}%
                </span>
                <span className={styles["value-change-vs"]}>vs LY</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
