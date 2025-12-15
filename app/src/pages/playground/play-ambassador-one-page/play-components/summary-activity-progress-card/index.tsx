import * as React from "react";
import { ProgressBar, Tooltip } from "../../../../../components";
import type { ActivityProgressCardData } from "../../types/activity-progress";
import type { DistributionBarData } from "../../../../../components";
import styles from "./_styles.module.scss";
import {
  FUNNEL_WIDTH_STEP,
  LEVEL_0_INTERNAL_RATIO,
  LEVEL_1_INTERNAL_RATIO,
  TRAPEZOID_OPACITY,
  TRAPEZOID_FILL_COLOR,
  TRAPEZOID_GRADIENT,
  TRAPEZOID_HORIZONTAL_INSET,
  FUNNEL_BAR_HEIGHT,
  FUNNEL_CONNECTOR_HEIGHT,
  FUNNEL_BAR_BORDER_RADIUS,
  LABEL_MIN_WIDTH,
  LABEL_GAP,
  LABEL_FONT_SIZE,
  LABEL_FONT_WEIGHT,
  SEGMENT_LABEL_FONT_SIZE,
  SEGMENT_LABEL_FONT_WEIGHT,
  CONNECTOR_LABEL_FONT_SIZE,
  CONNECTOR_LABEL_FONT_WEIGHT,
} from "./constants";

export interface SummaryActivityProgressCardProps {
  data: ActivityProgressCardData;
  showAs?: "progress" | "funnel";
}

