export * from './useDisableBodyScroll';
export * from './useResponsive';
export * from './Responsive';

// Export useResponsiveValue as the main function-based API
export { useResponsiveValue as responsive } from './useResponsive';

export const closeBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

