import type { Page } from "../../types";
import { PageContent } from "./page-content";

const Page_UI_System: Page = {
  header: {
    title: "UI System",
    slug: "ui-system",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    type: "channel",
    icon: "design_services",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date("2025-11-15"),
    tags: ["ui-system", "channel"]
  },
  content: <PageContent />,
};

export default Page_UI_System;