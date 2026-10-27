import type { Project } from '../types';
export default function ProjectProgress({ project }: { project: Project }) {
  const progress = project.progressBrief || project.status;
  if (!progress) return null;
  const brief = progress.length > 150 ? `${progress.slice(0, 147).replace(/\s+\S*$/, '')}…` : progress;
  return <span className="project-progress"><span className="progress-label">Progress</span> {brief}</span>;
}
