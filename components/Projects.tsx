import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Zap } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  japaneseTitle: string;
  description: string;
  techniques: string[];
  zanpakutoType: "Melee" | "Kido" | "Elemental" | "Hybrid";
  completed: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Soul Society Dashboard",
    japaneseTitle: "護廷十三隊",
    description: "A comprehensive admin dashboard for managing Soul Reaper operations with real-time spiritual energy monitoring.",
    techniques: ["React", "TypeScript", "Tailwind CSS", "WebSocket"],
    zanpakutoType: "Kido",
    completed: true,
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 2,
    title: "Hollow Detection System",
    japaneseTitle: "虚探知システム",
    description: "AI-powered threat detection system using machine learning to identify and classify spiritual anomalies.",
    techniques: ["Python", "TensorFlow", "Flask", "Redis"],
    zanpakutoType: "Elemental",
    completed: true,
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 3,
    title: "Zanpakuto Forge",
    japaneseTitle: "斬魄刀",
    description: "Interactive 3D weapon customization platform with physics simulation and spiritual energy visualization.",
    techniques: ["Three.js", "WebGL", "Node.js", "MongoDB"],
    zanpakutoType: "Melee",
    completed: false,
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Spiritual Commerce",
    japaneseTitle: "霊的商業",
    description: "E-commerce platform for spiritual items with integrated payment processing and inventory management.",
    techniques: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
    zanpakutoType: "Hybrid",
    completed: true,
    githubUrl: "#",
    liveUrl: "#"
  }
];

const getZanpakutoColor = (type: string) => {
  switch (type) {
    case "Melee": return "bg-red-500/20 text-red-400 border-red-500/30";
    case "Kido": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Elemental": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "Hybrid": return "bg-spiritual-energy/20 text-spiritual border-spiritual/30";
    default: return "bg-muted text-muted-foreground";
  }
};

export const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-spiritual">Zanpakuto</span> Arsenal
          </h2>
          <p className="text-xl text-muted-foreground">
            <span className="text-reiatsu">斬魄刀技術</span> • My Digital Weapons
          </p>
          <div className="w-24 h-1 bg-spiritual-energy mx-auto mt-6 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`bg-card/30 backdrop-blur-sm border-spiritual/20 transition-all duration-500 hover:border-spiritual/50 cursor-pointer group ${
                hoveredProject === project.id ? 'reiatsu-glow scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={`${getZanpakutoColor(project.zanpakutoType)} text-xs font-medium`}
                  >
                    {project.zanpakutoType} Type
                  </Badge>
                  <div className="flex items-center gap-2">
                    {project.completed && (
                      <div className="w-2 h-2 bg-spiritual-energy rounded-full spiritual-pulse" />
                    )}
                    <Zap className="w-4 h-4 text-spiritual-energy" />
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold text-spiritual group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-sm text-reiatsu font-light">
                  {project.japaneseTitle}
                </p>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Techniques */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-spiritual mb-3">Combat Techniques:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techniques.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="bg-muted/30 text-foreground text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button 
                      size="sm" 
                      className="bg-spiritual-energy hover:bg-accent text-background flex-1"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Deploy
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-spiritual text-spiritual hover:bg-spiritual/10 flex-1"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source
                    </Button>
                  )}
                </div>

                {!project.completed && (
                  <div className="mt-4 p-3 bg-muted/20 rounded-lg border-l-4 border-accent">
                    <p className="text-xs text-muted-foreground">
                      🔨 Currently forging this Zanpakuto...
                    </p>
                  </div>
                )}
              </CardContent>

              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-spiritual-energy/5 rounded-lg transition-opacity duration-300 pointer-events-none ${
                hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
              }`} />
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in-up">
          <p className="text-muted-foreground mb-6">
            Want to see more of my spiritual techniques?
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-spiritual text-spiritual hover:bg-spiritual/10 px-8"
          >
            <Github className="w-5 h-5 mr-2" />
            Visit My Soul Society Repository
          </Button>
        </div>
      </div>
    </section>
  );
};