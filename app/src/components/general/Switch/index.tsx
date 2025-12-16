import * as React from "react";
import { Button } from "../..";
import {
  COMPONENT_VARIANTS,
  COMPONENT_SIZES,
  COMPONENT_SEMANTICS,
} from "../../shared/tokens";
import styles from "./styles.module.scss";

export interface SwitchOption {
  value: string;
  label?: string;
  icon?: string;
  hoverable?: boolean;
}

export interface SwitchProps {
  options: SwitchOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "small" | "medium" | "large" | "xlarge";
  hoverable?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  options,
  value,
  onChange,
  size = "small",
  hoverable = true,
}) => {
  const sizeToken =
    size === "small"
      ? COMPONENT_SIZES.small
      : size === "medium"
      ? COMPONENT_SIZES.medium
      : size === "large"
      ? COMPONENT_SIZES.large
      : COMPONENT_SIZES.xlarge;

  return (
    <div className={styles.switch}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <Button
            key={option.value}
            content={{
              ...(option.icon && { icon: option.icon }),
              ...(option.label && { text: option.label }),
            }}
            design={{
              variant: isActive
                ? COMPONENT_VARIANTS.outlined
                : COMPONENT_VARIANTS.ghost,
              size: sizeToken,
              semantic: isActive
                ? COMPONENT_SEMANTICS.primary
                : COMPONENT_SEMANTICS.secondary,
            }}
            className={isActive ? styles.active : undefined}
            onClick={() => onChange(option.value)}
            hoverable={hoverable}
          />
        );
      })}
    </div>
  );
};

