
import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img 
              src="/lovable-uploads/8d614716-901e-415b-bfb7-75d217b25b1e.png" 
              alt="RemoteTrybe Logo" 
              className="h-12 mb-4" 
            />
            <p className="text-gray-300 mb-4">
              Expert Training for Executive Support
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/remotetrybe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://youtube.com/@odosaegharevba" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://facebook.com/share/4gveirsAVUdwrGHT" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://linkedin.com/company/remote-trybe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/#programs" className="text-gray-300 hover:text-white transition-colors">Programs</Link>
              </li>
              <li>
                <Link to="/#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/va-masterclass" className="text-gray-300 hover:text-white transition-colors">
                  VA Masterclass
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Project Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Social Media Management
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-4">
              Have questions? Reach out to us through our social channels or send us a message.
            </p>
            <a
              href="https://wa.me/2349060038374"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-2 rounded-lg inline-flex items-center hover:bg-opacity-90 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Remote Trybe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
