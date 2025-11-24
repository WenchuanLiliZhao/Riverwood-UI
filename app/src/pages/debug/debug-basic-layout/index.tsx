import type { Page } from "../../types";
import PageContent from "./_component";

const Page_Debug_BasicLayout: Page = {
  header: {
    title: "Debug Basic Layout",
    slug: "debug-basic-layout",
    description: "Debug Layout",
    type: "channel",
    icon: "debug-layout",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["debug-layout", "channel"]
  },
  content: <PageContent />
}

export default Page_Debug_BasicLayout;