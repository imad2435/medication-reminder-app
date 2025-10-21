//--- File: medication-reminder-app/frontend/src/components/Signup.jsx ---//

import React, { useState, useEffect } from 'react';
import { registerUser } from '../api/authApi'; 
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ setIsAuthenticated }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
        const timer = setTimeout(() => {
            setSuccessMessage(null);
            navigate('/login'); 
        }, 2000); 
        return () => clearTimeout(timer);
    }
    if (error) {
        const timer = setTimeout(() => {
            setError(null);
        }, 5000); 
        return () => clearTimeout(timer);
    }
  }, [successMessage, error, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!userData.username || !userData.email || !userData.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(userData);
      setSuccessMessage('Registration successful! Please log in.');
      console.log('Registration response:', response);
      setUserData({ username: '', email: '', password: '' }); 

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Removed gradient background, kept min-h-screen and centered content
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"> {/* Added a very light gray background */}
      {/* Increased max-w-lg to max-w-xl and adjusted padding */}
      <div className="max-w-xl w-full bg-white shadow-2xl rounded-3xl p-14 space-y-10 border border-gray-200 transform hover:scale-105 transition duration-300 ease-in-out">
        <div>
          <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900 drop-shadow-sm">
            Create Account
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            Start managing your medications today!
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative animate-fade-in" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-t-lg relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 text-xl transition duration-150 ease-in-out"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 text-xl transition duration-150 ease-in-out"
                placeholder="Email address"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-b-lg relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 text-xl transition duration-150 ease-in-out"
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xl font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg transform hover:scale-100 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="text-lg text-center">
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500 transition duration-150 ease-in-out">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;