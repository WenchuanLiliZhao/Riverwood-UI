/*
 * Tooltip Component
 *
 * Features:
 * - Displays tooltip information when user hovers over child elements
 * - Provides 6 position options: top/bottom × left/center/right
 * - Built-in arrow indicator that automatically positions to point at the trigger element
 * - Supports testing mode: when testing is true, always displays for debugging and demonstration
 * - Content supports strings or React nodes for flexible customization
 */

/*
 * Tooltip 组件 - 提示框组件
 *
 * 基本特征：
 * - 支持在用户悬停子元素时显示提示信息
 * - 提供 6 种位置选项：顶部/底部 × 左/中/右
 * - 内置箭头指示器，自动定位指向触发元素
 * - 支持测试模式：当 testing 为 true 时始终显示，便于调试和展示
 * - 内容支持字符串或 React 节点，灵活定制显示内容
 */

import type React from "react";
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";

export interface TooltipProps {
  header?: string | React.ReactNode;
  content: string | React.ReactNode;
  children: React.ReactNode;
  testing?: boolean;
  position?:
    | "top-center"
    | "top-left"
    | "top-right"
    | "bottom-center"
    | "bottom-left"
    | "bottom-right";
}

const TooltipArrow: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={styles["tooltip-arrow-svg"]}
    >
      <path d="M0 8L8 0L16 8L8 16L0 8Z" fill="currentColor" />
    </svg>
  );
};

/**
 * Calculates the automatic position based on the element's location on screen
 * Screen regions:
 * - A: top 70% * left 30% → top-left
 * - B: top 70% * middle 40% (30%-70%) → top-center
 * - C: top 70% * right 30% → top-right
 * - D: bottom 30% * left 30% → bottom-left
 * - E: bottom 30% * middle 40% (30%-70%) → bottom-center
 * - F: bottom 30% * right 30% → bottom-right
 */
const calculateAutoPosition = (
  element: HTMLElement
):
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right" => {
  const rect = element.getBoundingClientRect();
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Calculate the center point of the element
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Determine vertical position (top 70% vs bottom 30%)
  const isTopRegion = centerY < screenHeight * 0.7;

  // Determine horizontal position
  const xPercent = (centerX / screenWidth) * 100;

  let horizontalPosition: "left" | "center" | "right";
  if (xPercent < 30) {
    horizontalPosition = "left";
  } else if (xPercent < 70) {
    horizontalPosition = "center";
  } else {
    horizontalPosition = "right";
  }

  // Combine vertical and horizontal positions
  if (isTopRegion) {
    if (horizontalPosition === "left") return "top-left";
    if (horizontalPosition === "center") return "top-center";
    return "top-right";
  } else {
    if (horizontalPosition === "left") return "bottom-left";
    if (horizontalPosition === "center") return "bottom-center";
    return "bottom-right";
  }
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  testing = false,
  position,
  header,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [autoPosition, setAutoPosition] = useState<
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
  >("top-center");
  const triggerRef = useRef<HTMLSpanElement>(null);

  const shouldShowTooltip = testing || isHovered;

  // Calculate auto position when hovered or when testing mode is enabled
  useEffect(() => {
    if ((isHovered || testing) && !position && triggerRef.current) {
      const calculatedPosition = calculateAutoPosition(triggerRef.current);
      setAutoPosition(calculatedPosition);
    }
  }, [isHovered, testing, position]);

  // Recalculate position on window resize
  useEffect(() => {
    if (!position) {
      const handleResize = () => {
        if (triggerRef.current && (isHovered || testing)) {
          const calculatedPosition = calculateAutoPosition(triggerRef.current);
          setAutoPosition(calculatedPosition);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [position, isHovered, testing]);

  const finalPosition = position || autoPosition;

  return (
    <span className={styles["tooltip-container"]}>
      <span
        ref={triggerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>
      {shouldShowTooltip && (
        <span
          className={`${styles["tooltip"]} ${
            styles[`position-${finalPosition}`]
          }`}
        >
          <span className={styles["arrow-container"]}>
            <TooltipArrow />
          </span>
          <span className={styles["tooltip-content"]}>
            {header && <span className={styles["tooltip-header"]}>{header}</span>}
            {typeof content === "string" ? <span className={styles["tooltip-content-text"]}>{content}</span> : content}
          </span>
        </span>
      )}
    </span>
  );
};
