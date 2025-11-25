import type { Page } from "../../types";
import { TrendChartDebug } from './_component';

const Page_Debug_TrendChart: Page = {
  header: {
    title: "Trend Chart",
    slug: "debug-trend-chart",
    description: "Trend Chart Component Debug Page",
    type: "demo",
    icon: "analytics", // Suitable icon
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["chart", "demo"],
  },
  content: <TrendChartDebug />,
};

export default Page_Debug_TrendChart;
