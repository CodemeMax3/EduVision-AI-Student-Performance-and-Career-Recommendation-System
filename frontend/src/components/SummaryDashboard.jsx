import GlassCard from "./GlassCard";

function SummaryDashboard({
  scorePrediction,
  progressPrediction,
  performanceCategory
}) {

  const improvement =
    (
      progressPrediction -
      scorePrediction
    ).toFixed(2);

  return (

    <GlassCard
      className="summary-dashboard"
    >

      <h2>
        Academic Summary
      </h2>

      <div className="summary-grid">

        <div className="summary-card">

          <h3>
            Predicted Score
          </h3>

          <div className="summary-value">

            {scorePrediction}

          </div>

        </div>

        <div className="summary-card">

          <h3>
            Academic Progress
          </h3>

          <div className="summary-value">

            {progressPrediction}

          </div>

        </div>

        <div className="summary-card">

          <h3>
            Performance Category
          </h3>

          <div className="summary-value">

            {performanceCategory}

          </div>

        </div>

        <div className="summary-card">

          <h3>
            Improvement
          </h3>

          <div className="summary-value">

            {improvement > 0 ? "+" : ""}

            {improvement}

          </div>

        </div>

      </div>

      <div className="career-section">

        <button
          className="primary-btn"
        >
          Continue To Career Advisor
        </button>

      </div>

    </GlassCard>

  );
}

export default SummaryDashboard;