import { type CSSProperties } from "react";
import { clsx } from "clsx";
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
  size,
}: IconProps) => {
  return (
    <span
      className={clsx(
        styles["icon"],
        "material-symbols-outlined",
        className
      )}
      style={{
        ...(size && { fontSize: size }),
        ...style,
      }}
    >
      {icon}
    </span>
  );
};

export default MaterialIcon;
