import { skills } from '../data/portfolioData';

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
    <section id="skills" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            I've worked with a range of technologies in the web development world, 
            from front-end to back-end and everything in between.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
            <div
              key={category}
              className="bg-white p-6 rounded-xl shadow-md card-hover"
            >
              <h3 className="text-xl font-bold mb-4 text-primary">{category}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-bold mb-4">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Git', 'Docker', 'AWS', 'CI/CD', 'Testing', 'Agile', 'UI/UX', 'Responsive Design'].map((skill) => (
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
