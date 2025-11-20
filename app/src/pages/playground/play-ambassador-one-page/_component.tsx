import { Button } from "../../../components";
import { BasicLayout } from "../../../components/layouts";

export const PageContent = () => {
  return (
    <BasicLayout
      contentDesign={{ widthMode: "large" }}
      elements={{
        navBar: {
          first: [<div>1</div>, <div>2</div>],
          center: [<div>4</div>, <div>5</div>, <div>6</div>],
          last: [
            <Button content={{ icon: "map", text: "Region & City", decoIcon: "arrow_drop_down" }} design={{ variant: "fill-inverse", size: "medium", semantic: "primary" }} />,
            <Button content={{ icon: "date_range", text: "2025", decoIcon: "arrow_drop_down" }} design={{ variant: "fill", size: "medium", semantic: "primary" }} />,
          ],
        },
        footer: <div>Footer</div>,
        content: <div>Ambassador One Page</div>,
      }}
    />
  );
};