import type { Page } from "../../types";
import { Page_Debug_Tooltip_Component } from "./_component";

const Page_Debug_Tooltip: Page = {
  header: {
    title: "Tooltip",
    slug: "debug-tooltip",
    description: "Tooltip",
    type: "demo",
    icon: "tooltip",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date("2025-11-15"),
    tags: ["tooltip", "demo"],
  },
  content: <Page_Debug_Tooltip_Component />,
};

export default Page_Debug_Tooltip;
