import { fontVariants } from "../../../components";
import { BasicLayout } from "../../../components/layouts";

const PageContent = () => {
  return (
    <BasicLayout
      elements={{
        appBar: {
          first: [<div>1</div>, <div>2</div>],
          center: [<div>4</div>, <div>5</div>, <div>6</div>],
          last: [<div>7</div>, <div>8</div>, <div>9</div>],
        },
        footer: (
          <div>
            <div>Footer Content</div>
          </div>
        ),
        navBar: {
          first: [<div>1</div>, <div>2</div>],
          center: [<div>4</div>, <div>5</div>, <div>6</div>],
          last: [<div>7</div>, <div>8</div>, <div>9</div>],
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
                fontFamily: "serif"
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
                paddingBottom: "1800px"
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
