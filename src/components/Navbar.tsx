
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  // Function to handle navigation to sections with proper scroll behavior
  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // If we're already on the page with the target section
    if (location.pathname === "/" && sectionId.startsWith("/#")) {
      const elementId = sectionId.replace("/#", "");
      const element = document.getElementById(elementId);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // If we need to navigate to another page first
    else if (sectionId.startsWith("/#")) {
      // We'll let React Router handle the navigation,
      // but we need to scroll to the element after the page loads
      const elementId = sectionId.replace("/#", "");
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

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
          <Link 
            to="/" 
            className="text-gray-800 hover:text-primary font-medium"
            onClick={() => handleNavigation("/#hero")}
          >
            Home
          </Link>
          <Link 
            to="/#about" 
            className="text-gray-800 hover:text-primary font-medium"
            onClick={() => handleNavigation("/#about")}
          >
            About
          </Link>
          <Link 
            to="/#programs" 
            className="text-gray-800 hover:text-primary font-medium"
            onClick={() => handleNavigation("/#programs")}
          >
            Programs
          </Link>
          <Link 
            to="/#career" 
            className="text-gray-800 hover:text-primary font-medium"
            onClick={() => handleNavigation("/#career")}
          >
            Career
          </Link>
          <Link 
            to="/#testimonials" 
            className="text-gray-800 hover:text-primary font-medium"
            onClick={() => handleNavigation("/#testimonials")}
          >
            Testimonials
          </Link>
          <Link 
            to="/#contact" 
            className="text-gray-800 hover:text-primary font-medium"
            onClick={() => handleNavigation("/#footer")}
          >
            Contact
          </Link>
          <Link 
            to="/va-masterclass" 
            className="btn-primary"
            onClick={() => handleNavigation("/va-masterclass#pricing")}
          >
            Enroll Now
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4">
          <div className="container flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-primary font-medium py-2"
              onClick={() => handleNavigation("/")}
            >
              Home
            </Link>
            <Link 
              to="/#about" 
              className="text-gray-800 hover:text-primary font-medium py-2"
              onClick={() => handleNavigation("/#about")}
            >
              About
            </Link>
            <Link 
              to="/#programs" 
              className="text-gray-800 hover:text-primary font-medium py-2"
              onClick={() => handleNavigation("/#programs")}
            >
              Programs
            </Link>
            <Link 
              to="/#career" 
              className="text-gray-800 hover:text-primary font-medium py-2"
              onClick={() => handleNavigation("/#career")}
            >
              Career
            </Link>
            <Link 
              to="/#testimonials" 
              className="text-gray-800 hover:text-primary font-medium py-2"
              onClick={() => handleNavigation("/#testimonials")}
            >
              Testimonials
            </Link>
            <Link 
              to="/#contact" 
              className="text-gray-800 hover:text-primary font-medium py-2"
              onClick={() => handleNavigation("/#contact")}
            >
              Contact
            </Link>
            <Link 
              to="/va-masterclass" 
              className="btn-primary"
              onClick={() => handleNavigation("/va-masterclass")}
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
