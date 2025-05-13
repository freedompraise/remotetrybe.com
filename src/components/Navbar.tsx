
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/f2974bc5-09ee-4340-b746-efc13ec12533.png" 
            alt="RemoteTrybe Logo" 
            className="h-12" 
          />
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-gray-800 hover:text-primary font-medium">
            Home
          </Link>
          <Link to="/#about" className="text-gray-800 hover:text-primary font-medium">
            About
          </Link>
          <Link to="/#programs" className="text-gray-800 hover:text-primary font-medium">
            Programs
          </Link>
          <Link to="/#volunteer" className="text-gray-800 hover:text-primary font-medium">
            Volunteer
          </Link>
          <Link to="/#testimonials" className="text-gray-800 hover:text-primary font-medium">
            Testimonials
          </Link>
          <Link to="/#contact" className="text-gray-800 hover:text-primary font-medium">
            Contact
          </Link>
          <Link to="/va-masterclass" className="btn-primary">
            Enroll Now
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4">
          <div className="container flex flex-col space-y-4">
            <Link to="/" className="text-gray-800 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/#about" className="text-gray-800 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/#programs" className="text-gray-800 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}>
              Programs
            </Link>
            <Link to="/#volunteer" className="text-gray-800 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}>
              Volunteer
            </Link>
            <Link to="/#testimonials" className="text-gray-800 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}>
              Testimonials
            </Link>
            <Link to="/#contact" className="text-gray-800 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link to="/va-masterclass" className="btn-primary"
                onClick={() => setIsMenuOpen(false)}>
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
