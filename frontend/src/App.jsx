import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Import Layout and Pages
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage"; // This is the user's dashboard
import PublicHomePage from "./pages/PublicHomePage"; // <-- Import the new public page
import MedicationListPage from "./pages/MedicationListPage";
import AddEditMedication from "./components/AddEditMedication";
import HistoryPage from "./pages/HistoryPage";
import "./index.css";

// Private routes are for logged-in users and include the main app layout
const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout><Outlet /></Layout> : <Navigate to="/welcome" replace />;
};

// Public routes are for guests
const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes for guests */}
        <Route element={<PublicRoutes />}>
          <Route path="/welcome" element={<PublicHomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        
        {/* Private routes for logged-in users */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/medications" element={<MedicationListPage />} />
          <Route path="/add" element={<AddEditMedication />} />
          <Route path="/edit/:id" element={<AddEditMedication />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>

        {/* Catch-all: If a logged-out user tries any other path, send them to the welcome page. */}
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </Router>
  );
}

export default App;