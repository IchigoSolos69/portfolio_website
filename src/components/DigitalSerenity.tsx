import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MouseFollowingEyes } from "@/components/ui/mouse-following-eyes";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type GradientStyle = {
  left: string;
  top: string;
  opacity: number;
};

const DigitalSerenity = () => {
  const [mouseGradientStyle, setMouseGradientStyle] = useState<GradientStyle>({
    left: '0px',
    top: '0px',
    opacity: 0,
  });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const floatingElementsRef = useRef<HTMLElement[]>([]);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Word animation effect
  useEffect(() => {
    const animateWords = () => {
      const wordElements = document.querySelectorAll<HTMLElement>('.word-animate');
      wordElements.forEach(word => {
        const delay = parseInt(word.getAttribute('data-delay') ?? '0') || 0;
        setTimeout(() => {
          if (word) {
            word.style.animation = 'word-appear 0.8s ease-out forwards';
            word.classList.add('visible');
          }
        }, delay);
      });
    };
    
    // Start animations immediately and also after a short delay as fallback
    animateWords();
    const timeoutId = setTimeout(animateWords, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Mouse move handling with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMouseGradientStyle({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
            opacity: 1,
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const handleMouseLeave = () => {
      setMouseGradientStyle((prev) => ({ ...prev, opacity: 0 }));
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Click ripple effect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)),
        1000,
      );
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Floating elements animation
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.floating-element-animate');
    floatingElementsRef.current = Array.from(elements);
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true);
        floatingElementsRef.current.forEach((el: HTMLElement, index: number) => {
          setTimeout(() => {
            if (el) {
              el.style.animationPlayState = 'running';
              el.style.opacity = ''; 
            }
          }, (parseFloat(el.style.animationDelay || "0") * 1000) + index * 100);
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Reduce animation intensity on mobile
  const reducedMotion = isMobile ? 0.5 : 1;

  const pageStyles = `
    #mouse-gradient-react {
      position: fixed;
      pointer-events: none;
      border-radius: 9999px;
      background-image: radial-gradient(circle, rgba(156, 163, 175, 0.05), rgba(107, 114, 128, 0.05), transparent 70%);
      transform: translate(-50%, -50%);
      will-change: left, top, opacity;
      transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
    }
    @keyframes word-appear { 
      0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); } 
      50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); } 
      100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } 
    }
    @keyframes grid-draw { 
      0% { stroke-dashoffset: 1000; opacity: 0; } 
      50% { opacity: 0.3; } 
      100% { stroke-dashoffset: 0; opacity: 0.15; } 
    }
    @keyframes pulse-glow { 
      0%, 100% { opacity: 0.1; transform: scale(1); } 
      50% { opacity: 0.3; transform: scale(1.1); } 
    }
    .word-animate { 
      display: inline-block; 
      opacity: 0; 
      margin: 0 0.1em; 
      transition: color 0.3s ease, transform 0.3s ease, opacity 0.8s ease-out; 
    }
    .word-animate.visible {
      opacity: 1 !important;
    }
    .word-animate:hover { 
      color: #cbd5e1; 
      transform: translateY(-2px); 
    }
    .grid-line { 
      stroke: #94a3b8; 
      stroke-width: 0.5; 
      opacity: 0; 
      stroke-dasharray: 5 5; 
      stroke-dashoffset: 1000; 
      animation: grid-draw 2s ease-out forwards; 
    }
    .detail-dot { 
      fill: #cbd5e1; 
      opacity: 0; 
      animation: pulse-glow 3s ease-in-out infinite; 
    }
    .corner-element-animate { 
      position: absolute; 
      width: 20px; 
      height: 20px; 
      border: 1px solid rgba(203, 213, 225, 0.2); 
      opacity: 0; 
      animation: word-appear 1s ease-out forwards; 
    }
    .text-decoration-animate { 
      position: relative; 
    }
    .text-decoration-animate::after { 
      content: ''; 
      position: absolute; 
      bottom: -4px; 
      left: 0; 
      width: 0; 
      height: 1px; 
      background: linear-gradient(90deg, transparent, #cbd5e1, transparent); 
      animation: underline-grow 2s ease-out forwards; 
      animation-delay: 2s; 
    }
    @keyframes underline-grow { 
      to { width: 100%; } 
    }
    .floating-element-animate { 
      position: absolute; 
      width: 2px; 
      height: 2px; 
      background: #cbd5e1; 
      border-radius: 50%; 
      opacity: 0; 
      animation: float 4s ease-in-out infinite; 
      animation-play-state: paused; 
    }
    @keyframes float { 
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; } 
      25% { transform: translateY(-10px) translateX(5px); opacity: 0.6; } 
      50% { transform: translateY(-5px) translateX(-3px); opacity: 0.4; } 
      75% { transform: translateY(-15px) translateX(7px); opacity: 0.8; } 
    }
    .ripple-effect { 
      position: fixed; 
      width: 4px; 
      height: 4px; 
      background: rgba(203, 213, 225, 0.6); 
      border-radius: 50%; 
      transform: translate(-50%, -50%); 
      pointer-events: none; 
      animation: pulse-glow 1s ease-out forwards; 
      z-index: 9999; 
    }
    
    @media (prefers-reduced-motion: reduce) {
      .word-animate,
      .grid-line,
      .detail-dot,
      .corner-element-animate,
      .floating-element-animate,
      .ripple-effect {
        animation: none !important;
        transition: none !important;
      }
    }
    
    @media (max-width: 768px) {
      .corner-element-animate {
        width: 15px;
        height: 15px;
      }
      
      .floating-element-animate {
        animation-duration: 6s;
      }
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <section
        id="home"
        className="min-h-screen bg-black text-slate-100 font-primary overflow-hidden relative"
      >
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true"
        >
          <defs>
            <pattern id="gridReactDarkResponsive" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridReactDarkResponsive)" />
          <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: '0.5s' }} />
          <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: '1s' }} />
          <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: '1.5s' }} />
          <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: '2s' }} />
          {!isMobile && (
            <>
              <line x1="50%" y1="0" x2="50%" y2="100%" className="grid-line" style={{ animationDelay: '2.5s', opacity: '0.05' }} />
              <line x1="0" y1="50%" x2="100%" y2="50%" className="grid-line" style={{ animationDelay: '3s', opacity: '0.05' }} />
              <circle cx="20%" cy="20%" r="1.5" className="detail-dot" style={{ animationDelay: '3s' }} />
              <circle cx="80%" cy="20%" r="1.5" className="detail-dot" style={{ animationDelay: '3.2s' }} />
              <circle cx="20%" cy="80%" r="1.5" className="detail-dot" style={{ animationDelay: '3.4s' }} />
              <circle cx="80%" cy="80%" r="1.5" className="detail-dot" style={{ animationDelay: '3.6s' }} />
              <circle cx="50%" cy="50%" r="1" className="detail-dot" style={{ animationDelay: '4s' }} />
            </>
          )}
        </svg>

        {/* Responsive Corner Elements */}
        <div className="corner-element-animate top-4 left-4" style={{ animationDelay: '4s' }}>
          <div className="absolute top-0 left-0 w-1 h-1 bg-slate-300 opacity-30 rounded-full"></div>
        </div>
        <div className="corner-element-animate top-4 right-4" style={{ animationDelay: '4.2s' }}>
          <div className="absolute top-0 right-0 w-1 h-1 bg-slate-300 opacity-30 rounded-full"></div>
        </div>
        <div className="corner-element-animate bottom-4 left-4" style={{ animationDelay: '4.4s' }}>
          <div className="absolute bottom-0 left-0 w-1 h-1 bg-slate-300 opacity-30 rounded-full"></div>
        </div>
        <div className="corner-element-animate bottom-4 right-4" style={{ animationDelay: '4.6s' }}>
          <div className="absolute bottom-0 right-0 w-1 h-1 bg-slate-300 opacity-30 rounded-full"></div>
        </div>

        {!isMobile && (
          <>
            <div className="floating-element-animate" style={{ top: '25%', left: '15%', animationDelay: '0.5s' }}></div>
            <div className="floating-element-animate" style={{ top: '60%', left: '85%', animationDelay: '1s' }}></div>
            <div className="floating-element-animate" style={{ top: '40%', left: '10%', animationDelay: '1.5s' }}></div>
            <div className="floating-element-animate" style={{ top: '75%', left: '90%', animationDelay: '2s' }}></div>
          </>
        )}

        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-16">
          <div className="text-center max-w-5xl mx-auto relative z-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight tracking-tight text-white text-decoration-animate">
              <div className="mb-3 md:mb-4">
                <span className="word-animate" data-delay="700">Hi,</span>
                <span className="word-animate" data-delay="900">I'm</span>
                <span className="word-animate" data-delay="1150">Adi</span>
                <span className="word-animate" data-delay="1350">Maitre.</span>
              </div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-thin text-slate-200 leading-relaxed tracking-wide">
                <span className="word-animate" data-delay="1700">I</span>
                <span className="word-animate" data-delay="1850">craft</span>
                <span className="word-animate" data-delay="2000">fast,</span>
                <span className="word-animate" data-delay="2150">accessible,</span>
                <span className="word-animate" data-delay="2300">and</span>
                <span className="word-animate" data-delay="2450">visually</span>
                <span className="word-animate" data-delay="2600">refined</span>
                <span className="word-animate" data-delay="2750">digital</span>
                <span className="word-animate" data-delay="2900">experiences</span>
                <span className="word-animate" data-delay="3050">you</span>
                <span className="word-animate" data-delay="3200">can</span>
                <span className="word-animate" data-delay="3350">trust.</span>
              </div>
            </h1>
            <div className="absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 w-2 sm:w-3 h-px bg-slate-300 opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.2s' }}></div>
            <div className="absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 w-2 sm:w-3 h-px bg-slate-300 opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.4s' }}></div>
          </div>

          {/* Interactive Eyes Component */}
          <div className="my-8 md:my-12 flex justify-center opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.6s' }}>
            <MouseFollowingEyes 
              imageUrl="/unnamed.jpg"
            />
          </div>

          <div className="text-center relative z-20">
            <div className="mb-3 w-10 sm:w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-30 mx-auto"></div>
            <h2 className="text-xs sm:text-sm font-mono font-light text-slate-300 uppercase tracking-[0.2em]">
              <span className="word-animate" data-delay="3300">React,</span>
              <span className="word-animate" data-delay="3450">TypeScript,</span>
              <span className="word-animate" data-delay="3600">and</span>
              <span className="word-animate" data-delay="3750">AI-driven</span>
              <span className="word-animate" data-delay="3900">experiences.</span>
            </h2>
            <div className="mt-4 flex justify-center space-x-2 sm:space-x-3 opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '4.2s' }}>
              <div className="w-1 h-1 bg-slate-300 rounded-full opacity-40"></div>
              <div className="w-1 h-1 bg-slate-300 rounded-full opacity-60"></div>
              <div className="w-1 h-1 bg-slate-300 rounded-full opacity-40"></div>
            </div>
            
            <div className="mt-8 sm:mt-10 relative opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '4.5s' }}>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="relative z-50 bg-slate-800 w-[180px] sm:w-[200px] h-[50px] sm:h-[60px] no-underline group cursor-pointer shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block hover:scale-105 transition-transform duration-300 tap-target focus-ring"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative flex justify-center w-full text-center space-x-2 h-full items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                  <span className="text-base sm:text-lg md:text-xl inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-neutral-600 to-neutral-300">
                    Connect
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div 
          id="mouse-gradient-react"
          className="w-40 h-40 blur-lg sm:w-60 sm:h-60 sm:blur-xl md:w-80 md:h-80 md:blur-2xl"
          style={{
            left: mouseGradientStyle.left,
            top: mouseGradientStyle.top,
            opacity: mouseGradientStyle.opacity,
          }}
        ></div>

        {ripples.map((ripple: Ripple) => (
          <div
            key={ripple.id}
            className="ripple-effect"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          ></div>
        ))}
      </section>
    </>
  );
};

export default DigitalSerenity;

