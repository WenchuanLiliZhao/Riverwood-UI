import type { Page } from "../../types";
import Page_Home_Component from "./_component";

const Page_Home: Page = {
  header: {
    title: "Home",
    slug: "",
    description: "lorem ipsum dolor sit amet",
    type: "channel",
    icon: "home",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date("2025-10-14"),
    tags: ["home", "channel"]
  },
  content: <Page_Home_Component />
}

export default Page_Home;