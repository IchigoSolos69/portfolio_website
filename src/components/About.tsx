import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

const About = () => {
  return (
    <section id="about" className="py-20 relative">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Who am I?</h3>
            <p className="text-gray-300 mb-6">
              I'm a passionate Full Stack Developer with over 5 years of experience creating 
              digital solutions that make a difference. I specialize in building responsive, 
              accessible, and performant web applications using modern technologies.
            </p>
            <p className="text-gray-300 mb-6">
              My journey in tech started with a curiosity about how things work, which led me 
              to pursue a degree in Computer Science. Since then, I've worked with startups 
              and established companies to bring their ideas to life through code.
            </p>
            <p className="text-gray-300">
              When I'm not coding, you can find me contributing to open-source projects, 
              writing technical articles, or exploring new technologies in the ever-evolving 
              world of web development.
            </p>
          </div>
          
          <div className="bg-dark/50 p-8 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-white">Personal Info</h3>
            <div className="space-y-4">
              <div className="flex">
                <span className="font-semibold w-32 text-white">Name:</span>
                <span className="text-gray-300">Adi Rajendra Maitre</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32 text-white">Email:</span>
                <span className="text-gray-300">adimaitre@example.com</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32 text-white">Location:</span>
                <span className="text-gray-300">Mumbai, India</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32 text-white">Education:</span>
                <span className="text-gray-300">B.Tech in IT</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32 text-white">Freelance:</span>
                <span className="text-gray-300">Available</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-bold mb-3 text-white">Languages</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">English</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Hindi</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Japanese</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
