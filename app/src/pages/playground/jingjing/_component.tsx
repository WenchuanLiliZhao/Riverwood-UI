import * as React from "react";
import {
  Layout,
  Avatar,
  NavTitle,
  FigmaBentoGrid,
  FigmaBentoItem,
  TestBlock,
  Button,
  COMPONENT_VARIANTS,
  COMPONENT_SIZES,
  COMPONENT_SEMANTICS,
} from "../../../components";
import { design } from "./design";
import { TodaysOutlook } from "./play-widgets/TodaysOutlook";

export const PageContent = () => {
  // State for filter controls
  const [comparisonMode, setComparisonMode] = React.useState<"LY" | "LW">("LY");
  const [timeRange, setTimeRange] = React.useState<"today" | "yesterday">("today");
  const [currency, setCurrency] = React.useState<"CNY" | "USD">("CNY");

  // Get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const date = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${time}, ${date}`;
  };

  const getCurrentDay = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
  };

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
    <div
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
      onLoad={disableBodyScroll}
    >
      <Layout
        contentDesign={{ widthMode: "full", enablePadding: false }}
        elements={{
          navBar: {
            first: [
              <Avatar
                key="avatar"
                src="../../../vite.svg"
                alt="Avatar"
                size="medium"
              />,
              <NavTitle key="title" title="Today Sales" />,
              <div
                key="divider-1"
                style={{
                  width: "1px",
                  height: "24px",
                  backgroundColor: "var(--color-border-primary)",
                  margin: "0 8px",
                }}
              />,
              <Button
                key="location-region"
                content={{
                  icon: "location_on",
                  text: "All Region",
                }}
                design={{
                  variant: COMPONENT_VARIANTS.ghost,
                  size: COMPONENT_SIZES.small,
                  semantic: COMPONENT_SEMANTICS.secondary,
                }}
                hoverable={false}
              />,
              <Button
                key="location-address"
                content={{
                  icon: "business",
                  text: "45214 Shanghai Xintiandi",
                }}
                design={{
                  variant: COMPONENT_VARIANTS.ghost,
                  size: COMPONENT_SIZES.small,
                  semantic: COMPONENT_SEMANTICS.secondary,
                }}
                hoverable={false}
              />,
            ],
            center: [
              <Button
                key="currency-cny"
                content={{ text: "¥ CNY" }}
                design={{
                  variant: COMPONENT_VARIANTS.fill,
                  size: COMPONENT_SIZES.small,
                  semantic: currency === "CNY" ? COMPONENT_SEMANTICS.primary : COMPONENT_SEMANTICS.secondary,
                }}
                onClick={() => setCurrency("CNY")}
                hoverable={false}
                style={
                  currency === "CNY"
                    ? {
                        backgroundColor: "#ef4444",
                        color: "#ffffff",
                        border: "none",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "var(--color-text-primary)",
                        border: "1px solid var(--color-border-primary)",
                      }
                }
              />,
              <Button
                key="currency-usd"
                content={{ text: "$ USD" }}
                design={{
                  variant: COMPONENT_VARIANTS.fill,
                  size: COMPONENT_SIZES.small,
                  semantic: currency === "USD" ? COMPONENT_SEMANTICS.primary : COMPONENT_SEMANTICS.secondary,
                }}
                onClick={() => setCurrency("USD")}
                hoverable={false}
                style={
                  currency === "USD"
                    ? {
                        backgroundColor: "#ef4444",
                        color: "#ffffff",
                        border: "none",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "var(--color-text-primary)",
                        border: "1px solid var(--color-border-primary)",
                      }
                }
              />,
            ],
            last: [
              <Button
                key="weather"
                content={{
                  icon: "wb_sunny",
                  text: "18°C",
                }}
                design={{
                  variant: COMPONENT_VARIANTS.ghost,
                  size: COMPONENT_SIZES.small,
                  semantic: COMPONENT_SEMANTICS.secondary,
                }}
                hoverable={false}
              />,
              <Button
                key="day"
                content={{
                  icon: "calendar_today",
                  text: getCurrentDay(),
                }}
                design={{
                  variant: COMPONENT_VARIANTS.ghost,
                  size: COMPONENT_SIZES.small,
                  semantic: COMPONENT_SEMANTICS.secondary,
                }}
                hoverable={false}
              />,
              <Button
                key="refresh"
                content={{
                  icon: "refresh",
                  text: `Latest Refresh: ${getCurrentDateTime()}`,
                }}
                design={{
                  variant: COMPONENT_VARIANTS.ghost,
                  size: COMPONENT_SIZES.small,
                  semantic: COMPONENT_SEMANTICS.secondary,
                }}
                hoverable={false}
              />,
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
                <TodaysOutlook
                  comparisonMode={comparisonMode}
                  setComparisonMode={setComparisonMode}
                  timeRange={timeRange}
                  setTimeRange={setTimeRange}
                />
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
