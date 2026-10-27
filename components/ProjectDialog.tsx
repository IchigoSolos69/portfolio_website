import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { PublicProject } from '../types';
import type { ProjectView } from '../lib/portfolio-navigation';
import ProjectArt from './ProjectArt';
import CommitDate from './CommitDate';
import ProjectProgress from './ProjectProgress';
import CopyButton from './CopyButton';
import EducationalDemo from './EducationalDemo';
import TTCapture from './TTCapture';
import ProjectContentNote from './ProjectContentNote';
import { formatCommitDate } from '../lib/project-activity';

function ProjectDetails({ project, view, onViewChange }: { project: PublicProject; view: ProjectView; onViewChange: (view: ProjectView) => void }) {
  const [demoOpened, setDemoOpened] = useState(view === 'demo');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => { if (view === 'demo') setDemoOpened(true); }, [view]);
  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index;
    onViewChange(target ? 'demo' : 'overview');
    tabs.current[target]?.focus({ preventScroll: true });
  }
  return <>
    <header className="dialog-heading"><h2 id="dialog-title">{project.title}</h2>{view === 'overview' && <p className="project-meta">{project.category}{project.status ? ` / ${project.status}` : ''}</p>}<CommitDate project={project} />{view === 'overview' && <ProjectProgress project={project} />}</header>
    {project.explainer && <div className="detail-tabs" role="tablist" aria-label="Project detail views">{(['overview', 'demo'] as const).map((tab, index) => <button type="button" key={tab} ref={node => { tabs.current[index] = node; }} role="tab" id={`detail-tab-${tab}`} aria-controls={`detail-panel-${tab}`} aria-selected={view === tab} tabIndex={view === tab ? 0 : -1} onKeyDown={event => tabKey(event, index)} onClick={() => onViewChange(tab)}>{tab === 'overview' ? 'Overview' : 'Educational demo'}</button>)}</div>}
    <section hidden={view !== 'overview'} role={project.explainer ? 'tabpanel' : undefined} aria-labelledby={project.explainer ? 'detail-tab-overview' : undefined} id="detail-panel-overview" tabIndex={0} className="detail-panel">
      {project.id === 'tt-trajectory-engine' ? <TTCapture /> : <div className="dialog-overview-art"><ProjectArt kind={project.illustration} /></div>}
      <div className="dialog-description">{(project.readme?.overview.length ? project.readme.overview : project.description.split('\n\n')).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
      <ProjectContentNote project={project} />
      {project.readme && <a className="readme-attribution text-link" href={project.readme.url} target="_blank" rel="noreferrer">From the repository README <ArrowUpRight size={15} /></a>}
      {!!project.highlights.length && <><h3 className="dialog-subheading">What it does</h3><ul className="project-highlights">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></>}
      {project.caseStudy ? <div className="engineering-story"><p className="engineering-review">Engineering notes · Reviewed <time dateTime={project.caseStudy.reviewedAt}>{formatCommitDate({ lastCommitAt: `${project.caseStudy.reviewedAt}T00:00:00Z` })}</time></p><section><h3>The problem</h3><p>{project.caseStudy.problem}</p></section><section><h3>Key decisions</h3><ul>{project.caseStudy.decisions.map(item => <li key={item}>{item}</li>)}</ul></section><section><h3>Evidence</h3><ul>{project.caseStudy.evidence.map(item => <li key={item}>{item}</li>)}</ul></section><section><h3>Reviewed limitations</h3><ul>{project.caseStudy.limitations.map(item => <li key={item}>{item}</li>)}</ul></section></div> : <>
        {!!project.limitations?.length && <><h3 className="dialog-subheading">Scope & limitations</h3><ul className="project-highlights">{project.limitations.map(item => <li key={item}>{item}</li>)}</ul></>}
      </>}
      <p className="technology-line">{project.tags.join(' · ')}</p>
      <div className="dialog-links">{project.github && <a className="button button-dark" href={project.github} target="_blank" rel="noreferrer">View source <ArrowUpRight size={19} /></a>}{project.demo && <a className="text-link" href={project.demo} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={18} /></a>}{project.explainer && <button className="text-link" type="button" onClick={() => { onViewChange('demo'); tabs.current[1]?.focus(); }}>Try educational demo <ArrowUpRight size={18} /></button>}</div>
    </section>
    {project.explainer && <section hidden={view !== 'demo'} role="tabpanel" aria-labelledby="detail-tab-demo" id="detail-panel-demo" tabIndex={0} className="detail-panel">{demoOpened && <EducationalDemo project={project} active={view === 'demo'} />}</section>}
  </>;
}

export default function ProjectDialog({ project, view, shareUrl, onViewChange, onClose }: { project: PublicProject | null; view: ProjectView; shareUrl: string; onViewChange: (view: ProjectView) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (project && ref.current && !ref.current.open) { ref.current.showModal(); ref.current.scrollTop = 0; }
    else if (!project) ref.current?.close();
  }, [project?.id]);
  useEffect(() => { if (project) ref.current?.scrollTo({ top: 0, behavior: 'instant' }); }, [view]);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }}>
    {project && <><div className="dialog-toolbar"><CopyButton value={shareUrl} label="Copy project link" /><button type="button" className="icon-button dialog-dismiss" aria-label="Close project" onClick={onClose}><X size={24} /></button></div><div className="dialog-copy"><ProjectDetails key={project.id} project={project} view={view} onViewChange={onViewChange} /></div></>}
  </dialog>;
}
