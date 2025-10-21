
import React, { useState, useEffect } from 'react';
import { loginUser, storeAuthToken } from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({
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
            navigate('/'); 
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
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!credentials.email || !credentials.password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser(credentials);
      storeAuthToken(response.token); 
      setIsAuthenticated(true); 
      setSuccessMessage('Login successful!');
      console.log('Login response:', response);
      setCredentials({ email: '', password: '' }); 

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"> 
      <div className="max-w-xl w-full bg-white shadow-2xl rounded-3xl p-14 space-y-10 border border-gray-200 transform hover:scale-105 transition duration-300 ease-in-out">
        <div>
          <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900 drop-shadow-sm">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            Sign in to continue managing your medications.
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
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-t-lg relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-xl transition duration-150 ease-in-out"
                placeholder="Email address"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-lg relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-xl transition duration-150 ease-in-out"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xl font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transform hover:scale-100 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="text-lg text-center">
          <Link to="/signup" className="font-medium text-emerald-600  hover:text-emerald-500 transition duration-150 ease-in-out">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;