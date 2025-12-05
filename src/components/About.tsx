import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { TrailCard } from "@/components/ui/trail-card";

const About = () => {
  return (
    <section id="about" className="py-20 relative">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Who am I?</h3>
            <p className="text-gray-300 mb-6">
            I am a B.Tech IT student and Front-End Developer with a focus on crafting intuitive, 
            pixel-perfect user interfaces. My approach blends technical precision with a community-first mindset.
            </p>
            <p className="text-gray-300 mb-6">
            Currently, I contribute to AuraSide, where I wear multiple hats,managing strategic partnerships, 
            executing rigorous feature testing, and ensuring operational stability. 
            This experience has taught me that great software isn't just about code, it's about the ecosystem it serves and the community it builds.
            </p>
            <p className="text-gray-300">
            I am constantly iterating on my craft ("building, breaking, and remixing") to stay ahead of modern web standards. 
            Whether I am squashing bugs or refining a UI component, 
            I am driven by a pursuit of excellence and a desire to leave a lasting impact in the cloud.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <TrailCard
              className="bg-dark/70 border border-gray-700 shadow-2xl"
              imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              mapImageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
              title="Adi Maitre"
              location="Front-End Developer · AI Enthusiast"
              difficulty="Pune, India"
              creators="Languages: English · Hindi · Marathi"
              distance="B.Tech in IT"
              elevation="Still Learning"
              duration="Partially Available"
              onContactClick={() =>
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
