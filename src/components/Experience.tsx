import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { experiences } from "../data/portfolioData";
import { Timeline } from "@/components/ui/timeline";

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative bg-black/70">
      {/* Smooth transition gradient at top - fades from black (from Skills) to black */}
      <div 
        className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, transparent 100%)'
        }}
      />
      {/* Smooth transition gradient at bottom - fades from black to dark blue (for Contact) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(15, 23, 42, 0.7) 100%)'
        }}
      />
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
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <Timeline
          data={experiences.map((exp) => ({
            title: exp.period,
            content: (
              <div className="bg-dark/70 border border-gray-700 rounded-2xl p-6 md:p-8 shadow-lg">
                <p className="text-sm text-primary font-semibold mb-1">
                  {exp.company}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {exp.role}
                </h3>
                <p className="text-gray-300 text-sm md:text-base mb-4">
                  {exp.description}
                </p>
                <ul className="space-y-2 text-sm md:text-base text-gray-300">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          }))}
          title="Experience timeline"
          description="A quick look at the roles, companies, and impact that have shaped my journey so far."
        />
      </div>
    </section>
  );
};

export default Experience;
    