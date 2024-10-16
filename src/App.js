import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transitions from "./pages/Transitions";
import FetchUserData from "./pages/FetchUserData";
import InitialSpace from "./parent/InitialSpace";
import StaffInfo from "./pages/StaffInfo";
import StaffJob from "./pages/StaffJob";
import CreatePassword from "./pages/CreatePassword";
import Congratulations from "./pages/Congratulations";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import StaffPage from "./pages/StaffPage";
import StaffSpace from "./parent/StaffSpace";
import ActiveSpace from "./parent/ActiveSpace";
import Admin from "./pages/Admin";
import AllStaffSpace from "./parent/AllStaffSpace";
import ParentComponent from "./pages/ParentComponent";
import PermanentStaffSpace from "./parent/PermanentStaffSpace";
import ContractStaffSpace from "./parent/ContractStaffSpace";
import FeedbacksSpace from "./parent/FeedBacksSpace";
import SeminarsSpace from "./parent/SeminarsSpace";
import StaffTrainingSpace from "./parent/StaffTrainingSpace";
import ConferencesSpace from "./parent/ConferencesSpace";
import { UserDataProvider } from "./pages/UserDataContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetching initial data from the server
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));

    // Log the API URL on component mount
    console.log("API URL:", process.env.REACT_APP_API_URL);
  }, []);

  return (
    <UserDataProvider>
      <BrowserRouter>
        <Routes>
          {/* Wrap each route element with the Transitions component for seamless transitions */}
          <Route
            index
            element={
              <Transitions>
                <InitialSpace />
              </Transitions>
            }
          />
          <Route
            path="/initialspace"
            element={
              <Transitions>
                <InitialSpace />
              </Transitions>
            }
          />
          <Route
            path="/staffinfo"
            element={
              <Transitions>
                <StaffInfo />
              </Transitions>
            }
          />
          <Route
            path="/staffJob"
            element={
              <Transitions>
                <StaffJob />
              </Transitions>
            }
          />
          <Route
            path="/all-staff"
            element={
              <Transitions>
                <AllStaffSpace />
              </Transitions>
            }
          />
          <Route
            path="/staff-space"
            element={
              <Transitions>
                <StaffSpace />
              </Transitions>
            }
          />
          <Route
            path="/stafftrainingspace"
            element={
              <Transitions>
                <StaffTrainingSpace />
              </Transitions>
            }
          />
          <Route
            path="/active-space"
            element={
              <Transitions>
                <ActiveSpace />
              </Transitions>
            }
          />
          <Route
            path="/createpassword"
            element={
              <Transitions>
                <CreatePassword />
              </Transitions>
            }
          />
          <Route
            path="/congratulations"
            element={
              <Transitions>
                <Congratulations />
              </Transitions>
            }
          />
          <Route
            path="/login"
            element={
              <Transitions>
                <Login />
              </Transitions>
            }
          />
          <Route
            path="/parentcomponent" // You can change this path as needed
            element={
              <Transitions>
                <ParentComponent />
              </Transitions>
            }
          />

          <Route
            path="/fetchUserData"
            element={
              <Transitions>
                <FetchUserData />
              </Transitions>
            }
          />
          <Route
            path="/forgotpassword"
            element={
              <Transitions>
                <ForgotPassword />
              </Transitions>
            }
          />
          <Route
            path="/staffpage"
            element={
              <Transitions>
                <StaffPage />
              </Transitions>
            }
          />
          <Route
            path="/admin"
            element={
              <Transitions>
                <Admin />
              </Transitions>
            }
          />
          <Route
            path="/permanentstaffspace"
            element={
              <Transitions>
                <PermanentStaffSpace />
              </Transitions>
            }
          />
          <Route
            path="/contractstaffspace"
            element={
              <Transitions>
                <ContractStaffSpace />
              </Transitions>
            }
          />
          <Route
            path="/feedbackspace"
            element={
              <Transitions>
                <FeedbacksSpace />
              </Transitions>
            }
          />
          <Route
            path="/seminarsspace"
            element={
              <Transitions>
                <SeminarsSpace />
              </Transitions>
            }
          />
          <Route
            path="/Conferencesspace"
            element={
              <Transitions>
                <ConferencesSpace />
              </Transitions>
            }
          />

          <Route
            path="/parentcomponent"
            element={
              <Transitions>
                <ParentComponent />
              </Transitions>
            }
          />
          <Route
            path="/fetchUserData"
            element={
              <Transitions>
                <FetchUserData />
              </Transitions>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* Display the fetched message */}
      <div
        className="message-container"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        <p>{message}</p>
      </div>
    </UserDataProvider>
  );
}

export default App;
