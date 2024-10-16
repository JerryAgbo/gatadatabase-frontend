import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import logo2 from "../images/logo2.png";
import dash from "../icons/dash.png";
import home from "../icons/home.png";
import stats from "../icons/stats.png";
import dropdown from "../icons/dropdown.png";
import dropdownActive from "../icons/dropdownActive.png";
import staff from "../icons/staff.png";
import activities from "../icons/activities.png";
import certificates from "../icons/certificates.png";
import settings from "../icons/settings.png";
import logout from "../icons/logout.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState("");

  const handleDropdown = (itemName) => {
    console.log(`Dropdown clicked: ${itemName}`);
    setOpenDropdown(openDropdown === itemName ? "" : itemName);
  };

  const handleDropdownItemClick = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const itemIcons = {
    Home: home,
    Statistics: stats,
    "Staff Info": staff,
    Activities: activities,
    Certificates: certificates,
    Settings: settings,
    Logout: logout,
  };

  const dropdownItems = {
    Home: [
      { name: "Home", path: "/admin" },
      { name: "Statistics", path: "/statistics" },
      { name: "Staff Info", path: "/staff-space" },
      { name: "Activities", path: "/active-space" },
      { name: "Certificates", path: "/certificates-space" },
    ],
    "Staff Info": [
      { name: "All Staff", path: "/all-staff" },
      { name: "Permanent Staff", path: "/permanentstaffspace" },
      { name: "Contract Staff", path: "/contractstaffspace" },
      { name: "Feedback", path: "/feedbackspace" },
    ],
    Activities: [
      { name: "Trainings", path: "/active-space" },
      { name: "Seminars", path: "/seminarsspace" },
      { name: "Conferences", path: "/conferencesspace" },
    ],
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo2} alt="Logo" />
        <span className="home" onClick={() => navigate("/admin")}>
          Home
        </span>
      </div>

      <div
        className="upperitem-container"
        onClick={() => navigate("/dashboard")}
      >
        <img src={dash} alt="Dashboard Icon" className="upperitem-icon" />
        <p className="styled-upperitem">Dashboard</p>
      </div>

      <div className="custom-line"></div>

      <p className="admin-text1">Admin</p>
      <div className="admin-options">
        {["Home", "Statistics", "Staff Info", "Activities", "Certificates"].map(
          (itemName) => (
            <React.Fragment key={itemName}>
              {itemName === "Staff Info" && (
                <p className="admin-text2">Users</p>
              )}
              <div
                className="admin-option-item"
                onClick={() => handleDropdown(itemName)}
              >
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
                  />
                </p>
                {openDropdown === itemName && (
                  <div className="dropdown-menu">
                    {dropdownItems[itemName]?.map((item, index) => (
                      <p
                        key={index}
                        className="dropdown-item"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the parent onClick
                          handleDropdownItemClick(item.path);
                        }}
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
        <p
          className="settings-logout-link"
          onClick={() => navigate("/settings")}
        >
          <img src={settings} alt="Settings Icon" className="link-icon" />
          Settings
        </p>
        <p className="settings-logout-link" onClick={() => navigate("/logout")}>
          <img src={logout} alt="Logout Icon" className="link-icon" />
          Logout
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
