import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Database, 
  Palette, 
  Server, 
  Smartphone, 
  Shield,
  Zap,
  Globe,
  GitBranch,
  Terminal
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: "Frontend" | "Backend" | "DevOps" | "Design";
  icon: React.ComponentType<{ className?: string }>;
  squadNumber: number;
  description: string;
}

const skills: Skill[] = [
  {
    name: "React & TypeScript",
    level: 95,
    category: "Frontend",
    icon: Code2,
    squadNumber: 1,
    description: "First Division Captain Level"
  },
  {
    name: "Next.js & Vue.js",
    level: 90,
    category: "Frontend", 
    icon: Globe,
    squadNumber: 2,
    description: "Second Division Lieutenant"
  },
  {
    name: "Node.js & Express",
    level: 88,
    category: "Backend",
    icon: Server,
    squadNumber: 3,
    description: "Third Division Seated Officer"
  },
  {
    name: "PostgreSQL & MongoDB",
    level: 85,
    category: "Backend",
    icon: Database,
    squadNumber: 4,
    description: "Fourth Division Medical Corps"
  },
  {
    name: "UI/UX Design",
    level: 92,
    category: "Design",
    icon: Palette,
    squadNumber: 5,
    description: "Fifth Division Creative Arts"
  },
  {
    name: "Mobile Development",
    level: 80,
    category: "Frontend",
    icon: Smartphone,
    squadNumber: 6,
    description: "Sixth Division Combat Unit"
  },
  {
    name: "Docker & AWS",
    level: 83,
    category: "DevOps",
    icon: Shield,
    squadNumber: 7,
    description: "Seventh Division Security"
  },
  {
    name: "Performance Optimization",
    level: 89,
    category: "DevOps",
    icon: Zap,
    squadNumber: 8,
    description: "Eighth Division Speed Force"
  },
  {
    name: "Git & CI/CD",
    level: 91,
    category: "DevOps",
    icon: GitBranch,
    squadNumber: 9,
    description: "Ninth Division Intelligence"
  },
  {
    name: "Testing & Debugging",
    level: 87,
    category: "Backend",
    icon: Terminal,
    squadNumber: 10,
    description: "Tenth Division Patrol Corps"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Frontend": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Backend": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "DevOps": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "Design": return "bg-spiritual-energy/20 text-spiritual border-spiritual/30";
    default: return "bg-muted text-muted-foreground";
  }
};

const getSquadSymbol = (squadNumber: number) => {
  // Japanese numbers for squad symbols
  const symbols = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  return symbols[squadNumber] || "〇";
};

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-spiritual">Gotei 13</span> Squads
          </h2>
          <p className="text-xl text-muted-foreground">
            <span className="text-reiatsu">護廷十三隊</span> • Technical Divisions
          </p>
          <div className="w-24 h-1 bg-spiritual-energy mx-auto mt-6 rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={skill.name}
              className="bg-card/30 backdrop-blur-sm border-spiritual/20 hover:border-spiritual/50 transition-all duration-500 hover:reiatsu-glow group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                {/* Squad Symbol & Number */}
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    variant="outline" 
                    className={`${getCategoryColor(skill.category)} text-xs`}
                  >
                    {skill.category}
                  </Badge>
                  <div className="text-2xl font-bold text-spiritual">
                    {getSquadSymbol(skill.squadNumber)}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-spiritual-energy/10 rounded-full flex items-center justify-center group-hover:bg-spiritual-energy/20 transition-colors">
                  <skill.icon className="w-8 h-8 text-spiritual-energy" />
                </div>

                {/* Skill Name */}
                <h3 className="font-bold text-lg mb-2 text-spiritual group-hover:text-accent transition-colors">
                  {skill.name}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-muted-foreground mb-4">
                  {skill.description}
                </p>

                {/* Skill Level */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Spiritual Power</span>
                    <span className="text-sm text-spiritual font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full gradient-spiritual transition-all duration-1000 spiritual-pulse"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Squad Badge */}
                <div className="text-xs text-center">
                  <span className="text-muted-foreground">Squad </span>
                  <span className="text-spiritual font-bold">{skill.squadNumber}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Legend */}
        <div className="mt-16 text-center fade-in-up">
          <h3 className="text-xl font-bold text-spiritual mb-6">Division Categories</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Frontend", "Backend", "DevOps", "Design"].map((category) => (
              <Badge 
                key={category}
                variant="outline" 
                className={`${getCategoryColor(category)} px-4 py-2 text-sm`}
              >
                {category} Division
              </Badge>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="bg-card/20 backdrop-blur-sm border-spiritual/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h4 className="text-lg font-bold text-spiritual mb-4">
                Captain-Commander's Note
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Each skill represents years of training in the spiritual arts of development. 
                The Gotei 13 squad system ensures balanced expertise across all technical 
                domains, from the creative arts to the most complex backend architectures.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-spiritual-energy rounded-full spiritual-pulse" />
                <span className="text-sm text-reiatsu">Spiritual Pressure: Captain Level</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};