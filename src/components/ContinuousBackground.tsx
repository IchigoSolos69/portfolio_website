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
    // Calculate gradient based on scroll position
    const calculateGradient = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const normalizedScroll = documentHeight > 0 ? Math.min(scrollY / documentHeight, 1) : 0;

      // Define color stops for a smooth gradient transition
      // Using RGB values for slate colors
      const colorStops = [
        { pos: 0, r: 15, g: 23, b: 42 },    // slate-900 (dark navy)
        { pos: 0.2, r: 30, g: 41, b: 59 },  // slate-800
        { pos: 0.4, r: 51, g: 65, b: 85 },  // slate-700
        { pos: 0.6, r: 71, g: 85, b: 105 }, // slate-600
        { pos: 0.8, r: 100, g: 116, b: 139 }, // slate-500
        { pos: 1, r: 148, g: 163, b: 184 }  // slate-400
      ];

      // Find the two colors to interpolate between
      let startColor = colorStops[0];
      let endColor = colorStops[1];

      for (let i = 0; i < colorStops.length - 1; i++) {
        if (normalizedScroll >= colorStops[i].pos && normalizedScroll <= colorStops[i + 1].pos) {
          startColor = colorStops[i];
          endColor = colorStops[i + 1];
          break;
        }
      }

      // Calculate interpolation factor
      const range = endColor.pos - startColor.pos;
      const factor = range > 0 ? (normalizedScroll - startColor.pos) / range : 0;

      // Interpolate between colors
      const r = Math.round(startColor.r + (endColor.r - startColor.r) * factor);
      const g = Math.round(startColor.g + (endColor.g - startColor.g) * factor);
      const b = Math.round(startColor.b + (endColor.b - startColor.b) * factor);

      // Create a smooth gradient from the current color to slightly lighter
      const currentColor = `rgb(${r}, ${g}, ${b})`;
      const lighterColor = `rgb(${Math.min(r + 20, 255)}, ${Math.min(g + 20, 255)}, ${Math.min(b + 20, 255)})`;

      return {
        background: `linear-gradient(to bottom, ${currentColor} 0%, ${lighterColor} 50%, ${currentColor} 100%)`,
        transition: 'background 0.3s ease-out'
      };
    };

    setBackgroundStyle(calculateGradient());
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

