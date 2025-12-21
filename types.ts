
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  category: string;
}

export interface Skill {
  subject: string;
  level: number;
  fullMark: number;
}

export interface JourneyItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  skills: Skill[];
  projects: Project[];
  journey: JourneyItem[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
    twitter: string;
  };
}

// Added ChatMessage interface to support the AI Assistant conversation history
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
