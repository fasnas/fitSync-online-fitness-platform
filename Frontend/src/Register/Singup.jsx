import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../AxiosInstance";

const CoachApplicationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    expertise: "",
    pricing: { oneMonth: "", threeMonths: "", sixMonths: "", oneYear: "" },
    freeSlots: [{ start: "", end: "" }],
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("pricing.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        pricing: { ...prev.pricing, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSlotChange = (index, field, value) => {
    setFormData((prev) => {
      const newFreeSlots = [...prev.freeSlots];
      newFreeSlots[index] = { ...newFreeSlots[index], [field]: value };
      return { ...prev, freeSlots: newFreeSlots };
    });
  };

  const addSlot = () => {
    setFormData((prev) => ({
      ...prev,
      freeSlots: [...prev.freeSlots, { start: "", end: "" }],
    }));
  };

  const removeSlot = (index) => {
    setFormData((prev) => ({
      ...prev,
      freeSlots: prev.freeSlots.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0]}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("experience", formData.experience);
      data.append("expertise", formData.expertise);
      // Append pricing fields individually
      data.append("pricing[oneMonth]", formData.pricing.oneMonth);
      data.append("pricing[threeMonths]", formData.pricing.threeMonths);
      data.append("pricing[sixMonths]", formData.pricing.sixMonths);
      data.append("pricing[oneYear]", formData.pricing.oneYear);
      // Append freeSlots as individual objects
      formData.freeSlots.forEach((slot, index) => {
        data.append(`freeSlots[${index}][start]`, slot.start);
        data.append(`freeSlots[${index}][end]`, slot.end);
      });
      if (formData.image) data.append("image", formData.image);

      await axiosInstance.post("/coach/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        navigate("/login");
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit application.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white-10 bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Apply as a Coach</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {success && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <strong className="font-bold">Success!</strong> Your application has been submitted successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Professional Information</h3>
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Years of Experience"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="w-1/2">
                  <select
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Expertise</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Yoga">Yoga</option>
                    <option value="CrossFit">CrossFit</option>
                    <option value="Aerobics">Aerobics</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Pricing Information (in $)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">1 Month</label>
                  <input
                    type="number"
                    name="pricing.oneMonth"
                    value={formData.pricing.oneMonth}
                    onChange={handleInputChange}
                    placeholder="Price"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">3 Months</label>
                  <input
                    type="number"
                    name="pricing.threeMonths"
                    value={formData.pricing.threeMonths}
                    onChange={handleInputChange}
                    placeholder="Price"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">6 Months</label>
                  <input
                    type="number"
                    name="pricing.sixMonths"
                    value={formData.pricing.sixMonths}
                    onChange={handleInputChange}
                    placeholder="Price"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">1 Year</label>
                  <input
                    type="number"
                    name="pricing.oneYear"
                    value={formData.pricing.oneYear}
                    onChange={handleInputChange}
                    placeholder="Price"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>

            {/* Available Time Slots */}
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Available Time Slots</h3>
                <button
                  type="button"
                  onClick={addSlot}
                  className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Add Slot
                </button>
              </div>
              {formData.freeSlots.map((slot, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <div className="w-1/3">
                    <input
                      type="time"
                      value={slot.start}
                      onChange={(e) => handleSlotChange(index, "start", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="w-1/3">
                    <input
                      type="time"
                      value={slot.end}
                      onChange={(e) => handleSlotChange(index, "end", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  {formData.freeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSlot(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Buttons */}
            <div className="pt-4">
              <p className="text-sm text-gray-600 mb-4">
                Your application will be reviewed by our team. You will be notified once approved.
              </p>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      await axiosInstance.post("/user/register", userData);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Let's start your FitSync journey</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                id="terms"
                className="h-4 w-4 text-blue-600 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600 text-left">
                I agree to fitSync Terms of Use and Privacy Policy
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Apply As Coach?{" "}
          <button onClick={() => setIsModalOpen(true)} className="text-blue-600 hover:underline">
            Apply
          </button>
        </p>
      </div>

      <CoachApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Signup;
