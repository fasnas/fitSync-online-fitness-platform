import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Dumbbell, Calendar, Users } from "lucide-react";

const UserSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-60 m-4 bg-white rounded-2xl shadow-xl p-6 space-y-6 h-fit sticky top-14">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4 ">Dashboard</h2>

      <nav className="space-y-4 text-gray-700 font-medium">
        <Link
          to="/user"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 transition ${
            isActive("/dashboard/home") ? "bg-blue-50 text-blue-600 font-semibold" : ""
          }`}
        >
          <Home size={20} />
          Home
        </Link>

        <Link
          to="/user/trainers"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 transition ${
            isActive("/dashboard/trainers") ? "bg-blue-50 text-blue-600 font-semibold" : ""
          }`}
        >
          <Users size={20} />
          Get a Coach
        </Link>

        <Link
          to="/user/myplan"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 transition ${
            isActive("/dashboard/my-plan") ? "bg-blue-50 text-blue-600 font-semibold" : ""
          }`}
        >
          <Dumbbell size={20} />
          My Plan
        </Link>

        <Link
          to="/user/profile"
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 transition ${
            isActive("/dashboard/profile") ? "bg-blue-50 text-blue-600 font-semibold" : ""
          }`}
        >
          <User size={20} />
          Profile
        </Link>
      </nav>
    </div>
  );
};
export default UserSidebar;


