import type { Project } from '../types';
import CommitDate from './CommitDate';

export default function ProjectProgress({ projects, checkedAt }: { projects: Project[]; checkedAt: string }) {
  return <section className="project-progress" aria-labelledby="progress-heading" id="project-progress">
    <div className="progress-intro"><h2 id="progress-heading">Project progress</h2><p>A brief status for every project.<br />Commit dates follow the default branch.</p></div>
    <ul className="progress-list">{projects.map(project => <li key={project.id}>
      <div className="progress-identity"><h3>{project.title}</h3>{project.source === 'private' && <span className="progress-private">Private</span>}</div>
      <p>{project.progressBrief || project.status || 'Repository available; see the project overview.'}</p>
      <CommitDate project={project} />
    </li>)}</ul>
    <p className="progress-note">Status briefs describe documented scope, rather than completion percentages. Dates refresh from GitHub when available; saved data stays visible offline. <span>Catalog checked <time dateTime={checkedAt}>{new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(checkedAt))}</time>.</span></p>
  </section>;
}
