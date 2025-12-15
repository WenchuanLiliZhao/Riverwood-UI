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
import { netSalesOutlookData } from "./mockup-data/netSalesOutlook";
import { OutLookCard } from "./play-components/OutLookCard";

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

  // the function disables the scroll on the body
  const disableBodyScroll = () => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  };

  // Calculate the grid dimensions once
  const { height, width } = calculateGridDimensions();

  return (
    <div style={{ backgroundColor: "var(--color-bg-secondary)" }} onLoad={disableBodyScroll}>
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
              rowCount={24}
              colCount={12}
              padding={design.content.padding}
              gap={[design.content.gap, design.content.gap]}
            >
              <FigmaBentoItem row={[1, 13]} col={[1, 7]}>
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
                    {/* AI Context: the NetSalesOutlook component is placed in the first item of the FigmaBentoGrid */}
                    <FigmaBentoItem row={[1, 2]} col={[1, 6]}>
                      <NetSalesOutlook data={netSalesOutlookData} />
                    </FigmaBentoItem>
                    <FigmaBentoItem row={[1, 2]} col={[7, 3]}>
                      {/* AI Context: the 1st OutLookCard is placed in the second item of the FigmaBentoGrid */}
                      <OutLookCard />
                    </FigmaBentoItem>
                    <FigmaBentoItem row={[1, 2]} col={[10, 3]}>
                      {/* AI Context: the 2nd OutLookCard is placed in the second item of the FigmaBentoGrid */}
                      <OutLookCard />
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
              <FigmaBentoItem row={[1, 24]} col={[8, 5]}>
                <TestBlock>2!</TestBlock>
              </FigmaBentoItem>
              <FigmaBentoItem row={[14, 11]} col={[1, 7]}>
                <TestBlock>3</TestBlock>
              </FigmaBentoItem>
            </FigmaBentoGrid>
          ),
        }}
      />
    </div>
  );
};
