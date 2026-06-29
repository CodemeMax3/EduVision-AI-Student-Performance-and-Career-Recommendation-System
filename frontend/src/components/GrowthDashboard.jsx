import GlassCard from "./GlassCard";

function GrowthDashboard({
  earlyScore,
  currentScore
}) {

  const improvement =
    (
      currentScore - earlyScore
    ).toFixed(2);

  const isImproving =
    improvement >= 0;

  return (

    <GlassCard
      className="growth-dashboard"
    >

      <h2>
        Academic Growth Report
      </h2>

      <div className="growth-grid">

        <div className="growth-card">

          <h3>
            Early Prediction
          </h3>

          <div className="score-value">

            {earlyScore}

          </div>

        </div>

        <div className="growth-card">

          <h3>
            Current Progress
          </h3>

          <div className="score-value">

            {currentScore}

          </div>

        </div>

      </div>

      <div className="growth-bars">

        <div className="bar-section">

          <p>
            Early Score
          </p>

          <div className="bar-container">

            <div
              className="bar-fill"
              style={{
                width: `${earlyScore}%`
              }}
            ></div>

          </div>

        </div>

        <div className="bar-section">

          <p>
            Current Score
          </p>

          <div className="bar-container">

            <div
              className="bar-fill progress"
              style={{
                width:
                `${currentScore}%`
              }}
            ></div>

          </div>

        </div>

      </div>

      <div className="improvement-section">

        <h3>

          {isImproving
            ? "⬆ Improving"
            : "⬇ Declining"}

        </h3>

        <p>

          {improvement > 0
            ? "+"
            : ""}

          {improvement}

          Points

        </p>

      </div>

    </GlassCard>

  );
}

export default GrowthDashboard;