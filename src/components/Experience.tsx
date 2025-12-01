import { experiences } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary transform md:translate-x-[-1px]"></div>
          
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="md:w-1/2 mb-4 md:mb-0 md:px-8">
                <div className={`bg-white p-6 rounded-xl shadow-md ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-sm text-primary font-medium">{exp.period}</span>
                  <h3 className="text-xl font-bold mt-2">{exp.role}</h3>
                  <h4 className="text-lg text-accent font-medium">{exp.company}</h4>
                  <p className="text-gray-600 mt-3">{exp.description}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">â€¢</span>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="md:w-1/2 flex justify-center md:justify-start items-center">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10"></div>
              </div>
              
              <div className="md:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
