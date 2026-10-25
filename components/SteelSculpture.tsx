import { useEffect, useId, useRef, useState } from 'react';

function SteelDrawing() {
  return (
    <svg className="steel-fallback" viewBox="0 0 600 650" fill="none" aria-hidden="true">
      <path d="M107 581 377 107 520 48 264 533Z" fill="#161717" />
      <path d="M107 581 377 107 410 219 198 570Z" fill="#A9ACAC" />
      <path d="M198 570 410 219 520 48 264 533Z" fill="#E2E3DF" />
      <path d="M198 570 410 219 264 533Z" fill="#747979" />
      <path d="M264 533 520 48 493 174 244 570Z" fill="#343737" />
      <path d="M277 511 490 116 486 142 274 531Z" fill="#BE332B" />
      <path d="M107 581 198 570 264 533 244 570 152 615Z" fill="#202222" />
    </svg>
  );
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
        aria-label={ready ? 'Interactive steel sculpture' : 'Blade-inspired steel sculpture'}
        aria-describedby={ready ? instructionsId : undefined}
        style={{ position: 'relative', touchAction: 'pan-y' }}
      >
        <SteelDrawing />
      </div>
      <figcaption className="steel-caption">
        <span>{ready && !staticMode ? 'Drag to rotate' : 'A study in ink & steel'}</span>
        {ready && <button type="button" className="steel-reset" onClick={() => resetRef.current?.()}>Reset view <span aria-hidden="true">↺</span></button>}
      </figcaption>
      <span id={instructionsId} className="sr-only">Use the arrow keys to rotate the sculpture. Press Home or Reset view to return to the original angle.</span>
    </figure>
  );
}
