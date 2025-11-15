import { NavButton, Tooltip } from "./components";
import { RiverwoodBlogChannelLayout } from "./layouts/riverwood-blog-channel-layout";
import { Pages } from "./pages";

export const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RiverwoodBlogChannelLayout
      blogNav={{
        left: [<div>Left</div>],
        center: [
          <Tooltip header={Pages.Page_Home.header.title} content={Pages.Page_Home.header.description}>
            <NavButton
            icon={Pages.Page_Home.header.icon}
            href={`/${Pages.Page_Home.header.slug}`}
          />
          </Tooltip>,
          <Tooltip header={Pages.Page_UI_System.header.title} content={Pages.Page_UI_System.header.description}>
            <NavButton
            icon={Pages.Page_UI_System.header.icon}
            href={`/${Pages.Page_UI_System.header.slug}`}
          />
          </Tooltip>,
          <Tooltip header={Pages.Page_Widgets.header.title} content={Pages.Page_Widgets.header.description}>
            <NavButton
            icon={Pages.Page_Widgets.header.icon}
            href={`/${Pages.Page_Widgets.header.slug}`}
          />
          </Tooltip>,
          <Tooltip header={Pages.Page_Life.header.title} content={Pages.Page_Life.header.description}>
            <NavButton
            icon={Pages.Page_Life.header.icon}
            href={`/${Pages.Page_Life.header.slug}`}
          />
          </Tooltip>,
          <Tooltip header={Pages.Page_About.header.title} content={Pages.Page_About.header.description}>
            <NavButton
            icon={Pages.Page_About.header.icon}
            href={`/${Pages.Page_About.header.slug}`}
          />
          </Tooltip>,
        ],
        right: [<div>Right</div>],
      }}
    >
      {children}
    </RiverwoodBlogChannelLayout>
  );
};
