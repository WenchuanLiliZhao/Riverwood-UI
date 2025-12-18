import type { Page } from "../../types";
import { SectorPieChartDebug } from "./_component";

const Page_Debug_SectorPieChart: Page = {
  header: {
    title: "Sector Pie Chart",
    slug: "debug-sector-pie-chart",
    description: "Sector Pie Chart Component Debug Page",
    type: "demo",
    icon: "pie_chart",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["chart", "sector", "pie", "radial", "demo"],
  },
  content: <SectorPieChartDebug />,
};

export default Page_Debug_SectorPieChart;
