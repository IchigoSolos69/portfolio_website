export type ProjectVisual =
  | 'trajectory' | 'training' | 'campus' | 'location' | 'world' | 'forecast'
  | 'browser' | 'weather' | 'inventory' | 'chemistry' | 'data' | 'code'
  | 'ecology' | 'portfolio' | 'commerce' | 'partnerships' | 'laboratory';

export interface ProjectActivity {
  lastCommitAt?: string | null;
  commitState?: 'known' | 'empty' | 'unavailable';
  progressBrief?: string;
}

export interface ReadmeSummary {
  overview: string[];
  features: string[];
  progress?: string;
  url: string;
}

export interface PublicProject extends ProjectActivity {
  id: string;
  repository?: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  highlights: string[];
  limitations?: string[];
  readme?: ReadmeSummary;
  illustration: ProjectVisual;
  github?: string;
  demo?: string;
  featuredOrder?: number;
  status?: string;
  source: 'public';
  media?: { src: string; alt: string };
}

export interface PrivateProjectSummary extends ProjectActivity {
  id: string;
  title: string;
  summary: string;
  status?: string;
  source: 'private';
  illustration: ProjectVisual;
  featuredOrder?: number;
}

export type Project = PublicProject | PrivateProjectSummary;
