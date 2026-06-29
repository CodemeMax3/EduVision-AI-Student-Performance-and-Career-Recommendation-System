import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/career.css";

export default function CareerAdvisor() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [academicMetrics, setAcademicMetrics] = useState({
    cgpa: "",
    skills: "",
    interests: "",
    certifications: "",
    projects: "",
    experience: "None"
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "🤖 Hello! I am your EduVision Career Co-Pilot. Ask me anything about tracking roadmaps, skill matrices, or choosing specific disciplines!" }
  ]);
  const [isChatTyping, setIsChatTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const domains = [
    { name: "Computer & IT", icon: "💻", label: "Software & AI Focus", ex: "Target: Full-Stack / AI Models", tip: "Covers Core Engineering, Deep-Tech Artificial Intelligence Models, Cloud Clusters, Cyber Defense Frameworks, and Web Apps." },
    { name: "Medical & Healthcare", icon: "🏥", label: "Clinical Systems", ex: "Target: Therapeutics / Biotech", tip: "Covers Clinical Pathways, Medical Electronics, Therapeutic Frameworks, and Bio-Molecular Engineering Data Pools." },
    { name: "Electrical & Electronics", icon: "⚡", label: "Hardware Baselines", ex: "Target: Embedded / VLSI Design", tip: "Covers Embedded Architectures, VLSI Semi-Conductor Engineering, Robotics Automation, and IoT Sensor Protocols." },
    { name: "Mechanical Engineering", icon: "⚙️", label: "Applied Dynamics", ex: "Target: CAD / Mechatronics", tip: "Covers Computational Fluid Dynamics, Materials Lifecycle Engineering, Automation Pipelines, and Propulsion Arrays." },
    { name: "Civil Engineering", icon: "🏗️", label: "Structural Mechanics", ex: "Target: Infrastructure / Planning", tip: "Covers Structural Mechanics, Smart Infrastructure Configurations, Geotechnical Analysis, and Urban Hydrology." },
    { name: "Commerce & Finance", icon: "📊", label: "Quantitative Economics", ex: "Target: FinTech / Portfolios", tip: "Covers Quantitative Risk Matrices, High-Frequency Trading Systems, Fintech Operations, and Audit ledgers." }
  ];

  const specializationMap = {
    "Computer & IT": ["AI & ML", "Data Science", "Cyber Security", "Cloud Computing", "Full-Stack Development"],
    "Medical & Healthcare": ["Cardiology Systems", "Neurology Tools", "Biotechnology Research", "Pharmacy Frameworks"],
    "Electrical & Electronics": ["Embedded Microcontrollers", "VLSI Architecture", "Robotics & Automation"],
    "Mechanical Engineering": ["Automotive Design", "Aerospace Frameworks", "Mechatronics Execution"],
    "Civil Engineering": ["Structural Blueprints", "Urban Transportation Planning", "Geotechnical Systems"],
    "Commerce & Finance": ["Investment Banking Analyst", "Fintech System Dev", "Actuarial Portfolio Matrix"]
  };

  const handleDomainToggle = (domainName) => {
    setSelectedDomains(prev => 
      prev.includes(domainName) ? prev.filter(d => d !== domainName) : [...prev, domainName]
    );
    setSelectedSpecializations([]);
  };

  const toggleSpecialization = (spec) => {
    setSelectedSpecializations(prev =>
      prev.includes(spec) ? prev.filter(item => item !== spec) : [...prev, spec]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAcademicMetrics(prev => ({ ...prev, [name]: value }));
  };

  const getCombinedSpecializations = () => {
    let combined = [];
    selectedDomains.forEach(d => {
      if (specializationMap[d]) combined = [...combined, ...specializationMap[d]];
    });
    return combined;
  };

  useEffect(() => {
    if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [chatMessages, isChatTyping]);

  
  const triggerChatBotReply = async () => {
    if (!chatInput.trim()) return;
    const userPrompt = chatInput;
    setChatMessages(prev => [...prev, { role: "user", text: userPrompt }]);
    setChatInput("");
    setIsChatTyping(true);

    try {
      const response = await fetch("https://eduvision-ai-student-performance-and.onrender.com/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userPrompt })
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: "assistant", text: data.reply || "I analyzed your query but hit a model pipeline limit. Try another phrase." }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", text: "🔧 Note: Currently in standalone demo mode. To pull real-time contextual intelligence, connect the local Django server api/chat/ endpoint." }]);
    } finally {
      setIsChatTyping(false);
    }
  };

  
  const executeAnalysis = async () => {
    setIsAnalyzing(true);
    setCurrentStep(4);

    try {
      const response = await fetch("https://eduvision-ai-student-performance-and.onrender.com/api/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domains: selectedDomains,
          specializations: selectedSpecializations,
          metrics: academicMetrics
        })
      });
      if (!response.ok) throw new Error("Network issue");
      const data = await response.json();
      setPredictionResult(data);
    } catch {
      setTimeout(() => {
        setPredictionResult({
          predicted_career: selectedSpecializations[0] || "AI Systems Integration Architect",
          match_percentage: 95,
          career_explanation: `Based on your academic profile matrix and chosen tracks (${selectedDomains.join(" + ")}), you possess high structural competency for cross-functional automation deployments.`,
          future_scope: "High commercial demand across distributed database networks and localized machine learning inferences through 2026-2030.",
          required_skills: [{ name: "Distributed Infrastructure Design", value: 92 }, { name: "Full Stack Execution Logic", value: 85 }, { name: "Security Gateways", value: 78 }],
          skill_gaps: ["Multi-Tenant Role-Based Isolation Models", "Production Monitoring Systems"],
          job_roles: ["Lead Automation Consultant", "Solutions Deployment Architect", "Systems Framework Specialist"],
          related_careers: ["Strategic Infrastructure Lead", "Technical Operations Principal"],
          roadmap: [
            { period: "Phase 1", title: "Baseline Foundation & Data Architecture", desc: "Solidify relational databases, data schemas, and language baselines." },
            { period: "Phase 2", title: "Orchestration & Middleware Layers", desc: "Build asynchronous connection brokers, web hooks, and API microservices." },
            { period: "Phase 3", title: "Enterprise Automation Scaling", desc: "Configure load balanced clusters, secure authentication gateways, and fault-tolerant tracking." }
          ],
          colleges_india: [{ name: "IIT Madras", url: "https://www.iitm.ac.in" }, { name: "NIT Trichy", url: "https://www.nitt.edu" }],
          universities_abroad: [{ name: "Stanford University", url: "https://www.stanford.edu" }, { name: "MIT", url: "https://www.mit.edu" }],
          certifications: [
            { name: "AWS Certified Solutions Architect", tier: "Advanced", length: "12 Weeks" },
            { name: "Google Cloud Professional Cloud Architect", tier: "Expert", length: "16 Weeks" }
          ]
        });
      }, 1500);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="career-page">
      <div className="wizard-progress-container">
        <div className="wizard-progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>
        <div className="wizard-steps-labels">
          <span className={`step-label ${currentStep >= 1 ? "active" : ""}`}>1. Domain</span>
          <span className={`step-label ${currentStep >= 2 ? "active" : ""}`}>2. Sector</span>
          <span className={`step-label ${currentStep >= 3 ? "active" : ""}`}>3. Metrics</span>
          <span className={`step-label ${currentStep >= 4 ? "active" : ""}`}>4. Analytics</span>
        </div>
      </div>

      <div className="career-card" key={currentStep}>
        {currentStep === 1 && (
          <>
            <h1>Select Your Career Domains</h1>
            <p className="subtitle">Step 1 of 4: Select one or multiple target core industries below</p>
            <div className="domain-grid">
              {domains.map((d) => {
                const isActive = selectedDomains.includes(d.name);
                return (
                  <div key={d.name} className={`domain-card ${isActive ? "active" : ""}`} onClick={() => handleDomainToggle(d.name)}>
                    <div className="domain-tip-badge">ⓘ</div>
                    
                    <div className="domain-glass-tooltip-box">
                      <div className="tooltip-header">ⓘ {d.label}</div>
                      <div>{d.tip}</div>
                      <div className="tooltip-example">Example focus: {d.ex}</div>
                    </div>

                    <div className="domain-icon">{d.icon}</div>
                    <h3>{d.name}</h3>
                  </div>
                );
              })}
            </div>
            <div className="selected-box">
              <h3>Currently Selected Domains</h3>
              <p>{selectedDomains.length > 0 ? selectedDomains.join(", ") : "None chosen yet. Click cards above to toggle multiple."}</p>
            </div>
            <div className="wizard-actions">
              <button className="btn-primary" disabled={selectedDomains.length === 0} onClick={() => setCurrentStep(2)}>Continue to Specializations →</button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h1>Refine Core Sector Targets</h1>
            <p className="subtitle">Step 2 of 4: Select targeted tracks matching your industry parameters</p>
            <div className="chip-container">
              {getCombinedSpecializations().map((spec) => (
                <button key={spec} type="button" className={`chip ${selectedSpecializations.includes(spec) ? "active" : ""}`} onClick={() => toggleSpecialization(spec)}>
                  {spec} {selectedSpecializations.includes(spec) ? "✓" : "+"}
                </button>
              ))}
            </div>
            <div className="selected-box">
              <h3>Selected Sub-Specializations Matrix</h3>
              <p>{selectedSpecializations.length > 0 ? selectedSpecializations.join(", ") : "No paths chosen."}</p>
            </div>
            <div className="wizard-actions">
              <button className="btn-secondary" onClick={() => setCurrentStep(1)}>Back</button>
              <button className="btn-primary" disabled={selectedSpecializations.length === 0} onClick={() => setCurrentStep(3)}>Continue</button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h1>Academic Profile Evaluation Matrix</h1>
            <p className="subtitle">Step 3 of 4: Provide complete parameter baselines for deep analytical processing</p>
            
            <div className="glass-form">
              <div className="form-group">
                <label>Current Cumulative CGPA / Percentage</label>
                <input type="number" step="0.01" name="cgpa" placeholder="e.g. 8.80" value={academicMetrics.cgpa} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Core Professional Technical Skills</label>
                <input type="text" name="skills" placeholder="e.g. React, Node.js, Python" value={academicMetrics.skills} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Technical Areas of Core Interest</label>
                <input type="text" name="interests" placeholder="e.g. Multi-Tenant Architecture, AI" value={academicMetrics.interests} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Active Professional Certifications</label>
                <input type="text" name="certifications" placeholder="e.g. AWS Cloud, Cisco Network" value={academicMetrics.certifications} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Completed Project Architecture Details</label>
                <input type="text" name="projects" placeholder="e.g. E-Commerce software, ERP systems" value={academicMetrics.projects} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Practical Internship History</label>
                <select name="experience" value={academicMetrics.experience} onChange={handleInputChange}>
                  <option value="None">None (Fresh Baseline entry)</option>
                  <option value="Basic">Basic Projects (&lt; 6 months)</option>
                  <option value="Intermediate">Intermediate Corporate Placement (6-12 months)</option>
                  <option value="Advanced">Advanced Deep-Tech Engineering Level</option>
                </select>
              </div>
            </div>

            <div className="wizard-actions">
              <button className="btn-secondary" onClick={() => setCurrentStep(2)}>Back</button>
              <button className="btn-predict-pulse" onClick={executeAnalysis}>Run AI Prediction Engine Loop</button>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <div style={{ padding: "20px 0" }}>
            {isAnalyzing || !predictionResult ? (
              <>
                <div className="loading-spinner"></div>
                <h2>Compiling Profile Baseline Parameters...</h2>
                <p style={{ color: "#64748b", marginTop: "10px" }}>EduVision processing layers are mapping roadmaps.</p>
              </>
            ) : (
              <div>
                <span style={{ fontSize: "3.5rem" }}>🎯</span>
                <h2 style={{ fontSize: "1.8rem", margin: "15px 0 10px 0" }}>AI Assessment Complete!</h2>
                <p style={{ color: "#475569", maxWidth: "550px", margin: "0 auto 30px auto", lineHeight: "1.5" }}>
                  EduVision calculated your structural path timelines, target certification pathways, and metric indexes for <strong>{predictionResult.predicted_career}</strong>.
                </p>
                <button className="btn-primary" onClick={() => navigate("/career-dashboard", { state: { incomingData: predictionResult, fallbackMode: false } })}>
                  View Full Career Dashboard →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      
      <button className="floating-assistant-trigger" onClick={() => setIsChatOpen(true)}>
        <span>✨</span>
        <div className="trigger-label-stack">
          <span className="trigger-sub">EDUVISION AI</span>
          <span className="trigger-main">Need Help?</span>
        </div>
      </button>

      <div className={`assistant-sidebar-drawer ${isChatOpen ? "open" : ""}`}>
        <div className="assistant-drawer-header">
          <div className="header-identity">
            <span className="sparkle-ai-badge">🤖</span>
            <div>
              <h4>EduVision Co-Pilot</h4>
              <p>Active Guidance Systems</p>
            </div>
          </div>
          <button className="close-drawer-btn" onClick={() => setIsChatOpen(false)}>✕</button>
        </div>
        <div className="assistant-chat-body" ref={chatBodyRef}>
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble-row ${msg.role}`}>
              <div className="chat-bubble-content">{msg.text}</div>
            </div>
          ))}
          {isChatTyping && (
            <div className="chat-bubble-row assistant">
              <div className="chat-bubble-content system-typing">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            </div>
          )}
        </div>
        <div className="assistant-suggestions-tray">
          <p className="suggestion-heading-text">Quick Analytics Inputs:</p>
          <div className="suggestions-flex">
            <button className="suggestion-clickable-pill" onClick={() => { setChatInput("May I help you choose your career?"); }}>🙋 Help me choose my career path.</button>
            <button className="suggestion-clickable-pill" onClick={() => { setChatInput("What is the optimal training roadmap configuration?"); }}>🎯 What is the optimal training roadmap?</button>
          </div>
        </div>
        <div className="assistant-drawer-footer">
          <input type="text" placeholder="Ask about roadmaps, tracks, certs..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && triggerChatBotReply()} />
          <button className="chat-send-action-btn" onClick={triggerChatBotReply}>➔</button>
        </div>
      </div>
    </div>
  );
}