import type { Page } from "../../types";
import { PageContent } from "./page-content";

const Page_Contact: Page = {
  header: {
    title: "Contact",
    slug: "contact",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    type: "channel",
    icon: "contact",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date("2025-11-15"),
    tags: ["contact", "channel"]
  },
  content: <PageContent />
}

export default Page_Contact;