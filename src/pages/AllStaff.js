import React, { useState, useEffect } from "react";
import "./AllStaff.css"; // Make sure your CSS styles are correctly imported

function AllStaff() {
  const [accountCount, setAccountCount] = useState(0);
  const [permanentStaffCount, setPermanentStaffCount] = useState(0);
  const [contractStaffCount, setContractStaffCount] = useState(0);
  const [permanentStaff, setPermanentStaff] = useState([]);

  const [contractStaff, setContractStaff] = useState([]);

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

  const fetchContractStaff = async () => {
    try {
      const response = await fetch("/api/contract-staff");
      const data = await response.json();
      setContractStaff(data);
    } catch (error) {
      console.error("Failed to fetch contract staff:", error);
      setContractStaff([{ error: "Failed to fetch data." }]);
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

      <div className="contract-staff-section">
        <span className="header-caption">Contract Staff</span>
        <div className="forward-button" onClick={fetchContractStaff}>
          <i className="fas fa-arrow-right profile-arrow"></i>
        </div>
      </div>

      <table className="contract-staff-table">
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
          {contractStaff.length > 0 ? (
            contractStaff.map((staff, index) =>
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
export default AllStaff;
