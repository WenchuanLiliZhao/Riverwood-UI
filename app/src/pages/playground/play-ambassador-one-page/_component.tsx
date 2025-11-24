import { Avatar, Button } from "../../../components";
import { Layout } from "../../../components/layouts/layout";

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
            <div>2</div>,
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
              design={{ variant: "outlined", size: "medium", semantic: "primary" }}
            />,
          ],
        },
        footer: <div>Footer</div>,
        content: <div>Ambassador One Page</div>,
      }}
    />
  );
};
