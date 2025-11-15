import type { Page } from "../../types";
import { PageContent } from "./page-content";

const Page_Home: Page = {
  header: {
    title: "Home",
    slug: "",
    description: "This is the home page of Riverwood Blog Channel",
    type: "channel",
    icon: "home",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date("2025-10-14"),
    tags: ["home", "channel"]
  },
  content: <PageContent />
}

export default Page_Home;