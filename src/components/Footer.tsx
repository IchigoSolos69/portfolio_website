import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100">
      {/* Main Footer Content */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-3">
              Adi<span className="text-blue-400">Maitre</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Full Stack Developer & AI Enthusiast crafting exceptional digital experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-200">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Home</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">About</a></li>
              <li><a href="#skills" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Skills</a></li>
              <li><a href="#projects" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Projects</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-200">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#experience" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Experience</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Resumé</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-200">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:adimaitre@example.com" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm">
                <FiMail className="w-4 h-4" />
                <span>adimaitre@example.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm">
                <FiPhone className="w-4 h-4" />
                <span>+91 9876 543 210</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-slate-400 text-sm">
            &copy; {currentYear} Adi Rajendra Maitre. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-500 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-500 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-500 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
            >
              <FiTwitter className="w-5 h-5" />
            </a>
          </div>

          {/* Design Info */}
          <div className="text-slate-400 text-sm">
            Designed with <span className="text-red-400">❤</span> & React
          </div>
        </div>
      </div>

      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
};

export default Footer;
