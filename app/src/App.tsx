import { BrowserRouter, Route, Routes } from "react-router";
import { Pages, PageSets } from "./pages";
import { SiteLayout } from "./siteConfig/site-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route
          index
          element={<SiteLayout>{Pages.Page_Home.content}</SiteLayout>}
        />
        {/* Not Found Page */}
        <Route
          path="*"
          element={<SiteLayout>{Pages.Page_Not_Found.content}</SiteLayout>}
        />
        {/* Channel Pages */}
        {Object.values(PageSets.Channels)
          .filter((page) => page.header.slug !== "")
          .map((page) => (
            <Route
              key={page.header.slug}
              path={`/${page.header.slug}`}
              element={<SiteLayout>{page.content}</SiteLayout>}
            />
          ))}
        {/* Debug Pages */}
        {Object.values(PageSets.DebugPages)
          .map((page) => (
            <Route
              key={page.header.slug}
              path={`/${page.header.slug}`}
              element={page.content}
            />
          ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
