import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl font-bold text-primary">
              Adi<span className="text-accent">Maitre</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-dark hover:text-primary font-medium transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary transition-colors">
              <FiTwitter className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex justify-center space-x-6 pt-4 pb-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark hover:text-primary">
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
