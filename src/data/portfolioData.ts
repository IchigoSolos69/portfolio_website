export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  experience: number;
  icon: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Modern responsive portfolio website built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600",
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.com"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Full-featured e-commerce solution with payment integration",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600",
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://ecommerce-demo.com"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates",
    technologies: ["React", "Firebase", "Redux"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600",
    githubUrl: "https://github.com/yourusername/taskmanager",
    liveUrl: "https://taskmanager-demo.com"
  }
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description: "Developing scalable web applications and leading frontend initiatives.",
    achievements: [
      "Reduced application load time by 40% through optimization techniques",
      "Led a team of 5 developers in building a customer portal",
      "Implemented CI/CD pipelines reducing deployment time by 60%"
    ]
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Digital Innovations",
    period: "2020 - 2022",
    description: "Created responsive user interfaces for enterprise clients.",
    achievements: [
      "Developed 15+ client websites with React and TypeScript",
      "Improved user engagement by 35% through UI/UX enhancements",
      "Mentored junior developers in modern frontend practices"
    ]
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "StartupXYZ",
    period: "2019 - 2020",
    description: "Assisted in building and maintaining company website and applications.",
    achievements: [
      "Built responsive landing pages that increased conversions by 25%",
      "Optimized website performance improving Google PageSpeed score to 95",
      "Implemented accessibility features for better user experience"
    ]
  }
];

export const skills: Skill[] = [
  {
    name: "React",
    level: 95,
    category: "Frontend",
    experience: 5,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    level: 92,
    category: "Frontend",
    experience: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Next.js",
    level: 88,
    category: "Frontend",
    experience: 3,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    category: "Frontend",
    experience: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  {
    name: "Node.js",
    level: 85,
    category: "Backend",
    experience: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    level: 80,
    category: "Backend",
    experience: 5,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "GraphQL",
    level: 78,
    category: "Backend",
    experience: 3,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Express.js",
    level: 82,
    category: "Backend",
    experience: 3,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "MongoDB",
    level: 75,
    category: "Database",
    experience: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    level: 80,
    category: "Database",
    experience: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "AWS",
    level: 72,
    category: "Cloud",
    experience: 3,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  {
    name: "Docker",
    level: 78,
    category: "DevOps",
    experience: 3,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Kubernetes",
    level: 65,
    category: "DevOps",
    experience: 2,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "Git",
    level: 90,
    category: "Tools",
    experience: 6,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Figma",
    level: 85,
    category: "Design",
    experience: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Framer",
    level: 70,
    category: "Design",
    experience: 2,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg",
  },
];
