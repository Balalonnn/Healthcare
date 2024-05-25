import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePatient from "./components/CreatePatient";
import Dashboard from "./components/Dashboardpage";
import UpdatePatient from "./components/UpdatePatient";
import DeletePatient from "./components/DeletePatient";
import PatientPage from "./components/Patientpage";
import PatientPage2 from "./components/PatientPage2";
import ViewPatient from "./components/ViewPatient";

function App() {
  return (
    <Router>
      <div className="App">
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PatientPage />} />
            <Route path="/patients2" element={<PatientPage2 />} />
            <Route path="/create-patient" element={<CreatePatient />} />
            <Route path="/update-patient" element={<UpdatePatient />} />
            <Route path="/delete-patient" element={<DeletePatient />} />
            <Route path="/view-patient" element={<ViewPatient />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;