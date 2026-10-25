export type ProjectVisual =
  | 'trajectory' | 'training' | 'campus' | 'location' | 'world' | 'forecast'
  | 'browser' | 'weather' | 'inventory' | 'chemistry' | 'data' | 'code'
  | 'ecology' | 'portfolio';

export interface Project {
  id: string;
  repository?: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  highlights: string[];
  illustration: ProjectVisual;
  github?: string;
  demo?: string;
  featured?: boolean;
  status?: string;
  source: 'public' | 'private';
  approved?: boolean;
}
