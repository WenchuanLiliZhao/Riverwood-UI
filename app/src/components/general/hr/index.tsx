import * as React from "react";
import { clsx } from "clsx";
import styles from "./_styles.module.scss";

export interface TextHrProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * TextHr Component
 * 
 * A horizontal rule with optional text content in the center.
 * Uses a container div with flexbox layout to display text between lines.
 * 
 * @example
 * ```tsx
 * <TextHr>Section Title</TextHr>
 * <TextHr /> // Just a line without text
 * ```
 */
export const TextHr = React.forwardRef<HTMLDivElement, TextHrProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles["text-hr"], className)}
        {...props}
      >
        {children && (
          <>
            <hr className={styles["text-hr-line"]} />
            <span className={styles["text-hr-content"]}>{children}</span>
            <hr className={styles["text-hr-line"]} />
          </>
        )}
        {!children && <hr className={styles["text-hr-line"]} />}
      </div>
    );
  }
);

TextHr.displayName = "TextHr";