import type { Page } from "../../types";
import { ProgressBarDebug } from "./_component";

const Page_Debug_ProgressBar: Page = {
  header: {
    title: "Progress Bar",
    slug: "debug-progress-bar",
    description: "Progress Bar / Distribution Bar Component Debug Page",
    type: "demo",
    icon: "trending_up",
    cover: "https://via.placeholder.com/150",
    updateDate: new Date(),
    tags: ["chart", "progress", "bar", "demo"],
  },
  content: <ProgressBarDebug />,
};

export default Page_Debug_ProgressBar;

