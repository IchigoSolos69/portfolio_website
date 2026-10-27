import type { Project } from '../types.ts';
import { projectCategory, projectTags } from './catalog.ts';

export type ProjectView = 'overview' | 'demo';
export interface PortfolioLocation {
  query: string;
  category: string;
  technology: string;
  projectId: string | null;
  view: ProjectView;
}

export function readPortfolioLocation(href: string, projects: Project[]): PortfolioLocation {
  const params = new URL(href).searchParams;
  const category = params.get('category') || 'All';
  const technology = params.get('technology') || 'All';
  const project = projects.find(project => project.source === 'public' && project.id === params.get('project'));
  return {
    query: params.get('q') || '',
    category: category === 'All' || projects.some(project => projectCategory(project) === category) ? category : 'All',
    technology: technology === 'All' || projects.some(project => projectTags(project).includes(technology)) ? technology : 'All',
    projectId: project?.id || null,
    view: project?.source === 'public' && project.explainer && params.get('view') === 'demo' ? 'demo' : 'overview',
  };
}

export function portfolioHref(href: string, location: PortfolioLocation): string {
  const url = new URL(href);
  for (const [name, value] of Object.entries({ q: location.query, category: location.category, technology: location.technology, project: location.projectId, view: location.projectId && location.view === 'demo' ? 'demo' : null })) {
    if (value && value !== 'All') url.searchParams.set(name, value);
    else url.searchParams.delete(name);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}
