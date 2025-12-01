import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-8 relative">
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.05}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div className="section-container relative z-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold mb-4 md:mb-0">
            Adi<span className="text-accent">Maitre</span>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FiTwitter className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Adi Rajendra Maitre
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
