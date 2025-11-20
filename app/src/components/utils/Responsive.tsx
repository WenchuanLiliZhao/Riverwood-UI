import { useRef, type ReactNode, type ElementType } from 'react';
import { useResponsive, type ResponsiveConfig } from './useResponsive';

export interface ResponsiveProps {
  config: ResponsiveConfig;
  children?: ReactNode | ((output: ReactNode | string) => ReactNode);
  className?: string | ((output: ReactNode | string) => string);
  as?: ElementType;
}

/**
 * Responsive component that applies different outputs based on parent element width
 * 
 * @example
 * ```tsx
 * // For className usage
 * <Responsive
 *   config={[
 *     { interval: [0, 640], output: "classA" },
 *     { interval: [641, 1080], output: "classB" },
 *   ]}
 * />
 * 
 * // For children rendering
 * <Responsive
 *   config={[
 *     { interval: [0, 640], output: <ElementA /> },
 *     { interval: [641, 1080], output: <ElementB /> },
 *   ]}
 * />
 * ```
 */
export const Responsive = ({
  config,
  children,
  className,
  as: Component = 'div',
  ...props
}: ResponsiveProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const output = useResponsive(config, ref);

  // Determine final className
  const finalClassName =
    typeof className === 'function'
      ? className(output)
      : typeof output === 'string'
      ? className
        ? `${className} ${output}`
        : output
      : className;

  // If output is a ReactNode, render it as children
  if (typeof output !== 'string') {
    return (
      <Component ref={ref} className={finalClassName} {...props}>
        {output}
      </Component>
    );
  }

  // If children is a function, call it with the output
  if (typeof children === 'function') {
    return (
      <Component ref={ref} className={finalClassName} {...props}>
        {children(output)}
      </Component>
    );
  }

  // Default: render children if provided
  return (
    <Component ref={ref} className={finalClassName} {...props}>
      {children}
    </Component>
  );
};

