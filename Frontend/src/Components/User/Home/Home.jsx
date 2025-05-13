import React, { useState, useContext, useEffect } from "react";
import { FaTint, FaWalking } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { motion as Motion } from "framer-motion";
import axiosInstance from "../../../AxiosInstance";
import { UserContext } from "../../Context/UserContext";

const UserHome = () => {
  const { userProfile, setUserProfile,fetchUserProfile } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "male",
    activity: "1.2",
  });

  const [tdee, setTdee] = useState(null);  // For storing TDEE
  // console.log(userProfile)
  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        height: userProfile.height || "",
        weight: userProfile.weight || "",
        age: userProfile.age || "",
        gender: userProfile.gender || "male",
        activity: userProfile.activity || "1.2",
      }));
      setTdee(userProfile.tdee);  // Set TDEE from the profile if available
    }
  }, [userProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculate = async () => {
    const token = localStorage.getItem("token");

    const cleanedData = {
      height: Number(formData.height),
      weight: Number(formData.weight),
      age: Number(formData.age),
      gender: formData.gender,
      activity: parseFloat(formData.activity),
    };

    try {
      const response = await axiosInstance.put("/user/calory", cleanedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const { tdee,  updatedUser } = response.data.data;
      fetchUserProfile()
      // console.log("TDEE:", tdee);
      // console.log("Water Intake:", waterIntakeLiters);
      // console.log("Steps:", recommendedSteps);

      if (updatedUser) {
        setUserProfile(updatedUser);
      }

      setTdee(tdee);  // Set the new TDEE value

      alert(`Your estimated daily calorie needs: ${Math.round(tdee)} kcal`);
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to calculate. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <Motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-gray-800 text-lg font-semibold mb-6 bg-white/80 rounded-lg px-4 py-2 shadow-md"
      >
        Tell us a bit about you and unlock your free nutrition & training plans!
      </Motion.p>

      <Motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6 grid md:grid-cols-3 gap-6 items-center mb-6 hover:shadow-xl transition-shadow"
      >
        {/* Water and Steps */}
        <div className="space-y-6 text-gray-700">
          {/* Water Intake */}
          <Motion.div
            whileHover={{ scale: 1.05, color: "#2563eb" }}
            className="flex items-center justify-between cursor-pointer p-3 bg-white/90 rounded-lg hover:bg-blue-100 transition"
          >
            <div className="flex items-center space-x-3">
              <FaTint className="text-blue-500 text-xl" />
              <span className="font-semibold text-lg">
                Water Intake:{" "}
                {userProfile?.waterIntakeLiters
                  ? `${userProfile.waterIntakeLiters} L`
                  : "Not calculated"}
              </span>
            </div>
            <MdArrowForwardIos className="text-lg text-gray-500" />
          </Motion.div>

          {/* Recommended Steps */}
          <Motion.div
            whileHover={{ scale: 1.05, color: "#f43f5e" }}
            className="flex items-center justify-between cursor-pointer p-3 bg-white/90 rounded-lg hover:bg-pink-100 transition"
          >
            <div className="flex items-center space-x-3">
              <FaWalking className="text-pink-500 text-xl" />
              <span className="font-semibold text-lg">
                Steps:{" "}
                {userProfile?.recommendedSteps
                  ? userProfile.recommendedSteps
                  : "Not calculated"}
              </span>
            </div>
            <MdArrowForwardIos className="text-lg text-gray-500" />
          </Motion.div>

          {/* TDEE */}
          <Motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between cursor-pointer p-3 bg-white/90 rounded-lg hover:bg-green-100 transition"
          >
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-lg">
                TDEE:{" "}
                {userProfile?.tdee
                  ? `${Math.round(userProfile.tdee)} kcal`
                  : "Not calculated"}
              </span>
            </div>
            <MdArrowForwardIos className="text-lg text-gray-500" />
          </Motion.div>

          <p className="text-sm text-gray-600 italic">
            Enable ‘Health Track’ in FitSync for a healthier you!
          </p>
        </div>

        {/* Calorie Calculator Box */}
        <Motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowModal(true)}
          className="flex justify-center items-center cursor-pointer"
        >
          <div className="w-40 h-40 border-4 border-gradient-to-br from-blue-200 to-purple-200 rounded-full flex flex-col justify-center items-center text-center bg-gradient-to-tr from-blue-100 to-purple-50 p-4 shadow-md">
            <p className="text-md font-medium text-gray-800">
              Calculate your
              <br />
              caloric daily
              <br />
              consumption
            </p>
            <MdArrowForwardIos className="text-lg text-gray-600 mt-2" />
          </div>
        </Motion.div>

        {/* TDEE Box beside Calculate Button */}
        <Motion.div
          className="flex items-center justify-center cursor-pointer bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 rounded-lg shadow-xl transition"
        >
          <div className="text-center text-white font-semibold text-xl p-4">
            <p>Total Daily Energy Expenditure(TDEE): {tdee ? `${Math.round(tdee)} kcal` : "Not calculated"}</p>
          </div>
        </Motion.div>

        {/* Empty space or additional data */}
        <div />
      </Motion.div>

      {/* Book Appointment / My Goal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-md flex items-center justify-between transition"
        >
          <div>
            <h3 className="font-semibold text-gray-800 text-lg mb-1">
              Book Appointment
            </h3>
            <p className="text-sm text-gray-600">You haven't enrolled yet.</p>
          </div>
          <img
            src="https://img.icons8.com/ios/100/appointment-reminders.png"
            alt="Appointment"
            className="w-16 h-16 filter drop-shadow-md"
          />
        </Motion.div>

        <Motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl shadow-md flex items-center justify-between transition"
        >
          <div>
            <h3 className="font-semibold text-gray-800 text-lg mb-1">My Goal</h3>
            <p className="text-sm text-gray-600">
              You have not set your goal weight yet
            </p>
            <p className="text-blue-600 text-sm font-medium mt-2 cursor-pointer hover:underline">
              Set Your Fitness Goals →
            </p>
          </div>
          <img
            src="https://img.icons8.com/dusk/64/statistics.png"
            alt="Progress"
            className="w-12 h-12 filter drop-shadow-md"
          />
        </Motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-og-blur bg-opacity-40 z-50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Calorie Calculator
            </h2>

            <div className="grid gap-4">
              <input
                type="number"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="1.2">Little or no exercise</option>
                <option value="1.375">Light exercise (1–3 days/week)</option>
                <option value="1.55">Moderate exercise (3–5 days/week)</option>
                <option value="1.725">Hard exercise (6–7 days/week)</option>
                <option value="1.9">Very hard exercise</option>
              </select>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCalculate}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
