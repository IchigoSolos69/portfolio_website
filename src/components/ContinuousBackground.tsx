import React, { useState, useEffect, useCallback } from 'react';

interface ContinuousBackgroundProps {
  children: React.ReactNode;
}

const ContinuousBackground: React.FC<ContinuousBackgroundProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getBackgroundColor = useCallback(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          // Smooth gradient transition colors
          const colors = [
            'rgb(0, 0, 0)',        // Pure black
            'rgb(15, 23, 42)',     // slate-900
            'rgb(30, 41, 59)',     // slate-800
            'rgb(51, 65, 85)',     // slate-700
            'rgb(71, 85, 105)',    // slate-600
            'rgb(100, 116, 139)'   // slate-500
          ];
          
          const sectionIndex = sections.indexOf(section);
          return { backgroundColor: colors[sectionIndex] };
        }
      }
    }
    
    return { backgroundColor: 'rgb(15, 23, 42)' };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setBackgroundStyle(getBackgroundColor());
  }, [scrollY, getBackgroundColor]);

  return (
    <div 
      className="relative min-h-screen w-full"
    >
      {children}
    </div>
  );
};

export default ContinuousBackground;
