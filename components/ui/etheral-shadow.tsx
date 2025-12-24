'use client';

import React, { useRef, useId, useEffect, useMemo, CSSProperties } from 'react';
import { animate, useMotionValue } from 'framer-motion';

// --- Types ---
interface ResponsiveImage {
  src: string;
  alt?: string;
  srcSet?: string;
}

interface AnimationConfig {
  preview?: boolean;
  scale: number;
  speed: number;
}

interface NoiseConfig {
  opacity: number;
  scale: number;
}

interface ShadowOverlayProps {
  type?: 'preset' | 'custom';
  presetIndex?: number;
  customImage?: ResponsiveImage;
  sizing?: 'fill' | 'stretch';
  color?: string;
  animation?: AnimationConfig;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
  title?: string;
}

// --- Helpers ---
const mapRange = (
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
): number => {
  if (fromLow === fromHigh) return toLow;
  return toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
};

export function EtheralShadow({
  sizing = 'fill',
  color = 'rgba(128, 128, 128, 1)',
  animation,
  noise,
  style,
  className
}: ShadowOverlayProps) {
  // 1. Stable ID generation
  const rawId = useId();
  const id = useMemo(() => `etheral-shadow-${rawId.replace(/:/g, '')}`, [rawId]);

  // 2. Memoize configuration to prevent recalc on every render
  const config = useMemo(() => {
    if (!animation || animation.scale <= 0) {
      return { enabled: false, scale: 0, duration: 0, baseFreq: "0,0" };
    }
    return {
      enabled: true,
      scale: mapRange(animation.scale, 1, 100, 20, 100),
      duration: mapRange(animation.speed, 1, 100, 1000, 50),
      baseFreq: `${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`
    };
  }, [animation]);

  // 3. Animation Logic
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
  const hueRotateMotionValue = useMotionValue(0);

  useEffect(() => {
    if (!config.enabled || !feColorMatrixRef.current) return;

    const controls = animate(hueRotateMotionValue, 360, {
      duration: config.duration / 25,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (latest) => {
        // Direct DOM update for performance
        feColorMatrixRef.current?.setAttribute("values", String(latest));
      }
    });

    return () => controls.stop();
  }, [config.enabled, config.duration, hueRotateMotionValue]);

  // 4. Styles
  const containerStyle: CSSProperties = {
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: "100%",
    // ✨ ADDED: Soft fade at the edges
    maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
    ...style
  };

  const layerStyle: CSSProperties = {
    position: "absolute",
    inset: -config.scale, // Expand to cover displacement edges
    filter: config.enabled ? `url(#${id}) blur(4px)` : "none"
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={layerStyle}>
        {config.enabled && (
          <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
            <defs>
              <filter id={id}>
                <feTurbulence
                  type="turbulence"
                  baseFrequency={config.baseFreq}
                  numOctaves="2"
                  seed="0"
                  result="undulation"
                />
                <feColorMatrix
                  ref={feColorMatrixRef}
                  in="undulation"
                  type="hueRotate"
                  values="180"
                />
                <feColorMatrix
                  in="dist"
                  result="circulation"
                  type="matrix"
                  values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="circulation"
                  scale={config.scale}
                  result="dist"
                />
                <feDisplacementMap
                  in="dist"
                  in2="undulation"
                  scale={config.scale}
                  result="output"
                />
              </filter>
            </defs>
          </svg>
        )}
        
        {/* Main Color Layer */}
        <div
          style={{
            backgroundColor: color,
            maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
            WebkitMaskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
            WebkitMaskSize: sizing === "stretch" ? "100% 100%" : "cover",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            width: "100%",
            height: "100%"
          }}
        />
      </div>

      {/* Decorative Overlays */}
      {/* 1. Subtle light shade at vertical ends */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(235, 213, 171, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 100%, rgba(235, 213, 171, 0.15) 0%, transparent 50%)",
          mixBlendMode: "screen" // Helps light shade pop
        }}
      />

      {/* 2. Noise Layer */}
      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
            backgroundSize: noise.scale * 200,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2,
            mixBlendMode: "overlay"
          }}
        />
      )}
    </div>
  );
}