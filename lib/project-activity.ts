import type { Project, ReadmeSummary } from '../types.ts';

export interface ProjectUpdate {
  id: string;
  lastCommitAt: string | null;
  commitState: 'known' | 'empty' | 'unavailable';
  readme?: ReadmeSummary;
}

export interface ActivityCatalog {
  generatedAt: string;
  projects: ProjectUpdate[];
}

const validDate = (value: unknown): value is string => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));
const textList = (value: unknown, count: number) => Array.isArray(value)
  ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0).slice(0, count).map(item => item.slice(0, 1600)) : [];

// Explicitly copy display fields; upstream responses cannot add private details to the catalog.
export function mergeProjectUpdates(projects: Project[], payload: unknown): Project[] {
  if (!payload || typeof payload !== 'object' || !Array.isArray((payload as ActivityCatalog).projects)) return projects;
  const updates = new Map((payload as ActivityCatalog).projects.filter(row => row && typeof row.id === 'string').map(row => [row.id, row]));
  return projects.map(project => {
    const update = updates.get(project.id);
    if (!update) return project;
    const next = { ...project };
    if (update.commitState === 'known' && validDate(update.lastCommitAt)) {
      next.lastCommitAt = update.lastCommitAt;
      next.commitState = 'known';
    } else if (update.commitState === 'empty') {
      next.lastCommitAt = null;
      next.commitState = 'empty';
    }
    if (next.source === 'public' && update.readme && typeof update.readme === 'object') {
      const overview = textList(update.readme.overview, 3);
      const features = textList(update.readme.features, 8);
      const progress = typeof update.readme.progress === 'string' ? update.readme.progress.trim().slice(0, 280) : '';
      // README links stay on the public repository, even if the response is malformed.
      if ((overview.length || features.length || progress) && update.readme.url === `${next.github}#readme`) {
        next.readme = { overview, features, url: update.readme.url };
        if (progress) {
          next.readme.progress = progress;
          next.progressBrief = next.readme.progress;
        }
      }
    }
    return next;
  });
}

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
export function formatCommitDate(project: Pick<Project, 'lastCommitAt' | 'commitState'>): string {
  if (project.commitState === 'empty') return 'No commits yet';
  return validDate(project.lastCommitAt) ? dateFormat.format(new Date(project.lastCommitAt)) : 'Date unavailable';
}
