import { NavIconButton, RiverwoodLink, Tooltip } from "../components";
import { BasicLayout } from "../layouts";
import { Pages } from "../pages";
import styles from "./site-layout.module.scss";

export const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BasicLayout
      blogNav={{
        left: [<RiverwoodLink href="/" className={styles["riverwood-logo"]}>Riverwood</RiverwoodLink>],
        center: [
          <Tooltip
            header={Pages.Page_Home.header.title}
            content={Pages.Page_Home.header.description}
          >
            <NavIconButton
              icon={Pages.Page_Home.header.icon}
              href={`/${Pages.Page_Home.header.slug}`}
            />
          </Tooltip>,
          <Tooltip
            header={Pages.Page_UI_System.header.title}
            content={Pages.Page_UI_System.header.description}
          >
            <NavIconButton
              icon={Pages.Page_UI_System.header.icon}
              href={`/${Pages.Page_UI_System.header.slug}`}
            />
          </Tooltip>,
          <Tooltip
            header={Pages.Page_Widgets.header.title}
            content={Pages.Page_Widgets.header.description}
          >
            <NavIconButton
              icon={Pages.Page_Widgets.header.icon}
              href={`/${Pages.Page_Widgets.header.slug}`}
            />
          </Tooltip>,
          <Tooltip
            header={Pages.Page_Life.header.title}
            content={Pages.Page_Life.header.description}
          >
            <NavIconButton
              icon={Pages.Page_Life.header.icon}
              href={`/${Pages.Page_Life.header.slug}`}
            />
          </Tooltip>,
          <Tooltip
            header={Pages.Page_About.header.title}
            content={Pages.Page_About.header.description}
          >
            <NavIconButton
              icon={Pages.Page_About.header.icon}
              href={`/${Pages.Page_About.header.slug}`}
            />
          </Tooltip>,
        ],
        right: [
          <Tooltip
            header={Pages.Page_Contact.header.title}
            content={Pages.Page_Contact.header.description}
          >
            <NavIconButton
              icon={Pages.Page_Contact.header.icon}
              href={`/${Pages.Page_Contact.header.slug}`}
            />
          </Tooltip>,
        ],
      }}
    >
      {children}
    </BasicLayout>
  );
};
