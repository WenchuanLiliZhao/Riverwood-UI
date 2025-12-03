import {
  Avatar,
  Button,
  DocSection,
  Layout,
  NavTitle,
} from "../../../components";

export const PageContent = () => {
  return (
    <Layout
      contentDesign={{ widthMode: "large" }}
      elements={{
        navBar: {
          first: [
            <Avatar
              src="https://play-lh.googleusercontent.com/jvFsHfua7RtMM_x0z9fci13k7DcHH9s5y6EJ424-ZWH4gaaO96FqxAD2JL6GkNvVUg=w240-h480-rw"
              alt="Avatar"
              size="medium"
            />,
            <NavTitle title="Ambassador One Page" />,
          ],
          last: [
            <Button
              content={{
                icon: "map",
                text: "Region & City",
                decoIcon: "arrow_drop_down",
              }}
              design={{
                variant: "fill-inverse",
                size: "medium",
                semantic: "brand",
              }}
            />,
            <Button
              content={{
                icon: "date_range",
                text: "2025",
                decoIcon: "arrow_drop_down",
              }}
              design={{
                variant: "outlined",
                size: "medium",
                semantic: "primary",
              }}
            />,
          ],
        },
        footer: <div>Footer</div>,
        content: (
          <>
            <DocSection
              label="Apr 1, 2025 – Mar 31, 2026"
              title="Roster Overview"
              description="This section reflects the Ambassador roster for the current term by athletic discipline, city tier and tenure. Please note that Ambassador term (Apr 1–Mar 31) differs from the fiscal calendar (Feb 1–Jan 30). To view previous years' rosters, please adjust the filter in the top-right corner."
            >
              <div>Content...</div>
            </DocSection>
            <DocSection
              label="Apr 1, 2025 – Mar 31, 2026"
              title="Roster Overview"
              description="This section reflects the Ambassador roster for the current term by athletic discipline, city tier and tenure. Please note that Ambassador term (Apr 1–Mar 31) differs from the fiscal calendar (Feb 1–Jan 30). To view previous years' rosters, please adjust the filter in the top-right corner."
            >
              <div>Content...</div>
            </DocSection>
          </>
        ),
      }}
    />
  );
};
