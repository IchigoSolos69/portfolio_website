import type { Project } from '../types.ts';

export function getPublishableProjects(projects: Project[]): Project[] {
  return projects.filter(project => project.source === 'public' || project.approved === true);
}

export function filterProjects(
  projects: Project[],
  filters: { query: string; category: string; technology: string },
): Project[] {
  const query = filters.query.trim().toLocaleLowerCase();
  return getPublishableProjects(projects).filter(project => {
    const searchable = [project.title, project.summary, project.repository ?? '', ...project.tags]
      .join(' ').toLocaleLowerCase();
    return (!query || searchable.includes(query))
      && (filters.category === 'All' || project.category === filters.category)
      && (filters.technology === 'All' || project.tags.includes(filters.technology));
  });
}
