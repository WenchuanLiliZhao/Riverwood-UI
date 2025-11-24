import { Button, fontVariants } from "../../../components";
import { Layout } from "../../../components/layout";

const PageContent = () => {
  return (
    <Layout
      contentDesign={{ widthMode: "medium" }}
      elements={{
        appBar: {
          first: [<div>1</div>, <div>2</div>],
          center: [<div>4</div>, <div>5</div>, <div>6</div>],
          last: [<div>9</div>],
        },
        footer: (
          <div>
            <div>Footer Content</div>
          </div>
        ),
        navBar: {
          first: [<div>1</div>, <div>2</div>],
          center: [<div>4</div>, <div>5</div>, <div>6</div>],
          last: [
            <Button content={{ icon: "map", text: "Region & City", decoIcon: "arrow_drop_down" }} design={{ variant: "fill-inverse", size: "medium", semantic: "primary" }} />,
            <Button content={{ icon: "date_range", text: "2025", decoIcon: "arrow_drop_down" }} design={{ variant: "fill", size: "medium", semantic: "primary" }} />,
          ],
        },
        leftSidebar: (
          <div>
            <div>Left Sidebar Content</div>
          </div>
        ),
        rightSidebar: (
          <div>
            <div>Right Sidebar Content</div>
          </div>
        ),
        content: (
          <div>
            <h1
              className={fontVariants({
                typography: "title",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "serif",
              })}
            >
              Debug Layout
            </h1>
            <p
              className={fontVariants({
                typography: "body",
                fontWeight: "light",
                fontFamily: "serif",
              })}
              style={{
                paddingBottom: "1800px",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              omnis provident porro alias mollitia consectetur incidunt odit
              tempora illum expedita, veritatis blanditiis animi, dolorum enim.
              Quos corporis esse libero hic?
            </p>
          </div>
        ),
      }}
    />
  );
};

export default PageContent;
