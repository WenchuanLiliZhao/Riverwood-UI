import {
  Layout,
  Avatar,
  NavTitle,
  BentoGrid,
  BentoItem,
  TestBlock,
  WidgetFrame,
} from "../../../components";
import design from "./design";

export const PageContent = () => {
  const calculateRowHeight = () => {
    // Calculate: 100vh - navBar height - gap
    const viewportHeight = window.innerHeight; // px

    // Return the available height in pixels
    return ((viewportHeight - design.navBar.height) - design.content.gap - design.content.padding * 2) / 2;
  };

  // Calculate the row height once
  const rowHeight = calculateRowHeight();

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
          // bento grid
          <div style={{ padding: `${design.content.padding}px` }}>
            <BentoGrid rowHeight={[[Infinity, rowHeight]]}>
              <BentoItem res={[[Infinity, 7, 1]]}>
                <WidgetFrame nav={{
                  icon: "bar_chart",
                  title: "Total Sales",
                }}>
                  1
                </WidgetFrame>
              </BentoItem>
              <BentoItem res={[[Infinity, 5, 2]]}>
                <TestBlock>2</TestBlock>
              </BentoItem>
              <BentoItem res={[[Infinity, 7, 1]]}>
                <TestBlock>3</TestBlock>
              </BentoItem>
            </BentoGrid>
          </div>
        ),
      }}
    />
  );
};
