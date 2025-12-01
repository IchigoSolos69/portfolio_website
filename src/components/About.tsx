import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { TrailCard } from "@/components/ui/trail-card";

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

          <div className="flex justify-center lg:justify-end">
            <TrailCard
              className="bg-dark/70 border border-gray-700 shadow-2xl"
              imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              mapImageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
              title="Adi Maitre"
              location="Fornt-End Developer · AI Enthusiast"
              difficulty="Pune, India"
              creators="Languages: English · Hindi · Marathi"
              distance="B.Tech in IT"
              elevation="Still Learning"
              duration="Freelance: Available"
              onDirectionsClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
