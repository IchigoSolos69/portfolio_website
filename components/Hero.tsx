import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // You likely need this
import { PORTFOLIO_DATA } from '../constants';
import { EtheralShadow } from './ui/etheral-shadow';
import { MouseFollowingEyes } from './ui/mouse-following-eyes';

// Register ScrollTrigger to handle visibility toggling
gsap.registerPlugin(useGSAP, ScrollTrigger);

// --- Optimization 1: Memoize Heavy Sub-Components ---
// This prevents the heavy background from re-rendering if the parent state changes
const MemoizedShadow = React.memo(EtheralShadow);
const MemoizedEyes = React.memo(MouseFollowingEyes);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // --- Optimization 2: Pause Background when out of view ---
  // This is the #1 fix for "stuttery scrolling" later in the page
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0 } // Trigger as soon as 1 pixel leaves/enters
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    // Enable lag smoothing to prevent jumps if the CPU hiccups
    gsap.ticker.lagSmoothing(1000, 16);
    gsap.to(backgroundRef.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5 // <--- THE MAGIC NUMBER. Higher = "Heavier" feel.
      }
    });

    // If you animate text opacity on scroll
    gsap.to(".hero-headline", {
      opacity: 0,
      y: -100,
      ease: "power2.in", // "in" ease feels better for exits
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom 50%",
        scrub: 1 // Smooth catch-up
      }
    });

    const tl = gsap.timeline({
      defaults: { 
        ease: "power3.out", 
        duration: 1.2,
        force3D: true // Force GPU acceleration
      } 
    });

    // Initial States
    tl.set(".hero-anim-elem", { y: 30, opacity: 0, willChange: "transform, opacity" });
    tl.set(".scroll-indicator", { opacity: 0 });

    // Entrance Sequence
    tl.to(".hero-headline", { y: 0, opacity: 1 })
      .to(".hero-quote", { y: 0, opacity: 1, duration: 1 }, "-=0.8")
      .to(".hero-avatar", { y: 0, opacity: 1, duration: 1 }, "-=0.8")
      .to(".hero-cta", { y: 0, opacity: 1, duration: 1 }, "-=0.6")
      .to(".scroll-indicator", { opacity: 0.3, duration: 1 }, "-=0.5");

    // Continuous Scroll Line Animation
    gsap.to(".scroll-line-inner", {
      yPercent: 100,
      duration: 2,
      repeat: -1,
      ease: "none",
      force3D: true
    });

    // --- Optimization 3: Parallax the Background slightly ---
    // Instead of Framer Motion (conflict), use GSAP ScrollTrigger for parallax
    gsap.to(backgroundRef.current, {
      yPercent: 50, // Move background at half speed
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#1B211A]"
      // Optimization 4: CSS Containment
      style={{ contain: 'paint layout' }} 
    >
      {/* Background Layer */}
      {/* We apply 'will-change-transform' via class or style to promote to GPU layer */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform translate-z-0"
      >
        {/* Only render animation if visible (optional extreme optimization) 
            or just let React.memo handle the prop updates 
        */}
        {!isPaused && (
            <MemoizedShadow
            color="rgba(139, 174, 102, 0.12)"
            animation={{ scale: 120, speed: 60 }} 
            noise={{ opacity: 0.8, scale: 1.2 }}
            sizing="fill"
            />
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="flex flex-col items-center max-w-4xl">
          
          {/* Headline */}
          <h1 className="hero-anim-elem hero-headline text-4xl md:text-6xl lg:text-8xl font-bold font-heading mb-6 tracking-tighter text-[#EBD5AB] leading-none">
            Hi, I'm {PORTFOLIO_DATA.name}.
          </h1>
          
          {/* Quote Section */}
          <div className="hero-anim-elem hero-quote flex items-center justify-center gap-4 mb-12">
            <div className="hidden sm:block w-12 h-[1px] bg-[#EBD5AB]/20"></div>
            <p className="text-base md:text-lg text-[#EBD5AB]/70 font-light italic tracking-wide">
              "Tactics without strategy is the noise before defeat." 
              <span className="ml-2 non-italic font-bold text-[#8BAE66]">— Sun Tzu</span>
            </p>
            <div className="hidden sm:block w-12 h-[1px] bg-[#EBD5AB]/20"></div>
          </div>

          {/* Interactive Avatar */}
          <div className="hero-anim-elem hero-avatar relative mb-16">
            <div className="absolute inset-0 bg-[#8BAE66]/10 blur-3xl rounded-full scale-75 pointer-events-none" />
            <MemoizedEyes 
              imageUrl="/assets/avatars/avatar.png" 
              className="flex items-center justify-center z-10"
            />
          </div>

          {/* Call to Action */}
          <div className="hero-anim-elem hero-cta flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#projects"
              className="group relative px-12 py-5 overflow-hidden rounded-full border border-[#EBD5AB]/10 hover:border-[#8BAE66] transition-all duration-700 bg-white/5 backdrop-blur-sm"
            >
              <span className="relative z-10 text-[10px] font-bold tracking-[0.4em] uppercase text-[#EBD5AB] group-hover:text-[#1B211A] transition-colors duration-500">
                Explore Work
              </span>
              <div className="absolute inset-0 bg-[#8BAE66] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[9px] font-bold tracking-[0.6em] uppercase text-[#EBD5AB]">Scroll</span>
        <div className="relative w-[1px] h-16 bg-[#EBD5AB]/10 overflow-hidden">
          <div className="scroll-line-inner absolute top-0 left-0 w-full h-[100%] bg-gradient-to-b from-transparent via-[#8BAE66] to-transparent -translate-y-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;