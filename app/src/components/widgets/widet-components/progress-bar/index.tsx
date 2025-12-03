import * as React from "react";
import {
  BaseProgressBar,
  type BaseProgressBarProps,
} from "./_BaseProgressBar";

export type ProgressBarProps = BaseProgressBarProps;
export type {
  ProgressBarData,
  DistributionBarData,
  DistributionSegment,
} from "./_BaseProgressBar";
export type { ProgressBarDesignProperties as DesignProperties } from "./designProperties";
export { ProgressBarDefaultDesignProperties as DefaultDesignProperties } from "./designProperties";

export const ProgressBar = React.forwardRef<
  HTMLDivElement,
  ProgressBarProps
>((props, ref) => {
  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <BaseProgressBar {...props} />
    </div>
  );
});



