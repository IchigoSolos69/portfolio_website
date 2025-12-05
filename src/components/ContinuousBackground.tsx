import React, { useState, useEffect } from 'react';

interface ContinuousBackgroundProps {
  children: React.ReactNode;
}

const ContinuousBackground: React.FC<ContinuousBackgroundProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Determine background color based on current section
    const getBackgroundColor = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            // Alternating pattern: black, navy blue, black, navy blue, etc.
            const sectionIndex = sections.indexOf(section);
            if (sectionIndex % 2 === 0) {
              // Even indices: black
              return { backgroundColor: '#000000' };
            } else {
              // Odd indices: navy blue (slate-900)
              return { backgroundColor: '#0f172a' };
            }
          }
        }
      }
      
      // Default to navy blue
      return { backgroundColor: '#0f172a' };
    };

    setBackgroundStyle(getBackgroundColor());
  }, [scrollY]);

  return (
    <div 
      className="relative min-h-screen w-full"
      style={backgroundStyle}
    >
      {children}
    </div>
  );
};

export default ContinuousBackground;

