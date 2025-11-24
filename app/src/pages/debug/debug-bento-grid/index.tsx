/**
 * Debug Page Entry for Bento Grid
 * 便当盒网格调试页面入口
 */

import type { Page } from "../../types";
import { DebugBentoGridComponent } from "./_component";

const Page_Debug_BentoGrid: Page = {
  header: {
    title: "Bento Grid",
    slug: "debug-bento-grid",
    description: "Bento Grid Component Debug Page - 12 Column Responsive Grid System",
    type: "demo",
    icon: "grid_view",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["bento-grid", "grid", "layout", "demo"],
  },
  content: <DebugBentoGridComponent />,
};

export default Page_Debug_BentoGrid;

