
import { useEffect } from "react";

const ScrollReveal = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    
    const revealElements = () => {
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };
    
    window.addEventListener("scroll", revealElements);
    
    // Initial check to reveal elements that are already in view
    revealElements();
    
    return () => {
      window.removeEventListener("scroll", revealElements);
    };
  }, []);

  return null;
};

export default ScrollReveal;
