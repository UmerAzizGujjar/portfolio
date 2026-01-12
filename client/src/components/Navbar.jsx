import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-2xl py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">Umer Aziz</h1>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8">
              <a href="#home" className="text-white hover:text-primary transition-colors duration-300 font-medium">Home</a>
              <a href="#skills" className="text-white hover:text-primary transition-colors duration-300 font-medium">Skills</a>
              <a href="#experience" className="text-white hover:text-primary transition-colors duration-300 font-medium">Experience</a>
              <a href="#certifications" className="text-white hover:text-primary transition-colors duration-300 font-medium">Certifications</a>
              <a href="#projects" className="text-white hover:text-primary transition-colors duration-300 font-medium">Projects</a>
              <a href="#contact" className="text-white hover:text-primary transition-colors duration-300 font-medium">Contact</a>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
