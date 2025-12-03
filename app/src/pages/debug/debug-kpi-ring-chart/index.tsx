import type { Page } from "../../types";
import { KpiRingChartDebug } from "./_component";

const Page_Debug_KpiRingChart: Page = {
  header: {
    title: "KPI Ring Chart",
    slug: "debug-kpi-ring-chart",
    description: "KPI Ring Chart Component Debug Page",
    type: "demo",
    icon: "donut_small",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["chart", "kpi", "ring", "demo"],
  },
  content: <KpiRingChartDebug />,
};

export default Page_Debug_KpiRingChart;

