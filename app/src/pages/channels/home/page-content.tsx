import { DebugPages } from "../../debug";

export const PageContent = () => {
  return (
    <div>
      <p><a href={`/${DebugPages.Page_Debug_Tooltip.header.slug}`}>Debug Tooltip</a></p>
      <p><a href={`/${DebugPages.Page_Debug_Layout.header.slug}`}>Debug Layout</a></p>
    </div>
  )
}