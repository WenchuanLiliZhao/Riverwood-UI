import { BasicLayout } from "../../../components/layouts";

const PageContent = () => {
  return (
    <BasicLayout
      elements={{
        appBar: {
          top: [<div>1</div>, <div>2</div>],
          center: [
            <div>4</div>, <div>5</div>, <div>6</div>],
          bottom: [<div>7</div>, <div>8</div>, <div>9</div>],
        },
        navBar: (
          <div>
            <h1>top nav bar</h1>
          </div>
        ),
        leftSidebar: (
          <div>
            <h1>left sidebar</h1>
          </div>
        ),
        rightSidebar: (
          <div>
            <h1>right sidebar</h1>
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
