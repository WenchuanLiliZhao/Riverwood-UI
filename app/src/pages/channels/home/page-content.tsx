
import { DebugPages } from "../../debug";

export const PageContent = () => {
  return (
    <div>
      <a href={`/${DebugPages.Page_Debug_Tooltip.header.slug}`}>Debug Tooltip</a>
    </div>
  )
}