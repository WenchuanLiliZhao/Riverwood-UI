import React from "react";
import styles from "./styles.module.scss";

export interface FigmaBentoItemProps {
  row: [number, number]; // [start, span] - grid row start and span
  col: [number, number]; // [start, span] - grid column start and span
  children?: React.ReactNode;
  className?: string;
}

export const FigmaBentoItem = React.forwardRef<
  HTMLDivElement,
  FigmaBentoItemProps
>(({ row, col, children, className }, ref) => {
  const [rowStart, rowSpan] = row;
  const [colStart, colSpan] = col;

  const itemStyle: React.CSSProperties = {
    gridRowStart: rowStart,
    gridRowEnd: `span ${rowSpan}`,
    gridColumnStart: colStart,
    gridColumnEnd: `span ${colSpan}`,
  };

  return (
    <div
      ref={ref}
      className={`${styles.figmaBentoItem} ${className || ""}`}
      style={itemStyle}
    >
      {children}
    </div>
  );
});

FigmaBentoItem.displayName = "FigmaBentoItem";

