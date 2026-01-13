import * as React from "react";
import {
  clockViewData,
  type ChartMetric,
  type ChartMetricData,
  type HourlyRetailPulseData,
  type ClockViewDataItemType,
  type NumberWithUnitType,
} from "../../../mockup-data";
import styles from "./styles.module.scss";

import { Modal } from "../../../play-components/Modal";
import { SectorPieChart, type SectorPieChartDataItem } from "../../../../../../components";

type props = {
  hourlyRetailPulseData: HourlyRetailPulseData | undefined;
  hourlyRetailPulseChartData: Record<ChartMetric, ChartMetricData> | undefined;
};
export const ClockChartView: React.FC<props> = ({
  hourlyRetailPulseData,
  hourlyRetailPulseChartData,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<{
    timeSlot: string;
    data: ClockViewDataItemType;
  } | null>(null);

  const dataToConsole = `

====== Clock Chart Data ======
${JSON.stringify(clockViewData, null, 2)}
==============================

`;
  console.log(dataToConsole, hourlyRetailPulseData, hourlyRetailPulseChartData);
  
  // Transform clockViewData to SectorPieChart format
  // Need to transpose the data: each series should have 6 points (one per time slot)
  // so that each sector is 60 degrees (360 / 6 = 60)
  const chartData = React.useMemo(() => {
    const timeSlots = Object.keys(clockViewData);
    const maxDataPoints = Math.max(
      ...Object.values(clockViewData).map((items) => items.length)
    );

    // Create one series for each data point index
    // Each series will have 6 points (one for each time slot)
    const series: SectorPieChartDataItem[] = [];
    
    for (let pointIndex = 0; pointIndex < maxDataPoints; pointIndex++) {
      const points: Array<{ value: number; color: string }> = [];
      
      timeSlots.forEach((timeSlot) => {
        const dataItems = clockViewData[timeSlot];
        const item = dataItems[pointIndex];
        
        if (item) {
          // Only extract value and color for rendering
          // otherValues (traffic, txn, upt, etc.) are ignored for chart display
          points.push({
            value: item.value,
            color: item.color || `hsl(${(pointIndex * 60) % 360}, 70%, 60%)`,
          });
        } else {
          // Fill missing data with 0
          points.push({
            value: 0,
            color: `hsl(${(pointIndex * 60) % 360}, 70%, 60%)`,
          });
        }
      });
      
      series.push({
        key: `series-${pointIndex}`,
        points,
      });
    }
    
    return series;
  }, []);

  const handleSectorClick = (seriesIndex: number, valueIndex: number) => {
    const timeSlots = Object.keys(clockViewData);
    const timeSlot = timeSlots[valueIndex];
    const dataItems = clockViewData[timeSlot];
    const clickedData = dataItems[seriesIndex];

    if (clickedData) {
      setSelectedData({ timeSlot, data: clickedData });
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["the-clock"]}>
        <div className={styles["chart-wrapper"]}>
          <SectorPieChart 
            data={chartData} 
            startTime="10:00"
            onSectorClick={handleSectorClick}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedData && (
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <div className={styles["main-value"]}>
                <span className={styles["label"]}>Var. to Outlook</span>
                <span className={styles["value"]}>
                  {selectedData.data.otherValues["var to outlook"].value.value < 0 ? "-" : ""}
                  {selectedData.data.otherValues["var to outlook"].value.unit}
                  {Math.abs(selectedData.data.otherValues["var to outlook"].value.value)}
                </span>
              </div>
            </div>

            <div className={styles["metrics-list"]}>
              <MetricRow
                label="Traffic"
                value={selectedData.data.otherValues.traffic.value}
                change={selectedData.data.otherValues.traffic.change}
              />
              <MetricRow
                label="TXN"
                value={selectedData.data.otherValues.txn.value}
                change={selectedData.data.otherValues.txn.change}
              />
              <MetricRow
                label="UPT"
                value={selectedData.data.otherValues.upt.value}
                change={selectedData.data.otherValues.upt.change}
              />
              <MetricRow
                label="Utilization %"
                value={selectedData.data.otherValues["utilization %"].value}
                change={selectedData.data.otherValues["utilization %"].change}
                unit="pts"
              />
              <MetricRow
                label="Try-on CR %"
                value={selectedData.data.otherValues["try-on cr %"].value}
                change={selectedData.data.otherValues["try-on cr %"].change}
                unit="pts"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

interface MetricRowProps {
  label: string;
  value: NumberWithUnitType;
  change: number;
  unit?: string;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, value, change, unit = "%" }) => {
  const isPositive = change >= 0;
  const changeUnit = unit === "pts" ? "pts" : "%";
  
  return (
    <div className={styles["metric-row"]}>
      <div className={styles["metric-label"]}>{label}</div>
      <div className={styles["metric-value"]}>
        <span className={styles["value-number"]}>{value.value}</span>
        {value.unit && <span className={styles["unit"]}>{value.unit}</span>}
      </div>
      <div className={`${styles["metric-change"]} ${isPositive ? styles["positive"] : styles["negative"]}`}>
        <span className={styles["arrow"]}>{isPositive ? "▲" : "▼"}</span>
        <span className={styles["change-value"]}>{Math.abs(change)}{changeUnit}</span>
        <span className={styles["vs-label"]}>vs LH</span>
      </div>
    </div>
  );
};
