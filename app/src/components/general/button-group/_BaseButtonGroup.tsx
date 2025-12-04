import * as React from "react";
import styles from "./styles.module.scss";
import { Button, type BasicButtonProps } from "../button";
import type {
  ComponentVariant,
  ComponentSemantic,
} from "../../shared/tokens";
import { COMPONENT_VARIANTS } from "../../shared/tokens";

export type ButtonGroupMode = "switch" | "normal";

/**
 * Button configuration object for declarative API
 * Extends BasicButtonProps and adds value prop, plus standard button HTML attributes
 */
export interface ButtonConfig extends Omit<BasicButtonProps, "children"> {
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  // Allow other standard button HTML attributes
  [key: string]: unknown;
}

/**
 * Type guard to check if an item is a ReactElement
 */
function isReactElement(
  item: React.ReactElement<BasicButtonProps> | ButtonConfig
): item is React.ReactElement<BasicButtonProps> {
  return React.isValidElement(item);
}

export interface BaseButtonGroupProps {
  /**
   * Array of button subgroups. Each subgroup is an array of buttons.
   * Supports two formats:
   * 1. ReactElement: Pass pre-rendered Button components
   * 2. ButtonConfig: Pass configuration objects, ButtonGroup will render them
   *
   * @example
   * // Using ReactElement (existing API)
   * elements={[[<Button content={{ text: "Option 1" }} value="opt1" />]]}
   *
   * @example
   * // Using ButtonConfig (new declarative API)
   * elements={[[{ content: { text: "Option 1" }, value: "opt1" }]]}
   */
  elements: (
    | React.ReactElement<BasicButtonProps>
    | ButtonConfig
  )[][];
  mode?: ButtonGroupMode;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
  /**
   * Active variant to apply when a button is active.
   * Defaults to "fill-inverse" for switch mode, "fill" for normal mode.
   */
  activeVariant?: ComponentVariant;
  /**
   * Active semantic to apply when a button is active.
   * Defaults to "brand" for switch mode, "primary" for normal mode.
   */
  activeSemantic?: ComponentSemantic;
}

export const BaseButtonGroup = React.forwardRef<
  HTMLDivElement,
  BaseButtonGroupProps
