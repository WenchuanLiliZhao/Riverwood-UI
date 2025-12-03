import type { Page } from "../../types";
import { PieChartDebug } from "./_component";

const Page_Debug_PieChart: Page = {
  header: {
    title: "Pie Chart",
    slug: "debug-pie-chart",
    description: "Pie Chart Component Debug Page",
    type: "demo",
    icon: "pie_chart",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["chart", "pie", "demo"],
  },
  content: <PieChartDebug />,
};

export default Page_Debug_PieChart;

