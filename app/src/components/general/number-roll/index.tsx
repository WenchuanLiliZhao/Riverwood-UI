import * as React from "react";
import { clsx } from "clsx";
import styles from "./styles.module.scss";

export interface NumberRollProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The target value to roll to (from 0)
   */
  value: number;
  /**
   * Whether to use thousands separator (e.g., 1,000)
   * @default true
   */
  useThousandsSeparator?: boolean;
  /**
   * Duration of the animation in milliseconds
   * @default 1000
   */
  duration?: number;
  /**
   * Callback fired when animation completes
   */
  onComplete?: () => void;
}

/**
 * NumberRoll Component
 *
 * A component that animates a number from 0 to a target value.
 * Automatically calculates step size and handles integer/decimal display.
 *
 * @example
 * ```tsx
 * <NumberRoll value={1234.56} useThousandsSeparator={true} />
 * <NumberRoll value={100} duration={2000} />
 * ```
 */
export const NumberRoll = React.forwardRef<HTMLSpanElement, NumberRollProps>(
  (
    {
      value,
      useThousandsSeparator = true,
      duration = 1500,
      onComplete,
      className,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const animationRef = React.useRef<number | null>(null);
    const startTimeRef = React.useRef<number | null>(null);
    const isIntegerValue = React.useMemo(() => Number.isInteger(value), [value]);

    // Calculate decimal places of the final value
    const decimalPlaces = React.useMemo(() => {
      if (isIntegerValue) {
        return 0;
      }
      // Convert to string to find decimal places
      const valueStr = value.toString();
      // Handle standard decimal notation (e.g., 123.45)
      if (valueStr.includes(".") && !valueStr.includes("e")) {
        return valueStr.split(".")[1].length;
      }
      // Handle scientific notation (e.g., 1e-5, 1.23e-2)
      if (valueStr.includes("e")) {
        const parts = valueStr.split("e");
        const exponent = parseInt(parts[1], 10);
        if (exponent < 0) {
          // For scientific notation, calculate total decimal places
          const basePart = parts[0];
          const baseDecimalPlaces = basePart.includes(".")
            ? basePart.split(".")[1].length
            : 0;
          return Math.abs(exponent) + baseDecimalPlaces;
        }
      }
      return 0;
    }, [value, isIntegerValue]);

    // Format number with optional thousands separator
    const formatNumber = React.useCallback(
      (num: number): string => {
        if (useThousandsSeparator) {
          if (isIntegerValue) {
            // For integers, use integer formatting
            return Math.floor(num).toLocaleString("en-US");
          } else {
            // For decimals, use the same decimal places as the final value
            return num.toLocaleString("en-US", {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            });
          }
        } else {
          if (isIntegerValue) {
            return Math.floor(num).toString();
          } else {
            // For decimals without thousands separator, use toFixed to maintain decimal places
            return num.toFixed(decimalPlaces);
          }
        }
      },
      [useThousandsSeparator, isIntegerValue, decimalPlaces]
    );

    React.useEffect(() => {
      // Reset to 0 when value changes
      setDisplayValue(0);
      startTimeRef.current = null;

      // Cancel any ongoing animation
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      // Start animation
      const animate = (currentTime: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = currentTime;
        }

        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Use easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        // Calculate current value
        const currentValue = value * easeOut;

        // For integer values, floor the display value during animation
        const valueToDisplay = isIntegerValue
          ? Math.floor(currentValue)
          : currentValue;

        setDisplayValue(valueToDisplay);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Ensure final value is exact
          setDisplayValue(value);
          animationRef.current = null;
          onComplete?.();
        }
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [value, duration, isIntegerValue, onComplete]);

    return (
      <span
        ref={ref}
        className={clsx(styles["number-roll"], className)}
        {...props}
      >
        {formatNumber(displayValue)}
      </span>
    );
  }
);

NumberRoll.displayName = "NumberRoll";
