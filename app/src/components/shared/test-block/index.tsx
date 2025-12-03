import * as React from "react";
import { clsx } from "clsx";
import styles from "./_styles.module.scss";

export interface TestBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display inside the test block
   */
  children?: React.ReactNode;
  /**
   * Variant style of the test block
   */
  variant?: "default" | "outlined" | "filled";
}

/**
 * TestBlock Component
 * 
 * A simple visual test block component for development and testing purposes.
 * Useful for placeholder content in layouts and grids.
 * 
 * @example
 * ```tsx
 * <TestBlock>1</TestBlock>
 * <TestBlock variant="outlined">2</TestBlock>
 * <TestBlock variant="filled">3</TestBlock>
 * ```
 */
export const TestBlock = React.forwardRef<HTMLDivElement, TestBlockProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles["test-block"],
          styles[variant],
          className
        )}
        {...props}
      >
        <span className={styles["test-block-content"]}>{children}</span>
      </div>
    );
  }
);

TestBlock.displayName = "TestBlock";

