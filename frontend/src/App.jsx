import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { getAuthToken } from "./api/authApi"; 
import AddEditMedication from "./components/AddEditMedication";
import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
           <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
        {/* Default route to AddEditMedication */}
        <Route path="/" element={<AddEditMedication />} />
      </Routes>
    </Router>
  );
}

export default App;
