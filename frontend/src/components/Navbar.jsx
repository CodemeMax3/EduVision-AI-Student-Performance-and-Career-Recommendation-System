import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import NavbarLogo from "./NavbarLogo"; // IMPORT COMPACT LOGO
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Academic Analysis", path: "/academic-analysis" },
    { label: "Career Advisor", path: "/career-advisor" },
    { label: "Dashboard", path: "/career-dashboard" }
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 1 });

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const buttonRefs = useRef([]);

  const activeIndex = navItems.findIndex((item) => item.path === location.pathname);

  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (buttonRefs.current[activeIndex]) {
      const btn = buttonRefs.current[activeIndex];
      setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth, opacity: 1 });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeIndex]);

  const handleHover = (index) => {
    if (buttonRefs.current[index]) {
      const btn = buttonRefs.current[index];
      setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth, opacity: 1 });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRefs.current[activeIndex]) {
      const btn = buttonRefs.current[activeIndex];
      setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth, opacity: 1 });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  const navigateTo = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`glass-navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      
      <div className="brand" onClick={() => navigateTo("/")}>
        <NavbarLogo />
      </div>

      
      <div className="nav-links-container" ref={navRef} onMouseLeave={handleMouseLeave}>
        <div className="nav-pill" style={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }} />
        {navItems.map((item, index) => (
          <button
            key={item.path}
            ref={(el) => (buttonRefs.current[index] = el)}
            className={`nav-link ${location.pathname === item.path ? "active-link" : ""}`}
            onMouseEnter={() => handleHover(index)}
            onClick={() => navigateTo(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>

      
      <div className="mobile-menu-wrapper" ref={mobileMenuRef}>
        <div className={`mobile-wheel ${mobileMenuOpen ? "wheel-open" : "wheel-close"}`}>
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                className={`wheel-item ${isActive ? "active-wheel-item" : ""}`}
                style={{ "--item-index": idx }}
                onClick={() => navigateTo(item.path)}
              >
                <span className="wheel-item-text">{item.label}</span>
                {isActive && <span className="wheel-active-dot" />}
              </button>
            );
          })}
        </div>

        <button
          className={`menu-center ${mobileMenuOpen ? "center-active" : ""}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;