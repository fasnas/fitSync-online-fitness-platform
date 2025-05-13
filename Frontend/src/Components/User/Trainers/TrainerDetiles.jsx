import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Star, Calendar, ArrowLeft, Clock } from "lucide-react";
import axiosInstance from "../../../AxiosInstance";

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { coaches } = useContext(UserContext);
  const trainer = coaches?.coach?.find((t) => t._id === id);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // console.log(selectedSlot);
  // console.log(selectedPlan);

  useEffect(() => {
    if (!trainer) {
      console.warn("Trainer not found for ID:", id);
    }
  }, [trainer, id]);

  if (!trainer) {
    return (
      <div className="p-6 text-center text-gray-500">
        Trainer not found.
        <button
          onClick={() => navigate(-1)}
          className="ml-4 text-blue-500 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleBooking = async () => {
    if (!selectedSlot || !selectedPlan) {
      setError("Please select both a slot and a plan.");
      return;
    }

    // Check for token
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to book a session.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const bookingData = {
        coachId: id,
        slot: selectedSlot,
        plan: selectedPlan.name,
        price: selectedPlan.price,
      };
      // console.log(bookingData);
      const response = await axiosInstance.post("/b/booking", bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to headers
        },
      });

      console.log(response);
      const { bookingId, amount, success } = response.data;

      if (success && bookingId && amount) {
        navigate(`/user/payment/${bookingId}`);
      } else {
        setError("Unexpected server response.");
      }

      // navigate("/user/myplan");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to create booking");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft className="mr-2" />
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow p-6">
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={trainer.image || "/default-avatar.png"}
            alt={trainer.name}
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>

        <div className="md:w-2/3 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{trainer.name}</h2>
            <p className="text-gray-600 mt-1">
              {trainer.bio || "Certified personal trainer & fitness coach."}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{trainer.experience} years of experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>
                  {trainer.freeSlots?.filter(
                    (slot) => slot.status === "available"
                  ).length || 0}{" "}
                  slots available
                </span>
              </div>
            </div>

            {trainer.expertise && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-1">Specialty:</h4>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {trainer.expertise}
                </span>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-green-600">
              <Calendar size={20} />
              <span>
                {trainer.freeSlots?.length > 0
                  ? "Available for booking"
                  : "Currently unavailable"}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-1">
              <Star size={20} className="text-yellow-500" />
              <span className="text-gray-700 font-medium">
                {trainer.rating || "No rating yet"}
              </span>
            </div>

            {trainer.freeSlots?.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Available Slots:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  {trainer.freeSlots
                    .filter((slot) => slot.status === "available")
                    .map((slot) => (
                      <div
                        key={slot._id}
                        onClick={() => handleSlotSelect(slot)}
                        className={`bg-gray-100 p-3 rounded-md flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-blue-100 ${
                          selectedSlot?._id === slot._id
                            ? "bg-blue-200 border-2 border-blue-500"
                            : ""
                        }`}
                      >
                        <Calendar size={16} />
                        <span>
                          {slot.start} - {slot.end}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {trainer.pricing && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Training Plans:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  {[
                    { name: "oneMonth", price: trainer.pricing.oneMonth },
                    { name: "threeMonths", price: trainer.pricing.threeMonths },
                    { name: "sixMonths", price: trainer.pricing.sixMonths },
                    { name: "oneYear", price: trainer.pricing.oneYear },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      onClick={() => handlePlanSelect(plan)}
                      className={`bg-gray-100 p-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-blue-100 ${
                        selectedPlan?.name === plan.name
                          ? "bg-blue-200 border-2 border-blue-500"
                          : ""
                      }`}
                    >
                      {plan.name}: ₹{plan.price}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(selectedSlot || selectedPlan) && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Your Selection:
                </h4>
                {selectedSlot && (
                  <p className="text-sm text-gray-600">
                    Slot: {selectedSlot.start} - {selectedSlot.end}
                  </p>
                )}
                {selectedPlan && (
                  <p className="text-sm text-gray-600">
                    Plan: {selectedPlan.name} (₹{selectedPlan.price})
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleBooking}
              disabled={!selectedSlot || !selectedPlan || loading}
              className={`px-6 py-3 rounded-xl text-white transition ${
                selectedSlot && selectedPlan && !loading
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : "Proceed to Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
