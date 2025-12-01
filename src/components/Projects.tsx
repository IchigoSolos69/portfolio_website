import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/portfolioData';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project reflects my passion for 
            creating meaningful digital experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md card-hover flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed w-full h-full" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-auto">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FiGithub className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
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
