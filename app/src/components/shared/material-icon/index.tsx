import { type CSSProperties } from "react";
import styles from "./_styles.module.scss";

export interface IconProps {
  icon: string;
  className?: string;
  style?: CSSProperties;
  size?: number;
}

export const MaterialIcon = ({
  icon,
  className,
  style,
  size = 24,
}: IconProps) => {
  return (
    <span
      className={`${styles["icon"]} material-symbols-outlined ${className}`}
      style={{
        ...style,
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {icon}
    </span>
  );
};

export default MaterialIcon;
