import { createContext, useState, useEffect } from "react";
import axiosInstance from "../../AxiosInstance";

export const CoachContext = createContext();

export const CoachProvider = ({ children }) => {
  const [bookedUsers, setBookedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coachProfile, setCoachProfile] = useState(null);

  // Fetch booked users
  const fetchBookedUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/coach/bookeduser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookedUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching booked users:", error);
    }
  };

  // Fetch coach profile
  const fetchCoachProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/coach/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoachProfile(response.data.user); // adjust based on your API shape
    } catch (error) {
      console.error("Error fetching coach profile:", error);
    }
  };

  // Fetch all on mount
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchBookedUsers(), fetchCoachProfile()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <CoachContext.Provider value={{ bookedUsers, coachProfile,fetchBookedUsers,fetchCoachProfile,loading }}>
      {children}
    </CoachContext.Provider>
  );
};

export default CoachProvider;
