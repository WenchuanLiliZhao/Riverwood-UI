import type { Page } from "../../types";
import { PageContent } from "./page-content";

const Page_About: Page = {
  header: {
    title: "About",
    slug: "about",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    type: "channel",
    icon: "face",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date("2025-11-15"),
    tags: ["about", "channel"]
  },
  content: <PageContent />
}

export default Page_About;