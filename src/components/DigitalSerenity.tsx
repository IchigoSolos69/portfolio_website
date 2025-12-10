import { useState, useEffect, useRef, useId } from 'react';
import { animate, useMotionValue, AnimationPlaybackControls } from 'framer-motion';
import { MouseFollowingEyes } from "@/components/ui/mouse-following-eyes";
import { PulseBeams } from "@/components/ui/pulse-beams";

// --- Types ---
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

interface AnimationConfig {
    preview?: boolean;
    scale: number;
    speed: number;
}

interface NoiseConfig {
    opacity: number;
    scale: number;
}

interface ShadowProps {
    sizing?: 'fill' | 'stretch';
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
}

// --- Helpers ---
function mapRange(
    value: number,
    fromLow: number,
    fromHigh: number,
    toLow: number,
    toHigh: number
): number {
    if (fromLow === fromHigh) return toLow;
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
    const id = useId();
    const cleanId = id.replace(/:/g, "");
    return `shadowoverlay-${cleanId}`;
};

// --- Main Component ---
export default function DigitalSerenity(props?: ShadowProps) {
    const {
        sizing = 'fill',
        color = '#FAF2FA', // Base white color
        animation = { scale: 100, speed: 50 },
        noise = { opacity: 0.5, scale: 0.8 }
    } = props || {};
    // --- State & Refs ---
    const [mouseGradientStyle, setMouseGradientStyle] = useState<GradientStyle>({
        left: '0px', top: '0px', opacity: 0,
    });
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const floatingElementsRef = useRef<HTMLElement[]>([]);

    // --- Logic for Shadow Animation ---
    const id = useInstanceId();
    const animationEnabled = animation && animation.scale > 0;
    const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
    const hueRotateMotionValue = useMotionValue(180);
    const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

    const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
    const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

    // --- Effects for Shadow ---
    useEffect(() => {
        if (feColorMatrixRef.current && animationEnabled) {
            if (hueRotateAnimation.current) hueRotateAnimation.current.stop();
            
            hueRotateMotionValue.set(0);
            hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
                duration: animationDuration / 25,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
                ease: "linear",
                delay: 0,
                onUpdate: (value: number) => {
                    if (feColorMatrixRef.current) {
                        feColorMatrixRef.current.setAttribute("values", String(value));
                    }
                }
            });
            return () => {
                if (hueRotateAnimation.current) hueRotateAnimation.current.stop();
            };
        }
    }, [animationEnabled, animationDuration, hueRotateMotionValue]);

    // --- Effects for Interactivity ---
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
        animateWords();
        const timeoutId = setTimeout(animateWords, 100);
        return () => clearTimeout(timeoutId);
    }, []);

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
        const handleMouseLeave = () => setMouseGradientStyle((prev) => ({ ...prev, opacity: 0 }));
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newRipple: Ripple = { id: Date.now(), x: e.clientX, y: e.clientY };
            setRipples((prev) => [...prev, newRipple]);
            setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 1000);
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

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

    // --- Styles ---
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
        .word-animate.visible { opacity: 1 !important; }
        .word-animate:hover { color: #cbd5e1; transform: translateY(-2px); }
        .corner-element-animate { 
            position: absolute; 
            width: 20px; 
            height: 20px; 
            border: 1px solid rgba(203, 213, 225, 0.2); 
            opacity: 0; 
            animation: word-appear 1s ease-out forwards; 
        }
        .text-decoration-animate { position: relative; }
        .text-decoration-animate::after { 
            content: ''; 
            position: absolute; 
            bottom: -4px; 
            left: 0; 
            width: 0; 
            height: 3.5px; 
            background: linear-gradient(90deg, transparent, #F2F0EF, transparent); 
            animation: underline-grow 2s ease-out forwards; 
            animation-delay: 2s; 
        }
        @keyframes underline-grow { to { width: 100%; } }
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
            .word-animate, .corner-element-animate, .floating-element-animate, .ripple-effect {
                animation: none !important; transition: none !important;
            }
        }
        @media (max-width: 768px) {
            .corner-element-animate { width: 15px; height: 15px; }
            .floating-element-animate { animation-duration: 6s; }
        }
    `;

    return (
        <section 
            id="home"
            className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto bg-black font-primary text-slate-100"
        >
            <style>{pageStyles}</style>

            {/* --- Layer 0: The Ethereal Shadow (Background) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div style={{ position: "absolute", inset: -displacementScale, filter: animationEnabled ? `url(#${id}) blur(4px)` : "none" }}>
                    {animationEnabled && (
                        <svg style={{ position: "absolute" }}>
                            <defs>
                                <filter id={id}>
                                    <feTurbulence
                                        result="undulation"
                                        numOctaves="1"
                                        baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                                        seed="0"
                                        type="turbulence"
                                    />
                                    <feColorMatrix
                                        ref={feColorMatrixRef}
                                        in="undulation"
                                        type="hueRotate"
                                        values="180"
                                    />
                                    <feColorMatrix in="dist" result="circulation" type="matrix" values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0" />
                                    <feDisplacementMap in="SourceGraphic" in2="circulation" scale={displacementScale} result="dist" />
                                    <feDisplacementMap in="dist" in2="undulation" scale={displacementScale} result="output" />
                                </filter>
                            </defs>
                        </svg>
                    )}
                    <div
                        style={{
                            // CHANGED: Replaced solid backgroundColor with a radial gradient
                            background: `radial-gradient(circle, ${color} 35%, #628141 70%)`,
                            maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
                            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </div>
                {noise && noise.opacity > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
                            backgroundSize: noise.scale * 200,
                            backgroundRepeat: "repeat",
                            opacity: noise.opacity
                        }}
                    />
                )}
            </div>

            {/* --- Layer 1: The Page Content (Foreground) --- */}
            
            {/* Corner Elements */}
            <div className="corner-element-animate top-4 left-4 z-10" style={{ animationDelay: '4s' }}>
                <div className="absolute top-0 left-0 w-1 h-1 bg-slate-300 opacity-30 rounded-full"></div>
            </div>
            <div className="corner-element-animate top-4 right-4 z-10" style={{ animationDelay: '4.2s' }}>
                <div className="absolute top-0 right-0 w-1 h-1 bg-slate-300 opacity-30 rounded-full"></div>
            </div>
            <div className="corner-element-animate bottom-4 left-4 z-10" style={{ animationDelay: '4.4s' }}>
                <div className="absolute bottom-0 left-0 w-1 h-1 bg-slate-300 opacity-30 rounded-full"></div>
            </div>
            <div className="corner-element-animate bottom-4 right-4 z-10" style={{ animationDelay: '4.6s' }}>
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-slate-300 opacity-30 rounded-full"></div>
            </div>

            {/* Floating Elements (Desktop only) */}
            {!isMobile && (
                <>
                    <div className="floating-element-animate z-10" style={{ top: '25%', left: '15%', animationDelay: '0.5s' }}></div>
                    <div className="floating-element-animate z-10" style={{ top: '60%', left: '85%', animationDelay: '1s' }}></div>
                    <div className="floating-element-animate z-10" style={{ top: '40%', left: '10%', animationDelay: '1.5s' }}></div>
                    <div className="floating-element-animate z-10" style={{ top: '75%', left: '90%', animationDelay: '2s' }}></div>
                </>
            )}

            {/* Main Centered Content */}
            <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-16">
                
                {/* Header Text */}
                <div className="text-center max-w-5xl mx-auto relative">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight leading-tight tracking-tight text-[#EBD5AB] text-decoration-animate">
                        <div className="mb-2 md:mb-3">
                            <span className="word-animate" data-delay="700">Hi,</span>
                            <span className="word-animate" data-delay="900">I'm</span>
                            <span className="word-animate" data-delay="1150">Adi</span>
                            <span className="word-animate" data-delay="1350">Maitre.</span>
                        </div>
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-thin text-slate-200 leading-relaxed tracking-wide text-[#EBD5AB]">
                            <span className="word-animate" data-delay="1700">"</span>
                            <span className="word-animate" data-delay="1850">Building</span>
                            <span className="word-animate" data-delay="2000">the</span>
                            <span className="word-animate" data-delay="2150">plane</span>
                            <span className="word-animate" data-delay="2300">while</span>
                            <span className="word-animate" data-delay="2450">I</span>
                            <span className="word-animate" data-delay="2600">fly</span>
                            <span className="word-animate" data-delay="2750">it.</span>
                            <span className="word-animate" data-delay="2900">"</span>
                        </div>
                    </h1>
                    <div className="absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 w-2 sm:w-3 h-px bg-slate-300 opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.2s' }}></div>
                    <div className="absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 w-2 sm:w-3 h-px bg-slate-300 opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.4s' }}></div>
                </div>

                {/* Eyes Component */}
                <div className="my-6 md:my-8 flex justify-center opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.6s' }}>
                    <MouseFollowingEyes imageUrl="/unnamed.jpg" />
                </div>

                {/* Subtext and Beams */}
                <div className="text-center relative">
                    <div className="mb-2 w-8 sm:w-10 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-30 mx-auto"></div>
                    <h2 className="text-xs sm:text-sm font-mono font-light text-slate-300 uppercase tracking-[0.2em] text-[#EBD5AB]">
                        <span className="word-animate" data-delay="3300">React,</span>
                        <span className="word-animate" data-delay="3450">TypeScript,</span>
                        <span className="word-animate" data-delay="3600">and</span>
                        <span className="word-animate" data-delay="3750">AI-driven</span>
                        <span className="word-animate" data-delay="3900">experiences.</span>
                    </h2>
                    
                    {/* Dots */}
                    <div className="mt-4 flex justify-center space-x-2 sm:space-x-3 opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '4.2s' }}>
                        <div className="w-1 h-1 bg-slate-300 rounded-full opacity-40"></div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full opacity-60"></div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full opacity-80"></div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full opacity-60"></div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full opacity-40"></div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[109px] my-6 sm:my-8 opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '4.4s' }}></div>

                    {/* Pulse Beams with Button */}
                    <div className="mt-4 sm:mt-6 relative opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '4.5s' }}>
                        <PulseBeams
                            beams={[
                                {
                                    path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",
                                    gradientConfig: {
                                        initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
                                        animate: { x1: ["0%", "0%", "200%"], x2: ["0%", "0%", "180%"], y1: ["80%", "0%", "0%"], y2: ["100%", "20%", "20%"] },
                                        transition: { duration: 2, repeat: Infinity, repeatType: "loop" as const, ease: "linear", repeatDelay: 2, delay: 0 },
                                    },
                                    connectionPoints: [{ cx: 6.5, cy: 398.5, r: 6 }, { cx: 269, cy: 220.5, r: 6 }]
                                },
                                {
                                    path: "M568 200H841C846.523 200 851 195.523 851 190V40",
                                    gradientConfig: {
                                        initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
                                        animate: { x1: ["20%", "100%", "100%"], x2: ["0%", "90%", "90%"], y1: ["80%", "80%", "-20%"], y2: ["100%", "100%", "0%"] },
                                        transition: { duration: 2, repeat: Infinity, repeatType: "loop" as const, ease: "linear", repeatDelay: 2, delay: 0.5 },
                                    },
                                    connectionPoints: [{ cx: 851, cy: 34, r: 6.5 }, { cx: 568, cy: 200, r: 6 }]
                                },
                                {
                                    path: "M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5",
                                    gradientConfig: {
                                        initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
                                        animate: { x1: ["20%", "100%", "100%"], x2: ["0%", "90%", "90%"], y1: ["80%", "80%", "-20%"], y2: ["100%", "100%", "0%"] },
                                        transition: { duration: 2, repeat: Infinity, repeatType: "loop" as const, ease: "linear", repeatDelay: 2, delay: 1 },
                                    },
                                    connectionPoints: [{ cx: 142, cy: 427, r: 6.5 }, { cx: 425.5, cy: 274, r: 6 }]
                                },
                                {
                                    path: "M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427",
                                    gradientConfig: {
                                        initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
                                        animate: { x1: "0%", x2: "10%", y1: "-40%", y2: "-20%" },
                                        transition: { duration: 2, repeat: Infinity, repeatType: "loop" as const, ease: "linear", repeatDelay: 2, delay: 1.5 },
                                    },
                                    connectionPoints: [{ cx: 770, cy: 427, r: 6.5 }, { cx: 493, cy: 274, r: 6 }]
                                },
                                {
                                    path: "M380 168V17C380 11.4772 384.477 7 390 7H414",
                                    gradientConfig: {
                                        initial: { x1: "-40%", x2: "-10%", y1: "0%", y2: "20%" },
                                        animate: { x1: ["40%", "0%", "0%"], x2: ["10%", "0%", "0%"], y1: ["0%", "0%", "180%"], y2: ["20%", "20%", "200%"] },
                                        transition: { duration: 2, repeat: Infinity, repeatType: "loop" as const, ease: "linear", repeatDelay: 2, delay: 2 },
                                    },
                                    connectionPoints: [{ cx: 420.5, cy: 6.5, r: 6 }, { cx: 380, cy: 168, r: 6 }]
                                }
                            ]}
                            gradientColors={{ start: "#8BAE66", middle: "#EBD5AB", end: "#8BAE66" }}
                            baseColor="#628141"
                            accentColor="#628141"
                            width={isMobile ? 400 : 600}
                            height={isMobile ? 180 : 240}
                            className="w-full h-auto max-h-[240px] overflow-visible"
                        >
                            <button
                                onClick={() => {
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) {
                                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                className="relative z-50 bg-slate-800 w-[140px] sm:w-[170px] md:w-[200px] h-[40px] sm:h-[48px] md:h-[52px] no-underline group cursor-pointer shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block hover:scale-105 transition-transform duration-300 tap-target focus-ring"
                            >
                                <span className="absolute inset-0 overflow-hidden rounded-full">
                                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </span>
                                <div className="relative flex justify-center w-full text-center space-x-2 h-full items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-[#8BAE66]/70">
                                    <span className="text-xs sm:text-sm md:text-base lg:text-lg inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#8BAE66] via-[#EBD5AB] to-[#8BAE66]">
                                        Connect with Me
                                    </span>
                                </div>
                            </button>
                        </PulseBeams>
                    </div>
                </div>
            </div>

            {/* --- Layer 2: Interactions (Ripples & Mouse Gradient) --- */}
            <div
                id="mouse-gradient-react"
                className="w-40 h-40 blur-lg sm:w-60 sm:h-60 sm:blur-xl md:w-80 md:h-80 md:blur-2xl"
                style={{
                    left: mouseGradientStyle.left,
                    top: mouseGradientStyle.top,
                    opacity: mouseGradientStyle.opacity,
                    zIndex: 15,
                }}
            ></div>

            {ripples.map((ripple: Ripple) => (
                <div
                    key={ripple.id}
                    className="ripple-effect"
                    style={{ left: `${ripple.x}px`, top: `${ripple.y}px`, zIndex: 15 }}
                ></div>
            ))}
        </section>
    );
}