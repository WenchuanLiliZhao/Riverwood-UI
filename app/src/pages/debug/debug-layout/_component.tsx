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
            <h1>Debug Layout</h1>
          </div>
        ),
      }}
    />
  );
};

export default PageContent;
