import type { Page } from "../../types"
import { PageContent } from "./page-content"

const Page_UI_Widgets: Page = {
  header: {
    title: "UI Widgets",
    slug: "ui-widgets",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    type: "channel",
    icon: "ui-widgets",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date("2025-11-15"),
    tags: ["ui-widgets", "channel"]
  },
  content: <PageContent />
}

export default Page_UI_Widgets