import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoachContext } from '../../Context/CoachContext';

const CoachNavbar = () => {
  const { coachProfile, loading } = useContext(CoachContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(word => word[0]).join("").toUpperCase();
  };

  return (
    <div className="fixed right-0 top-0 left-64 bg-white shadow-sm z-10">
      <div className="flex items-center justify-end h-16 px-6">
        <div className="flex items-center space-x-4 relative">
          {/* Notification Icon */}
          <button
            className="text-gray-600 hover:text-gray-800 relative"
            onClick={() => navigate("/coach/notification")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600">
                  {getInitials(coachProfile?.name)}
                </span>
              </div>
              <span className="text-gray-700">{coachProfile?.name || "Loading..."}</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-20">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachNavbar;
