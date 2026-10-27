import type { Project } from '../types';
import { formatCommitDate } from '../lib/project-activity';

export default function ProjectContentNote({ project }: { project: Project }) {
  const label = project.contentSource === 'readme' ? 'Repository documentation from the README'
    : project.contentSource === 'approved-summary' ? 'Approved public summary' : 'Reviewed project description';
  return <p className="project-content-note">{label}{project.contentCheckedAt && <> · Checked <time dateTime={project.contentCheckedAt}>{formatCommitDate({ lastCommitAt: project.contentCheckedAt })}</time></>}</p>;
}
