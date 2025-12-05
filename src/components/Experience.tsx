import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { experiences } from "../data/portfolioData";
import { Timeline } from "@/components/ui/timeline";
import { useState, useEffect } from 'react';

const Experience = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="experience" className="py-16 sm:py-20 relative bg-black">
      <AnimatedGridPattern
        numSquares={isMobile ? 20 : 30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div className="section-container relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <Timeline
          data={experiences.map((exp) => ({
            title: exp.period,
            content: (
              <div className="bg-dark/70 border border-gray-700 rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg">
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
        />
      </div>
    </section>
  );
};

export default Experience;
