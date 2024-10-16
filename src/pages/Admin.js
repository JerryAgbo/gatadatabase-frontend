import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import AdminStaffView from "../components/AdminStaffView"; // Ensure this is the correct path
import HeroSection from "../components/HeroSection";

import "./Admin.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <div className="main-content">
        <SearchBar />
        <HeroSection />
        <Routes>
          <Route path="/admin-staff-view" element={<AdminStaffView />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
