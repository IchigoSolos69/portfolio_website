import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import type { PublicProject } from '../types';

const ResearchDemos = lazy(() => import('./explainers/ResearchDemos'));
const EverydayDemos = lazy(() => import('./explainers/EverydayDemos'));

class DemoBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <p role="alert" className="demo-loading">The demo could not load. This project’s overview is still available in the Overview tab.</p> : this.props.children;
  }
}

export default function EducationalDemo({ project, active }: { project: PublicProject; active: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  useEffect(() => {
    if (!host.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(host.current);
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  if (!project.explainer) return null;
  const Demo = project.explainer.family === 'research' ? ResearchDemos : EverydayDemos;
  return <div ref={host} className="educational-demo" data-ui="educational-demo" data-project={project.id}>
    <div className="demo-intro"><p className="demo-disclosure">Educational demo · simplified illustration</p><h3>{project.explainer.title}</h3><p>{project.explainer.summary}</p></div>
    <DemoBoundary><Suspense fallback={<p className="demo-loading" role="status">Loading the interactive explainer…</p>}><Demo id={project.id} active={active && visible && pageVisible} /></Suspense></DemoBoundary>
    <div className="demo-lesson"><h4>What this demonstrates</h4><p>{project.explainer.lesson}</p><p className="demo-scope">Uses sample data and simplified behavior in this page. The original application and its backend are not running here.</p></div>
  </div>;
}
