import React, { useState, useEffect } from "react";
import "./PermanentStaff.css"; // Make sure your CSS styles are correctly imported

function PermanentStaff() {
  const [accountCount, setAccountCount] = useState(0);
  const [permanentStaffCount, setPermanentStaffCount] = useState(0);
  const [contractStaffCount, setContractStaffCount] = useState(0);
  const [permanentStaff, setPermanentStaff] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const accountResponse = await fetch("/api/accountCount");
        const accountData = await accountResponse.json();
        setAccountCount(accountData.count);

        const permanentResponse = await fetch("/api/count/permanent");
        const permanentData = await permanentResponse.json();
        setPermanentStaffCount(permanentData.count);

        const contractResponse = await fetch("/api/count/contract");
        const contractData = await contractResponse.json();
        setContractStaffCount(contractData.count);
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const fetchPermanentStaff = async () => {
    try {
      const response = await fetch("/api/permanent-staff");
      const data = await response.json();
      if (Array.isArray(data)) {
        // Check if data is an array
        setPermanentStaff(data);
      } else {
        console.error("Data fetched is not an array:", data);
      }
    } catch (error) {
      console.error("Failed to fetch permanent staff data:", error);
    }
  };

  return (
    <div className="all-staff-page">
      <div className="head-caption">Staff Info</div>
      <div className="boxes-container">
        <div className="info-box">
          <p className="employees-caption">All Employees</p>
          <p className="employees-count">
            {accountCount} <i className="fas fa-user-tie staff-icon"></i>
          </p>
        </div>
        <div className="info-box">
          <p className="employees-caption">All Permanent Staff</p>
          <p className="employees-count">
            {permanentStaffCount} <i className="fas fa-user-tie staff-icon"></i>
          </p>
        </div>
        <div className="info-box">
          <p className="employees-caption">All Contract Staff</p>
          <p className="employees-count">
            {contractStaffCount} <i className="fas fa-user-tie staff-icon"></i>
          </p>
        </div>
        <div className="info-box">
          {" "}
          <p className="employees-caption">Employees Feedback</p>
          <p className="employees-count">
            {accountCount} <i className="fas fa-user-tie staff-icon"></i>
          </p>
        </div>
      </div>

      <div className="permanent-staff-section">
        <span className="header-caption">Permanent Staff</span>
        <div className="forward-button" onClick={fetchPermanentStaff}>
          <i className="fas fa-arrow-right profile-arrow"></i>
        </div>
      </div>

      <table className="permanent-staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Job Title</th>
            <th>Years of Service</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {permanentStaff.length > 0 ? (
            permanentStaff.map((staff, index) =>
              staff.error ? (
                <tr key={index}>
                  <td colSpan="7">{staff.error}</td>
                </tr>
              ) : (
                <tr key={staff.id}>
                  <td>{`${staff.firstName} ${staff.lastName}`}</td>
                  <td>{staff.department}</td>
                  <td>{staff.jobTitle}</td>
                  <td>{staff.yearsOfService}</td>
                  <td>{staff.email}</td>
                  <td>{staff.phoneNumber}</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PermanentStaff;
