import { BrowserRouter, Route, Routes } from "react-router";
import { Pages } from "./pages";
import RiverwoodBlogChannelLayout from "./layouts/riverwood-blog-channel-layout";
import { NavButton } from "./components/general";

function App() {
  const Layout = RiverwoodBlogChannelLayout;

  const NavRight = [<div>Right</div>];
  const NavCenter = [
    <NavButton icon="home" href="/" />,
    <NavButton icon="search" href="/search" />,
    <NavButton icon="heart_smile" href="/favorites" />,
  ];
  const NavLeft = [<div>Left</div>];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Layout
              blogNav={{ left: NavLeft, center: NavCenter, right: NavRight }}
            >
              {Pages.Page_Home.content}
            </Layout>
          }
        />
        <Route path="*" element={<Layout blogNav={{ left: NavLeft, center: NavCenter, right: NavRight }}>{Pages.Page_Not_Found.content}</Layout>} />
        {Object.values(Pages)
          .filter((page) => page.header.slug !== "")
          .map((page) => (
            <Route
              key={page.header.slug}
              path={`/${page.header.slug}`}
              element={
                <Layout
                  blogNav={{
                    left: NavLeft,
                    center: NavCenter,
                    right: NavRight,
                  }}
                >
                  {page.content}
                </Layout>
              }
            />
          ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
