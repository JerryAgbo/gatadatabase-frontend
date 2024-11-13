import React, { useState, useRef } from "react";
import gata from "../videos/gata.MOV";
import logo2 from "../images/logo2.png";
import "./StaffInfo.css";
import { useNavigate } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useUserData } from "../pages/UserDataContext";
import axios from "axios";

const ProgressRecorder = () => {
  const steps = [
    { id: 1, title: "Staff Personal Info", isActive: true },
    { id: 2, title: "Staff Job Info", isActive: false },
    { id: 3, title: "Create Password", isActive: false },
    { id: 4, title: "Congratulations", isActive: false },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
        marginLeft: "-100px",
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

const StaffInfo = () => {
  const { setUserData } = useUserData();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [formData, setFormData] = useState({
    staffId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPreview = URL.createObjectURL(file);
      setProfilePicPreview(newPreview);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhoneNumberChange = (value) => {
    setFormData((prevState) => ({ ...prevState, phoneNumber: value }));
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const isValidForm = () => {
    if (!formData.gender) {
      alert("Gender is required.");
      return false;
    }
    if (!isValidPhoneNumber(formData.phoneNumber)) {
      alert("Please enter a valid phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidForm()) return;
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      submissionData.append("profilePic", fileInputRef.current.files[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/staffinfo",
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Form submitted successfully:", response.data);
      localStorage.setItem("staffId", response.data.staffId);
      localStorage.setItem("profilePicUrl", profilePicPreview);
      setUserData({ ...formData, profilePicUrl: profilePicPreview });
      navigate("/staffJob");
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert(
        `Failed to submit form, please try again later. Error: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="parent-container">
      <div className="signup-page-container">
        <div className="video-container">
          <video className="gata" autoPlay muted loop playsInline>
            <source src={gata} type="video/mp4" />
          </video>
        </div>
        <div className="right-side-content">
          <div className="logo-container">
            <img src={logo2} alt="Logo" className="signup-logo2" />
          </div>
          <div className="signup-page-text">
            <p className="signup-main-text">Create Account</p>
            <p className="signup-sub-text1">Staff Personal Info</p>
            <div
              className="file-upload-wrapper"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                ref={fileInputRef}
                id="fileInput"
                type="file"
                className="hidden-file-input"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {profilePicPreview ? (
                <img
                  src={profilePicPreview}
                  alt="Preview"
                  className="profile-pic-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-person-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H12V5.5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="signup-input-container">
                <div className="input-row">
                  <div className="signup-input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="signup-input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="signup-input-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="signup-input-group2">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={formData.phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="signup-input-group">
                    <label htmlFor="staffId">Staff ID</label>
                    <input
                      type="number"
                      id="staffId"
                      name="staffId"
                      value={formData.staffId}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="signup-input-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="signup-agreement">
                <div className="signup-agreement-section">
                  <input
                    className="check"
                    type="checkbox"
                    id="termsAgree"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="termsAgree" className="signup-termsAgree">
                    I agree to all the <span className="highlight">Terms</span>
                    and <span className="highlight">Privacy policy</span>
                  </label>
                </div>
                <div className="signup-account-exists">
                  <span>I HAVE AN Account, </span>
                  <a href="/Login" className="highlight">
                    Log In
                  </a>
                </div>
              </div>
              <button className="signup-submit-button">Submit</button>
            </form>
            <ProgressRecorder />
            <p className="signup-last-text">
              Fill in the Data Today so we can better
              <br /> assist you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffInfo;
