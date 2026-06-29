import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/careerDashboard.css";

export default function CareerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const incomingData = location.state?.incomingData;
  const isFallbackData = !incomingData;

  const dashboardData = incomingData || {
    predicted_career: "Data Scientist",
    match_percentage: 92,
    career_explanation: "Advanced computing model processing complex enterprise analytics structures, algorithms, and training patterns.",
    future_scope: "High growth potential with extensive industry adaptation trajectories across edge compute networks and banking arrays.",
    required_skills: [{ name: "Python Systems", value: 95 }, { name: "Machine Learning models", value: 75 }, { name: "SQL Datasets", value: 80 }],
    skill_gaps: ["Production CI/CD Automation", "High-Volume Real-Time Ingestion Architecture"],
    job_roles: ["Junior Analytics Associate", "Core Model Deployment Engineer", "Data Pipeline Systems Lead"],
    related_careers: ["DevOps Engineer", "Business Intelligence Architect"],
    roadmap: [
      { period: "Year 1", title: "Master Python Core & Linear Mathematics", desc: "Build basic algorithmic logic and database connections." },
      { period: "Year 2", title: "Data Frameworks & Storage Paradigms", desc: "Advance into structural backend APIs and processing engines." },
      { period: "Year 3", title: "Complex ML Infrastructure Deployments", desc: "Optimize multi-tenant pipelines with cluster architectures." }
    ],
    colleges_india: [{ name: "IIT Madras", url: "https://www.iitm.ac.in" }],
    universities_abroad: [{ name: "Stanford University", url: "https://www.stanford.edu" }],
    certifications: [{ name: "AWS Certified Data Analytics", tier: "Advanced", length: "10 Weeks" }]
  };

  const [emailInput, setEmailInput] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle"); 

  const dispatchCareerReportEmail = async () => {
    if (!emailInput.trim()) return;
    setEmailStatus("sending");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send-career-report/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          reportData: dashboardData
        })
      });

      if (!response.ok) throw new Error("SMTP server unreachable");
      setEmailStatus("success");
    } catch {
      setEmailStatus("failed"); 
    }
  };

  return (
    <div className="dash-wrapper">
      {isFallbackData && (
        <div className="fallback-alert-banner">
          ⚠️ Notice: Currently viewing pre-rendered profile preview. Return to the Career Advisor component to track real-time parameter selections.
        </div>
      )}

      <div className="dash-header">
        <button className="btn-secondary" onClick={() => navigate("/")}>← Back to Advisor</button>
        <div className="dash-badge">Active Career Evaluation Analysis</div>
      </div>

      <div className="dash-hero-grid">
        <div className="edu-card main-profile-card">
          <div className="score-ring-badge">{dashboardData.match_percentage}% Match</div>
          <h1>{dashboardData.predicted_career}</h1>
          <p className="explanation-text">{dashboardData.career_explanation}</p>
          <p className="scope-text"><strong>Future Trajectory:</strong> {dashboardData.future_scope}</p>
        </div>

        <div className="edu-card email-dispatch-card">
          <h3>📬 Export Report Architecture</h3>
          <p>Dispatches complete structural analytics data straight to your verification inbox.</p>
          <div className="email-action-row">
            <input type="email" className="form-control" placeholder="username@academicdomain.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
            <button className="edu-btn btn-primary" onClick={dispatchCareerReportEmail} disabled={emailStatus === "sending"}>
              {emailStatus === "sending" ? "Processing..." : "Send Data"}
            </button>
          </div>
          {emailStatus === "success" && <p className="status-msg success">✅ Report Sent Successfully! Verify your inbox folders.</p>}
          {emailStatus === "failed" && <p className="status-msg error">❌ Unable to send email. Check Django app backend logs for missing App Password configurations.</p>}
        </div>
      </div>

      <div className="dash-details-layout">
        <div className="edu-card structural-timeline-card">
          <h3>🎯 Optimal Progress Timeline Roadmap</h3>
          <div className="timeline-container">
            {dashboardData.roadmap.map((node, index) => (
              <div key={index} className="timeline-node">
                <div className="node-marker">{node.period}</div>
                <div className="node-content">
                  <h4>{node.title}</h4>
                  <p>{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-sidebar-metrics">
          <div className="edu-card sub-metric-card">
            <h3>💡 Required Technical Competencies</h3>
            <div className="competency-stack">
              {dashboardData.required_skills?.map((sk, idx) => (
                <div key={idx} className="skill-progress-row">
                  <div className="skill-label-meta"><span>{sk.name}</span><span>{sk.value}%</span></div>
                  <div className="progress-track-bg"><div className="fill-bar" style={{ width: `${sk.value}%` }}></div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="edu-card sub-metric-card">
            <h3>⚠️ Core Skill Gaps Identified</h3>
            <div className="gaps-flex">
              {dashboardData.skill_gaps?.map((gap, idx) => <span key={idx} className="gap-item-pill">⚡ {gap}</span>)}
            </div>
          </div>

          <div className="edu-card sub-metric-card">
            <h3>🎓 Targeted Target Institutes</h3>
            <div className="institutes-list">
              {dashboardData.colleges_india?.map((c, i) => <a key={i} href={c.url} target="_blank" rel="noreferrer" className="inst-link">🇮🇳 {c.name} ↗</a>)}
              {dashboardData.universities_abroad?.map((c, i) => <a key={i} href={c.url} target="_blank" rel="noreferrer" className="inst-link">🌐 {c.name} ↗</a>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}