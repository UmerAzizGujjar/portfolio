const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text">Umer Aziz</h3>
          </div>
          
          <div className="flex gap-6 mb-6">
            <a href="#home" className="hover:text-primary transition-colors duration-300">Home</a>
            <a href="#skills" className="hover:text-primary transition-colors duration-300">Skills</a>
            <a href="#projects" className="hover:text-primary transition-colors duration-300">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors duration-300">Contact</a>
          </div>
          
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>
          
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} Umer Aziz. Crafted with <span className="text-red-500">❤</span> using MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
