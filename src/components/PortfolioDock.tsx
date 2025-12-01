import { Dock } from "@/components/ui/dock-two";
import {
  Home,
  User,
  Code,
  Briefcase,
  Award,
  Mail,
  Github,
  Linkedin
} from "lucide-react";

function PortfolioDock() {
  const handleNavigation = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dockItems = [
    { 
      icon: Home, 
      label: "Home", 
      onClick: () => handleNavigation('home')
    },
    { 
      icon: User, 
      label: "About", 
      onClick: () => handleNavigation('about')
    },
    { 
      icon: Award, 
      label: "Skills", 
      onClick: () => handleNavigation('skills')
    },
    { 
      icon: Code, 
      label: "Projects", 
      onClick: () => handleNavigation('projects')
    },
    { 
      icon: Briefcase, 
      label: "Experience", 
      onClick: () => handleNavigation('experience')
    },
    { 
      icon: Mail, 
      label: "Contact", 
      onClick: () => handleNavigation('contact')
    },
    { 
      icon: Github, 
      label: "GitHub", 
      onClick: () => window.open('https://github.com', '_blank')
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      onClick: () => window.open('https://linkedin.com', '_blank')
    }
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <Dock items={dockItems} />
      </div>
    </div>
  );
}

export { PortfolioDock };
