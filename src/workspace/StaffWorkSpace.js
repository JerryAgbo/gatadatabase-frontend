import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import "./StaffWorkSpace.css";

// Function to fetch staff information using Axios
const fetchStaffInfo = async (staffId) => {
  try {
    const response = await axios.get(
      `${
        process.env.REACT_APP_API_URL || "http://localhost:5000"
      }/api/staffinfo/${staffId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch staff info"
    );
  }
};

// Function to fetch job information using Axios
const fetchJobInfo = async (staffId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/staffjob/${staffId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch job info"
    );
  }
};

const StaffWorkSpace = () => {
  const [gridBoxes, setGridBoxes] = useState([
    { name: "TRAININGS", editable: false },
    { name: "SEMINARS", editable: false },
    { name: "CONFERENCES", editable: false },
  ]);

  const deleteBox = (index) => {
    const newBoxes = gridBoxes.filter((_, idx) => idx !== index);
    setGridBoxes(newBoxes);
  };

  const editBoxName = (index) => {
    const newName = prompt("Enter new name:", gridBoxes[index].name);
    if (newName) {
      const updatedBoxes = gridBoxes.map((box, idx) =>
        idx === index ? { ...box, name: newName } : box
      );
      setGridBoxes(updatedBoxes);
    }
  };

  const navigateToPage = (boxName) => {
    navigate(`/details/${boxName.toLowerCase()}`);
  };

  const navigate = useNavigate();
  const staffId = localStorage.getItem("staffId");
  const profilePicUrl = localStorage.getItem("profilePicUrl");

  const [certificateUrls, setCertificateUrls] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (certificateUrls.length > 0) {
        setCurrentSlideIndex(
          (prevIndex) => (prevIndex + 1) % certificateUrls.length
        );
      }
    }, 60000); // Change slide every 60 seconds
    return () => clearInterval(interval);
  }, [certificateUrls.length]);

  const {
    data: staffData,
    isLoading: isLoadingStaffInfo,
    isError: isErrorStaffInfo,
    error: errorStaffInfo,
  } = useQuery(["staffInfo", staffId], () => fetchStaffInfo(staffId), {
    enabled: !!staffId,
  });

  const getProfileImageUrl = (url) => {
    if (!url) return null;
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    return baseUrl.endsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  };

  const {
    data: jobData,
    isLoading: isLoadingJobInfo,
    isError: isErrorJobInfo,
    error: errorJobInfo,
  } = useQuery(["jobInfo", staffId], () => fetchJobInfo(staffId), {
    enabled: !!staffId,
  });

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 15) {
      alert("You can only upload a maximum of 15 certificates at once.");
      return;
    }
    Array.from(files).forEach(async (file) => {
      const formData = new FormData();
      formData.append("certificate", file);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/uploadCertificate",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setCertificateUrls((prevUrls) => [...prevUrls, response.data.url]);
        alert(
          "Congratulations! Your certificate has been uploaded successfully."
        );
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      }
    });
  };

  if (isLoadingStaffInfo || isLoadingJobInfo) {
    return (
      <div className="main-container">
        <div className="message-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (isErrorStaffInfo || isErrorJobInfo) {
    return (
      <div className="main-container">
        <div className="message-container">
          <span>
            Error:{" "}
            {isErrorStaffInfo ? errorStaffInfo.message : errorJobInfo.message}
          </span>
        </div>
      </div>
    );
  }

  if (!staffData || !jobData) {
    return (
      <div className="main-container">
        <div className="message-container">
          <span>No data found for staff ID {staffId}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="row ">
        <div className="staff-profile-page">
          <div className="top-left-label">Basic Information</div>
          <div className="staff-info">
            <div className="profile-picture">
              {staffData.profilePicUrl && (
                <img
                  src={getProfileImageUrl(staffData.profilePicUrl)}
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>

            <div className="profile-info">
              <p>
                <strong>Name:</strong>{" "}
                {`${staffData.firstName} ${staffData.lastName}`}
              </p>
              <p>
                <strong>Email:</strong> {staffData.email}
              </p>
              <p>
                <strong>Phone:</strong> {staffData.phoneNumber}
              </p>
              <p>
                <strong>Staff ID:</strong> {staffId}
              </p>
              <p>
                <strong>Gender:</strong> {staffData.gender}
              </p>
            </div>
          </div>
        </div>

        <div className="staff-profile-page">
          <div className="top-left-label">Certificates</div>
          <div className="staff-info">
            <div className="cert-wrap">
              <div className="certificate-display">
                {certificateUrls.length > 0 ? (
                  <img
                    src={certificateUrls[currentSlideIndex]}
                    alt={`Uploaded Certificate ${currentSlideIndex}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : (
                  <div>
                    <svg
                      width="100"
                      height="100"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Insert your preferred SVG icon for certificates here */}
                    </svg>
                    <p>No certificates uploaded</p>
                  </div>
                )}
              </div>

              <div
                className="certificate-upload"
                onClick={() =>
                  document.getElementById("hiddenFileInput").click()
                }
                style={{ cursor: "pointer" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 5C12.5523 5 13 5.44772 13 6V11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5Z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  type="file"
                  id="hiddenFileInput"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="image/*" // This line ensures only image files can be selected
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="staff-profile-page">
          <div className="top-left-label">Job Information</div>
          <div className="staff-info">
            <div className="profile-info">
              <p>
                <strong>Entry Year:</strong>{" "}
                {jobData.entryYear || "Not provided"}
              </p>
              <p>
                <strong>Job Title:</strong> {jobData.jobTitle || "Not provided"}
              </p>
              <p>
                <strong>Role:</strong> {jobData.role || "Not provided"}
              </p>
              <p>
                <strong>Job Status:</strong>{" "}
                {jobData.jobStatus || "Not available"}
              </p>
              <p>
                <strong>Department:</strong>{" "}
                {jobData.department || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        <div className="staff-profile-page">
          <div className="top-left-label">Activities</div>
          <div className="staff-info">
            <div className="grid-inner-box-contain">
              {gridBoxes.map((box, index) => (
                <div
                  key={index}
                  className={`grid-inner ${box.editable ? "editable" : ""}`}
                  onClick={() =>
                    box.editable ? editBoxName(index) : navigateToPage(box.name)
                  }
                >
                  <span className="box-title">{box.name}</span>
                  {box.editable && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the click from propagating to the parent div
                        deleteBox(index);
                      }}
                      className="delete-box-btn"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffWorkSpace;