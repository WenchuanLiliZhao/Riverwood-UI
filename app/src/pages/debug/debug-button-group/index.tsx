import type { Page } from "../../types";
import { Page_Debug_ButtonGroup_Component } from "./_component";

const Page_Debug_ButtonGroup: Page = {
  header: {
    title: "ButtonGroup",
    slug: "debug-button-group",
    description: "ButtonGroup Component Debug Page",
    type: "demo",
    icon: "view_module",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["button-group", "demo"],
  },
  content: <Page_Debug_ButtonGroup_Component />,
};

export default Page_Debug_ButtonGroup;

