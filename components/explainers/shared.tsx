import { useEffect, useId, useState, type ReactNode } from 'react';

export function RangeControl({ label, value, min, max, step = 1, onChange, format }: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (value: number) => void; format?: (value: number) => string;
}) {
  const id = useId();
  return <label className="demo-range" htmlFor={id}><span>{label}<output htmlFor={id}>{format ? format(value) : value}</output></span><input id={id} type="range" min={min} max={max} step={step} value={value} onChange={event => onChange(event.currentTarget.valueAsNumber)} /></label>;
}

export function DemoActions({ onReset, children }: { onReset: () => void; children?: ReactNode }) {
  return <div className="demo-actions">{children}<button type="button" className="demo-button demo-reset" onClick={onReset}>Reset demo</button></div>;
}

export function DemoFigure({ label, children }: { label: string; children: ReactNode }) {
  return <figure className="demo-figure"><div className="demo-stage" tabIndex={0} role="group" aria-label="Scrollable educational diagram">{children}</div><figcaption>{label}</figcaption></figure>;
}

export function useDemoPlayback(active: boolean, stepCount: number, resetKey?: unknown) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => { setFrame(0); setPlaying(false); }, [resetKey]);
  useEffect(() => {
    if (!active || reducedMotion || frame >= stepCount - 1) setPlaying(false);
  }, [active, reducedMotion, frame, stepCount]);
  useEffect(() => {
    if (!playing || !active || reducedMotion) return;
    const timer = window.setInterval(() => setFrame(current => Math.min(current + 1, stepCount - 1)), 100);
    return () => window.clearInterval(timer);
  }, [playing, active, reducedMotion, stepCount]);
  return { frame, setFrame, playing, setPlaying, reducedMotion };
}
