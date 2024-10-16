import React from "react";
import AllStaffSideBar from "../workspace/AllStaffSideBar";
import AllStaffSearchBar from "../workspace/StaffSearchBar";
import { Routes, Route } from "react-router-dom";
import AdminStaffView from "../components/AdminStaffView";
import StaffTraining from "../pages/StaffTraining";

const StaffTrainingSpace = () => {
  return (
    <div className="dashboard">
      <AllStaffSideBar />
      <div className="main-content">
        <AllStaffSearchBar />
        <StaffTraining />
        <Routes>
          <Route path="/admin-staff-view" element={<AdminStaffView />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffTrainingSpace;
