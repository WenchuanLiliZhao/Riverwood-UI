/**
 * Design tokens for FinOps Cost Analysis Dashboard
 * Based on the comprehensive design guidelines in DESIGN.md
 */

export const design = {
  // Layout
  navBar: {
    height: 56,
    padding: 16,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  
  // Card Design
  card: {
    borderRadius: 8,
    padding: {
      vertical: 20,
      horizontal: 24,
    },
    shadow: {
      default: '0 1px 3px rgba(0, 0, 0, 0.04)',
      hover: '0 2px 6px rgba(0, 0, 0, 0.06)',
    },
  },
  
  // Typography
  typography: {
    pageTitle: {
      size: 24,
      weight: 600,
      lineHeight: 32,
    },
    cardTitle: {
      size: 14,
      weight: 500,
      lineHeight: 20,
    },
    largeMetric: {
      size: 64,
      weight: 700,
      lineHeight: 1.1,
    },
    mediumMetric: {
      size: 48,
      weight: 700,
      lineHeight: 1.1,
    },
    smallMetric: {
      size: 32,
      weight: 600,
      lineHeight: 1.2,
    },
    metricUnit: {
      size: 24,
      weight: 500,
      lineHeight: 1.2,
    },
    bodyText: {
      size: 14,
      weight: 400,
      lineHeight: 20,
    },
    caption: {
      size: 12,
      weight: 400,
      lineHeight: 16,
    },
  },
  
  // Spacing System (8px grid)
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
  },
  
  // Chart Specifications
  charts: {
    gauge: {
      outerRadius: 64,
      ringWidth: 16,
      ringGap: 4,
      cornerRadius: 100,
    },
    bar: {
      height: 32,
      gap: 12,
      borderRadius: 4,
      minWidth: 24,
      maxWidth: 48,
    },
    donut: {
      outerRadius: 120,
      innerRadius: 70,
    },
  },
  
  // Color System
  colors: {
    // Chart Colors (8-color palette)
    chart: {
      blue: '#2563eb',
      purple: '#8b5cf6',
      cyan: '#06b6d4',
      amber: '#f59e0b',
      green: '#10b981',
      red: '#ef4444',
      pink: '#ec4899',
      lime: '#84cc16',
    },
    
    // Semantic Colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4',
    },
    
    // Gauge Thresholds
    gauge: {
      healthy: '#10b981',    // 0-70%
      warning: '#f59e0b',    // 70-90%
      critical: '#ef4444',   // 90-100%
    },
    
    // Provider Colors
    provider: {
      aliyun: '#f59e0b',
      azure: '#2563eb',
    },
  },
  
  // Standard Card Heights
  cardHeights: {
    small: 200,
    medium: 300,
    large: 400,
    xlarge: 500,
  },
  
  // Animation Timings
  animation: {
    fast: 150,
    normal: 250,
    slow: 350,
    chartTransition: 400,
  },
  
  // Breakpoints
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
};

/**
 * Helper function to get gauge color based on percentage
 */
export const getGaugeColor = (percentage: number): string => {
  if (percentage >= 90) return design.colors.gauge.critical;
  if (percentage >= 70) return design.colors.gauge.warning;
  return design.colors.gauge.healthy;
};

/**
 * Chart color palette for multi-category visualizations
 */
export const chartColorPalette = [
  design.colors.chart.blue,
  design.colors.chart.purple,
  design.colors.chart.cyan,
  design.colors.chart.amber,
  design.colors.chart.green,
  design.colors.chart.red,
  design.colors.chart.pink,
  design.colors.chart.lime,
];

/**
 * Format large numbers for display
 */
export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(0);
};

/**
 * Format percentage with sign
 */
export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};
