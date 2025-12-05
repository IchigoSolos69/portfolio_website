import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { projects } from '../data/portfolioData';
import { ProjectStatusCard } from "@/components/ui/expandable-card";

const projectStatusData: Record<
  number,
  {
    progress: number;
    dueDate: string;
    contributors: Array<{ name: string; image?: string }>;
    tasks: Array<{ title: string; completed: boolean }>;
    githubStars: number;
    openIssues: number;
  }
> = {
  1: {
    progress: 90,
    dueDate: "Dec 31, 2024",
    contributors: [
      { name: "Adi", image: "/adi.jpg" },
      { name: "John" },
    ],
    tasks: [
      { title: "Polish UI animations", completed: true },
      { title: "Add more case studies", completed: false },
    ],
    githubStars: 120,
    openIssues: 3,
  },
  2: {
    progress: 75,
    dueDate: "Jan 15, 2025",
    contributors: [
      { name: "Adi" },
      { name: "Sarah" },
    ],
    tasks: [
      { title: "Implement checkout flow", completed: true },
      { title: "Add wishlist feature", completed: false },
    ],
    githubStars: 340,
    openIssues: 8,
  },
  3: {
    progress: 60,
    dueDate: "Feb 10, 2025",
    contributors: [
      { name: "Adi" },
      { name: "Alex" },
    ],
    tasks: [
      { title: "Refine real-time sync", completed: false },
      { title: "Improve notifications", completed: false },
    ],
    githubStars: 210,
    openIssues: 5,
  },
};

const Projects = () => {
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 relative">
      {/* Smooth transition gradient at bottom - fades from dark blue to black */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.9) 100%)'
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project reflects my passion for 
            creating meaningful digital experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {projects.map((project) => {
            const status =
              projectStatusData[project.id] || {
                progress: 50,
                dueDate: "TBD",
                contributors: [{ name: "Adi" }],
                tasks: [
                  { title: "Plan next milestone", completed: false },
                  { title: "Review requirements", completed: false },
                ],
                githubStars: 0,
                openIssues: 0,
              };

            return (
              <div key={project.id} className="flex justify-center">
                <ProjectStatusCard
                  title={project.title}
                  progress={status.progress}
                  dueDate={status.dueDate}
                  contributors={status.contributors}
                  tasks={status.tasks}
                  githubStars={status.githubStars}
                  openIssues={status.openIssues}
                  isExpanded={expandedProjectId === project.id}
                  onToggle={() =>
                    setExpandedProjectId((prev) =>
                      prev === project.id ? null : project.id
                    )
                  }
                />
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="btn-primary inline-flex items-center">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
