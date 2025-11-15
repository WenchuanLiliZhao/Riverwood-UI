import type { Page } from "../../types";
import Page_Not_Found_Component from "./_component";

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
  content: <Page_Not_Found_Component />
}

export default Page_Not_Found;