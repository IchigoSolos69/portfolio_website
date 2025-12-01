const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950/95 text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Crafted with care
          </p>
          <h3 className="text-2xl font-semibold text-slate-50">
            Adi <span className="text-slate-300">Rajendra</span> Maitre
          </h3>
          <p className="text-sm text-slate-400 max-w-md">
            Full Stack Developer &amp; AI Enthusiast building performant, elegant, and reliable digital experiences.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            <a href="#about" className="hover:text-slate-100 transition-colors">
              About
            </a>
            <span className="text-slate-600">•</span>
            <a href="#skills" className="hover:text-slate-100 transition-colors">
              Skills
            </a>
            <span className="text-slate-600">•</span>
            <a href="#projects" className="hover:text-slate-100 transition-colors">
              Projects
            </a>
            <span className="text-slate-600">•</span>
            <a href="#contact" className="hover:text-slate-100 transition-colors">
              Contact
            </a>
          </div>

          <div className="text-xs text-slate-500">
            &copy; {currentYear} Adi Rajendra Maitre. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
