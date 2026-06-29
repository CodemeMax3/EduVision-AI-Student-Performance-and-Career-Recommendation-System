import { useState } from "react";
import Navbar from "../components/Navbar";
import GlassCard from "../components/GlassCard";
import { useNavigate } from "react-router-dom";
import { predictStudentScore } from "../services/academicAnalysisService";
import "../styles/earlyPrediction.css";

const FIELD_CONFIG = [
  {
    key: "age",
    label: "Age",
    icon: "🎂",
    type: "input",
    placeholder: "e.g. 17",
  },
  {
    key: "absences",
    label: "Absences",
    icon: "📅",
    type: "input",
    placeholder: "e.g. 2",
  },
  {
    key: "studytime",
    label: "Weekly Study Time",
    icon: "📚",
    type: "select",
    options: [
      { value: "1", label: "< 2 hours" },
      { value: "2", label: "2 – 5 hours" },
      { value: "3", label: "5 – 10 hours" },
      { value: "4", label: "> 10 hours" },
    ],
  },
  {
    key: "traveltime",
    label: "Travel to School",
    icon: "🚌",
    type: "select",
    options: [
      { value: "1", label: "< 15 min" },
      { value: "2", label: "15 – 30 min" },
      { value: "3", label: "30 – 60 min" },
      { value: "4", label: "> 1 hour" },
    ],
  },
  {
    key: "failures",
    label: "Previous Failures",
    icon: "⚠️",
    type: "select",
    options: [
      { value: "0", label: "None" },
      { value: "1", label: "Once" },
      { value: "2", label: "Twice" },
      { value: "3", label: "Three or more" },
    ],
  },
  {
    key: "health",
    label: "Health Status",
    icon: "❤️",
    type: "select",
    options: [
      { value: "1", label: "Poor" },
      { value: "2", label: "Below average" },
      { value: "3", label: "Average" },
      { value: "4", label: "Good" },
      { value: "5", label: "Excellent" },
    ],
  },
];

function ScoreRing({ score }) {
  const max = 20;
  const pct = Math.min(score / max, 1);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;

  const color =
    pct >= 0.75
      ? "#22c55e"
      : pct >= 0.5
      ? "#3b82f6"
      : pct >= 0.25
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="score-ring-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="12"
        />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
        <text x="70" y="66" textAnchor="middle" className="ring-score">
          {score}
        </text>
        <text x="70" y="84" textAnchor="middle" className="ring-label">
          out of 20
        </text>
      </svg>
    </div>
  );
}

function EarlyPrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    school: "",
    sex: "",
    age: "",
    address: "",
    famsize: "",
    Pstatus: "",
    Medu: "",
    Fedu: "",
    Mjob: "",
    Fjob: "",
    reason: "",
    guardian: "",
    traveltime: "",
    studytime: "",
    failures: "",
    schoolsup: "",
    famsup: "",
    paid: "",
    activities: "",
    nursery: "",
    higher: "",
    internet: "",
    romantic: "",
    famrel: "",
    freetime: "",
    goout: "",
    Dalc: "",
    Walc: "",
    health: "",
    absences: "",
});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await predictStudentScore(formData);
      const score = response.predicted_score;
      setResult(score);
      localStorage.setItem("studentFormData", JSON.stringify(formData));
      localStorage.setItem("earlyPredictionScore", score);
    } catch (error) {
      alert("Prediction failed. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <Navbar />

        <GlassCard className="prediction-card">
          <div className="card-header">
            <h1>Early Prediction</h1>
            <p className="card-subtitle">
              Predict future academic performance using AI.
            </p>
          </div>

          <div className="prediction-grid">
            {FIELD_CONFIG.map((field) => (
              <div className="field-group" key={field.key}>
                <label htmlFor={field.key}>
                  <span className="field-icon">{field.icon}</span>
                  {field.label}
                </label>

                {field.type === "input" ? (
                  <input
                    id={field.key}
                    name={field.key}
                    type="number"
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={handleChange}
                  />
                ) : (
                  <select
    id={field.key}
    name={field.key}
    value={formData[field.key]}
    onChange={handleChange}
>
    <option value="" disabled>
        Select {field.label}
    </option>
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <button
            className="primary-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="btn-spinner" />
                Predicting…
              </>
            ) : (
              <>✨ Predict Score</>
            )}
          </button>
        </GlassCard>

        {result !== null && (
          <GlassCard className="result-card">
            <h2 className="result-title">Predicted Score</h2>
            <ScoreRing score={result} />

            <div className="result-band">
              {result >= 15
                ? "Excellent performance expected 🎉"
                : result >= 10
                ? "Good performance expected 👍"
                : result >= 7
                ? "Needs some improvement 💪"
                : "Extra support recommended 📖"}
            </div>

            <button
              className="primary-btn"
              onClick={() => navigate("/academic-progress")}
            >
              Continue to Academic Progress →
            </button>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

export default EarlyPrediction;