export const SummaryActivityProgressCard: React.FC<SummaryActivityProgressCardProps> = ({ 
  data, 
  showAs = "progress" 
}) => {
  
  // Progress view (default)
  const renderProgressView = () => (
    <div className={styles["items-list"]}>
      {data.items.map((item, index) => {
        const percentage = (item.totalValue / item.maxValue) * 100;
        const roundedPercentage = Math.round(percentage);

        // Convert segments to DistributionSegment format
        const distributionData: DistributionBarData = {
          label: item.label,
          segments: item.segments.map((segment, segmentIndex) => ({
            id: `${index}-${segmentIndex}`,
            value: segment.value,
            color: segment.color,
          })),
          total: item.maxValue,
          unit: "",
        };

        return (
          <div key={index} className={styles["progress-item"]}>
            <div className={styles["item-header"]}>
              <div className={styles["label"]}>{item.label}</div>
              <div className={styles["value-container"]}>
                <span className={styles["value"]}>{item.totalValue}</span>
                <span className={styles["percentage"]}>({roundedPercentage}%)</span>
              </div>
            </div>
            <div className={styles["progress-bar-wrapper"]}>
              <ProgressBar
                distributionData={distributionData}
                designProperties={{ height: 8, showHeader: false }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  // Funnel view
  const renderFunnelView = () => {
    // Set CSS variables for dynamic styling
    const cssVars = {
      '--funnel-bar-height': `${FUNNEL_BAR_HEIGHT}px`,
      '--funnel-connector-height': `${FUNNEL_CONNECTOR_HEIGHT}px`,
      '--funnel-bar-border-radius': `${FUNNEL_BAR_BORDER_RADIUS}px`,
      '--label-min-width': `${LABEL_MIN_WIDTH}px`,
      '--label-gap': `${LABEL_GAP}px`,
      '--label-font-size': `${LABEL_FONT_SIZE}px`,
      '--label-font-weight': LABEL_FONT_WEIGHT,
      '--segment-label-font-size': `${SEGMENT_LABEL_FONT_SIZE}px`,
      '--segment-label-font-weight': SEGMENT_LABEL_FONT_WEIGHT,
      '--connector-label-font-size': `${CONNECTOR_LABEL_FONT_SIZE}px`,
      '--connector-label-font-weight': CONNECTOR_LABEL_FONT_WEIGHT,
    } as React.CSSProperties;

    return (
      <div className={styles["funnel-container"]} style={cssVars}>
        {data.items.map((item, index) => {
          // Fixed width for each level (equal step reduction)
          const levelWidth = 100 - (index * FUNNEL_WIDTH_STEP);
          
          // Check if there's a next item for connector display
          const hasNextItem = index < data.items.length - 1;
          
          // Calculate conversion rate: next stage / current stage
          const nextItem = hasNextItem ? data.items[index + 1] : null;
          const conversionRate = nextItem 
            ? Math.round((nextItem.totalValue / item.totalValue) * 100)
            : null;
          
          // Calculate next level width for trapezoid
          const nextLevelWidth = hasNextItem ? 100 - ((index + 1) * FUNNEL_WIDTH_STEP) : 0;

          return (
            <React.Fragment key={index}>
              <div className={styles["funnel-stage-container"]}>
                <div className={styles["funnel-label"]}>
                  {item.label}
                </div>
                <div className={styles["funnel-stage"]}>
                  <div 
                    className={styles["funnel-bar"]} 
                    style={{ width: `${levelWidth}%` }}
                  >
                    {item.segments.map((segment, segmentIndex) => {
                      // Calculate segment width based on level and segment index
                      let segmentPercentage = 100;
                      if (index === 0) {
                        // Level 0: Internal/Outside ratio
                        segmentPercentage = segmentIndex === 0 
                          ? LEVEL_0_INTERNAL_RATIO 
                          : (100 - LEVEL_0_INTERNAL_RATIO);
                      } else if (index === 1) {
                        // Level 1: Internal/Outside ratio
                        segmentPercentage = segmentIndex === 0 
                          ? LEVEL_1_INTERNAL_RATIO 
                          : (100 - LEVEL_1_INTERNAL_RATIO);
                      }
                      
                      // Define tooltip content for each segment
                      let tooltipContent = "";
                      if (index === 0) {
                        // First layer (R&D)
                        tooltipContent = segmentIndex === 0 
                          ? "Research & Development candidates identified for potential recruitment"
                          : "Total candidates referred from all sources (R&D and Outside)";
                      } else if (index === 1) {
                        // Second layer (Referred)
                        tooltipContent = segmentIndex === 0 
                          ? "Candidates referred from the R&D pool"
                          : "Candidates referred from outside sources";
                      } else if (index === 2) {
                        // Third layer (Connecting)
                        tooltipContent = "Candidates actively being connected with and engaged";
                      } else if (index === 3) {
                        // Fourth layer (Pipeline)
                        tooltipContent = "Strong pipeline candidates identified for potential hiring";
                      }
                      
                      return (
                        <div
                          key={segmentIndex}
                          className={styles["funnel-segment"]}
                          style={{
                            width: `${segmentPercentage}%`,
                            backgroundColor: segment.color,
                          }}
                        >
                          <Tooltip content={tooltipContent} position={"bottom-center"}>
                            <span className={styles["segment-label"]}>
                              {segment.value}
                            </span>
                          </Tooltip>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {conversionRate !== null && (
                <div className={styles["funnel-connector"]}>
                  <svg 
                    className={styles["trapezoid-svg"]} 
                    width="100%" 
                    height="100%" 
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    {TRAPEZOID_GRADIENT && (
                      <defs>
                        <linearGradient 
                          id={`trapezoid-gradient-${index}`} 
                          x1="0%" 
                          y1="0%" 
                          x2="0%" 
                          y2="100%"
                        >
                          <stop 
                            offset="0%" 
                            stopColor={TRAPEZOID_GRADIENT.startColor} 
                            stopOpacity={TRAPEZOID_GRADIENT.startOpacity} 
                          />
                          <stop 
                            offset="100%" 
                            stopColor={TRAPEZOID_GRADIENT.endColor} 
                            stopOpacity={TRAPEZOID_GRADIENT.endOpacity} 
                          />
                        </linearGradient>
                      </defs>
                    )}
                    <polygon
                      points={`
                        ${(100 - levelWidth) / 2 + TRAPEZOID_HORIZONTAL_INSET},0 
                        ${(100 + levelWidth) / 2 - TRAPEZOID_HORIZONTAL_INSET},0 
                        ${(100 + nextLevelWidth) / 2 - TRAPEZOID_HORIZONTAL_INSET},100 
                        ${(100 - nextLevelWidth) / 2 + TRAPEZOID_HORIZONTAL_INSET},100
                      `}
                      fill={TRAPEZOID_GRADIENT 
                        ? `url(#trapezoid-gradient-${index})` 
                        : TRAPEZOID_FILL_COLOR}
                      opacity={TRAPEZOID_GRADIENT ? 1 : TRAPEZOID_OPACITY}
                    />
                  </svg>
                  <div className={styles["connector-label"]}>
                    {conversionRate}%
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles["summary-activity-progress-card-content"]}>
      {showAs === "funnel" ? renderFunnelView() : renderProgressView()}
    </div>
  );
};

SummaryActivityProgressCard.displayName = "SummaryActivityProgressCard";
