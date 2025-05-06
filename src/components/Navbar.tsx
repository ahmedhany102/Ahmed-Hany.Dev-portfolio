
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const NavLink = ({ to, label }: { to: string; label: string }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        className={`relative inline-block transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
          isActive 
            ? "text-primary after:scale-x-100 after:origin-bottom-left" 
            : "text-foreground hover:text-primary after:scale-x-0"
        }`}
        onClick={closeMobileMenu}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : ""
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold" onClick={closeMobileMenu}>
          Ahmed Hany
        </Link>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            className="p-2 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-foreground transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-foreground transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-foreground transition-transform duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-8">
            <NavLink to="/about" label="About" />
            <NavLink to="/skills" label="Skills" />
            <NavLink to="/projects" label="Projects" />
            <NavLink to="/blog" label="Blog" />
            <NavLink to="/contact" label="Contact" />
            <ThemeToggle />
          </nav>
        )}

        {/* Mobile Navigation */}
        {isMobile && mobileMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-md px-4 py-6 flex flex-col space-y-6 animate-fade-in">
            <NavLink to="/about" label="About" />
            <NavLink to="/skills" label="Skills" />
            <NavLink to="/projects" label="Projects" />
            <NavLink to="/blog" label="Blog" />
            <NavLink to="/contact" label="Contact" />
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </nav>
        )}

        {/* Always Show Theme Toggle on Mobile when menu is closed */}
        {isMobile && !mobileMenuOpen && (
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
};
