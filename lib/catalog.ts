import type { Project } from '../types.ts';

export function projectCategory(project: Project): string {
  return project.source === 'public' ? project.category : 'Private work';
}

export function projectTags(project: Project): string[] {
  return project.source === 'public' ? project.tags : [];
}

export function filterProjects(
  projects: Project[],
  filters: { query: string; category: string; technology: string },
): Project[] {
  const query = filters.query.trim().toLocaleLowerCase();
  return projects.filter(project => {
    const searchable = [project.id, project.title, project.summary,
      ...(project.source === 'public' ? [project.repository ?? '', ...project.tags] : [])]
      .join(' ').toLocaleLowerCase();
    return (!query || searchable.includes(query))
      && (filters.category === 'All' || projectCategory(project) === filters.category)
      && (filters.technology === 'All' || projectTags(project).includes(filters.technology));
  });
}
