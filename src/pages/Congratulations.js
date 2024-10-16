import React from "react";
import gata from "../videos/gata.MOV";
import logo2 from "../images/logo2.png";
import "./Congratulations.css"; // Ensure this CSS file contains the styles you've provided
import { useNavigate } from "react-router-dom";

const ProgressRecorder = () => {
  const steps = [
    { id: 1, title: "Staff Personal Info", isActive: false },
    { id: 2, title: "Staff Job Info", isActive: false },
    { id: 3, title: "Create Password", isActive: false },
    { id: 4, title: "Congratulations", isActive: true },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
        marginLeft: "-40px",
        flexWrap: "wrap",
      }}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: index < steps.length - 1 ? "20px" : "0",
            }}
          >
            <div
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                backgroundColor: step.isActive ? "black" : "blue",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              {step.id}
            </div>
            <div
              style={{
                marginTop: "5px",
                color: step.isActive ? "black" : "blue",
                fontSize: "12px",
              }}
            >
              {step.title}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                width: "50px",
                height: "2px",
                backgroundColor: "blue",
                alignSelf: "center",
              }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Congratulations = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="base-structure">
      <div className="signup-framework">
        <div className="media-playback-area">
          <video
            className="gata"
            autoPlay
            muted
            loop
            playsInline
            style={{ pointerEvents: "none" }} // Prevent interaction
          >
            <source src={gata} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="enrollment-information">
          <div className="branding-section">
            <img src={logo2} alt="Logo" />
          </div>
          <div className="user-registration-panel">
            <p className="headline">CONGRATULATIONS</p>

            <p>
              <button
                type="submit"
                className="action-confirm"
                onClick={navigateToLogin}
              >
                Continue
              </button>
            </p>

            {/* Progress Recorder Component */}
            <ProgressRecorder />
            <p className="helper-text">
              Fill in the Data Today so we can better
              <br />
              assist you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
