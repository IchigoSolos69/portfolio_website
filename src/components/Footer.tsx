import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Adi<span className="text-blue-400">Maitre</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Full Stack Developer & AI Enthusiast crafting exceptional digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Home</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">About</a></li>
              <li><a href="#skills" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Skills</a></li>
              <li><a href="#projects" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Projects</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:adimaitre@example.com" className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>adimaitre@example.com</span>
              </a>
              <div className="flex gap-4 mt-4">
                {[
                  { Icon: Github, href: "https://github.com" },
                  { Icon: Linkedin, href: "https://linkedin.com" },
                  { Icon: Twitter, href: "https://twitter.com" }
                ].map(({ Icon, href }, index) => (
                  <a 
                    key={index}
                    href={href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-slate-800 hover:bg-blue-500 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            &copy; {currentYear} Adi Rajendra Maitre. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
