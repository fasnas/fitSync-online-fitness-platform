import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../../AxiosInstance';

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [coaches, setCoaches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const specialties = ["Weight Loss", "Muscle Gain", "Nutrition", "Yoga", "CrossFit", "Aerobics"];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoaches = async () => {
    try {
      const response = await axiosInstance.get('/user/coaches');
      const fetchedCoaches = response.data;
      setCoaches(fetchedCoaches);
    } catch (err) {
      setError('Failed to fetch coaches. Please try again.');
      console.error(err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUserProfile(response.data.user);
    } catch (err) {
      setError('Failed to fetch user profile. Please try again.');
      console.error(err);
    }
  };
  
  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/user/mybookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const fetchedBookings = response.data.data;
      setBookings(fetchedBookings);
    } catch (err) {
      setError('Failed to fetch bookings. Please try again.');
      console.error(err);
    }
  };

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCoaches(), fetchBookings(), fetchUserProfile()]);
      setLoading(false);
    };

    fetchData();
  }, []);


  

  return (
    <UserContext.Provider value={{ coaches, bookings, specialties,fetchUserProfile,fetchBookings,fetchCoaches,userProfile, setUserProfile,loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;