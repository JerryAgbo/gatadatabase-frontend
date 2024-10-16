import React, { useState, useEffect } from "react";

const AdminStaffView = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    if (selectedStatus) {
      fetch(`http://localhost:5000/api/staffjob/${selectedStatus}`)
        .then((response) => response.json())
        .then((data) => setStaffData(data))
        .catch((error) => console.error("Error:", error));
    }
  }, [selectedStatus]);

  return (
    <div>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="Permanent Staff">Permanent Staff</option>
        <option value="Contract Staff">Contract Staff</option>
      </select>

      <div>
        {staffData.map((staff) => (
          <div key={staff._id}>
            <p>{staff.staffId}</p>
            <p>{staff.jobTitle}</p>
            {/* Add more staff details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStaffView;
