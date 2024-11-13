import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSection.css";


function HeroSection() {
  const [accountCount, setAccountCount] = useState(0);
  const [gridBoxes, setGridBoxes] = useState([
    { name: "TRAININGS", editable: false, path: "active-space" },
    { name: "SEMINARS", editable: false, path: "seminarsspace" },
    { name: "CONFERENCES", editable: false, path: "conferencesspace" },
  ]);
  const [permanentStaffCount, setPermanentStaffCount] = useState(0);
  const [contractStaffCount, setContractStaffCount] = useState(0);
  const [certificates, setCertificates] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch various counts
        const accountResponse = await fetch("/api/accountCount");
        const accountData = await accountResponse.json();
        setAccountCount(accountData.count);

        const permanentResponse = await fetch("/api/count/permanent");
        const permanentData = await permanentResponse.json();
        setPermanentStaffCount(permanentData.count);

        const contractResponse = await fetch("/api/count/contract");
        const contractData = await contractResponse.json();
        setContractStaffCount(contractData.count);

      const certResponse = await fetch("/api/certificates");
        const certData = await certResponse.json();
        setCertificates(certData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openModal = (url) => {
    setSelectedImage(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };
  
  const addBox = () => {
    if (gridBoxes.length >= 5) {
      alert("You can only add up to two more boxes.");
      return;
    }
    const newBoxName = `New Box ${gridBoxes.length + 1}`;
    setGridBoxes([...gridBoxes, { name: newBoxName, editable: true }]);
  };

  const deleteBox = (index) => {
    const updatedBoxes = gridBoxes.filter((_, idx) => idx !== index);
    setGridBoxes(updatedBoxes);
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

  const navigateToPage = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="hero-section">
      <div className="box">
        <p className="employees-text">All Employees</p>
        <p className="employees-count">
          {accountCount} <i className="fas fa-user-tie staff-icon"></i>
        </p>
      </div>

      <div className="box">
        <p className="employees-text">All Activities</p>
        <p className="employees-count">
          <i className="fas fa-user-tie staff-icon"></i>
        </p>
      </div>

      <div className="box">
        <p className="employees-text">All Certificates</p>
        <p className="employees-count">
          {accountCount} <i className="fas fa-user-tie staff-icon"></i>
        </p>
      </div>

      <div className="box" id="new-box-1">
        <div className="staff-info">Staff Info</div>{" "}
        <div className="grid-container">
          {" "}
          <div className="grid-box">
            <p className="employees-text">All Employees</p>
            <p className="employees-count">
              {accountCount} <i className="fas fa-user-tie staff-icon"></i>
            </p>
          </div>
          <div className="grid-box">
            <p className="employees-text">All Permanent Staff</p>
            <p className="employees-count">
              {permanentStaffCount}{" "}
              <i className="fas fa-user-tie staff-icon"></i>
            </p>
          </div>
          <div className="grid-box">
            <p className="employees-text">All Contract Staff</p>
            <p className="employees-count">
              {contractStaffCount}{" "}
              <i className="fas fa-user-tie staff-icon"></i>
            </p>
          </div>
          <div className="grid-box">
            <p className="employees-text">Employees Feedback</p>
            <p className="employees-count">
              {accountCount} <i className="fas fa-user-tie staff-icon"></i>
            </p>
          </div>
        </div>
      </div>

      <div className="box" id="new-box-2">
        <div className="certificate">Certificates</div>{" "}
        {/* Adjusted for specific positioning */}
        <div className="vertical-inner-box">
          <p className="employees-text">Training Certificates</p>
          <p className="employees-count">
            {accountCount} <i className="fas fa-user-tie staff-icon"></i>
          </p>
        </div>
        <div className="vertical-inner-box">
          <p className="employees-text">Participation Certificates</p>
          <p className="employees-count">
            {accountCount} <i className="fas fa-user-tie staff-icon"></i>
          </p>
        </div>
        <div className="vertical-inner-box">
          <p className="employees-text">Refresher Certificates</p>
          <p className="employees-count">
            {accountCount} <i className="fas fa-user-tie staff-icon"></i>
          </p>
        </div>
      </div>

      <div className="box" id="new-box-3">
        <div className="activities">Activities</div>
        <div className="grid-inner-box-container">
          {gridBoxes.map((box, index) => (
            <div
              key={index}
              className={`grid-inner-box ${box.editable ? "editable" : ""}`}
              onClick={() =>
                box.editable ? editBoxName(index) : navigateToPage(box.path)
              }
            >
              <span className="box-name">{box.name}</span>
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
          {gridBoxes.length < 5 && (
            <div className="grid-inner-box add-box" onClick={addBox}>
              <i className="fas fa-plus"></i>
            </div>
          )}
        </div>
      </div>

        <div className="box" id="new-box-4">
          <div className="recent-certification">Recent Certificates</div>
          <div className="inner-boxes-container">
            {certificates.length > 0 ? (
              <Slider {...settings}>
                {certificates.map((cert, index) => (
                  <div key={index} className="display-box">
                    <img
                      src={cert.url}
                      alt={`Certificate ${index}`}
                      style={{ width: "100%", height: "auto", cursor: "pointer" }}
                      onClick={() => openModal(cert.url)}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No certificates to display</p>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="modal" onClick={closeModal} style={modalStyle}>
            <div className="modal-content" style={modalContentStyle}>
              <span className="close" onClick={closeModal} style={closeButtonStyle}>
                &times;
              </span>
              <img
                src={selectedImage}
                alt="Preview"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        )}

        <div className="box" id="new-box-5">
          <p className="employees-text">Statistics</p>
          <div className="statistics-container">
            <div className="statistic">
              <p className="statistic-number">1,234</p>
              <p className="statistic-description">Total Employees</p>
            </div>
            <div className="statistic">
              <p className="statistic-number">567</p>
              <p className="statistic-description">Active Projects</p>
            </div>
            <div className="statistic">
              <p className="statistic-number">89%</p>
              <p className="statistic-description">Project Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
  );
}

// Styles for the modal
const modalStyle = {
  display: "flex",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  position: "relative",
  maxWidth: "90%",
  maxHeight: "90%",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "20px",
  color: "#fff",
  fontSize: "30px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default HeroSection;