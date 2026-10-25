import { formatCommitDate } from '../lib/project-activity';
import type { Project } from '../types';

export default function CommitDate({ project }: { project: Project }) {
  return <span className="commit-date" title="Latest commit on the repository’s default branch">
    <span>Last commit</span>{' '}
    {project.lastCommitAt && project.commitState !== 'empty'
      ? <time dateTime={project.lastCommitAt}>{formatCommitDate(project)}</time>
      : <span>{formatCommitDate(project)}</span>}
  </span>;
}
