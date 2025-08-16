import React, { useEffect, useRef } from 'react';

interface SlashPhaseProps {
  onComplete?: () => void;
}

export default function SlashPhase({ onComplete }: SlashPhaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute diagonal length & angle on mount and resize
  useEffect(() => {
    function updateSlash() {
      if (!containerRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const length = Math.hypot(w, h);
      const angle = (Math.atan2(h, w) * 180) / Math.PI;
      containerRef.current.style.setProperty('--slash-length', `${length}px`);
      containerRef.current.style.setProperty('--slash-angle', `${angle}deg`);
    }
    updateSlash();
    window.addEventListener('resize', updateSlash);
    return () => window.removeEventListener('resize', updateSlash);
  }, []);

  // Enhanced audio solution with better autoplay handling
  useEffect(() => {
    let slashAudio: HTMLAudioElement | null = null;
    let hasPlayedAudio = false;

    const playAudio = () => {
      if (hasPlayedAudio || !slashAudio) return;
      
      slashAudio.play().then(() => {
        hasPlayedAudio = true;
      }).catch(() => {
        // Silent fail - audio will play on next user interaction
        console.log('Audio autoplay blocked - will play on user interaction');
      });
    };

    const setupAudio = () => {
      slashAudio = new Audio('/sounds/sword-slash.mp3');
      slashAudio.volume = 0.7;
      slashAudio.preload = 'auto';
      
      // Delay audio to sync with slash animation start
      setTimeout(() => {
        playAudio();
      }, 200);
      
      // Setup fallback for user interaction
      const unlockAudio = () => {
        if (!hasPlayedAudio && slashAudio) {
          playAudio();
        }
        // Remove listeners after first attempt
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
    };

    // Setup audio immediately when component mounts
    setupAudio();
    
    // Notify parent after animation (~1.2s) - sync with CSS animation duration
    const completeTimer = setTimeout(() => onComplete?.(), 1200);
    
    return () => {
      clearTimeout(completeTimer);
      if (slashAudio) {
        slashAudio.pause();
        slashAudio.currentTime = 0;
        slashAudio = null;
      }
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="slash-container">
      <div className="slash-line animate-slash" />
      <div className="slash-glow animate-slash-glow" />
      {/* Hidden audio element for better browser compatibility */}
      <audio preload="auto" style={{ display: 'none' }}>
        <source src="/sounds/sword-slash.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
