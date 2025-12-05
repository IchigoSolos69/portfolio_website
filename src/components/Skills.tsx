import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { motion } from "framer-motion";
import { 
  Code2, 
  Server, 
  Wrench, 
  Monitor
} from "lucide-react";

// Skill data organized by category
interface Skill {
  name: string;
  icon: string;
  fallback?: React.ComponentType<{ className?: string }>;
}

const skillCategories: Record<string, {
  icon: React.ComponentType<{ className?: string }>;
  skills: Skill[];
  color: string;
  borderColor: string;
  glowColor: string;
}> = {
  "Frontend Powerhouse": {
    icon: Code2,
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg" },
    ],
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    glowColor: "shadow-cyan-500/20"
  },
  "Backend & Architecture": {
    icon: Server,
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ],
    color: "from-blue-500/20 to-purple-500/20",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/20"
  },
  "Tools & DevOps": {
    icon: Wrench,
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", fallback: Monitor },
    ],
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    glowColor: "shadow-purple-500/20"
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative bg-[#0a0a0a]">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            I've worked with a range of technologies in the web development world, 
            from front-end to back-end and everything in between.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(skillCategories).map(([category, data], index) => {
            const IconComponent = data.icon;
            return (
              <motion.div
                key={category}
                variants={cardVariants}
                className={cn(
                  "group relative bg-slate-950/50 backdrop-blur-sm border border-white/10 rounded-xl p-4",
                  "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
                  "transition-all duration-300 ease-out",
                  data.glowColor,
                  index === 0 && "lg:col-span-2", // First card spans 2 columns on large screens
                )}
              >
                {/* Gradient overlay on hover */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  data.color
                )}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "p-1.5 rounded-lg bg-gradient-to-br border",
                      data.color,
                      data.borderColor
                    )}>
                      <IconComponent className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">{category}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {data.skills.map((skill) => {
                      const FallbackIcon = skill.fallback;
                      return (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.05 }}
                          className={cn(
                            "flex flex-col items-center gap-1.5 p-3 rounded-lg",
                            "bg-slate-900/50 border border-white/5",
                            "hover:border-cyan-500/30 hover:bg-slate-900/70",
                            "transition-all duration-200"
                          )}
                        >
                          <div className="w-10 h-10 rounded-lg bg-slate-800/50 p-1.5 flex items-center justify-center">
                            {FallbackIcon ? (
                              <FallbackIcon className="w-6 h-6 text-cyan-400" />
                            ) : (
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            )}
                          </div>
                          <span className="text-xs font-medium text-slate-300 text-center">
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
