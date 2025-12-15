import { ProgressBar } from "../../../../../components";
import styles from "./styles.module.scss";

export const NetSalesOutlook = () => {

  const currency = "¥";

  const valueCurrent = 290909;
  const valueTarget = 297356;

  const distributionUnit = "pts";

  return (
    <div className={styles["net-sales-outlook"]}>
      <div className={styles["upper"]}>
        <div className={styles["header"]}>Net Sales Outlook</div>
        <div className={styles["value-container"]}>
          <span className={styles["value-current"]}>{currency}{valueCurrent}</span><span className={styles["separator"]}>/</span><span className={styles["value-target"]}>{currency}{valueTarget}</span>
        </div>
        <div className={styles["distribution"]}>
          <ProgressBar
            distributionData={{
              label: "",
              segments: [
                {
                  id: "red",
                  value: 67,
                  color: "#ef4444", // Red
                  label: "Women",
                },
                {
                  id: "light-blue",
                  value: 3,
                  color: "#93c5fd", // Light blue/periwinkle
                  label: "Men",
                },
                {
                  id: "light-purple",
                  value: 14,
                  color: "#c4b5fd", // Light purple/lavender
                  label: "Acc",
                },
                {
                  id: "orange",
                  value: 16,
                  color: "#fb923c", // Orange/golden yellow
                  label: "FTW",
                },
              ],
              total: 100,
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
            <div className={styles["distribution-caption-item"]}>
              <div className={styles["distribution-caption-item-content"]}>
                <span className={styles["distribution-caption-item-label"]} style={{ color: "#ef4444" }}>Women</span>
                <span className={styles["distribution-caption-item-value"]}>({
                  (67 / (67 + 3 + 14 + 16) * 100).toFixed(0)
                }%)</span>
              </div>
              <div className={styles["distribution-caption-item-change"]}>
                {/* red for success, green for failure */}
                <span className={styles["value"]} style={{ color: "#ef4444" }}>▼ 6{distributionUnit}</span>
                <span className={styles["vs"]}>vs LY</span>
              </div>
            </div>
            <div className={styles["distribution-caption-item"]}>
              <div className={styles["distribution-caption-item-content"]}>
                <span className={styles["distribution-caption-item-label"]} style={{ color: "#93c5fd" }}>Men</span>
                <span className={styles["distribution-caption-item-value"]}>({
                  (3 / (67 + 3 + 14 + 16) * 100).toFixed(0)
                }%)</span>
              </div>
              <div className={styles["distribution-caption-item-change"]}>
                <span className={styles["value"]} style={{ color: "#22c55e" }}>▲ 12{distributionUnit}</span>
                <span className={styles["vs"]}>vs LY</span>
              </div>
            </div>
            <div className={styles["distribution-caption-item"]}>
              <div className={styles["distribution-caption-item-content"]}>
                <span className={styles["distribution-caption-item-label"]} style={{ color: "#c4b5fd" }}>Acc</span>
                <span className={styles["distribution-caption-item-value"]}>({
                  (14 / (67 + 3 + 14 + 16) * 100).toFixed(0)
                }%)</span>
              </div>
              <div className={styles["distribution-caption-item-change"]}>
                <span className={styles["value"]} style={{ color: "#ef4444" }}>▼ 6{distributionUnit}</span>
                <span className={styles["vs"]}>vs LY</span>
              </div>
            </div>
            <div className={styles["distribution-caption-item"]}>
              <div className={styles["distribution-caption-item-content"]}>
                <span className={styles["distribution-caption-item-label"]} style={{ color: "#fb923c" }}>FTW</span>
                <span className={styles["distribution-caption-item-value"]}>({
                  (16 / (67 + 3 + 14 + 16) * 100).toFixed(0)
                }%)</span>
              </div>
              <div className={styles["distribution-caption-item-change"]}>
                <span className={styles["value"]} style={{ color: "#22c55e" }}>▲ 12{distributionUnit}</span>
                <span className={styles["vs"]}>vs LY</span>
              </div>
            </div>
          </div>


        </div>
      </div>
      <div className={styles["lower"]}>
        {/* AI Context: there are only two lower-items in the lower section */}
        <div className={styles["lower-item"]}>
          <div className={styles["title"]}>XStore</div>
          <div className={styles["value"]}>
            <span className={styles["value-current"]}>{currency}220,976</span>
            <span className={styles["value-change"]} style={{ color: "#22c55e" }}>▲ 12%</span>
            <span className={styles["value-change-vs"]}>vs LY</span>
          </div>
        </div>
        <div className={styles["lower-item"]}>
          <div className={styles["title"]}>XStore</div>
          <div className={styles["value"]}>
            <span className={styles["value-current"]}>{currency}69,933</span>
            <span className={styles["value-change"]} style={{ color: "#ef4444" }}>▼ 10%</span>
            <span className={styles["value-change-vs"]}>vs LY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
