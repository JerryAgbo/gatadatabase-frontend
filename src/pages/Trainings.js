import React, { useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import "./Trainings.css";

function Activities() {
  const [localTrainings, setLocalTrainings] = useState([]);
  const [foreignTrainings, setForeignTrainings] = useState([]);
  const [refresherTrainings, setRefresherTrainings] = useState([]);

  // Function templates for add, delete, toggle status, toggle edit, and change handlers
  const handleAddTraining = (setTrainings) => {
    const newTraining = {
      id: Date.now(),
      name: "",
      location: "",
      date: "",
      duration: "",
      status: "Approved",
      editable: true,
    };
    setTrainings((trainings) => [...trainings, newTraining]);
  };

  const handleDeleteTraining = (id, setTrainings) => {
    setTrainings((trainings) =>
      trainings.filter((training) => training.id !== id)
    );
  };

  const handleStatusToggle = (id, trainings, setTrainings) => {
    setTrainings(
      trainings.map((training) =>
        training.id === id
          ? {
              ...training,
              status:
                training.status === "Approved" ? "Disapproved" : "Approved",
            }
          : training
      )
    );
  };

  const toggleEditable = (id, trainings, setTrainings) => {
    setTrainings(
      trainings.map((training) =>
        training.id === id
          ? { ...training, editable: !training.editable }
          : training
      )
    );
  };

  const handleChange = (id, field, value, trainings, setTrainings) => {
    setTrainings(
      trainings.map((training) =>
        training.id === id ? { ...training, [field]: value } : training
      )
    );
  };

  // Render each training type table with respective states and handlers
  return (
    <div className="activities-container">
      <h2>Trainings</h2>

      <div className="rounded-box">Local Training</div>
      {renderTrainingTable(localTrainings, setLocalTrainings)}

      <div className="rounded-box">Foreign Training</div>
      {renderTrainingTable(foreignTrainings, setForeignTrainings)}

      <div className="rounded-box">Refresher Training</div>
      {renderTrainingTable(refresherTrainings, setRefresherTrainings)}
    </div>
  );

  function renderTrainingTable(trainings, setTrainings) {
    return (
      <table className="trainings-table">
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
          {trainings.map((training) => (
            <tr key={training.id}>
              <td
                contentEditable={training.editable}
                onBlur={(e) =>
                  handleChange(
                    training.id,
                    "name",
                    e.target.innerText,
                    trainings,
                    setTrainings
                  )
                }
              >
                {training.name}
              </td>
              <td
                contentEditable={training.editable}
                onBlur={(e) =>
                  handleChange(
                    training.id,
                    "location",
                    e.target.innerText,
                    trainings,
                    setTrainings
                  )
                }
              >
                {training.location}
              </td>
              <td
                contentEditable={training.editable}
                onBlur={(e) =>
                  handleChange(
                    training.id,
                    "date",
                    e.target.innerText,
                    trainings,
                    setTrainings
                  )
                }
              >
                {training.date}
              </td>
              <td
                contentEditable={training.editable}
                onBlur={(e) =>
                  handleChange(
                    training.id,
                    "duration",
                    e.target.innerText,
                    trainings,
                    setTrainings
                  )
                }
              >
                {training.duration}
              </td>
              <td>
                <button
                  className="status-button"
                  style={{
                    backgroundColor:
                      training.status === "Approved"
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
                    handleStatusToggle(training.id, trainings, setTrainings)
                  }
                >
                  {training.status}
                </button>
              </td>
              <td>
                <FaPen
                  onClick={() =>
                    toggleEditable(training.id, trainings, setTrainings)
                  }
                  style={{ cursor: "pointer" }}
                />
                <FaTrash
                  onClick={() =>
                    handleDeleteTraining(training.id, setTrainings)
                  }
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              <FaPlus
                onClick={() => handleAddTraining(setTrainings)}
                style={{ cursor: "pointer" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Activities;
