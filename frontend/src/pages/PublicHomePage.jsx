import React from 'react';
import { Link } from 'react-router-dom';

const PublicHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar for public view */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-emerald-600">MedTracker</span>
            </div>
            <div className="flex items-center">
              <Link to="/login" className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link to="/signup" className="ml-4 px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Never Miss a Dose Again.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          MedTracker helps you manage your medications, set reminders, and track your history with ease. Sign up to take control of your health schedule.
        </p>
        <div>
          <Link to="/signup" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-700 transition duration-300">
            Get Started for Free
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PublicHomePage;