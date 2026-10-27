import type { Project, ReadmeSummary } from '../types.ts';

export interface ProjectUpdate {
  id: string;
  lastCommitAt: string | null;
  commitState: 'known' | 'empty' | 'unavailable';
  readme?: ReadmeSummary;
  publicSummary?: { summary: string; progressBrief?: string; status?: string } | null;
  contentSource?: 'readme' | 'approved-summary' | 'reviewed-fallback';
  contentCheckedAt?: string;
}

export interface ActivityCatalog {
  generatedAt: string;
  projects: ProjectUpdate[];
}

const validDate = (value: unknown): value is string => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));
const textList = (value: unknown, count: number) => Array.isArray(value)
  ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0).slice(0, count).map(item => item.slice(0, 1600)) : [];
const privateStatuses = new Set(['Prototype', 'Concept', 'Concept website', 'Demo data']);
const plainBrief = (value: unknown, limit: number): value is string => typeof value === 'string'
  && value.trim().length > 0 && value.length <= limit && !/[<>`\r\n\x00-\x08\x0b-\x1f]|https?:\/\/|www\.|github\.com|\[[^\]]+\]\(/i.test(value);

function approvedSummary(value: unknown): ProjectUpdate['publicSummary'] | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const entry = value as Record<string, unknown>;
  if (Object.keys(entry).some(key => !['summary', 'progressBrief', 'status'].includes(key))
    || !plainBrief(entry.summary, 280)
    || (entry.progressBrief !== undefined && !plainBrief(entry.progressBrief, 160))
    || (entry.status !== undefined && !privateStatuses.has(entry.status as string))) return null;
  return { summary: entry.summary.trim(), ...(typeof entry.progressBrief === 'string' ? { progressBrief: entry.progressBrief.trim() } : {}), ...(typeof entry.status === 'string' ? { status: entry.status } : {}) };
}

// Explicitly copy display fields; upstream responses cannot add private details to the catalog.
export function mergeProjectUpdates(projects: Project[], payload: unknown, reviewedProjects: Project[] = projects): Project[] {
  if (!payload || typeof payload !== 'object' || !Array.isArray((payload as ActivityCatalog).projects)) return projects;
  const updates = new Map((payload as ActivityCatalog).projects.filter(row => row && typeof row.id === 'string').map(row => [row.id, row]));
  return projects.map(project => {
    const update = updates.get(project.id);
    if (!update) return project;
    const next = { ...project, contentSource: project.contentSource || 'reviewed-fallback' as const };
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
        if (plainBrief(update.readme.summary, 240)) {
          next.readme.summary = update.readme.summary.trim();
          next.summary = next.readme.summary;
          if (next.status === 'Description pending') delete next.status;
        }
        if (overview.length) next.description = overview.join('\n\n');
        if (features.length) next.highlights = features;
        next.contentSource = 'readme';
        if (update.contentSource === 'readme' && validDate(update.contentCheckedAt)) next.contentCheckedAt = update.contentCheckedAt;
        if (progress) {
          next.readme.progress = progress;
          next.progressBrief = next.readme.progress;
        }
      }
    }
    if (next.source === 'private' && update.contentSource === 'approved-summary') {
      const summary = approvedSummary(update.publicSummary);
      if (summary && validDate(update.contentCheckedAt)) {
        next.summary = summary.summary;
        if (summary.progressBrief) next.progressBrief = summary.progressBrief;
        if (summary.status) next.status = summary.status;
        next.contentSource = 'approved-summary';
        next.contentCheckedAt = update.contentCheckedAt;
      }
    }
    if (next.source === 'private' && update.contentSource === 'reviewed-fallback' && update.publicSummary === null) {
      const reviewed = reviewedProjects.find(item => item.source === 'private' && item.id === next.id);
      if (reviewed) {
        next.summary = reviewed.summary;
        if (reviewed.progressBrief) next.progressBrief = reviewed.progressBrief;
        else delete next.progressBrief;
        if (reviewed.status) next.status = reviewed.status;
        else delete next.status;
        next.contentSource = 'reviewed-fallback';
        delete next.contentCheckedAt;
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
