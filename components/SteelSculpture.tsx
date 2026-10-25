import { useEffect, useId, useRef, useState } from 'react';

function SteelDrawing() {
  const clipId = useId();
  return <svg className="steel-fallback" viewBox="0 0 1000 600" fill="none" aria-hidden="true">
    <defs><clipPath id={clipId}><rect x="-425" y="-18" width="216" height="42" rx="16" /></clipPath></defs>
    <g transform="translate(500 325) rotate(-24)">
      <path d="M-179-17Q133-29 467-82L444-47Q143 18-179 22Z" fill="#9BA4A8" />
      <path d="M-179-17Q133-29 467-82L450-66Q133-12-179-3Z" fill="#5A6469" />
      <path d="M-179-3Q133-12 450-66L444-47Q143 18-179 22Z" fill="#E3E6E5" />
      <path d="M-179 16Q143 10 444-47" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M-179 6Q-42 6 77-9T444-47" stroke="#B8BEC0" strokeWidth="2" />
      <path d="m410-69 34 22" stroke="#737D82" strokeWidth="2" />
      <rect x="-199" y="-24" width="33" height="50" rx="3" fill="#A99169" />
      <path d="M-195-20h4v42h-4Z" fill="#D0B789" />
      <ellipse cx="-211" cy="2" rx="15" ry="48" fill="#A08C66" />
      <ellipse cx="-207" cy="2" rx="12" ry="44" fill="#202626" />
      <ellipse cx="-205" cy="-27" rx="3" ry="9" fill="#F5F4F0" />
      <ellipse cx="-205" cy="31" rx="3" ry="8" fill="#F5F4F0" />
      <rect x="-425" y="-18" width="216" height="42" rx="16" fill="#BBBDB1" />
      <g clipPath={'url(#' + clipId + ')'} stroke="#181D1C" strokeWidth="9">
        {Array.from({ length: 12 }, (_, i) => <g key={i}><path d={'M' + (-451 + i * 24) + '-25l45 57'} /><path d={'M' + (-451 + i * 24) + ' 32l45-57'} /></g>)}
      </g>
      <path d="M-423-11h205" stroke="#4F5752" strokeWidth="2" opacity=".7" />
      <rect x="-433" y="-20" width="20" height="46" rx="7" fill="#252B2A" />
      <path d="M-415-17v39" stroke="#A58F68" strokeWidth="3" />
      <path d="M-394-18v40" stroke="#A92E29" strokeWidth="6" />
      <path d="M-398 20C-449 70-480 12-433 8c15-1 25 5 35 12" stroke="#A92E29" strokeWidth="5" />
      <path d="M-315 3h18" stroke="#B49C6F" strokeWidth="5" strokeLinecap="round" />
      <rect x="-225" y="-20" width="14" height="45" rx="3" fill="#252B2A" />
    </g>
  </svg>;
}
export default function SteelSculpture() {
  const stageRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [staticMode, setStaticMode] = useState(false);
  const instructionsId = useId();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let dispose: (() => void) | undefined;
    let cancelled = false;
    let requested = false;
    let generation = 0;
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    const stop = () => {
      generation += 1;
      dispose?.();
      dispose = undefined;
      resetRef.current = null;
      setReady(false);
    };

    const load = async () => {
      if (cancelled || requested || media.matches) return;
      requested = true;
      const loadGeneration = generation;
      const isCurrent = () => !cancelled && !media.matches && loadGeneration === generation;
      try {
        const { createSteelScene } = await import('./steel-scene');
        if (!isCurrent()) return;
        dispose?.();
        dispose = undefined;
        const scene = createSteelScene(
          stage,
          () => { if (isCurrent()) setReady(true); },
          () => { if (isCurrent()) { stop(); setStaticMode(true); } },
        );
        if (!isCurrent()) scene.dispose();
        else {
          dispose = scene.dispose;
          resetRef.current = scene.reset;
        }
      } catch {
        if (isCurrent()) { stop(); setStaticMode(true); }
      }
    };

    const schedule = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(() => void load(), { timeout: 1200 });
      else timerId = setTimeout(() => void load(), 180);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !requested && !media.matches) schedule();
    }, { rootMargin: '120px' });
    const onPreference = () => {
      setStaticMode(media.matches);
      stop();
      if (!media.matches) { requested = false; schedule(); }
    };
    setStaticMode(media.matches);
    observer.observe(stage);
    media.addEventListener('change', onPreference);

    return () => {
      cancelled = true;
      generation += 1;
      observer.disconnect();
      media.removeEventListener('change', onPreference);
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) clearTimeout(timerId);
      dispose?.();
      resetRef.current = null;
    };
  }, []);

  return (
    <figure className={`steel-sculpture${ready ? ' is-ready' : ''}`}>
      <div
        ref={stageRef}
        className="steel-stage"
        tabIndex={ready ? 0 : undefined}
        role="group"
        aria-label={ready ? 'Interactive detailed katana' : 'Original detailed katana illustration'}
        aria-describedby={ready ? instructionsId : undefined}
        style={{ position: 'relative', touchAction: 'pan-y' }}
      >
        <SteelDrawing />
      </div>
      <figcaption className="steel-caption">
        <span>{ready && !staticMode ? 'Drag to explore' : 'An original katana study'}</span>
        {ready && <button type="button" className="steel-reset" onClick={() => resetRef.current?.()}>Reset view <span aria-hidden="true">↺</span></button>}
      </figcaption>
      <span id={instructionsId} className="sr-only">Use the arrow keys to rotate the katana. Press Home or Reset view to return to the original angle.</span>
    </figure>
  );
}
