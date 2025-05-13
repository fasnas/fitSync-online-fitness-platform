import React, { useState, useContext } from "react";
import axiosInstance from "../AxiosInstance";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Components/Context/UserContext";
import { CoachContext } from "../Components/Context/CoachContext";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify"




const Login = () => {
  const { fetchUserProfile, fetchBookings, fetchCoaches } = useContext(UserContext);
  const { fetchBookedUsers, fetchCoachProfile } = useContext(CoachContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (email.length < 6) {
      setError("Email must be at least 6 characters long.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError("");
    
    try {
      const res = await axiosInstance.post("/l/login", { email, password });
      localStorage.setItem("token", res.data.token);

      if (res.data.role === "user") {
        await fetchUserProfile();
        await fetchBookings();
        await fetchCoaches();
        navigate("/user");
        toast.success("succccccc")
       
      } else if (res.data.role === "coach" && res.data.user.status === "approved") {
        await fetchBookedUsers();
        await fetchCoachProfile();
        navigate("/coach");
        
      }
      
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Sign in to FitSync</h2>
        <p className="text-sm text-gray-600 mb-6">
          New user?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md font-semibold transition"
            
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          By proceeding, you agree to our Terms & Conditions and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
