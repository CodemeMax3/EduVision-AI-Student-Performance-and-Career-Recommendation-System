import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AcademicAnalysis from "./pages/AcademicAnalysis";
import CareerAdvisor from "./pages/CareerAdvisor";
import CareerDashboard from "./pages/CareerDashboard";
import EarlyPrediction from "./pages/EarlyPrediction";
import AcademicProgress from "./pages/AcademicProgress";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/academic-analysis"
          element={<AcademicAnalysis />}
        />

        <Route
          path="/career-advisor"
          element={<CareerAdvisor />}
        />

        <Route
          path="/career-dashboard"
          element={<CareerDashboard />}
        />

        <Route
          path="/early-prediction"
          element={<EarlyPrediction />}
        />

        <Route
          path="/academic-progress"
          element={<AcademicProgress />}
        />

      </Routes>
    </Router>
  );
}

export default App;