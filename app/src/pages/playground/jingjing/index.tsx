import type { Page } from "../../types";
import { PageContent } from "./_component";

const Play_Jingjing: Page = {
  header: {
    title: "Jingjing",
    slug: "play-jingjing",
    description: "Jingjing",
    type: "demo",
    icon: "jingjing",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["jingjing", "demo"],
  },
  content: <PageContent />,
};

export default Play_Jingjing;