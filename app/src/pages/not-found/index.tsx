import type { Page } from "../types";
import { PageContent } from "./_component";

const Page_Not_Found: Page = {
  header: {
    title: "Not Found",
    slug: "*",
    description: "Page not found",
    type: "channel",
    icon: "not-found",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["not-found", "channel"]
  },
  content: <PageContent />
}

export default Page_Not_Found;