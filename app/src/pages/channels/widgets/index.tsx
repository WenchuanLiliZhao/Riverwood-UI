import type { Page } from "../../types"
import { PageContent } from "./page-content"

const Page_Widgets: Page = {
  header: {
    title: "Widgets",
    slug: "widgets",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    type: "channel",
    icon: "spa",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date("2025-11-15"),
    tags: ["ui-widgets", "channel"]
  },
  content: <PageContent />
}

export default Page_Widgets