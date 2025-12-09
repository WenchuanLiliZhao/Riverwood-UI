import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import styles from './_styles.module.scss';

interface RiverwoodMathProps {
  display?: boolean;
  children: string;
  macros?: Record<string, string>;
}

export function RiverwoodMath({ display = false, children, macros }: RiverwoodMathProps) {
  const containerRef = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Render with KaTeX
      katex.render(children, containerRef.current, {
        throwOnError: false,
        displayMode: display,
        macros: macros,
        strict: false, // Allow some LaTeX errors
      });
    } catch (error) {
      console.error('KaTeX rendering error:', error);
      if (containerRef.current) {
        containerRef.current.textContent = `Math Error: ${children}`;
      }
    }
  }, [children, display, macros]);

  if (display) {
    return <div ref={containerRef as React.RefObject<HTMLDivElement>} className={styles["math-display"]} />;
  }
  
  return <span ref={containerRef as React.RefObject<HTMLSpanElement>} className={styles["math-inline"]} />;
}
