import GlassCard from "../components/GlassCard";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import {
  GraduationCap,
  TrendingUp,
  BarChart3,
  Briefcase,
  Layers,
  Cpu,
  FileText,
  Mail,
  ArrowRight
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const stats = [
    { value: "4", label: "AI Models" },
    { value: "6", label: "Working APIs" },
    { value: "95%", label: "Prediction Accuracy" },
    { value: "24/7", label: "AI Assistant" }
  ];

  const workflow = [
    { icon: <Layers size={22} />, label: "Input" },
    { icon: <Cpu size={22} />, label: "ML Models" },
    { icon: <Cpu size={22} className="glow-icon" />, label: "Gemini AI" },
    { icon: <BarChart3 size={22} />, label: "Dashboard" },
    { icon: <FileText size={22} />, label: "PDF Reports" },
    { icon: <Mail size={22} />, label: "Email Alert" }
  ];

  return (
    <div className="page home-page">
      
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <div className="container">
        <Navbar />

        
        <section className="hero">
          <div className="hero-badge">
            <span className="badge-shine">✨</span> EduVision AI Platform
          </div>

          
          <h1 className="hero-title">
            EDUVISION
            <br />
            <span className="hero-gradient">
              AI-Powered Student Performance Prediction & Career Guidance System
            </span>
          </h1>

          <p className="hero-subtitle">
            Predict academic performance, analyze student progress, receive AI-powered career recommendations, generate professional PDF reports, and email results—all from one intelligent platform.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/academic-analysis")}
            >
              Start Analysis <ArrowRight size={16}/>
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/career-advisor")}
            >
              Learn More
            </button>
          </div>
        </section>

        
        <section className="hero-cards-section">
          <div className="hero-cards-grid">
            <GlassCard className="premium-hover-card">
              <div className="card-emoji">🎯</div>
              <h3>Career Prediction</h3>
              <p>Tailored computational mapping to long-term career vectors.</p>
            </GlassCard>
            <GlassCard className="premium-hover-card">
              <div className="card-emoji">📊</div>
              <h3>Performance Analysis</h3>
              <p>Deep analytical breakdown of academic historical datasets.</p>
            </GlassCard>
            <GlassCard className="premium-hover-card">
              <div className="card-emoji">🤖</div>
              <h3>Gemini AI</h3>
              <p>Agentic pipeline execution parsing unstructured progress inputs.</p>
            </GlassCard>
            <GlassCard className="premium-hover-card">
              <div className="card-emoji">📄</div>
              <h3>PDF Reports</h3>
              <p>Automated deployment of enterprise-ready performance documentation.</p>
            </GlassCard>
          </div>
        </section>

      
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <h2 className="stat-number">{stat.value}</h2>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="workflow-section">
          <h2 className="section-heading">Operational Pipeline Flow</h2>
          <div className="workflow-container">
            {workflow.map((step, idx) => (
              <div key={idx} className="workflow-step-wrapper">
                <div className="workflow-step">
                  <div className="step-icon">{step.icon}</div>
                  <span>{step.label}</span>
                </div>
                {idx < workflow.length - 1 && (
                  <div className="workflow-connector">
                    <ArrowRight className="arrow-connector" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        
        <section className="features">
          <h2 className="section-heading">System Core Modalities</h2>
          <div className="feature-grid">
            <div className="feature-card gradient-border">
              <div className="feature-icon"><GraduationCap size={24} /></div>
              <h3 className="feature-title">Academic Potential</h3>
              <p className="feature-description">Predict future academic performance using tailored AI regression setups.</p>
            </div>

            <div className="feature-card gradient-border">
              <div className="feature-icon"><TrendingUp size={24} /></div>
              <h3 className="feature-title">Progress Tracking</h3>
              <p className="feature-description">Monitor mathematical growth metrics and programmatic improvements over semesters.</p>
            </div>

            <div className="feature-card gradient-border">
              <div className="feature-icon"><BarChart3 size={24} /></div>
              <h3 className="feature-title">Performance Evaluation</h3>
              <p className="feature-description">Evaluate, weigh, and classify complex multiclass student datasets efficiently.</p>
            </div>

            <div className="feature-card gradient-border">
              <div className="feature-icon"><Briefcase size={24} /></div>
              <h3 className="feature-title">Career Planning</h3>
              <p className="feature-description">Discover curated neural recommendations tuned to active hiring markets.</p>
            </div>
          </div>
        </section>

        
        <footer className="premium-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h2>EduVision</h2>
              <p>
                Next-Generation AI Powered Academic Intelligence Platform
                for Student Performance Prediction and Career Recommendation.
              </p>
              <div className="footer-social">
                <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                  <FaGithub size={18} /> GitHub
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
                  <FaLinkedin size={18} /> LinkedIn
                </a>
                <a href="mailto:your@email.com">
                  <Mail size={18} /> Email
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h3>Quick Links</h3>
              <Link to="/">Home</Link>
              <Link to="/academic-analysis">Academic Analysis</Link>
              <Link to="/career-advisor">Career Advisor</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>

            <div className="footer-tech">
              <h3>Built With</h3>
              <span>React.js</span>
              <span>Django REST</span>
              <span>Gemini AI</span>
              <span>Machine Learning</span>
              <span>MySQL</span>
              <span>Python</span>
            </div>

            <div className="footer-project">
              <h3>Project</h3>
              <a href="https://github.com/CodemeMax3/EduVision-AI-Student-Performance-and-Career-Recommendation-System" target="_blank" rel="noreferrer">
                GitHub Repository
              </a>
              <div className="version-container">
                <span>Version</span>
                <span className="version-tag">v2.1.0 Stable</span>
              </div>
              <p>
                AI Student Performance Prediction & Career Recommendation System
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © 2026 EduVision Systems
              <span>|</span>
              Designed & Developed by Sobin Sinu
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
