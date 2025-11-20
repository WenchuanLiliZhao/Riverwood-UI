import { cva, type VariantProps } from 'class-variance-authority';
import styles from './_barItemGroup.module.scss';

/**
 * Bar item group variants using CVA for type-safe class name management.
 * Maps to SCSS Module classes defined in _barItemGroup.module.scss.
 */
export const barItemGroupVariants = cva(styles['bar-item-group'], {
  variants: {
    direction: {
      row: styles.row,
      column: styles.column,
    },
  },
  defaultVariants: {
    direction: 'row',
  },
});

export type BarItemGroupVariantProps = VariantProps<typeof barItemGroupVariants>;

