import React from "react";
import styles from "./styles.module.scss";

export interface FigmaBentoGridProps {
  height: number; // Fixed height in px
  width: number; // Fixed width in px
  rowCount: number; // Number of rows
  colCount: number; // Number of columns
  padding: number; // Padding around the grid in px
  gap: [number, number]; // [horizontal gap, vertical gap] in px
  children?: React.ReactNode;
}

export const FigmaBentoGrid = React.forwardRef<
  HTMLDivElement,
  FigmaBentoGridProps
>(({ height, width, rowCount, colCount, padding, gap, children }, ref) => {
  const [gapX, gapY] = gap;

  const gridStyle: React.CSSProperties = {
    height: `${height}px`,
    width: `${width}px`,
    padding: `${padding}px`,
    gap: `${gapY}px ${gapX}px`,
    display: "grid",
    gridTemplateRows: `repeat(${rowCount}, 1fr)`,
    gridTemplateColumns: `repeat(${colCount}, 1fr)`,
  };

  return (
    <div ref={ref} className={styles.figmaBentoGrid} style={gridStyle}>
      {children}
    </div>
  );
});

FigmaBentoGrid.displayName = "FigmaBentoGrid";

