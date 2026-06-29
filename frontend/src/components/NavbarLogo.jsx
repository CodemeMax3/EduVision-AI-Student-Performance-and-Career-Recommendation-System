import React from "react";
import { Sparkles } from "lucide-react";
import "../styles/navbarLogo.css";

function NavbarLogo() {
  return (
    <div className="navbar-logo-container">
      
      <div className="navbar-logo-card">
        
        <div className="navbar-logo-shine" />
        
        
        <div className="navbar-logo-content">
          <div className="navbar-logo-icon-frame">
            <Sparkles className="navbar-logo-sparkle" size={15} />
          </div>
          <div className="navbar-logo-text-stack">
            <span className="navbar-logo-title">EduVision</span>
            <span className="navbar-logo-subtitle">AI Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarLogo;