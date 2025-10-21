import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Login from "./components/Login";
import Signup from "./components/Signup";
import { getAuthToken } from "./api/authApi";
import AddEditMedication from "./components/AddEditMedication";
import "./index.css";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for a token in localStorage when the app loads
    if (getAuthToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  // Simple PrivateRoute component to protect routes
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} /> 

      
          <Route
            path="/"
            element={<AddEditMedication />}
          />

        
      </Routes>
    </Router>
  );
}

export default App;