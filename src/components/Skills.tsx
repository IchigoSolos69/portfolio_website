import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { skills } from '../data/portfolioData';
import { SkillCard } from "@/components/ui/skill-card";

const Skills = () => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="py-20 relative">
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            I've worked with a range of technologies in the web development world, 
            from front-end to back-end and everything in between.
          </p>
        </div>
        
        <div className="space-y-10">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-dark/40 p-6 rounded-2xl border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <h3 className="text-2xl font-semibold text-white">{category}</h3>
                <p className="text-sm text-slate-400">
                  {categorySkills.length} {categorySkills.length === 1 ? "skill" : "skills"}
                </p>
              </div>
              <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
                {categorySkills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    iconSrc={skill.icon}
                    name={skill.name}
                    category={skill.category}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-dark/50 p-8 rounded-xl shadow-md text-center border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['CI/CD', 'Testing', 'Agile', 'UI/UX Strategy', 'Performance Optimization', 'Microservices', 'Design Systems'].map((skill) => (
              <span 
                key={skill}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
