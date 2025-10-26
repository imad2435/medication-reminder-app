import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { userInfo, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyles = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700 hover:bg-gray-100'}`;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <NavLink to="/" className="text-2xl font-bold text-emerald-600">
              MedTracker
            </NavLink>
            {isAuthenticated && (
              <div className="hidden md:flex md:space-x-4">
                <NavLink to="/" className={navLinkStyles}>Dashboard</NavLink>
                <NavLink to="/medications" className={navLinkStyles}>All Medications</NavLink>
                <NavLink to="/history" className={navLinkStyles}>History</NavLink>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {isAuthenticated && userInfo?.data?.username ? (
              <>
                <span className="text-gray-700 mr-4 hidden sm:block">
                  Welcome, {userInfo.data.username}!
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </NavLink>
                <NavLink to="/signup" className="ml-4 px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;