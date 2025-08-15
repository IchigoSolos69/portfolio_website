import { useEffect, useState } from 'react';
import swordSlash from '@/assets/sword-slash.jpg';

interface AnimatedDividerProps {
  variant?: 'sword' | 'mask' | 'energy';
  className?: string;
}

export const AnimatedDivider = ({ variant = 'sword', className = '' }: AnimatedDividerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`divider-${variant}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [variant]);

  if (variant === 'sword') {
    return (
      <div id={`divider-${variant}`} className={`relative h-24 overflow-hidden ${className}`}>
        {/* Base gradient line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-spiritual-energy to-transparent" />
        
        {/* Animated sword slash */}
        <div 
          className={`absolute top-1/2 left-0 right-0 h-8 transition-all duration-1000 ${
            isVisible ? 'sword-slash' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${swordSlash})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translateY(-50%)',
            filter: 'hue-rotate(10deg) brightness(1.2)',
          }}
        />
        
        {/* Spiritual particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-spiritual-energy rounded-full transition-all duration-1000 ${
                isVisible ? 'spiritual-pulse' : 'opacity-0'
              }`}
              style={{
                left: `${20 + i * 12}%`,
                top: `${45 + Math.sin(i) * 10}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'mask') {
    return (
      <div id={`divider-${variant}`} className={`relative h-16 overflow-hidden ${className}`}>
        {/* Hollow mask fragment effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`w-32 h-8 bg-gradient-to-r from-transparent via-hollow-mask to-transparent transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`} />
          
          {/* Crack lines */}
          <div className={`absolute inset-0 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute top-2 left-8 w-16 h-px bg-gradient-to-r from-border to-transparent transform rotate-12" />
            <div className="absolute top-6 left-12 w-12 h-px bg-gradient-to-r from-border to-transparent transform -rotate-12" />
          </div>
        </div>
      </div>
    );
  }

  // Energy variant
  return (
    <div id={`divider-${variant}`} className={`relative h-20 overflow-hidden ${className}`}>
      {/* Main energy beam */}
      <div className={`absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-reiatsu-glow to-transparent transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
      }`} />
      
      {/* Energy pulses */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-reiatsu-glow rounded-full transition-all duration-1000 ${
              isVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              left: `${(i - 1) * 60}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Expanding energy rings */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}>
        <div className="w-20 h-20 border border-reiatsu-glow/30 rounded-full animate-ping" />
        <div className="absolute inset-2 border border-spiritual-energy/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};