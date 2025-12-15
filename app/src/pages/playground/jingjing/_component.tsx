import {
  Layout,
  Avatar,
  NavTitle,
  FigmaBentoGrid,
  FigmaBentoItem,
  TestBlock,
  WidgetFrame,
} from "../../../components";
import { design, totalSalesDesign } from "./design";
import { NetSalesOutlook } from "./play-components/NetSalesOutlook";

export const PageContent = () => {
  const calculateGridDimensions = () => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate available height: viewport - navBar height
    const availableHeight = viewportHeight - design.navBar.height;

    // Width is full viewport
    const width = viewportWidth;

    return { height: availableHeight, width };
  };

  // Calculate the grid dimensions once
  const { height, width } = calculateGridDimensions();

  return (
    <Layout
      contentDesign={{ widthMode: "full", enablePadding: false }}
      elements={{
        navBar: {
          first: [
            <Avatar
              src="../../../../public/vite.svg"
              alt="Avatar"
              size="medium"
            />,
            <NavTitle title="Today Sales" />,
            // divider
          ],
        },

        content: (
          <FigmaBentoGrid
            height={height}
            width={width}
            rowCount={2}
            colCount={12}
            padding={design.content.padding}
            gap={[design.content.gap, design.content.gap]}
          >
            <FigmaBentoItem row={[1, 1]} col={[1, 7]}>
              <WidgetFrame
                nav={{
                  icon: "bar_chart",
                  title: "Total Sales",
                }}
              >
                <FigmaBentoGrid
                  height={"fill"}
                  width={"fill"}
                  rowCount={4}
                  colCount={12}
                  padding={totalSalesDesign.padding}
                  gap={[totalSalesDesign.gap, totalSalesDesign.gap]}
                >
                  <FigmaBentoItem row={[1, 2]} col={[1, 6]}>
                    <NetSalesOutlook />
                  </FigmaBentoItem>
                  <FigmaBentoItem row={[1, 2]} col={[7, 6]}>
                    <TestBlock>2</TestBlock>
                  </FigmaBentoItem>
                  <FigmaBentoItem row={[3, 1]} col={[1, 3]}>
                    <TestBlock>3</TestBlock>
                  </FigmaBentoItem>
                  <FigmaBentoItem row={[3, 1]} col={[4, 3]}>
                    <TestBlock>4</TestBlock>
                  </FigmaBentoItem>
                  <FigmaBentoItem row={[3, 1]} col={[7, 3]}>
                    <TestBlock>5</TestBlock>
                  </FigmaBentoItem>
                  <FigmaBentoItem row={[3, 1]} col={[10, 3]}>
                    <TestBlock>6</TestBlock>
                  </FigmaBentoItem>
                  <FigmaBentoItem row={[4, 1]} col={[1, 3]}>
                    <TestBlock>7</TestBlock>
                  </FigmaBentoItem>
                  <FigmaBentoItem row={[4, 1]} col={[4, 3]}>
                    <TestBlock>8</TestBlock>
                  </FigmaBentoItem>
                  <FigmaBentoItem row={[4, 1]} col={[7, 3]}>
                    <TestBlock>9</TestBlock>
                  </FigmaBentoItem>
                  <FigmaBentoItem row={[4, 1]} col={[10, 3]}>
                    <TestBlock>10</TestBlock>
                  </FigmaBentoItem>
                </FigmaBentoGrid>
              </WidgetFrame>
            </FigmaBentoItem>
            <FigmaBentoItem row={[1, 2]} col={[8, 5]}>
              <TestBlock>2</TestBlock>
            </FigmaBentoItem>
            <FigmaBentoItem row={[2, 1]} col={[1, 7]}>
              <TestBlock>3</TestBlock>
            </FigmaBentoItem>
          </FigmaBentoGrid>
        ),
      }}
    />
  );
};
