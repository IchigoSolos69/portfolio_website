import React, { useEffect, useRef } from 'react';

interface SlashPhaseProps {
  onComplete?: () => void;
}

export default function SlashPhase({ onComplete }: SlashPhaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Unlock AudioContext on first interaction
    const resumeAudioContext = () => {
      if (window.AudioContext) {
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') ctx.resume();
      }
      window.removeEventListener('pointerdown', resumeAudioContext);
      window.removeEventListener('touchstart', resumeAudioContext);
    };
    window.addEventListener('pointerdown', resumeAudioContext, { once: true });
    window.addEventListener('touchstart', resumeAudioContext, { once: true });

    // Compute diagonal length & angle
    function updateSlash() {
      if (!containerRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const length = Math.hypot(w, h);
      const angle = Math.atan2(h, w) * (180 / Math.PI);
      containerRef.current.style.setProperty('--slash-length', `${length}px`);
      containerRef.current.style.setProperty('--slash-angle', `${angle}deg`);
    }
    updateSlash();
    window.addEventListener('resize', updateSlash);
    return () => {
      window.removeEventListener('resize', updateSlash);
    };
  }, []);

  useEffect(() => {
    // Play slash sound immediately, retry on user gesture
    const slashAudio = new Audio('/sounds/sword-slash.mp3');
    slashAudio.volume = 0.7;
    slashAudio.preload = 'auto';
    slashAudio.play().catch(() => {
      const unlock = () => {
        slashAudio.play();
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('pointerdown', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    });

    // Notify parent when slash animation ends (~1.2s)
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1500);
    return () => {
      clearTimeout(timer);
      slashAudio.pause();
      slashAudio.currentTime = 0;
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="slash-container">
      <div className="slash-line animate-slash"></div>
      <div className="slash-glow animate-slash-glow"></div>
    </div>
  );
}
