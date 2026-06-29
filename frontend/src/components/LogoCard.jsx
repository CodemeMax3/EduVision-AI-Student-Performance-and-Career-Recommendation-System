import React from "react";
import { Sparkles } from "lucide-react";
import "../styles/logoCard.css";

function LogoCard() {
  return (
    <div className="logo-card">
      
      <div className="logo-card-bg"></div>

      
      <div className="logo-card-shine"></div>

      
      <div className="logo-icon-container">
        <div className="logo-icon-glow"></div>

        <Sparkles className="logo-icon" />
      </div>

      
      <div className="logo-divider"></div>

      
      <div className="logo-content">
        <h1 className="logo-title">
          <span className="edu">Edu</span>
          <span className="vision">Vision</span>
        </h1>

        <p className="logo-subtitle">
          AI Powered Student Performance &
          <br />
          Career Recommendation System
        </p>
      </div>

     
      <div className="logo-orb orb1"></div>
      <div className="logo-orb orb2"></div>

      
      <div className="logo-dots">
        {[...Array(36)].map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </div>
  );
}

export default LogoCard;