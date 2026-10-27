import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole } from 'lucide-react';
import gsap from 'gsap';
import CommitDate from './CommitDate';
import ProjectProgress from './ProjectProgress';
import type { Project, PublicProject } from '../types';
import type { ProjectView } from '../lib/portfolio-navigation';
import ProjectArt from './ProjectArt';
import './selected-work.css';

export function SourceTag({ project }: { project: Project }) {
  return <div className="source-tags" data-ui="project-access">
    {project.source === 'private' && <span className="private-tag"><LockKeyhole size={13} aria-hidden="true" />Private</span>}
    {project.status && <span className="project-status">{project.status}</span>}
  </div>;
}

function ProjectVisual({ project, thumbnail = false }: { project: Project; thumbnail?: boolean }) {
  if (project.source === 'public' && project.media) return <div className={`project-capture${thumbnail ? ' is-thumbnail' : ''}`}>
    <svg viewBox="180 460 1260 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label={project.media.alt}>
      <image href={project.media.src} width="1630" height="1003" />
    </svg>
  </div>;
  return <ProjectArt kind={project.illustration} fit={thumbnail ? 'slice' : 'meet'} />;
}

export default function SelectedWork({ featuredProjects, onOpenProject }: { featuredProjects: Project[]; onOpenProject: (project: PublicProject, view?: ProjectView) => void }) {
  const [selection, setSelection] = useState({ index: 0, direction: 1 });
  const [inView, setInView] = useState(false);
  const host = useRef<HTMLElement>(null);
  const motion = useRef<HTMLDivElement>(null);
  const wipe = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const gesture = useRef<{ id: number; x: number; y: number; locked: boolean } | null>(null);
  const consumedSwipe = useRef(false);
  const count = featuredProjects.length;
  const current = featuredProjects[selection.index];
  const previous = featuredProjects[(selection.index - 1 + count) % count];
  const next = featuredProjects[(selection.index + 1) % count];

  useEffect(() => {
    if (!host.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .1 });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!inView) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(motion.current, { x: selection.direction * 24, scale: 1.025 }, { x: 0, scale: 1, duration: .65, ease: 'power3.out', clearProps: 'transform' });
        gsap.fromTo(wipe.current, { scaleX: 1, transformOrigin: selection.direction > 0 ? 'right center' : 'left center' }, { scaleX: 0, duration: .6, ease: 'power3.inOut' });
        gsap.fromTo(title.current, { x: selection.direction * 12 }, { x: 0, duration: .5, ease: 'power3.out', clearProps: 'transform' });
      }, host);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, [selection, inView]);

  useEffect(() => {
    const tab = tabs.current[selection.index];
    const rail = tab?.parentElement;
    if (!tab || !rail) return;
    const item = tab.getBoundingClientRect();
    const frame = rail.getBoundingClientRect();
    if (item.left < frame.left) rail.scrollLeft += item.left - frame.left - 4;
    else if (item.right > frame.right) rail.scrollLeft += item.right - frame.right + 4;
  }, [selection.index]);

  function choose(index: number, direction: number, moveFocus = false) {
    const normalized = (index + count) % count;
    setSelection(previous => previous.index === normalized ? previous : { index: normalized, direction });
    if (moveFocus) {
      tabs.current[normalized]?.focus({ preventScroll: true });
    }
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : index + (event.key === 'ArrowRight' ? 1 : -1);
    choose(target, event.key === 'ArrowLeft' || event.key === 'Home' ? -1 : 1, true);
  }

  function beginSwipe(event: PointerEvent<HTMLDivElement>) {
    consumedSwipe.current = false;
    if (event.pointerType === 'mouse') return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, locked: false };
  }
  function moveSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.locked) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { gesture.current = null; return; }
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        start.locked = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }
  }
  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const dx = event.clientX - start.x;
    if (start.locked && Math.abs(dx) > 48) {
      consumedSwipe.current = true;
      choose(selection.index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    }
  }

  if (!current) return null;
  return <section ref={host} className={`work-section section-dark work-showcase${inView ? ' scene-is-visible' : ''}`} id="projects" aria-labelledby="projects-heading">
    <div className="page-frame section-frame">
      <div className="section-intro" data-reveal><h2 id="projects-heading" tabIndex={-1}>Selected work</h2><p>From first principles<br />to things people can use.</p></div>
      <div className="showcase-experience" data-ui="project-navigation">
        <div className="project-filmstrip" role="tablist" aria-label="Selected projects">
          {featuredProjects.map((project, index) => <button ref={(node) => { tabs.current[index] = node; }} key={project.id} role="tab" id={`project-tab-${project.id}`} aria-selected={index === selection.index} aria-controls="active-project-spread" tabIndex={index === selection.index ? 0 : -1} className={`filmstrip-tab${index === selection.index ? ' is-selected' : ''}`} onClick={() => choose(index, index > selection.index ? 1 : -1)} onKeyDown={(event) => onTabKey(event, index)}>
            <span className="filmstrip-image" aria-hidden="true"><ProjectVisual project={project} thumbnail /></span><span className="filmstrip-title">{project.title}</span>{project.source === 'private' && <span className="filmstrip-private">Private</span>}
          </button>)}
        </div>
      <div className="spread-layout" data-ui="project-showcase">
        <button className="neighbor-preview neighbor-previous" tabIndex={-1} onClick={() => choose(selection.index - 1, -1)} aria-label={`Previous project: ${previous.title}`}>
          <span className="neighbor-image"><ProjectVisual project={previous} thumbnail /></span><ArrowLeft size={20} aria-hidden="true" /><span>{previous.title}</span>
        </button>
        <div className="project-spread" role="tabpanel" id="active-project-spread" aria-labelledby={`project-tab-${current.id}`} tabIndex={0}
          onPointerDown={beginSwipe} onPointerMove={moveSwipe} onPointerUp={finishSwipe} onPointerCancel={() => { gesture.current = null; }}
          onClickCapture={(event) => { if (consumedSwipe.current) { event.preventDefault(); event.stopPropagation(); consumedSwipe.current = false; } }}>
          <div className={`spread-media spread-media-${current.illustration}`}>
            <div ref={motion} className="spread-motion" key={current.id}><ProjectVisual project={current} /></div>
            <div ref={wipe} className="spread-wipe" aria-hidden="true" />
            <p className="spread-art-caption">{current.source === 'public' && current.media ? 'From the application' : 'Illustrated project overview'}</p>
          </div>
          <div className="spread-copy" aria-live="polite" aria-atomic="true">
            <h3 ref={title} className={current.title.length > 23 ? 'spread-long-title' : undefined}>{current.title}</h3>
            <SourceTag project={current} />
            <CommitDate project={current} />
            <p className="spread-summary">{current.summary}</p>
            {current.source === 'public' && <div className="spread-project-actions"><button className="button button-dark" onClick={() => onOpenProject(current)}>Explore project <ArrowUpRight size={19} /></button>{current.explainer && <button className="text-link spread-demo-action" type="button" onClick={() => onOpenProject(current, 'demo')}>Try educational demo <ArrowUpRight size={17} /></button>}<p className="spread-technologies">{current.tags.slice(0, 4).join(' · ')}</p></div>}
            <ProjectProgress project={current} />
          </div>
        </div>
        <button className="neighbor-preview neighbor-next" tabIndex={-1} onClick={() => choose(selection.index + 1, 1)} aria-label={`Next project: ${next.title}`}>
          <span className="neighbor-image"><ProjectVisual project={next} thumbnail /></span><ArrowRight size={20} aria-hidden="true" /><span>{next.title}</span>
        </button>
      </div>
        <div className="spread-arrows"><button className="spread-arrow" onClick={() => choose(selection.index - 1, -1)} aria-label="Previous project"><ArrowLeft size={23} /></button><button className="spread-arrow" onClick={() => choose(selection.index + 1, 1)} aria-label="Next project"><ArrowRight size={23} /></button></div>
      </div>
    </div>
  </section>;
}
