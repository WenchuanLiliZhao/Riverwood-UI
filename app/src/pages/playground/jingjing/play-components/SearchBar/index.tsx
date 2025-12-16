import React from "react";
import { MaterialIcon } from "../../../../../components";
import styles from "./styles.module.scss";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  iconSize?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  iconSize = 20,
}) => {
  return (
    <div className={`${styles["search-container"]} ${className}`}>
      <MaterialIcon icon="search" size={iconSize} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles["search-input"]}
        aria-label={placeholder}
      />
    </div>
  );
};

