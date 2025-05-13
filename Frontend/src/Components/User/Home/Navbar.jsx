import React, { useState, useRef, useEffect } from "react";
import { Bell, UserCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-200">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/user">FitSync</Link>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-6 relative">
        <button className="relative">
          <Bell
            onClick={() => navigate("/user/notification")}
            className="w-6 h-6 text-gray-600 hover:text-blue-600"
          />
        </button>

        <div ref={dropdownRef} className="relative">
          <UserCircle
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-8 h-8 text-gray-600 hover:text-blue-600 cursor-pointer"
          />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-20">
              <button
                onClick={() => {
                  navigate("/user/profile");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  navigate("/user/orders");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  navigate("/user/settings");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token"); 
                  navigate("/login");
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
