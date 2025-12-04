import type { Page } from "../../types";
import { Page_Debug_ChinaHeatMapComponent } from "./_component";

const Page_Debug_ChinaHeatMap: Page = {
  header: {
    title: "China Heat Map",
    slug: "debug-china-heat-map",
    description: "China Heat Map Component Debug Page",
    type: "demo",
    icon: "map",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["chart", "map", "demo"],
  },
  content: <Page_Debug_ChinaHeatMapComponent />,
};

export default Page_Debug_ChinaHeatMap;

