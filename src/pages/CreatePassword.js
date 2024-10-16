import React, { useState, useEffect } from "react";
import gata from "../videos/gata.MOV";
import logo2 from "../images/logo2.png";
import "./CreatePassword.css"; // Ensure this CSS file contains the styles you've provided
import { useNavigate } from "react-router-dom";

const ProgressRecorder = () => {
  const steps = [
    { id: 1, title: "Staff Personal Info", isActive: false },
    { id: 2, title: "Staff Job Info", isActive: false },
    { id: 3, title: "Create Password", isActive: true },
    { id: 4, title: "Congratulations", isActive: false },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0px",
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

const CreatePassword = () => {
  const navigate = useNavigate();

  // Initialize formData with data from localStorage or set default values
  const [formData, setFormData] = useState({
    staffId: localStorage.getItem("staffId") || "",
    createPassword: "",
    retypePassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  // Effect to monitor changes in localStorage for 'staffId'
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedStaffId = localStorage.getItem("staffId") || "";
      if (!updatedStaffId) {
        alert("Staff ID is not available. Please log in again.");
        navigate("/login"); // Redirect to login if Staff ID is missing
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        staffId: updatedStaffId,
      }));
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange(); // Also check storage immediately in case of page refresh

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  // Handle changes in input fields and update state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Toggle visibility of password input fields
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.createPassword || !formData.retypePassword) {
      alert("All password fields must be filled out.");
      return;
    }

    if (formData.createPassword !== formData.retypePassword) {
      alert("Passwords do not match.");
      return;
    }

    const staffId = parseInt(formData.staffId, 10);
    if (isNaN(staffId)) {
      alert("Invalid Staff ID.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/createpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffId,
          createPassword: formData.createPassword,
          retypePassword: formData.retypePassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      // Reset the form data to initial state after successful submission
      setFormData({
        staffId: "", // Consider if you really want to clear the staffId here
        createPassword: "",
        retypePassword: "",
      });

      // Navigate to the congratulations page
      navigate("/congratulations");
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to create password: ${error.message}`);
    }
  };

  return (
    <div className="primary-layout">
      <div className="registration-container">
        <div className="video-container">
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
        <div className="registration-details">
          <div className="logo-area">
            <img src={logo2} alt="Logo" />
          </div>
          <div className="account-creation-section">
            <p className="main-title">Password</p>
            <form onSubmit={handleSubmit}>
              <div className="input-section">
                <div className="input-row-style">
                  <div className="input-wrapper">
                    <label htmlFor="staffId">Staff ID</label>
                    <input
                      type="text"
                      id="staffId"
                      name="staffId"
                      value={formData.staffId}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
                <div className="input-row-style">
                  <div className="input-wrapper">
                    <label htmlFor="createPassword">Create Password</label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="createPassword"
                      name="createPassword"
                      value={formData.createPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-row-style">
                  <div className="input-wrapper">
                    <label htmlFor="retypePassword">Retype Password</label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="retypePassword"
                      name="retypePassword"
                      value={formData.retypePassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  className="show-button"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "Hide" : "Show"} Password
                </button>
              </div>
              <p>
                <button type="submit" className="submit-action">
                  Submit
                </button>
              </p>
            </form>
            {/* Progress Recorder Component */}
            <ProgressRecorder />
            <p className="support-text">
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

export default CreatePassword;
