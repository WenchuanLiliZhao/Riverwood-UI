import * as React from "react";
import { Button } from "../../../../../../components";
import { SalesProgressHeader } from "../SalesProgressHeader";
import {
  hourlyRetailPulseData,
  type HourlyRetailPulseRowData,
  type FeedbackType,
} from "../../../mockup-data";
import { FeedbackModal } from "./FeedbackModal";
import styles from "./TableView.module.scss";

const formatNumber = (value: number | null, isPercentage: boolean = false): string => {
  if (value === null) return "";
  if (isPercentage) {
    return `${value.toFixed(1)}%`;
  }
  return value.toLocaleString();
};

const formatCurrency = (value: number | null, currency: string): string => {
  if (value === null) return "";
  return `${currency}${value.toLocaleString()}`;
};

interface TableRowProps {
  row: HourlyRetailPulseRowData;
  currency: string;
  feedback: FeedbackType;
  onFeedbackChange: (feedback: FeedbackType) => void;
  onThumbsUpClick: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
  row,
  currency,
  feedback,
  onFeedbackChange,
  onThumbsUpClick,
}) => {
  const isSummary = row.isSummary ?? false;

  const handleThumbsUpClick = () => {
    if (feedback === "thumbsUp") {
      onFeedbackChange(null);
    } else {
      onThumbsUpClick();
    }
  };

  const handleThumbsDownClick = () => {
    onFeedbackChange(feedback === "thumbsDown" ? null : "thumbsDown");
  };

  return (
    <tr className={isSummary ? styles["summary-row"] : undefined}>
      <td className={`${styles.cell} ${styles["time-slot-cell"]}`}>{row.timeSlot}</td>
      <td className={styles.cell}>
        {row.netSales !== null
          ? formatCurrency(row.netSales, currency)
          : ""}
      </td>
      <td className={styles.cell}>
        {row.netSalesOutlook !== null
          ? formatCurrency(row.netSalesOutlook, currency)
          : ""}
      </td>
      <td className={styles.cell}>
        {formatNumber(row.percentToOutlook, true)}
      </td>
      <td className={styles.cell}>{formatNumber(row.txn)}</td>
      <td className={styles.cell}>{formatNumber(row.txnGoal)}</td>
      <td className={styles.cell}>
        {row.aov !== null ? formatCurrency(row.aov, currency) : ""}
      </td>
      <td className={styles.cell}>{formatNumber(row.upt)}</td>
      <td className={styles.cell}>{formatNumber(row.cr, true)}</td>
      <td className={styles["feedback-cell"]}>
        {!isSummary && (
          <>
            <Button
              content={{ icon: "thumb_up" }}
              design={{
                variant: "ghost",
                semantic: feedback === "thumbsUp" ? "brand" : "negative",
                size: "small",
              }}
              className={styles["feedback-button"]}
              hoverable={true}
              onClick={handleThumbsUpClick}
            />
            <Button
              content={{ icon: "thumb_down" }}
              design={{
                variant: "ghost",
                semantic: feedback === "thumbsDown" ? "brand" : "negative",
                size: "small",
              }}
              className={styles["feedback-button"]}
              hoverable={true}
              onClick={handleThumbsDownClick}
            />
          </>
        )}
      </td>
    </tr>
  );
};

export const TableView: React.FC = () => {
  const { currentSales, targetSales, currency, rows } = hourlyRetailPulseData;

  // Initialize feedback state from data
  const [feedbackState, setFeedbackState] = React.useState<Record<number, FeedbackType>>(() => {
    const initialState: Record<number, FeedbackType> = {};
    rows.forEach((row, index) => {
      if (!row.isSummary) {
        initialState[index] = row.feedback ?? null;
      }
    });
    return initialState;
  });

  // Feedback modal state
  const [feedbackModalOpen, setFeedbackModalOpen] = React.useState(false);
  const [pendingThumbsUpRowIndex, setPendingThumbsUpRowIndex] = React.useState<number | null>(null);

  const handleFeedbackChange = (rowIndex: number, feedback: FeedbackType) => {
    setFeedbackState((prev) => ({
      ...prev,
      [rowIndex]: feedback,
    }));
  };

  const handleThumbsUpClick = (rowIndex: number) => {
    setPendingThumbsUpRowIndex(rowIndex);
    setFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = (reason: string) => {
    // reason is collected but can be stored/used later if needed
    void reason; // Mark as used to satisfy linter
    if (pendingThumbsUpRowIndex !== null) {
      handleFeedbackChange(pendingThumbsUpRowIndex, "thumbsUp");
      setPendingThumbsUpRowIndex(null);
    }
  };

  const handleFeedbackModalClose = () => {
    setFeedbackModalOpen(false);
    setPendingThumbsUpRowIndex(null);
  };

  return (
    <div className={styles.container}>
      <SalesProgressHeader
        currentSales={currentSales}
        targetSales={targetSales}
        currency={currency}
      />
      <div className={styles["table-wrapper"]}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.header}>Time Slot</th>
              <th className={styles.header}>Net Sales</th>
              <th className={styles.header}>Net Sales Outlook</th>
              <th className={styles.header}>% to Outlook</th>
              <th className={styles.header}>TXN</th>
              <th className={styles.header}>TXN Goal</th>
              <th className={styles.header}>AOV</th>
              <th className={styles.header}>UPT</th>
              <th className={styles.header}>CR%</th>
              <th className={`${styles.header} ${styles["feedback-header"]}`}>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: HourlyRetailPulseRowData, index: number) => (
              <TableRow
                key={index}
                row={row}
                currency={currency}
                feedback={feedbackState[index] ?? null}
                onFeedbackChange={(feedback) => handleFeedbackChange(index, feedback)}
                onThumbsUpClick={() => handleThumbsUpClick(index)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {pendingThumbsUpRowIndex !== null && (
        <FeedbackModal
          isOpen={feedbackModalOpen}
          onClose={handleFeedbackModalClose}
          onSubmit={handleFeedbackSubmit}
          timeSlot={rows[pendingThumbsUpRowIndex]?.timeSlot ?? ""}
        />
      )}
    </div>
  );
};
