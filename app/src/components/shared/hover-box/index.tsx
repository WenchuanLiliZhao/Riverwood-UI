import * as React from "react";
import styles from "./_styles.module.scss";
import colorStyles from "../../styles/global/color.module.scss";

export interface HoverBoxProps {
  isInverse?: boolean;
}

export const HoverBox: React.FC<HoverBoxProps> = ({ isInverse = false }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const hoverBoxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const hoverBox = hoverBoxRef.current;
    if (!hoverBox) return;

    const parent = hoverBox.parentElement;
    if (!parent) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const bgColorClass = isInverse
    ? colorStyles.bgHoverInverse
    : colorStyles.bgHover;
  
  return (
    <div
      ref={hoverBoxRef}
      className={`${styles["hover-box"]} ${bgColorClass} ${isHovered ? styles.visible : ""}`}
    />
  );
};
