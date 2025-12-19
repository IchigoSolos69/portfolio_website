import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile devices based on window width
 * @returns {boolean} Returns true if the screen width is less than 768px (mobile breakpoint)
 */
const useMobileDetection = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
};

export default useMobileDetection;
