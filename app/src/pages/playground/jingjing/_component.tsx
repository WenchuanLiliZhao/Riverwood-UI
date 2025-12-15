import {
  Layout,
  Avatar,
  NavTitle,
  FigmaBentoGrid,
  FigmaBentoItem,
  TestBlock,
  WidgetFrame,
} from "../../../components";
import design from "./design";

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
                1
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
