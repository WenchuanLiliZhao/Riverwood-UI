import * as React from "react";
import { TestBlock } from "../../../../../../components";
import { clockViewData } from "../../../mockup-data";

export const ClockChartView: React.FC = () => {

  const dataToConsole = `

====== Clock Chart Data ======
${JSON.stringify(clockViewData, null, 2)}
==============================

`
  console.log(dataToConsole);
  return <TestBlock>Open Console to See the Data</TestBlock>;
};

