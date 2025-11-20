import type { Page } from "../../types";
import { Page_Debug_Button_Component } from "./_component";

const Page_Debug_Button: Page = {
  header: {
    title: "Button",
    slug: "debug-button",
    description: "Button Component Debug Page",
    type: "demo",
    icon: "smart_button",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["button", "demo"],
  },
  content: <Page_Debug_Button_Component />,
};

export default Page_Debug_Button;
