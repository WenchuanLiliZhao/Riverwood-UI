import { cva, type VariantProps } from 'class-variance-authority';
import styles from './color.module.scss';

/**
 * Color variants using CVA for type-safe class name management.
 * Maps to SCSS Module classes defined in color.module.scss.
 */
export const colorVariants = cva('', {
  variants: {
    bg: {
      primary: styles.bgPrimary,
      primaryHover: styles.bgPrimaryHover,
      secondary: styles.bgSecondary,
      hover: styles.bgHover,
      hoverInverse: styles.bgHoverInverse,
    },
    text: {
      primary: styles.textPrimary,
      primaryEm: styles.textPrimaryEm,
      secondary: styles.textSecondary,
      negative: styles.textNegative,
      disabled: styles.textDisabled,
      inverse: styles.textInverse,
      inverseEm: styles.textInverseEm,
    },
    border: {
      primary: styles.borderPrimary,
    },
  },
});

export type ColorVariantProps = VariantProps<typeof colorVariants>;

/**
 * Helper function to get color class names with type safety.
 * @example
 * ```tsx
 * <div className={getColorClass({ bg: 'primary', text: 'inverse' })}>Content</div>
 * ```
 */
export function getColorClass(props?: ColorVariantProps): string {
  return colorVariants(props);
}