>(
  (
    {
      elements,
      mode = "normal",
      value,
      onChange,
      className,
      activeVariant,
      activeSemantic,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>([]);

    // Normalize value to array
    const currentValue = React.useMemo(() => {
      if (isControlled) {
        if (value === undefined || value === null) return [];
        return Array.isArray(value) ? value : [String(value)];
      }
      return internalValue;
    }, [isControlled, value, internalValue]);

    const handleButtonClick = React.useCallback(
      (buttonValue: string) => {
        let newValue: string[];

        if (mode === "switch") {
          // Switch mode: only one active button
          newValue = currentValue.includes(buttonValue) ? [] : [buttonValue];
        } else {
          // Normal mode: toggle button in array
          newValue = currentValue.includes(buttonValue)
            ? currentValue.filter((v) => v !== buttonValue)
            : [...currentValue, buttonValue];
        }

        if (!isControlled) {
          setInternalValue(newValue);
        }

        if (onChange) {
          onChange(mode === "switch" ? newValue[0] || "" : newValue);
        }
      },
      [mode, currentValue, isControlled, onChange]
    );

    // Normalize button item to ReactElement
    const normalizeButton = React.useCallback(
      (
        item: React.ReactElement<BasicButtonProps> | ButtonConfig,
        subgroupIndex: number,
        buttonIndex: number
      ): React.ReactElement<BasicButtonProps> => {
        // If it's already a ReactElement, return it
        if (isReactElement(item)) {
          return item;
        }

        // Otherwise, it's a ButtonConfig - render it using Button component
        const { value, onClick, ...buttonProps } = item;
        return (
          <Button
            key={`${subgroupIndex}-${buttonIndex}`}
            {...buttonProps}
            {...(value ? { value } : {})}
            {...(onClick ? { onClick } : {})}
          />
        );
      },
      []
    );

    // Extract value from button props or use index as fallback
    const getButtonValue = (
      button: React.ReactElement<BasicButtonProps>,
      subgroupIndex: number,
      buttonIndex: number
    ): string => {
      // Check if button has a value prop
      if (button.props && "value" in button.props && button.props.value) {
        return String(button.props.value);
      }
      // Fallback to index-based value
      return `${subgroupIndex}-${buttonIndex}`;
    };

    // Clone button with enhanced props
    const enhanceButton = (
      button: React.ReactElement<BasicButtonProps>,
      subgroupIndex: number,
      buttonIndex: number,
      isFirstInSubgroup: boolean,
      isLastInSubgroup: boolean,
      isOnlyInSubgroup: boolean
    ): React.ReactElement => {
      const buttonValue = getButtonValue(button, subgroupIndex, buttonIndex);
      const isActive = currentValue.includes(buttonValue);

      // Determine active styling
      const defaultActiveVariant =
        mode === "switch"
          ? COMPONENT_VARIANTS["fill-inverse"]
          : COMPONENT_VARIANTS.fill;
      const defaultActiveSemantic = mode === "switch" ? "brand" : "primary";

      const finalVariant = isActive
        ? activeVariant || defaultActiveVariant
        : button.props.design?.variant;
      const finalSemantic = isActive
        ? activeSemantic || defaultActiveSemantic
        : button.props.design?.semantic;

      // Build className for grouped button styling
      const groupedClasses: string[] = [];
      if (isFirstInSubgroup && !isOnlyInSubgroup) {
        groupedClasses.push(styles.buttonFirst);
      }
      if (isLastInSubgroup && !isOnlyInSubgroup) {
        groupedClasses.push(styles.buttonLast);
      }
      if (!isFirstInSubgroup && !isLastInSubgroup) {
        groupedClasses.push(styles.buttonMiddle);
      }
      if (!isFirstInSubgroup) {
        groupedClasses.push(styles.buttonNotFirst);
      }

      const existingClassName = button.props.className || "";
      const combinedClassName = [existingClassName, ...groupedClasses]
        .filter(Boolean)
        .join(" ");

      // Get existing onClick handler from button props
      const existingOnClick =
        button.props &&
        "onClick" in button.props &&
        typeof button.props.onClick === "function"
          ? button.props.onClick
          : undefined;

      return React.cloneElement(
        button,
        {
          key: `${subgroupIndex}-${buttonIndex}`,
          className: combinedClassName,
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            handleButtonClick(buttonValue);
            if (existingOnClick) {
              existingOnClick(e);
            }
          },
          design: {
            ...button.props.design,
            variant: finalVariant,
            semantic: finalSemantic,
          },
        } as Partial<BasicButtonProps & { onClick?: React.MouseEventHandler<HTMLButtonElement> }>
      );
    };

    return (
      <div ref={ref} className={`${styles.base} ${className || ""}`}>
        {elements.map((subgroup, subgroupIndex) => (
          <React.Fragment key={subgroupIndex}>
            {subgroupIndex > 0 && (
              <div className={styles.subgroupSeparator} aria-hidden="true" />
            )}
            <div className={styles.subgroup}>
              {subgroup.map((item, buttonIndex) => {
                // Normalize item to ReactElement (handles both formats)
                const button = normalizeButton(item, subgroupIndex, buttonIndex);
                const isFirstInSubgroup = buttonIndex === 0;
                const isLastInSubgroup = buttonIndex === subgroup.length - 1;
                const isOnlyInSubgroup = subgroup.length === 1;
                return (
                  <div key={buttonIndex} className={styles.buttonWrapper}>
                    {enhanceButton(
                      button,
                      subgroupIndex,
                      buttonIndex,
                      isFirstInSubgroup,
                      isLastInSubgroup,
                      isOnlyInSubgroup
                    )}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
);

BaseButtonGroup.displayName = "BaseButtonGroup";

