import React, { useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import "./StaffTraining.css";

function StaffTraining() {
  const [localTrainings, setLocalTrainings] = useState([]);
  const [foreignTrainings, setForeignTrainings] = useState([]);
  const [refresherTrainings, setRefresherTrainings] = useState([]);
  const [notification, setNotification] = useState("");

  // Function to handle displaying notifications with auto-clear
  const showNotification = (message, duration = 3000) => {
    setNotification(message);
    setTimeout(() => setNotification(""), duration);
  };

  const handleAddTraining = (setTrainings) => {
    const newTraining = {
      id: `temp_${Date.now()}`,
      name: "",
      location: "",
      date: "",
      duration: "",
      status: "Approved",
      editable: true,
    };
    setTrainings((trainings) => [...trainings, newTraining]);
  };

  const handleChange = (id, field, value, trainings, setTrainings) => {
    setTrainings(
      trainings.map((training) =>
        training.id === id ? { ...training, [field]: value } : training
      )
    );
  };

  const handleSaveChanges = async (id, training, trainings, setTrainings) => {
    const isNewTraining = training.id.startsWith("temp_");
    const url = `/api/trainings${isNewTraining ? "" : "/" + id}`;
    const method = isNewTraining ? "POST" : "PATCH";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(training),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const savedTraining = await response.json();
      setTrainings(
        trainings.map((item) =>
          item.id === id
            ? { ...item, ...savedTraining, id: savedTraining.id }
            : item
        )
      );
      showNotification("Training saved successfully!");
    } catch (error) {
      console.error("Failed to save/update the training: ", error);
      showNotification("Failed to save training.");
    }
  };

  const handleDeleteTraining = async (id, setTrainings) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      try {
        const response = await fetch(`/api/trainings/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setTrainings((trainings) =>
          trainings.filter((training) => training.id !== id)
        );

        showNotification("Training deleted successfully!");
      } catch (error) {
        console.error("Failed to delete the training: ", error);
        showNotification("Failed to delete training.");
      }
    }
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

  const renderTrainingTable = (trainings, setTrainings) => {
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
              {["name", "location", "date", "duration"].map((field) => (
                <td
                  contentEditable={training.editable}
                  onBlur={(e) =>
                    handleChange(
                      training.id,
                      field,
                      e.target.innerText,
                      trainings,
                      setTrainings
                    )
                  }
                >
                  {training[field]}
                </td>
              ))}
              <td>
                <button
                  className="status-button"
                  onClick={() =>
                    handleStatusToggle(training.id, trainings, setTrainings)
                  }
                  style={{
                    backgroundColor:
                      training.status === "Approved"
                        ? "lightgreen"
                        : "lightcoral",
                    fontSize: "12px",
                    padding: "6px 12px",
                    textAlign: "center",
                    width: "100%",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {training.status}
                </button>
              </td>
              <td>
                <FaPen
                  onClick={() =>
                    toggleEditable(training.id, trainings, setTrainings)
                  }
                  style={{ cursor: "pointer", marginRight: "10px" }}
                />
                {training.editable && (
                  <button
                    className="save-button"
                    onClick={() =>
                      handleSaveChanges(
                        training.id,
                        training,
                        trainings,
                        setTrainings
                      )
                    }
                    style={{
                      backgroundColor:
                        training.status === "Approved"
                          ? "lightgreen"
                          : "lightcoral",
                      fontSize: "12px",
                      padding: "6px 12px",
                      textAlign: "center",
                      width: "40%",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#85c885")}
                    onMouseOut={(e) =>
                      (e.target.style.background =
                        training.status === "Approved"
                          ? "lightgreen"
                          : "lightcoral")
                    }
                  >
                    Save
                  </button>
                )}
                <FaTrash
                  onClick={() => {
                    handleDeleteTraining(training.id, setTrainings);
                  }}
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
  };

  return (
    <div className="activities-container">
      <h2>Trainings</h2>
      {notification && (
        <div className={`notification ${notification ? "show" : ""}`}>
          {notification}
        </div>
      )}
      <div className="rounded-box">Local Training</div>
      {renderTrainingTable(localTrainings, setLocalTrainings)}
      <div className="rounded-box">Foreign Training</div>
      {renderTrainingTable(foreignTrainings, setForeignTrainings)}
      <div className="rounded-box">Refresher Training</div>
      {renderTrainingTable(refresherTrainings, setRefresherTrainings)}
    </div>
  );
}

export default StaffTraining;