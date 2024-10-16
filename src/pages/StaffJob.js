import React, { useState, useEffect } from "react";
import axios from "axios";
import gata from "../videos/gata.MOV";
import logo2 from "../images/logo2.png";
import "./StaffJob.css";
import { useNavigate } from "react-router-dom";

const ProgressRecorder = () => {
  const steps = [
    { id: 1, title: "Staff Personal Info", isActive: false },
    { id: 2, title: "Staff Job Info", isActive: true },
    { id: 3, title: "Create Password", isActive: false },
    { id: 4, title: "Congratulations", isActive: false },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "28px",
        marginLeft: "-205px",
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

const StaffJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    staffId: localStorage.getItem("staffId") || "",
    entryYear: new Date().getFullYear(),
    jobTitle: "",
    role: "",
    jobStatus: "",
    department: "",
  });

  // Function to generate year options
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      new Array(50),
      (val, index) => currentYear - index
    );
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedStaffId = localStorage.getItem("staffId") || "";
      if (!updatedStaffId) {
        alert("Staff ID is not available. Please log in again.");
        navigate("/login");
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        staffId: updatedStaffId,
      }));
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange(); // Call initially to set from local storage on mount

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.entryYear ||
      !formData.jobTitle ||
      !formData.role ||
      !formData.jobStatus ||
      !formData.department
    ) {
      alert("All fields must be filled out");
      return;
    }

    const staffId = parseInt(formData.staffId, 10);
    if (isNaN(staffId)) {
      alert("Invalid Staff ID");
      return;
    }

    try {
      const response = await axios.post("/api/staffjob", formData);
      console.log("Job details submitted successfully:", response.data);
      navigate("/createPassword");
    } catch (error) {
      console.error(
        "Submission error:",
        error.response?.data?.message || "Failed to submit job details."
      );
      alert(error.response?.data?.message || "Failed to submit job details.");
    }
  };

  return (
    <div className="container-main">
      <div className="container-registration">
        <div className="container-video">
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
        <div className="content-registration">
          <div className="container-logo">
            <img src={logo2} alt="Logo" />
          </div>
          <div className="text-registration">
            <p className="text-header">Staff Job Info</p>
            <form onSubmit={handleSubmit}>
              <div className="container-inputs">
                {/* Render input fields with labels and handleChange */}
                <div className="row-input">
                  <div className="group-input">
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
                  <div className="group-input">
                    <label htmlFor="entryYear">Entry Year</label>
                    <select
                      id="entryYear"
                      name="entryYear"
                      value={formData.entryYear}
                      onChange={handleChange}
                    >
                      {generateYearOptions()}
                    </select>
                  </div>
                </div>
                <div className="row-input">
                  <div className="group-input">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="group-input">
                    <label htmlFor="role">Role</label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row-input">
                  <div className="group-input">
                    <label htmlFor="jobStatus">Job Status</label>
                    <select
                      id="jobStatus"
                      name="jobStatus"
                      value={formData.jobStatus}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="Permanent Staff">Permanent Staff</option>
                      <option value="Contract Staff">Contract Staff</option>
                    </select>
                  </div>
                  <div className="group-input">
                    <label htmlFor="department">Department</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="button-submit">
                Submit
              </button>
            </form>

            <ProgressRecorder />
            <p className="text-footer">
              Fill in the Data Today so we can better assist you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffJob;
