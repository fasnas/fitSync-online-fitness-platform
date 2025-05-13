import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const MyPlan = () => {
  const navigate = useNavigate();
  const { bookings } = useContext(UserContext);
  console.log(bookings);

  const [activeTab, setActiveTab] = useState("plan");

  const successfulBookings = bookings?.filter(
    (booking) => booking.paymentStatus === "success"
  );

  const activePlans = successfulBookings?.filter(
    (booking) => new Date(booking.validity?.end) > new Date()
  );

  const expiredPlans = successfulBookings?.filter(
    (booking) => new Date(booking.validity?.end) <= new Date()
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Fitness Journey
        </h1>
        <p className="text-gray-600 mb-8">
          Stay motivated and track your progress
        </p>

        {/* Toggle Buttons */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "plan"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 shadow-md hover:shadow-lg hover:-translate-y-1"
            }`}
            onClick={() => setActiveTab("plan")}
          >
            📅 My Plans
          </button>
        </div>

        {/* Only "My Plans" Tab */}
        {activeTab === "plan" && (
          <div className="space-y-12">
            {/* Active Plans */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Active Plans
              </h2>
              {activePlans?.length ? (
                <div className="space-y-8">
                  {activePlans.map((plan, index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-50 w-full"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <span className="text-2xl">🏋️</span>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-800">
                            {plan.title || `Plan ${index + 1}`}
                            <span className="text-blue-600 ml-2">•</span>
                          </h2>
                        </div>
                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          onClick={() => navigate(`/user/myplan/${plan._id}`)}
                        >
                          Go to Session
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <span className="text-blue-600 mr-2">👤</span>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-700">
                              {plan?.coach?.name || "Coach"}
                            </span>
                            <span className="text-sm text-gray-500">
                              {plan?.coach?.expertise || ""}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className="text-blue-600 mr-2">📆</span>
                          <span className="font-medium text-gray-600">
                            {new Date(plan.validity?.start).toDateString()} -{" "}
                            {new Date(plan.validity?.end).toDateString()}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span className="text-blue-600 mr-2">⏰</span>
                          <span className="font-medium text-gray-600">
                            Slot: {plan.slot?.start || "N/A"} -{" "}
                            {plan.slot?.end || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No active plans found.</p>
              )}
            </div>

            {/* Expired Plans */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Expired Plans
              </h2>
              {expiredPlans?.length ? (
                <div className="space-y-8">
                  {expiredPlans.map((plan, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-8 rounded-2xl shadow-md opacity-80 hover:shadow-lg transition-shadow duration-300 border border-gray-300"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mr-4">
                            <span className="text-2xl text-gray-500">🏋️</span>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-600">
                            {plan.title || `Expired Plan ${index + 1}`}
                            <span className="text-gray-400 ml-2">•</span>
                          </h2>
                        </div>
                        <span className="text-gray-500 font-medium">
                          Expired
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">👤</span>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-700">
                              {plan?.coach?.name || "Coach"}
                            </span>
                            <span className="text-sm text-gray-500">
                              {plan?.coach?.expertise || ""}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">📆</span>
                          <span className="font-medium text-gray-600">
                            {new Date(plan.validity?.start).toDateString()} -{" "}
                            {new Date(plan.validity?.end).toDateString()}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">⏰</span>
                          <span className="font-medium text-gray-600">
                            Slot: {plan.slot?.start || "N/A"} -{" "}
                            {plan.slot?.end || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No expired plans found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlan;
