import * as React from "react";
import {
  clockViewData,
  type ChartMetric,
  type ChartMetricData,
  type HourlyRetailPulseData,
} from "../../../mockup-data";
import styles from "./styles.module.scss";
import { SectorPieChart } from "riverwood-ui";

type props = {
  hourlyRetailPulseData: HourlyRetailPulseData | undefined;
  hourlyRetailPulseChartData: Record<ChartMetric, ChartMetricData> | undefined;
};
export const ClockChartView: React.FC<props> = ({
  hourlyRetailPulseData,
  hourlyRetailPulseChartData,
}) => {
  const dataToConsole = `

====== Clock Chart Data ======
${JSON.stringify(clockViewData, null, 2)}
==============================

`;
  console.log(dataToConsole, hourlyRetailPulseData, hourlyRetailPulseChartData);
  
  // Hard-coded sampleData for SectorPieChart
  const sampleData = [
    {
      key: "10:00 ~ 12:00",
      points: [
        { value: 15, color: "hsl(0, 70%, 60%)" },
        { value: 18, color: "#FF8A80" },
      ],
    },
    {
      key: "12:00 ~ 14:00",
      points: [
        { value: 22, color: "hsl(60, 70%, 60%)" },
        { value: 28, color: "#81C784" },
      ],
    },
    {
      key: "14:00 ~ 16:00",
      points: [
        { value: 25, color: "hsl(120, 70%, 60%)" },
        { value: 20, color: "#A1887F" },
      ],
    },
    {
      key: "16:00 ~ 18:00",
      points: [
        { value: 30, color: "hsl(180, 70%, 60%)" },
        { value: 26, color: "#2196F3" },
      ],
    },
    {
      key: "18:00 ~ 20:00",
      points: [
        { value: 35, color: "hsl(240, 70%, 60%)" },
        { value: 32, color: "#9C27B0" },
      ],
    },
    {
      key: "20:00 ~ 22:00",
      points: [
        { value: 20, color: "hsl(300, 70%, 60%)" },
        { value: 18, color: "#795548" },
      ],
    },
  ];

  return (
    <div className={styles["container"]}>
      <div className={styles["the-clock"]}>
        <div className={styles["chart-wrapper"]}>
          <SectorPieChart data={sampleData} />
          {/* 现在，使 SectorPieChart 的扇形数量为每 60 度一组扇形，每组两个扇形重叠 */}
        </div>
      </div>
    </div>
  );
};
