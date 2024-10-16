import React, { useState } from "react";
import gata from "../videos/gata.MOV";
import logo2 from "../images/logo2.png";
import "./ForgotPassword.css"; // Ensure this CSS file contains the styles you've provided
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Adjust state to reflect backend schema
  const [formData, setFormData] = useState({
    staffId: "",
    createPassword: "", // Renamed from createNewPassword
    retypePassword: "", // Renamed from retypeNewPassword
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.staffId ||
      !formData.createPassword ||
      !formData.retypePassword
    ) {
      alert("All fields must be filled out");
      return;
    }

    if (formData.createPassword !== formData.retypePassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/createpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffId: parseInt(formData.staffId, 10), // Ensure staffId is sent as a number
          createPassword: formData.createPassword,
          retypePassword: formData.retypePassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response JSON to ensure it was successful
      const data = await response.json();
      console.log("Success:", data);

      // Reset the form data to initial state after successful submission
      setFormData({
        staffId: "",
        createPassword: "",
        retypePassword: "",
      });

      // Navigate to the login page
      navigate("/login"); // Ensure you have this route configured
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Layout">
      <div className="Layout__Enrollment">
        <div className="Layout__Enrollment__Video">
          <video
            className="Layout__Enrollment__Video__Static"
            autoPlay
            muted
            loop
            playsInline
            style={{ pointerEvents: "none" }} // Prevents interaction with the video
          >
            <source src={gata} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="Layout__Enrollment__Form">
          <div className="Layout__Enrollment__Form__Logo">
            <img src={logo2} alt="Logo" />
          </div>
          <div className="Layout__Enrollment__Form__ResetPassword">
            <p className="Layout__Enrollment__Form__ResetPassword__Title">
              Forgot Password?
            </p>
            <form onSubmit={handleSubmit}>
              <div className="Layout__Enrollment__Form__ResetPassword__InputArea">
                <div className="Layout__Enrollment__Form__ResetPassword__InputArea__Row">
                  <div className="Layout__Enrollment__Form__ResetPassword__InputArea__Row__Cell">
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
                <div className="Layout__Enrollment__Form__ResetPassword__InputArea__Row">
                  <div className="Layout__Enrollment__Form__ResetPassword__InputArea__Row__Cell">
                    <label htmlFor="createNewPassword">New Password</label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="createPassword"
                      name="createPassword"
                      value={formData.createPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="Layout__Enrollment__Form__ResetPassword__InputArea__Row">
                  <div className="Layout__Enrollment__Form__ResetPassword__InputArea__Row__Cell">
                    <label htmlFor="retypeNewPassword">
                      Confirm New Password
                    </label>
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
                  className="Layout__Enrollment__Form__ResetPassword__Toggle"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "Conceal" : "Reveal"} Password
                </button>
              </div>
              <p>
                <button
                  type="submit"
                  className="Layout__Enrollment__Form__ResetPassword__Validate"
                >
                  Confirm
                </button>
              </p>
            </form>
            <p className="Layout__Enrollment__Form__ResetPassword__Help">
              Complete the fields to enhance our
              <br />
              assistance for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
