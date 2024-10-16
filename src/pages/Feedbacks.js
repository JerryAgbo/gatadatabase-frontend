import React, { useState, useEffect } from "react";
import "./Feedbacks.css"; // Make sure your CSS styles are correctly imported

function Feedbacks() {
  const [accountCount, setAccountCount] = useState(0);
  const [permanentStaffCount, setPermanentStaffCount] = useState(0);
  const [contractStaffCount, setContractStaffCount] = useState(0);

  useEffect(() => {
    // Fetch account count, permanent staff count, and contract staff count
    const fetchData = async () => {
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
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

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
        <span className="header-caption ">Permanent Staff</span>
        <div className="forward-button">
          <i className="fas fa-arrow-right profile-arrow"></i>
        </div>
      </div>

      <table className="permanent-staff-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Years of Service</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {/* Example rows, replace with actual data */}
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>IT</td>
            <td>Software Developer</td>
            <td>5</td>
            <td>johndoe@example.com</td>
            <td>123-456-7890</td>
          </tr>
          {/* Add additional rows as needed */}
        </tbody>
      </table>

      <div className="permanent-staff-section">
        <span className="header-caption ">Contract Staff</span>
        <div className="forward-button">
          <i className="fas fa-arrow-right profile-arrow"></i>
        </div>
      </div>

      <table className="permanent-staff-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Years of Service</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {/* Example rows, replace with actual data */}
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>IT</td>
            <td>Software Developer</td>
            <td>5</td>
            <td>johndoe@example.com</td>
            <td>123-456-7890</td>
          </tr>
          {/* Add additional rows as needed */}
        </tbody>
      </table>

      <div className="permanent-staff-section">
        <span className="header-caption ">Feedback</span>
        <div className="forward-button">
          <i className="fas fa-arrow-right profile-arrow"></i>
        </div>
      </div>

      <table className="permanent-staff-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Years of Service</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {/* Example rows, replace with actual data */}
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>IT</td>
            <td>Software Developer</td>
            <td>5</td>
            <td>johndoe@example.com</td>
            <td>123-456-7890</td>
          </tr>
          {/* Add additional rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default Feedbacks;
