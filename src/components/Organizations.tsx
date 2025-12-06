import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { LogoCloud } from "@/components/ui/logo-cloud-4";
import { useState, useEffect } from 'react';

const Organizations = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const logos = [
    {
      src: "/Intel-logo.jpg",
      alt: "Intel Logo",
      name: "Intel",
    },
    {
      src: "/Auraside.webp",
      alt: "Auraside Logo",
      name: "Auraside",
    },
    {
      src: "/Ghast.webp",
      alt: "Ghast Logo",
      name: "Ghast",
    },
    {
      src: "/Hone.webp",
      alt: "Hone Logo",
      name: "Hone",
    },
  ];

  return (
    <section id="organizations" className="py-16 sm:py-20 relative bg-black">
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
          <p className="text-sm md:text-base text-slate-400 mb-4 font-light tracking-wide">
            Distinguished Organizations I Have Had the Privilege to Collaborate With
          </p>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="w-full px-4">
          <LogoCloud logos={logos} />
        </div>
      </div>
    </section>
  );
};

export default Organizations;

