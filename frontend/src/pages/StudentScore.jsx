import { useState } from "react";
import Navbar from "../components/Navbar";
import GlassCard from "../components/GlassCard";
import "../styles/studentScore.css";

function StudentScore() {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({

    school: "",
    sex: "",
    age: "",
    address: "",
    famsize: "",
    Pstatus: "",
    guardian: "",

    Medu: "",
    Fedu: "",
    Mjob: "",
    Fjob: "",
    schoolsup: "",
    famsup: "",

    traveltime: "",
    studytime: "",
    failures: "",
    reason: "",
    higher: "",
    internet: "",
    paid: "",

    activities: "",
    nursery: "",
    romantic: "",
    famrel: "",
    freetime: "",
    goout: "",
    Dalc: "",
    Walc: "",
    health: "",
    absences: ""
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };

  const nextStep = () => {

    if(step < 4){
      setStep(step + 1);
    }

  };

  const prevStep = () => {

    if(step > 1){
      setStep(step - 1);
    }

  };

  return (

    <div className="page">

      <div className="container">

        <Navbar />

        <GlassCard className="student-form-card">

          <div className="step-header">

            <h1>
              Student Score Prediction
            </h1>

            <div className="progress-container">

              <div
                className="progress-bar"
                style={{
                  width: `${step * 25}%`
                }}
              ></div>

            </div>

            <p>

              Step {step} of 4

            </p>

          </div>

          

          {step === 1 && (

            <div className="form-grid">

              <input
                name="school"
                placeholder="School"
                onChange={handleChange}
              />

              <input
                name="sex"
                placeholder="Gender"
                onChange={handleChange}
              />

              <input
                name="age"
                placeholder="Age"
                onChange={handleChange}
              />

              <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />

              <input
                name="famsize"
                placeholder="Family Size"
                onChange={handleChange}
              />

              <input
                name="Pstatus"
                placeholder="Parent Status"
                onChange={handleChange}
              />

              <input
                name="guardian"
                placeholder="Guardian"
                onChange={handleChange}
              />

            </div>

          )}

          

          {step === 2 && (

            <div className="form-grid">

              <input
                name="Medu"
                placeholder="Mother Education"
                onChange={handleChange}
              />

              <input
                name="Fedu"
                placeholder="Father Education"
                onChange={handleChange}
              />

              <input
                name="Mjob"
                placeholder="Mother Job"
                onChange={handleChange}
              />

              <input
                name="Fjob"
                placeholder="Father Job"
                onChange={handleChange}
              />

              <input
                name="schoolsup"
                placeholder="School Support"
                onChange={handleChange}
              />

              <input
                name="famsup"
                placeholder="Family Support"
                onChange={handleChange}
              />

            </div>

          )}

          

          {step === 3 && (

            <div className="form-grid">

              <input
                name="traveltime"
                placeholder="Travel Time"
                onChange={handleChange}
              />

              <input
                name="studytime"
                placeholder="Study Time"
                onChange={handleChange}
              />

              <input
                name="failures"
                placeholder="Failures"
                onChange={handleChange}
              />

              <input
                name="reason"
                placeholder="Reason"
                onChange={handleChange}
              />

              <input
                name="higher"
                placeholder="Higher Education"
                onChange={handleChange}
              />

              <input
                name="internet"
                placeholder="Internet"
                onChange={handleChange}
              />

              <input
                name="paid"
                placeholder="Paid Classes"
                onChange={handleChange}
              />

            </div>

          )}

          

          {step === 4 && (

            <div className="form-grid">

              <input
                name="activities"
                placeholder="Activities"
                onChange={handleChange}
              />

              <input
                name="nursery"
                placeholder="Nursery"
                onChange={handleChange}
              />

              <input
                name="romantic"
                placeholder="Romantic"
                onChange={handleChange}
              />

              <input
                name="famrel"
                placeholder="Family Relationship"
                onChange={handleChange}
              />

              <input
                name="freetime"
                placeholder="Free Time"
                onChange={handleChange}
              />

              <input
                name="goout"
                placeholder="Go Out"
                onChange={handleChange}
              />

              <input
                name="Dalc"
                placeholder="Daily Alcohol"
                onChange={handleChange}
              />

              <input
                name="Walc"
                placeholder="Weekend Alcohol"
                onChange={handleChange}
              />

              <input
                name="health"
                placeholder="Health"
                onChange={handleChange}
              />

              <input
                name="absences"
                placeholder="Absences"
                onChange={handleChange}
              />

            </div>

          )}

          <div className="button-group">

            {step > 1 && (

              <button
                className="secondary-btn"
                onClick={prevStep}
              >
                Previous
              </button>

            )}

            {step < 4 ? (

              <button
                className="primary-btn"
                onClick={nextStep}
              >
                Next
              </button>

            ) : (

              <button
                className="primary-btn"
              >
                Predict Score
              </button>

            )}

          </div>

        </GlassCard>

      </div>

    </div>

  );

}

export default StudentScore;