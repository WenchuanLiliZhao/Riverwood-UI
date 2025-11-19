import { cva, type VariantProps } from 'class-variance-authority';
import styles from './font.module.scss';

/**
 * Font typography variants using CVA for type-safe class name management.
 * Maps to SCSS Module classes defined in font.module.scss.
 */
export const fontVariants = cva('', {
  variants: {
    typography: {
      title: styles.title,
      heading: styles.heading,
      subheading: styles.subheading,
      body: styles.body,
      caption: styles.caption,
      small: styles.small,
    },
    fontWeight: {
      bold: styles.bold,
      light: styles.light,
    },
    fontFamily: {
      sans: styles.sans,
      serif: styles.serif,
      mono: styles.mono,
      roman: styles.roman,
    },
    textTransform: {
      uppercase: styles.uppercase,
    },
  },
});

export type FontVariantProps = VariantProps<typeof fontVariants>;

/**
 * Helper function to get font class names with type safety.
 * @example
 * ```tsx
 * <h1 className={getFontClass({ typography: 'title' })}>Title</h1>
 * ```
 */
export function getFontClass(props?: FontVariantProps): string {
  return fontVariants(props);
}

