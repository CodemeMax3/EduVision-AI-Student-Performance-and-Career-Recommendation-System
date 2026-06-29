import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import GlassCard from "../components/GlassCard";
import GrowthDashboard from "../components/GrowthDashboard";
import "../styles/academicProgress.css";

function AcademicProgress() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const [storedData, setStoredData] = useState(null);
  const [earlyScore, setEarlyScore] = useState(null);

  const [g1, setG1] = useState("");
  const [g2, setG2] = useState("");

  const [loading, setLoading] = useState(false);
  const [progressScore, setProgressScore] = useState(null);
  const [performanceCategory, setPerformanceCategory] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("studentFormData");
    const score = localStorage.getItem("earlyPredictionScore");

    if (data) {
      setStoredData(JSON.parse(data));
    }

    if (score) {
      setEarlyScore(Number(score));
    }
  }, []);

  const handleProgressPrediction = async () => {
    try {
      setLoading(true);

      const payload = {
        ...storedData,
        G1: Number(g1),
        G2: Number(g2),
      };

      const progressResponse = await axios.post(
    "https://eduvision-ai-student-performance-and.onrender.com/api/academic-progress/",
    payload
);

      const categoryResponse = await axios.post(
    "https://eduvision-ai-student-performance-and.onrender.com/api/performance-category/",
    payload
);

      setProgressScore(
        progressResponse.data.predicted_final_score
      );

      setPerformanceCategory(
        categoryResponse.data.performance_category
      );

      localStorage.setItem(
        "progressScore",
        progressResponse.data.predicted_final_score
      );

    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <Navbar />

        <GlassCard className="progress-card">
          <h1>Academic Progress</h1>
          <p>
            Track improvement using previous prediction and current academic marks.
          </p>
        </GlassCard>

        {!userType && (
          <div className="progress-options">
            <GlassCard className="option-card">

    <div className="option-icon">
        👤
    </div>

    <h2>Existing User</h2>

    <p>
        Reuse previous prediction data.
    </p>

    <button className="primary-btn" onClick={() => setUserType("existing")}>
        Continue
    </button>

</GlassCard>

            <GlassCard className="option-card">

    <div className="option-icon">
        ✨
    </div>

    <h2>New User</h2>

    <p>
        Start fresh with new data.
    </p>

    <button
    className="primary-btn"
    onClick={() => setUserType("new")}
>
    Start Fresh
</button>

</GlassCard>
          </div>
        )}

        {userType === "existing" && (
          <GlassCard className="existing-user-card">
            <h2>Academic Progress Analysis</h2>
            <p>Predicted Academic Score</p>

            <div className="score-display">{earlyScore}</div>

            <div className="g-inputs">
              <input
                type="number"
                placeholder="Mid-Term Marks"
                value={g1}
                onChange={(e) => setG1(e.target.value)}
              />
              <input
                type="number"
                placeholder="Pre-Final Marks"
                value={g2}
                onChange={(e) => setG2(e.target.value)}
              />
            </div>

            <button className="primary-btn" onClick={handleProgressPrediction}>
              {loading ? "Predicting..." : "Predict Progress"}
            </button>
          </GlassCard>
        )}

        {userType === "new" && (
          <GlassCard className="existing-user-card">
            <h2>New User</h2>
            <p>
              Academic Progress Analysis requires an Early Prediction score first.
            </p>
            <p style={{ opacity: 0.8, marginTop: "10px" }}>
              Please complete the Early Prediction module before continuing.
            </p>
            <button
              className="primary-btn"
              onClick={() => navigate("/early-prediction")}
            >
              Go To Early Prediction
            </button>
          </GlassCard>
        )}

        {progressScore && (
          <>
            <GrowthDashboard
              earlyScore={earlyScore}
              currentScore={progressScore}
            />

            <GlassCard className="progress-result">
              <h2>Academic Progress Report</h2>
              <p>Current Score</p>
              <div className="score-display">{progressScore}</div>

              <h3 style={{ marginTop: "20px" }}>
                Performance Category
              </h3>

              <div className="score-display">
                {performanceCategory}
              </div>

              <h3>
                {progressScore > earlyScore
                  ? "Improving 📈"
                  : progressScore < earlyScore
                  ? "Declining 📉"
                  : "Stable ➖"}
              </h3>

              <button
                className="primary-btn"
                onClick={() => navigate("/career-advisor")}
              >
                Continue To Career Advisor
              </button>
            </GlassCard>
          </>
        )}
      </div>
    </div>
  );
}

export default AcademicProgress;