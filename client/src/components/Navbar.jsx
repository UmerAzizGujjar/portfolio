import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-2xl py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">Umer Aziz</h1>
            <div className="flex items-center gap-4">
              {/* Desktop Menu */}
              <div className="hidden md:flex gap-8">
                <a href="#home" className="text-white hover:text-primary transition-colors duration-300 font-medium">Home</a>
                <a href="#skills" className="text-white hover:text-primary transition-colors duration-300 font-medium">Skills</a>
                <a href="#experience" className="text-white hover:text-primary transition-colors duration-300 font-medium">Experience</a>
                <a href="#certifications" className="text-white hover:text-primary transition-colors duration-300 font-medium">Certifications</a>
                <a href="#projects" className="text-white hover:text-primary transition-colors duration-300 font-medium">Projects</a>
                <a href="#contact" className="text-white hover:text-primary transition-colors duration-300 font-medium">Contact</a>
              </div>
              
              <DarkModeToggle />
              
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative inline-flex items-center justify-center p-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all"
                aria-label="Toggle menu"
              >
                <svg
                  className={`w-6 h-6 text-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 backdrop-blur-xl shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-24 px-6 space-y-6">
          <a
            href="#home"
            onClick={handleNavClick}
            className="text-white hover:text-purple-400 transition-colors duration-300 font-medium text-lg py-3 border-b border-white/10"
          >
            Home
          </a>
          <a
            href="#skills"
            onClick={handleNavClick}
            className="text-white hover:text-purple-400 transition-colors duration-300 font-medium text-lg py-3 border-b border-white/10"
          >
            Skills
          </a>
          <a
            href="#experience"
            onClick={handleNavClick}
            className="text-white hover:text-purple-400 transition-colors duration-300 font-medium text-lg py-3 border-b border-white/10"
          >
            Experience
          </a>
          <a
            href="#certifications"
            onClick={handleNavClick}
            className="text-white hover:text-purple-400 transition-colors duration-300 font-medium text-lg py-3 border-b border-white/10"
          >
            Certifications
          </a>
          <a
            href="#projects"
            onClick={handleNavClick}
            className="text-white hover:text-purple-400 transition-colors duration-300 font-medium text-lg py-3 border-b border-white/10"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={handleNavClick}
            className="text-white hover:text-purple-400 transition-colors duration-300 font-medium text-lg py-3 border-b border-white/10"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
