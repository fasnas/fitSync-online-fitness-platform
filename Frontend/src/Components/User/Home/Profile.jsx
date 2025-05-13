import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import axiosInstance from "../../../AxiosInstance";

const Profile = () => {
  const { userProfile, setUserProfile, fetchUserProfile } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    height: "",
    weight: "",
    gender: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        age: userProfile.age || "",
        phone: userProfile.phone || "",
        height: userProfile.height || "",
        weight: userProfile.weight || "",
        gender: userProfile.gender || "",
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch("/user/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(res.data.updatedUser);
      setEditing(false);
      alert("Profile updated successfully.");
      await fetchUserProfile();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(
        "/user/changepassword",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Password updated successfully.");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border">
        <div className="h-32 bg-gray-100 relative">
          <div className="absolute -bottom-7 left-8">
            <img
              src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>

        <div className="p-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 pt-12 md:pt-0 space-y-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-800">
                {userProfile?.name || "N/A"}
              </h2>
              <p className="text-gray-600">{userProfile?.email || "N/A"}</p>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="w-full px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              {editing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          <div className="w-full md:w-2/3 space-y-8">
            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Edit Profile</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["name", "age", "phone", "height", "weight", "gender"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm text-gray-600 capitalize">{field}</label>
                      <input
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                  Save Changes
                </button>
              </form>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(() => {
                    const weight = userProfile?.weight;
                    const height = userProfile?.height;
                    const bmi =
                      weight && height
                        ? (weight / ((height / 100) * (height / 100))).toFixed(1)
                        : "N/A";

                    return [
                      { label: "Age", value: userProfile?.age ?? "N/A" },
                      { label: "Phone", value: userProfile?.phone ?? "N/A" },
                      {
                        label: "Height",
                        value: height != null ? `${height} cm` : "N/A",
                      },
                      {
                        label: "Weight",
                        value: weight != null ? `${weight} kg` : "N/A",
                      },
                      { label: "BMI", value: bmi },
                      { label: "Gender", value: userProfile?.gender ?? "N/A" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                        <div className="text-gray-800 font-medium">{item.value}</div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}

            <div className="border-t border-gray-100 pt-6">
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="text-gray-700 hover:text-gray-900 flex items-center gap-2"
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
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                {showPasswordForm ? "Cancel Password Change" : "Change Password"}
              </button>

              {showPasswordForm && (
                <div className="mt-4 bg-gray-50 p-6 rounded-lg border space-y-4">
                  <h4 className="text-lg font-medium text-gray-800">Change Password</h4>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Current Password"
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="New Password"
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm Password"
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                    <button type="submit" className="bg-gray-800 text-white py-2 w-full rounded">
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
