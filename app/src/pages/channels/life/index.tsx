import type { Page } from "../../types";
import PageContent from "./page-content";

const Page_Life: Page = {
  header: {
    title: "Life",
    slug: "life",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    type: "channel",
    icon: "life",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date("2025-11-15"),
    tags: ["life", "channel"]
  },
  content: <PageContent />
}

export default Page_Life;