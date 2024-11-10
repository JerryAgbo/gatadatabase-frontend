import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./InitialPage.css";
import logo from "../images/logo.png";
import building from "../images/building.png";

function InitialPage() {
  const navigate = useNavigate(); // Use the useNavigate hook

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="initialPage">
      <div className="page-container">
        <div className="left-column">
          <img src={building} alt="building" className="building" />
        </div>
        <div className="right-column">
          <h5 className="text">
            Fill in the Data Today so we can better <br /> assist you
          </h5>
          <img src={logo} alt="Logo" className="logo" />
          <div className="buttons-container">
            <button
              type="button"
              className="staff-button"
              onClick={navigateToLogin}
            >
              Staff
            </button>
            <button
              type="button"
              className="admin-button"
              onClick={navigateToAdmin}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialPage;
