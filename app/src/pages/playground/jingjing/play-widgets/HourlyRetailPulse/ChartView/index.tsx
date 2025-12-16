import * as React from "react";
import {
  TrendChart,
  Switch,
  type ChartDataPoint,
  type SeriesConfig,
} from "../../../../../../components";
import { SalesProgressHeader } from "../SalesProgressHeader";
import {
  hourlyRetailPulseData,
  hourlyRetailPulseChartData,
  type ChartMetric,
} from "../../../mockup-data";
import styles from "./ChartView.module.scss";

export const ChartView: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = React.useState<ChartMetric>("netSales");

  const { currentSales, targetSales, currency } = hourlyRetailPulseData;
  const metricData = hourlyRetailPulseChartData[selectedMetric];

  // Transform data for TrendChart
  const chartData: ChartDataPoint[] = metricData.data.map((point) => ({
    label: point.label,
    current: point.current,
    lastWeek: point.lastWeek,
    outlook: point.outlook,
  }));

  // Series configuration
  const seriesConfig: SeriesConfig[] = [
    {
      key: "current",
      title: metricData.label,
      displayAs: "curve",
      color: "#FF4646", // Red solid line
      unit: metricData.unit,
      strokeDasharray: undefined, // Solid line
    },
    {
      key: "lastWeek",
      title: `${metricData.label} Last Week`,
      displayAs: "curve",
      color: "#A1B5FF", // Light blue dotted line
      unit: metricData.unit,
      strokeDasharray: "2 2", // Dotted line
    },
    {
      key: "outlook",
      title: `${metricData.label} Outlook`,
      displayAs: "curve",
      color: "#E092FF", // Purple dashed line
      unit: metricData.unit,
      strokeDasharray: "5 5", // Dashed line
    },
  ];

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
        <TrendChart
          data={chartData}
          series={seriesConfig}
          showLegend={true}
          legendPosition="bottom"
          showGrid={true}
        />
      </div>
    </div>
  );
};
