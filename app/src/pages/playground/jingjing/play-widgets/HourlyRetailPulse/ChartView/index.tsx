import * as React from "react";
import { Switch } from "../../../../../../components";
import { SalesProgressHeader } from "../SalesProgressHeader";
import {
  hourlyRetailPulseData,
  type ChartMetric,
} from "../../../mockup-data";
import styles from "./ChartView.module.scss";

export const ChartView: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = React.useState<ChartMetric>("netSales");

  const { currentSales, targetSales, currency } = hourlyRetailPulseData;

  const group1Options = [
    { value: "netSales", label: "Net Sales" },
    { value: "trafficCR", label: "Traffic-CR" },
  ];

  const group2Options = [
    { value: "txn", label: "TXN" },
    { value: "aov", label: "AOV" },
    { value: "upt", label: "UPT" },
  ];

  return (
    <div className={styles.container}>
      <SalesProgressHeader
        currentSales={currentSales}
        targetSales={targetSales}
        currency={currency}
      />
      <div className={styles["metric-selector"]}>
        <Switch
          options={group1Options}
          value={selectedMetric}
          onChange={(value) => setSelectedMetric(value as ChartMetric)}
          size="medium"
          hoverable={false}
        />
        <Switch
          options={group2Options}
          value={selectedMetric}
          onChange={(value) => setSelectedMetric(value as ChartMetric)}
          size="medium"
          hoverable={false}
        />
      </div>
      <div className={styles["chart-wrapper"]}>
        {/* TrendChart temporarily disabled - component not available */}
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          Chart placeholder - TrendChart component not available
        </div>
      </div>
    </div>
  );
};
