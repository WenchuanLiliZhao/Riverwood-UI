/**
 * Debug Page for Bento Grid Component
 *
 * This page demonstrates various Bento Grid layouts and configurations.
 */

import React from "react";
import { BentoGrid, BentoItem } from "../../../components/sections/bento-grid";
import styles from "./_styles.module.scss";

/**
 * Simple placeholder component to visualize grid items
 */
const GridItemContent: React.FC<{
  label: string;
  cols?: number;
  rows?: number;
}> = ({ label, cols, rows }) => (
  <div className={styles.itemContent}>
    <span className={styles.label}>{label}</span>
    {rows && cols && <span className={styles.info}>
      {cols}×{rows} (cols×rows)
    </span>}
  </div>
);

/**
 * Section wrapper for each demo
 */
const Section: React.FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => (
  <section className={styles.section}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionDescription}>{description}</p>
    </div>
    {children}
  </section>
);

/**
 * Main debug component
 */
export const DebugBentoGridComponent: React.FC = () => {
  return (
    <div className={styles.debugPage}>
      <header className={styles.pageHeader}>
        <h1>Bento Grid Debug Page</h1>
        <p>Demonstrating various layouts with a 12-column grid system</p>
      </header>

      {/* Pattern 1: Responsive Asymmetric Layout */}
      <Section
        title="Pattern 1: Responsive Asymmetric Layout"
        description="4 small items (3 cols each) on the left, 1 large item (6 cols × 2 rows) on the right. Responsive breakpoints adjust layout."
      >
        <BentoGrid 
          gap="none" 
          rowHeight={[
            [560, 40],
            [800, 60],
            [1200, 70],
            [Infinity, 80],
          ]}
        >
          <BentoItem
            res={[
              [560, 12, 4], // test 1
              [800, 12, 6], // test 1
              [1200, 6, 6], // test 1
              [Infinity, 6, 6], // test 1
            ]}
          >
            <GridItemContent label="Large Item" />
          </BentoItem>
          <BentoItem
            res={[
              [480, 12, 4], // test 1
              [800, 6, 3], // test 1
              [1200, 3, 3], // test 1
              [Infinity, 2, 3], // test 1
            ]}
          >
            <GridItemContent label="Item 1" />
          </BentoItem>
          <BentoItem
            res={[
              [480, 12, 4], // test 1
              [800, 6, 3], // test 1
              [1200, 3, 3], // test 1
              [Infinity, 2, 3], // test 1
            ]}
          >
            <GridItemContent label="Item 2" />
          </BentoItem>
          <BentoItem
            res={[
              [480, 12, 4], // test 1
              [800, 6, 3], // test 1
              [1200, 3, 3], // test 1
              [Infinity, 2, 3], // test 1
            ]}
          >
            <GridItemContent label="Item 3" />
          </BentoItem>
          <BentoItem
            res={[
              [480, 12, 4], // test 1
              [800, 6, 3], // test 1
              [1200, 3, 3], // test 1
              [Infinity, 2, 3], // test 1
            ]}
          >
            <GridItemContent label="Item 4" />
          </BentoItem>
          <BentoItem
            res={[
              [480, 12, 4], // test 1
              [800, 6, 3], // test 1
              [1200, 3, 3], // test 1
              [Infinity, 2, 3], // test 1
            ]}
          >
            <GridItemContent label="Item 5" />
          </BentoItem>
          <BentoItem
            res={[
              [480, 12, 4], // test 1
              [800, 6, 3], // test 1
              [1200, 3, 3], // test 1
              [Infinity, 2, 3], // test 1
            ]}
          >
            <GridItemContent label="Item 6" />
          </BentoItem>
        </BentoGrid>
      </Section>

      {/* Pattern 2: Responsive Equal Grid */}
      <Section
        title="Pattern 2: Responsive Equal Grid"
        description="6 equal items with responsive breakpoints: 2 per row on mobile, 3 per row on tablet, 3 per row on desktop"
      >
        <BentoGrid gap="md">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BentoItem
              key={i}
              res={[
                [640, 6, 1],
                [1024, 4, 1],
                [Infinity, 4, 1],
              ]}
            >
              <GridItemContent label={`Item ${i}`} cols={4} rows={1} />
            </BentoItem>
          ))}
        </BentoGrid>
      </Section>

      {/* Pattern 3: Responsive Asymmetric Right Grid */}
      <Section
        title="Pattern 3: Responsive Asymmetric Right Grid"
        description="1 large item (6 cols × 2 rows) on the left, 6 small items (2 cols each) on the right. Responsive breakpoints adjust layout."
      >
        <BentoGrid gap="md">
          <BentoItem
            res={[
              [640, 6, 2],
              [1024, 6, 2],
              [Infinity, 6, 2],
            ]}
          >
            <GridItemContent label="Large Item" cols={6} rows={2} />
          </BentoItem>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BentoItem
              key={i}
              res={[
                [640, 6, 1],
                [1024, 2, 1],
                [Infinity, 2, 1],
              ]}
            >
              <GridItemContent label={`Item ${i}`} cols={2} rows={1} />
            </BentoItem>
          ))}
        </BentoGrid>
      </Section>

      {/* Pattern 4: Complex Responsive Mixed Layout */}
      <Section
        title="Pattern 4: Complex Responsive Mixed Layout"
        description="Various item sizes with different responsive breakpoints demonstrating full flexibility"
      >
        <BentoGrid gap="md">
          <BentoItem
            res={[
              [640, 6, 2],
              [1024, 8, 2],
              [Infinity, 8, 2],
            ]}
          >
            <GridItemContent label="Hero" cols={8} rows={2} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 4, 1],
              [Infinity, 4, 1],
            ]}
          >
            <GridItemContent label="A" cols={4} rows={1} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 4, 1],
              [Infinity, 4, 1],
            ]}
          >
            <GridItemContent label="B" cols={4} rows={1} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 3, 1],
              [Infinity, 3, 1],
            ]}
          >
            <GridItemContent label="C" cols={3} rows={1} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 3, 1],
              [Infinity, 3, 1],
            ]}
          >
            <GridItemContent label="D" cols={3} rows={1} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 2],
              [1024, 6, 2],
              [Infinity, 6, 2],
            ]}
          >
            <GridItemContent label="Featured" cols={6} rows={2} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 3, 1],
              [Infinity, 3, 1],
            ]}
          >
            <GridItemContent label="E" cols={3} rows={1} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 3, 1],
              [Infinity, 3, 1],
            ]}
          >
            <GridItemContent label="F" cols={3} rows={1} />
          </BentoItem>
        </BentoGrid>
      </Section>

      {/* Pattern 5: Responsive Full-Width Header */}
      <Section
        title="Pattern 5: Responsive Full-Width Header"
        description="1 full-width item followed by equal-sized items with responsive breakpoints"
      >
        <BentoGrid gap="md">
          <BentoItem res={[[Infinity, 12, 1]]}>
            <GridItemContent label="Full Width Header" cols={12} rows={1} />
          </BentoItem>
          {[1, 2, 3, 4].map((i) => (
            <BentoItem
              key={i}
              res={[
                [640, 6, 1],
                [1024, 3, 1],
                [Infinity, 3, 1],
              ]}
            >
              <GridItemContent label={`Item ${i}`} cols={3} rows={1} />
            </BentoItem>
          ))}
        </BentoGrid>
      </Section>

      {/* Pattern 6: Responsive Alternating Sizes */}
      <Section
        title="Pattern 6: Responsive Alternating Sizes"
        description="Alternating between large and small items with responsive breakpoints"
      >
        <BentoGrid gap="md">
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 8, 1],
              [Infinity, 8, 1],
            ]}
          >
            <GridItemContent label="Large 1" cols={8} rows={1} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 4, 1],
              [Infinity, 4, 1],
            ]}
          >
            <GridItemContent label="Small 1" cols={4} rows={1} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 4, 1],
              [Infinity, 4, 1],
            ]}
          >
            <GridItemContent label="Small 2" cols={4} rows={1} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 8, 1],
              [Infinity, 8, 1],
            ]}
          >
            <GridItemContent label="Large 2" cols={8} rows={1} />
          </BentoItem>
        </BentoGrid>
      </Section>

      {/* Pattern 7: Gap Variants */}
      <Section
        title="Pattern 7: Gap Variants"
        description="Demonstrating small, medium, and large gap sizes with responsive items"
      >
        <div className={styles.gapVariants}>
          <div>
            <h3>Small Gap</h3>
            <BentoGrid gap="sm">
              {[1, 2, 3, 4].map((i) => (
                <BentoItem
                  key={i}
                  res={[
                    [640, 6, 1],
                    [1024, 3, 1],
                    [Infinity, 3, 1],
                  ]}
                >
                  <GridItemContent label={`${i}`} cols={3} rows={1} />
                </BentoItem>
              ))}
            </BentoGrid>
          </div>

          <div>
            <h3>Medium Gap (Default)</h3>
            <BentoGrid gap="md">
              {[1, 2, 3, 4].map((i) => (
                <BentoItem
                  key={i}
                  res={[
                    [640, 6, 1],
                    [1024, 3, 1],
                    [Infinity, 3, 1],
                  ]}
                >
                  <GridItemContent label={`${i}`} cols={3} rows={1} />
                </BentoItem>
              ))}
            </BentoGrid>
          </div>

          <div>
            <h3>Large Gap</h3>
            <BentoGrid gap="lg">
              {[1, 2, 3, 4].map((i) => (
                <BentoItem
                  key={i}
                  res={[
                    [640, 6, 1],
                    [1024, 3, 1],
                    [Infinity, 3, 1],
                  ]}
                >
                  <GridItemContent label={`${i}`} cols={3} rows={1} />
                </BentoItem>
              ))}
            </BentoGrid>
          </div>
        </div>
      </Section>

      {/* Pattern 8: Responsive Vertical Spanning */}
      <Section
        title="Pattern 8: Responsive Vertical Spanning"
        description="Items with different row spans and responsive breakpoints"
      >
        <BentoGrid gap="md">
          <BentoItem
            res={[
              [640, 6, 2],
              [1024, 4, 3],
              [Infinity, 4, 3],
            ]}
          >
            <GridItemContent label="Tall A" cols={4} rows={3} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 4, 1],
              [Infinity, 4, 1],
            ]}
          >
            <GridItemContent label="B" cols={4} rows={1} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 2],
              [1024, 4, 2],
              [Infinity, 4, 2],
            ]}
          >
            <GridItemContent label="Medium C" cols={4} rows={2} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 2],
              [1024, 4, 2],
              [Infinity, 4, 2],
            ]}
          >
            <GridItemContent label="Medium D" cols={4} rows={2} />
          </BentoItem>
          <BentoItem
            res={[
              [640, 6, 1],
              [1024, 4, 1],
              [Infinity, 4, 1],
            ]}
          >
            <GridItemContent label="E" cols={4} rows={1} />
          </BentoItem>
        </BentoGrid>
      </Section>
    </div>
  );
};
