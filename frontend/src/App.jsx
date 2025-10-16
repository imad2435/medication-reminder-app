import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEditMedication from "./components/AddEditMedication";
import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route to AddEditMedication */}
        <Route path="/" element={<AddEditMedication />} />
      </Routes>
    </Router>
  );
}

export default App;
