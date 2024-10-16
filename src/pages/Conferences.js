import React, { useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import "./Conferences.css"; // Ensure you have this CSS file in the same directory

function Conferences() {
  const [localConferences, setLocalConferences] = useState([]);
  const [foreignConferences, setForeignConferences] = useState([]);

  const handleAddConference = (setConferences) => {
    const newConference = {
      id: Date.now(),
      name: "",
      location: "",
      date: "",
      duration: "",
      status: "Approved",
      editable: true,
    };
    setConferences((conferences) => [...conferences, newConference]);
  };

  const handleDeleteConference = (id, setConferences) => {
    setConferences((conferences) =>
      conferences.filter((conference) => conference.id !== id)
    );
  };

  const handleStatusToggle = (id, conferences, setConferences) => {
    setConferences(
      conferences.map((conference) =>
        conference.id === id
          ? {
              ...conference,
              status:
                conference.status === "Approved" ? "Disapproved" : "Approved",
            }
          : conference
      )
    );
  };

  const toggleEditable = (id, conferences, setConferences) => {
    setConferences(
      conferences.map((conference) =>
        conference.id === id
          ? { ...conference, editable: !conference.editable }
          : conference
      )
    );
  };

  const handleChange = (id, field, value, conferences, setConferences) => {
    setConferences(
      conferences.map((conference) =>
        conference.id === id ? { ...conference, [field]: value } : conference
      )
    );
  };

  return (
    <div className="session-container">
      <h2>Conferences</h2>

      <div className="semi-round">Local Conference</div>
      {renderConferenceTable(localConferences, setLocalConferences)}

      <div className="semi-round">Foreign Conference</div>
      {renderConferenceTable(foreignConferences, setForeignConferences)}
    </div>
  );

  function renderConferenceTable(conferences, setConferences) {
    if (!Array.isArray(conferences)) {
      console.error(
        "Expected conferences to be an array but received:",
        conferences
      );
      return <p>Error: Conferences data is not valid.</p>;
    }

    return (
      <table className="details-table">
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
          {conferences.map((conference) => (
            <tr key={conference.id}>
              <td
                contentEditable={conference.editable}
                onBlur={(e) =>
                  handleChange(
                    conference.id,
                    "name",
                    e.target.innerText,
                    conferences,
                    setConferences
                  )
                }
              >
                {conference.name}
              </td>
              <td
                contentEditable={conference.editable}
                onBlur={(e) =>
                  handleChange(
                    conference.id,
                    "location",
                    e.target.innerText,
                    conferences,
                    setConferences
                  )
                }
              >
                {conference.location}
              </td>
              <td
                contentEditable={conference.editable}
                onBlur={(e) =>
                  handleChange(
                    conference.id,
                    "date",
                    e.target.innerText,
                    conferences,
                    setConferences
                  )
                }
              >
                {conference.date}
              </td>
              <td
                contentEditable={conference.editable}
                onBlur={(e) =>
                  handleChange(
                    conference.id,
                    "duration",
                    e.target.innerText,
                    conferences,
                    setConferences
                  )
                }
              >
                {conference.duration}
              </td>
              <td>
                <button
                  className="status-button"
                  style={{
                    backgroundColor:
                      conference.status === "Approved"
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
                    handleStatusToggle(
                      conference.id,
                      conferences,
                      setConferences
                    )
                  }
                >
                  {conference.status}
                </button>
              </td>
              <td>
                <FaPen
                  onClick={() =>
                    toggleEditable(conference.id, conferences, setConferences)
                  }
                  style={{ cursor: "pointer" }}
                />
                <FaTrash
                  onClick={() =>
                    handleDeleteConference(conference.id, setConferences)
                  }
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              <FaPlus
                onClick={() => handleAddConference(setConferences)}
                style={{ cursor: "pointer" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Conferences;
