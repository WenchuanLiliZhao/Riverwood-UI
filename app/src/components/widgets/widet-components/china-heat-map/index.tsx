import * as React from "react";
import {
  BaseChinaHeatMap,
  type BaseChinaHeatMapProps,
} from "./_BaseChinaHeatMap";

export type ChinaHeatMapProps = BaseChinaHeatMapProps;
export type {
  LocationPoint,
  CategoryData,
  RegionMapping,
} from "./_BaseChinaHeatMap";
export type { ChinaHeatMapDesignProperties as DesignProperties } from "./designProperties";
export { ChinaHeatMapDefaultDesignProperties as DefaultDesignProperties } from "./designProperties";

export const ChinaHeatMap = React.forwardRef<HTMLDivElement, ChinaHeatMapProps>(
  (props, ref) => {
    return (
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <BaseChinaHeatMap {...props} />
      </div>
    );
  }
);

ChinaHeatMap.displayName = "ChinaHeatMap";

