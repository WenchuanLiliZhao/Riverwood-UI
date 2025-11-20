import { useEffect, useState, useRef, type ReactNode } from 'react';

export type ResponsiveConfig = {
  interval: [number, number] | [number, undefined];
  output: ReactNode | string;
}[];

/**
 * Hook to get responsive value based on parent element's width
 * 
 * @param config - Array of interval/output pairs
 * @param elementRef - Ref to the parent element to observe
 * @returns The current output value based on the element's width
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const className = useResponsive([
 *   { interval: [0, 640], output: "classA" },
 *   { interval: [641, 1080], output: "classB" },
 * ], ref);
 * 
 * return <div ref={ref} className={className}>Content</div>;
 * ```
 */
export const useResponsive = (
  config: ResponsiveConfig,
  elementRef: React.RefObject<HTMLElement | null>
): ReactNode | string => {
  const [output, setOutput] = useState<ReactNode | string>(() => {
    // Initial value - use first config's output as default
    return config[0]?.output ?? '';
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Helper function to check if width falls within an interval
    const getOutputForWidth = (width: number): ReactNode | string => {
      for (const item of config) {
        const [min, max] = item.interval;
        const maxValue = max === undefined ? Infinity : max;
        
        if (width >= min && width <= maxValue) {
          return item.output;
        }
      }
      
      // Fallback to first config's output if no match
      return config[0]?.output ?? '';
    };

    // Update output based on current width
    const updateOutput = () => {
      const width = element.offsetWidth;
      const newOutput = getOutputForWidth(width);
      setOutput(newOutput);
    };

    // Initial update
    updateOutput();

    // Use ResizeObserver to track width changes
    const resizeObserver = new ResizeObserver(() => {
      updateOutput();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [config, elementRef]);

  return output;
};

/**
 * Hook that returns a ref and responsive value as a tuple
 * This provides a function-based API instead of component-based
 * 
 * @param config - Array of interval/output pairs
 * @returns A tuple [ref, value] where:
 *   - ref: Ref to attach to the element
 *   - value: The current output value based on the element's width
 * 
 * @example
 * ```tsx
 * // For className usage
 * const [ref, className] = useResponsiveValue([
 *   { interval: [0, 640], output: "classA" },
 *   { interval: [641, 1080], output: "classB" },
 * ]);
 * 
 * return <div ref={ref} className={className}>Content</div>;
 * ```
 * 
 * @example
 * ```tsx
 * // For rendering different content
 * const [ref, content] = useResponsiveValue([
 *   { interval: [0, 640], output: <ElementA /> },
 *   { interval: [641, 1080], output: <ElementB /> },
 * ]);
 * 
 * return <div ref={ref}>{content}</div>;
 * ```
 */
export const useResponsiveValue = (
  config: ResponsiveConfig
): [React.RefObject<HTMLElement | null>, ReactNode | string] => {
  const ref = useRef<HTMLElement | null>(null);
  const value = useResponsive(config, ref);
  return [ref, value];
};

