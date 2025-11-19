/**
 * Example usage of font variants managed by CVA
 * 
 * This file demonstrates how to use the type-safe font class names
 * in your React components.
 */


import { clsx } from 'clsx';
import { fontVariants, getFontClass, type FontVariantProps } from './font.style';

// Example 1: Using fontVariants directly with className
export function ExampleComponent1() {
  return (
    <div>
      <h1 className={fontVariants({ typography: 'title' })}>Title Text</h1>
      <h2 className={fontVariants({ typography: 'heading' })}>Heading Text</h2>
      <h3 className={fontVariants({ typography: 'subheading' })}>Subheading Text</h3>
      <p className={fontVariants({ typography: 'body' })}>Body Text</p>
    </div>
  );
}

// Example 2: Using the helper function
export function ExampleComponent2() {
  return (
    <div>
      <h1 className={getFontClass({ typography: 'title' })}>Title Text</h1>
      <p className={getFontClass({ typography: 'body' })}>Body Text</p>
    </div>
  );
}

// Example 3: Combining with other classes using clsx
export function ExampleComponent3() {
  return (
    <div>
      <h1 className={clsx(
        fontVariants({ typography: 'title' }),
        'custom-class',
        'another-class'
      )}>
        Title with additional classes
      </h1>
    </div>
  );
}

// Example 4: Using with component props
interface TypographyProps extends FontVariantProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function Typography({ typography, children, as = 'p' }: TypographyProps) {
  const Component = as;
  return (
    <Component className={fontVariants({ typography })}>
      {children}
    </Component>
  );
}

// Usage:
// <Typography typography="title" as="h1">Title</Typography>
// <Typography typography="body">Body text</Typography>

