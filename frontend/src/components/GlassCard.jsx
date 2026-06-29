import React from "react";

function GlassCard({ children, className = "", style }) {
  return (
    <div
      className={`glass-card ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default GlassCard;