import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllStaffSideBar.css";
import logo2 from "../images/logo2.png";
import dash from "../icons/dash.png";
import home from "../icons/home.png";
import stats from "../icons/stats.png";
import dropdown from "../icons/dropdown.png";
import dropdownActive from "../icons/dropdownActive.png";
import activities from "../icons/activities.png";
import certificates from "../icons/certificates.png";
import settings from "../icons/settings.png";
import logout from "../icons/logout.png";

const AllStaffSideBar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState("");

  const handleDropdownItemClick = (path, showDetailsPopup = false) => {
    navigate(path, { state: { showDetailsPopup } });
  };

  const handleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? "" : itemName);
  };

  const handleLogout = () => {
    // Clear session data here if needed (e.g., localStorage or context)
    navigate("/login"); // Redirect to login page
  };

  const itemIcons = {
    Home: home,
    Statistics: stats,
    Activities: activities,
    Certificates: certificates,
    Settings: settings,
    Logout: logout,
  };
  const dropdownItems = {
    Home: [
      { name: "Home", path: "/staffPage" },
      { name: "Statistics", path: "/statistics" },
      { name: "Activities", path: "/active-space" },
      { name: "Certificates", path: "/certificates-space" },
    ],
    Activities: [
      { name: "Trainings", path: "/stafftrainingspace" },
      { name: "Seminars", path: "/staffseminarsspace" },
      { name: "Conferences", path: "/staffconferencesspace" },
    ],
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo2} alt="Logo" />
        <span className="home">Home</span>
      </div>

      <div className="upperitem-container">
        <img src={dash} alt="Dashboard Icon" className="upperitem-icon" />
        <p className="styled-upperitem">Dashboard</p>
      </div>

      <div className="custom-line"></div>

      <p className="admin-text1">Admin</p>

      <div className="admin-options">
        {["Home", "Statistics", "Activities", "Certificates"].map(
          (itemName) => (
            <React.Fragment key={itemName}>
              {itemName === "Staff Info" && (
                <p className="admin-text2">Users</p>
              )}
              <div className="admin-option-item">
                <p className="admin-link">
                  <img
                    src={itemIcons[itemName]}
                    alt={`${itemName} Icon`}
                    className="link-icon"
                  />
                  {itemName}
                  <img
                    src={openDropdown === itemName ? dropdownActive : dropdown}
                    alt="Dropdown Icon"
                    className="dropdown-icon"
                    onClick={() => handleDropdown(itemName)}
                  />
                </p>
                {openDropdown === itemName && (
                  <div className="dropdown-menu">
                    {dropdownItems[itemName]?.map((item, index) => (
                      <p
                        key={index}
                        className="dropdown-item"
                        onClick={() =>
                          handleDropdownItemClick(
                            item.path,
                            item.name === "Permanent Staff"
                          )
                        }
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          )
        )}
      </div>

      <div className="settings-logout">
        <p className="settings-logout-link">
          <img src={settings} alt="Settings Icon" className="link-icon" />
          Settings
        </p>
        <p className="settings-logout-link" onClick={handleLogout}>
          <img src={logout} alt="Logout Icon" className="link-icon" />
          Logout
        </p>
      </div>
    </div>
  );
};

export default AllStaffSideBar;
