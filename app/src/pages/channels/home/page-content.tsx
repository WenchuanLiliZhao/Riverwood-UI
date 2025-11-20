import { fontVariants } from "../../../components";
import { DebugPages } from "../../debug";
import { PlaygroundPages } from "../../playground";


export const PageContent = () => {
  return (
    <div>
      <h1 className={fontVariants({
        typography: "title",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "serif",
      })}>Debug Pages</h1>
      <ul>
        {Object.values(DebugPages).map((page) => (
          <li key={page.header.slug}>
            <a href={`/${page.header.slug}`}>{page.header.title}</a>
          </li>
        ))}
      </ul>
        
      <br />

      <ul>
        {Object.values(PlaygroundPages).map((page) => (
          <li key={page.header.slug}>
            <a href={`/${page.header.slug}`}>{page.header.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}