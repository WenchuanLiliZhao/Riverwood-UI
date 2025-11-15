import { useEffect } from 'react';

/**
 * Hook to disable body scroll when component mounts and re-enable when unmounts
 * Can be used in layouts or any component where body scroll should be disabled
 */
export const useDisableBodyScroll = (isDisabled: boolean = true) => {
  useEffect(() => {
    if (!isDisabled) return;

    // Save the original overflow value
    const originalOverflow = document.body.style.overflow;
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';

    // Cleanup: restore original overflow value when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isDisabled]);
};

/**
 * Utility function to disable body scroll directly
 * Returns a cleanup function to restore scroll
 */
export const disableBodyScroll = (): (() => void) => {
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  
  // Return cleanup function
  return () => {
    document.body.style.overflow = originalOverflow;
  };
};

