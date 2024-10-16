import React, { useState } from "react";
import gata from "../videos/gata.MOV";
import logo2 from "../images/logo2.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../pages/UserDataContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserData(); // Access setUserData from your context
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    staffId: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!formData.staffId || !formData.password) {
     alert("All fields must be filled out");
     return;
   }

   try {
     const response = await fetch("/api/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(formData),
     });

     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || "Login failed");
     }

     const data = await response.json();
     setUserData(data); // Update the context with user data
     localStorage.setItem("staffId", data.staffId); // Store staffId in local storage
     navigate("/staffPage"); // Navigate after context is updated
   } catch (error) {
     console.error("Login error:", error);
     alert(error.message);
   }
 };
  
  
  // Function to navigate to StaffInfo page
  const handleNavigateToStaffInfo = () => {
    navigate("/staffinfo"); // Adjust this path as necessary
  };

  return (
    <div className="outer-wrapper">
      <div className="registration-section">
        <div className="media-section">
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
        <div className="content-area">
          <div className="branding-section">
            <img src={logo2} alt="Logo" className="logo-image" />
            {/* All other elements like .account-creation-text, form, etc. go here */}
          </div>
          <div className="account-creation-text">
            <p className="main-heading">Sign in</p>

            <form onSubmit={handleSubmit}>
              <div className="form-inputs">
                <div className="form-row">
                  <div className="input-wrapper">
                    <label htmlFor="staffId">Staff ID</label>
                    <input
                      type="number"
                      id="staffId"
                      name="staffId"
                      value={formData.staffId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button
                  className="reveal-button"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "Hide" : "Show"} Password
                </button>
              </div>
              <div className="consent-section">
                <div className="consent-wrapper">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    id="conditionAgree"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="conditionAgree" className="login-termsAgree">
                    Remember Me
                  </label>
                </div>
                <div className="login-account-exists">
                  <a href="/forgotpassword" className="emphasis">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className="submit-button-area">
                <p>
                  <button type="submit" className="form-submit-button">
                    Sign In
                  </button>
                </p>
                <p>
                  <button
                    type="button"
                    className="signup-submit-button"
                    onClick={handleNavigateToStaffInfo}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
