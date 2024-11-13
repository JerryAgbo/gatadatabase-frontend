import React from "react";
import SideBar from "../components/SideBar";
import AllStaffSearchBar from "../workspace/StaffSearchBar";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import AdminStaffView from "../components/AdminStaffView"; // Ensure this is the correct path
import PermanentStaff from "../pages/PermanentStaff";

const PermanentStaffSpace = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <div className="main-content">
        <AllStaffSearchBar />
        <PermanentStaff />
        <Routes>
          {/* Define the route for AdminStaffView */}
          <Route path="/admin-staff-view" element={<AdminStaffView />} />
          {/* You can define other routes as children here, using Outlet in the component rendered by a parent route */}
        </Routes>
      </div>
    </div>
  );
};

export default PermanentStaffSpace;
