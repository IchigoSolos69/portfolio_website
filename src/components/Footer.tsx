import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const socialLinks = [
    { icon: FiGithub, url: "https://github.com", label: "GitHub" },
    { icon: FiLinkedin, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: FiTwitter, url: "https://twitter.com", label: "Twitter" },
    { icon: FiMail, url: "mailto:adimaitre@example.com", label: "Email" }
  ];

  return (
    <footer className="bg-slate-950/95 text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
          <a href="#about" className="hover:text-slate-100 transition-colors tap-target focus-ring">
            About
          </a>
          <span className="text-slate-600">•</span>
          <a href="#skills" className="hover:text-slate-100 transition-colors tap-target focus-ring">
            Skills
          </a>
          <span className="text-slate-600">•</span>
          <a href="#projects" className="hover:text-slate-100 transition-colors tap-target focus-ring">
            Projects
          </a>
          <span className="text-slate-600">•</span>
          <a href="#contact" className="hover:text-slate-100 transition-colors tap-target focus-ring">
            Contact
          </a>
        </div>

        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : undefined}
              rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
              className="bg-slate-800/50 text-slate-300 p-2 rounded-full hover:bg-primary hover:text-white transition-colors tap-target focus-ring flex items-center justify-center"
              aria-label={link.label}
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <div className="text-xs text-slate-500 text-center">
          &copy; {currentYear} Adi Rajendra Maitre. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
