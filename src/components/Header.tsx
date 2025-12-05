import { Dock } from "@/components/ui/dock-two";
import { 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Trophy, 
  Mail 
} from 'lucide-react';

const Header = () => {
  const dockItems = [
    { 
      icon: Home, 
      label: "Home", 
      onClick: () => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      icon: User, 
      label: "About", 
      onClick: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      icon: Code, 
      label: "Skills", 
      onClick: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      icon: Briefcase, 
      label: "Projects", 
      onClick: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      icon: Trophy, 
      label: "Experience", 
      onClick: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      icon: Mail, 
      label: "Contact", 
      onClick: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <header className="fixed w-full z-50 pointer-events-none">
      <div className="flex justify-center items-center w-full h-full">
        <div className="pointer-events-auto">
          <Dock 
            items={dockItems} 
            className="h-20" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
