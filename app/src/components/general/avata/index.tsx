import * as React from "react";
import styles from "./styles.module.scss";
import type { ComponentSize } from "../../shared/tokens";

export interface AvatarProps {
  src: string;
  alt: string;
  size?: ComponentSize;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "medium", className }) => {
  return (
    <div className={`${styles["avatar"]} ${className || ""} ${styles[size]}`}>
      <img src={src} alt={alt} className={styles["image"]} />
    </div>
  );
};
