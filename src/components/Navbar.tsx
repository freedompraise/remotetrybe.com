import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks, enrollNowLink } from "../constants/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
  const handleNavigation = (sectionId: string, isExternalSection = false) => {
    setIsMenuOpen(false);
    
    if (isExternalSection) {
      // For external sections (like affiliate section in VA Masterclass)
      const [path, hash] = sectionId.split('#');
      
      // If we're already on the target page, just scroll
      if (location.pathname === path) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      // Otherwise navigate and then scroll
      navigate(path);
      // Wait for the page to load before scrolling
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Increased timeout to ensure page is loaded
    } else {
      // For same-page navigation
      if (location.pathname === "/" && sectionId.startsWith("/#")) {
        const elementId = sectionId.replace("/#", "");
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else if (sectionId.startsWith("/#")) {
        navigate(sectionId);
      }
    }
  };

  const renderNavLink = (link: typeof navLinks[0], isMobile = false) => {
    const isExternalLink = link.to.includes('#') && !link.to.startsWith('/#');
    
    return (
      <Link 
        key={link.label}
        to={link.to}
        className={`text-gray-800 hover:text-primary font-medium ${isMobile ? 'py-2' : ''} ${link.className || ''}`}
        onClick={(e) => {
          e.preventDefault(); // Always prevent default to handle navigation manually
          if (isExternalLink) {
            handleNavigation(link.onClick || link.to, true);
          } else if (link.onClick) {
            handleNavigation(link.onClick, false);
          } else {
            navigate(link.to);
          }
        }}
      >
        {link.label}
      </Link>
    );
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
          {navLinks.map(link => renderNavLink(link))}
          {renderNavLink(enrollNowLink)}
        </nav>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4">
          <div className="container flex flex-col space-y-4">
            {navLinks.map(link => renderNavLink(link, true))}
            {renderNavLink(enrollNowLink, true)}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
