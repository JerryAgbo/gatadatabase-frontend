import React, { useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import "./Seminars.css"; // Ensure you have this CSS file in the same directory

function Seminars() {
  const [localSeminars, setLocalSeminars] = useState([]);
  const [foreignSeminars, setForeignSeminars] = useState([]);

  const handleAddSeminar = (setSeminars) => {
    const newSeminar = {
      id: Date.now(),
      name: "",
      location: "",
      date: "",
      duration: "",
      status: "Approved",
      editable: true,
    };
    setSeminars((seminars) => [...seminars, newSeminar]);
  };

  const handleDeleteSeminar = (id, setSeminars) => {
    setSeminars((seminars) => seminars.filter((seminar) => seminar.id !== id));
  };

  const handleStatusToggle = (id, seminars, setSeminars) => {
    setSeminars(
      seminars.map((seminar) =>
        seminar.id === id
          ? {
              ...seminar,
              status:
                seminar.status === "Approved" ? "Disapproved" : "Approved",
            }
          : seminar
      )
    );
  };

  const toggleEditable = (id, seminars, setSeminars) => {
    setSeminars(
      seminars.map((seminar) =>
        seminar.id === id
          ? { ...seminar, editable: !seminar.editable }
          : seminar
      )
    );
  };

  const handleChange = (id, field, value, seminars, setSeminars) => {
    setSeminars(
      seminars.map((seminar) =>
        seminar.id === id ? { ...seminar, [field]: value } : seminar
      )
    );
  };

  return (
    <div className="event-wrapper">
      <h2>Seminars</h2>

      <div className="circle-shape">Local Seminar</div>
      {renderSeminarTable(localSeminars, setLocalSeminars)}

      <div className="circle-shape">Foreign Seminar</div>
      {renderSeminarTable(foreignSeminars, setForeignSeminars)}
    </div>
  );

  function renderSeminarTable(seminars, setSeminars) {
    if (!Array.isArray(seminars)) {
      console.error("Expected seminars to be an array but received:", seminars);
      return <p>Error: Seminars data is not valid.</p>;
    }

    return (
      <table className="workshop-details">
        <thead>
          <tr>
            <th>NAME</th>
            <th>LOCATION</th>
            <th>DATE</th>
            <th>DURATION</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {seminars.map((seminar) => (
            <tr key={seminar.id}>
              <td
                contentEditable={seminar.editable}
                onBlur={(e) =>
                  handleChange(
                    seminar.id,
                    "name",
                    e.target.innerText,
                    seminars,
                    setSeminars
                  )
                }
              >
                {seminar.name}
              </td>
              <td
                contentEditable={seminar.editable}
                onBlur={(e) =>
                  handleChange(
                    seminar.id,
                    "location",
                    e.target.innerText,
                    seminars,
                    setSeminars
                  )
                }
              >
                {seminar.location}
              </td>
              <td
                contentEditable={seminar.editable}
                onBlur={(e) =>
                  handleChange(
                    seminar.id,
                    "date",
                    e.target.innerText,
                    seminars,
                    setSeminars
                  )
                }
              >
                {seminar.date}
              </td>
              <td
                contentEditable={seminar.editable}
                onBlur={(e) =>
                  handleChange(
                    seminar.id,
                    "duration",
                    e.target.innerText,
                    seminars,
                    setSeminars
                  )
                }
              >
                {seminar.duration}
              </td>
              <td>
                <button
                  className="status-button"
                  style={{
                    backgroundColor:
                      seminar.status === "Approved"
                        ? "lightgreen"
                        : "lightcoral",
                    fontSize: "12px",
                    padding: "6px 12px",
                    textAlign: "center",
                    width: "100%", // Ensures the button fills the cell
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleStatusToggle(seminar.id, seminars, setSeminars)
                  }
                >
                  {seminar.status}
                </button>
              </td>
              <td>
                <FaPen
                  onClick={() =>
                    toggleEditable(seminar.id, seminars, setSeminars)
                  }
                  style={{ cursor: "pointer" }}
                />
                <FaTrash
                  onClick={() => handleDeleteSeminar(seminar.id, setSeminars)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              <FaPlus
                onClick={() => handleAddSeminar(setSeminars)}
                style={{ cursor: "pointer" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Seminars;
