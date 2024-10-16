import React from "react";
import AllStaffSideBar from "../workspace/AllStaffSideBar";
import AllStaffSearchBar from "../workspace/AllStaffSearchBar";
import StaffWorkSpace from "../workspace/StaffWorkSpace";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import AdminStaffView from "../components/AdminStaffView"; // Ensure this is the correct path

const StaffPage = () => {
  return (
    <div className="dashboard">
      <AllStaffSideBar />
      <div className="main-content">
        <AllStaffSearchBar />
        <StaffWorkSpace />
        <Routes>
          {/* Define the route for AdminStaffView */}
          <Route path="/admin-staff-view" element={<AdminStaffView />} />
          {/* You can define other routes as children here, using Outlet in the component rendered by a parent route */}
        </Routes>
      </div>
    </div>
  );
};

export default StaffPage;
