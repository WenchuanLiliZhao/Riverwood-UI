import React, { useState, useRef, useEffect } from "react";
import { MaterialIcon } from "../../../../../components";
import styles from "./styles.module.scss";

export interface DropdownMenuOption {
  value: string;
  label: string;
}

export interface DropdownMenuProps {
  options: DropdownMenuOption[];
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  value,
  onChange,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles["dropdown-container"]} ${className}`}
    >
      <div onClick={handleToggle}>{children}</div>
      {isOpen && (
        <div className={styles["dropdown-menu"]}>
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <div
                key={option.value}
                className={`${styles["dropdown-item"]} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span className={styles["item-label"]}>{option.label}</span>
                {isSelected && (
                  <MaterialIcon
                    icon="check"
                    className={styles["check-icon"]}
                    size={18}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

