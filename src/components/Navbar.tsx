import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks, enrollNowLink, NavLink } from "../constants/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    setOpenDropdown(null);

    if (path.includes("#")) {
      const [pathname, hash] = path.split('#');
      if (location.pathname === pathname || pathname === '') {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(path);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate(path);
    }
  };

  const handleMobileDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const renderNavLink = (link: NavLink, isMobile = false) => {
    const hasChildren = link.children && link.children.length > 0;

    if (isMobile) {
      return (
        <div key={link.label}>
          <div className="flex justify-between items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!hasChildren) handleNavigation(link.onClick || link.to);
              }}
              className="text-gray-800 hover:text-primary font-medium py-2 flex-1 text-left"
            >
              {link.label}
            </button>
            {hasChildren && (
              <button onClick={() => handleMobileDropdown(link.label)} className="p-2">
                <ChevronDown
                  size={20}
                  className={`transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>
          {hasChildren && openDropdown === link.label && (
            <div className="pl-4 border-l-2 border-gray-200">
              {link.children?.map(child => (
                <Link
                  key={child.label}
                  to={child.to}
                  onClick={() => handleNavigation(child.to)}
                  className="block py-2 text-gray-700 hover:text-primary"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Desktop
    return (
      <div key={link.label} className="relative group">
        <Link
          to={link.to}
          onClick={(e) => {
            e.preventDefault();
            handleNavigation(link.onClick || link.to);
          }}
          className={`text-gray-800 hover:text-primary font-medium flex items-center ${link.className || ''}`}
        >
          {link.label}
          {hasChildren && <ChevronDown size={16} className="ml-1" />}
        </Link>
        {hasChildren && (
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
            {link.children?.map(child => (
              <Link
                key={child.label}
                to={child.to}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(child.to);
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={() => handleNavigation('/')}>
          <img 
            src="/lovable-uploads/f2974bc5-09ee-4340-b746-efc13ec12533.png" 
            alt="RemoteTrybe Logo" 
            className="h-12" 
          />
        </Link>
        
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map(link => renderNavLink(link))}
          {renderNavLink(enrollNowLink)}
        </nav>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4">
          <div className="container flex flex-col space-y-2">
            {navLinks.map(link => renderNavLink(link, true))}
            {renderNavLink(enrollNowLink, true)}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
