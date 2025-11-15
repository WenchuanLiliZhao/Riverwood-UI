import { BrowserRouter, Route, Routes } from "react-router";
import { Pages } from "./pages";
import { SiteLayout } from "./siteConfig/site-layout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <SiteLayout
            >
              {Pages.Page_Home.content}
            </SiteLayout>}
        />
        <Route path="*" element={<SiteLayout>{Pages.Page_Not_Found.content}</SiteLayout>} />
        {Object.values(Pages)
          .filter((page) => page.header.slug !== "")
          .map((page) => (
            <Route
              key={page.header.slug}
              path={`/${page.header.slug}`}
              element={
                <SiteLayout
                >
                  {page.content}
                </SiteLayout>
              }
            />
          ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
