import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import GlassCard from "../components/GlassCard";

import {
  GraduationCap,
  TrendingUp
} from "lucide-react";

import "../styles/academicAnalysis.css";

function AcademicAnalysis() {

  const navigate = useNavigate();

  return (

    <div className="page">

      <div className="container">

        <Navbar />

        <GlassCard
          className="analysis-hero"
        >

          <h1>

            Academic Analysis

          </h1>

          <p>

            Analyze academic performance,
            track progress and understand
            student growth using AI.

          </p>

        </GlassCard>

        <div
          className="analysis-options"
        >

          

          <GlassCard
            className="analysis-option-card"
          >

            <div
              className="option-icon"
            >

              <GraduationCap
                size={40}
              />

            </div>

            <h2>

              Early Prediction

            </h2>

            <p>

              Predict future academic
              performance using
              educational, family and
              lifestyle factors.

            </p>

            <button

              className="primary-btn"

              onClick={() =>
                navigate(
                  "/early-prediction"
                )
              }

            >

              Start Prediction

            </button>

          </GlassCard>

          

          <GlassCard
            className="analysis-option-card"
          >

            <div
              className="option-icon"
            >

              <TrendingUp
                size={40}
              />

            </div>

            <h2>

              Academic Progress

            </h2>

            <p>

              Compare earlier
              prediction with
              current performance
              and track growth.

            </p>

            <button

              className="primary-btn"

              onClick={() =>
                navigate(
                  "/academic-progress"
                )
              }

            >

              Track Progress

            </button>

          </GlassCard>

        </div>

      </div>

    </div>

  );

}

export default AcademicAnalysis;