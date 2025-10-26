import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext'; // <-- 1. IMPORT
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* <-- 2. WRAP THE APP */}
      <App />
    </AuthProvider>
  </StrictMode>
);