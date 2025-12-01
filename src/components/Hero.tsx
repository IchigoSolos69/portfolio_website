import { FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-white to-blue-50">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-gradient">Adi Rajendra Maitre</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-dark mb-6">
              Full Stack Developer & AI Enthusiast
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. 
              Even if you don't hire me, these qualities are always in my work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="btn-primary flex items-center justify-center">
                <FiMail className="mr-2" /> Contact Me
              </a>
              <a href="#" className="btn-secondary flex items-center justify-center">
                <FiDownload className="mr-2" /> Download CV
              </a>
            </div>
            
            <div className="flex justify-center lg:justify-start space-x-6 mt-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
                <FiGithub className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
                <FiLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-primary text-white py-2 px-6 rounded-lg shadow-lg">
              <span className="font-bold">5+ Years</span> Experience
            </div>
            
            <div className="absolute -top-4 -left-4 bg-accent text-white py-2 px-6 rounded-lg shadow-lg animate-float">
              <span className="font-bold">100+ Projects</span> Completed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
