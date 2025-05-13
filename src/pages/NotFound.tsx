
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Change page title when component mounts
    document.title = "Page Not Found | RemoteTrybe";
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] flex items-center justify-center bg-cream px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-2xl text-dark font-medium mb-6">Oops! Page not found</p>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <Link to="/" className="btn-primary">
            <ArrowLeft className="mr-2" size={18} />
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
