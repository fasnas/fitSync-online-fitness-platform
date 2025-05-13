import React, { useContext, useEffect, useState } from 'react';
import { CoachContext } from '../../Context/CoachContext';
import axiosInstance from '../../../AxiosInstance';

const Settings = () => {
  const { coachProfile } = useContext(CoachContext);
  const [freeSlots, setFreeSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ start: '', end: '', status: 'available' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState({ error: '', success: '' });

  useEffect(() => {
    if (coachProfile?.freeSlots?.length) {
      setFreeSlots(coachProfile.freeSlots);
    } else {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const { data } = await axiosInstance.get('/coach/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFreeSlots(data.freeSlots || []);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      };
      fetchProfile();
    }
  }, [coachProfile]);

  const handleChange = (index, field, value) => {
    const updated = [...freeSlots];
    updated[index] = { ...updated[index], [field]: value };
    setFreeSlots(updated);
  };

  const handleNewSlotChange = (field, value) => {
    setNewSlot(prev => ({ ...prev, [field]: value }));
  };

  const addSlot = () => {
    if (!newSlot.start || !newSlot.end) {
      setMessage({ error: 'Start and end times are required.', success: '' });
      return;
    }
    setFreeSlots([...freeSlots, { ...newSlot }]);
    setNewSlot({ start: '', end: '', status: 'available' });
    setMessage({ error: '', success: '' });
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.patch('/coach/slotupdate', { freeSlots }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ success: 'Profile updated!', error: '' });
      setEditingIndex(null);
      setTimeout(() => setMessage({ success: '', error: '' }), 3000);
    } catch (err) {
      setMessage({ error: 'Update failed. Try again.', success: '' });
    }
  };

  return (
    <div className="pl-64 pt-16 min-h-screen bg-white p-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Settings</h1>

      {/* Profile Info */}
      <div className="bg-white p-8 rounded-xl shadow-2xl hover:shadow-xl transition-shadow duration-300 ease-in-out mb-8 flex items-center">
        <img
          src={coachProfile?.image || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mr-6 border-4 border-gradient-to-r from-teal-400 to-blue-600"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{coachProfile?.name || 'Coach'}</h2>
      </div>

      {/* Free Slots */}
      <div className="bg-white p-8 rounded-xl shadow-2xl hover:shadow-xl transition-shadow duration-300 ease-in-out mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Slots</h2>

        {freeSlots.length === 0 ? (
          <p className="text-gray-500">No slots available.</p>
        ) : (
          freeSlots.map((slot, index) => (
            <div key={slot._id} className="flex items-center mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
              {editingIndex === index ? (
                <>
                  <input
                    type="time"
                    value={slot.start}
                    onChange={e => handleChange(index, 'start', e.target.value)}
                    className="input border-2 border-gray-300 rounded-md p-3 w-32"
                  />
                  <input
                    type="time"
                    value={slot.end}
                    onChange={e => handleChange(index, 'end', e.target.value)}
                    className="input border-2 border-gray-300 rounded-md p-3 w-32 ml-4"
                  />
                  <span className="w-32 text-gray-600 capitalize ml-4">{slot.status}</span>
                  <button
                    onClick={updateProfile}
                    className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-indigo-600 text-white hover:scale-105"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="w-32 text-gray-600">{slot.start}</span>
                  <span className="w-32 text-gray-600">{slot.end}</span>
                  <span className="w-32 text-gray-600 capitalize">{slot.status}</span>
                  {slot.status === 'available' && (
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-indigo-600 text-white hover:scale-105"
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add New Slot */}
      <div className="bg-white p-8 rounded-xl shadow-2xl hover:shadow-xl transition-shadow duration-300 ease-in-out mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Slot</h2>
        <div className="flex items-center space-x-4">
          <input
            type="time"
            value={newSlot.start}
            onChange={e => handleNewSlotChange('start', e.target.value)}
            className="input border-2 border-gray-300 rounded-md p-3 w-32"
          />
          <input
            type="time"
            value={newSlot.end}
            onChange={e => handleNewSlotChange('end', e.target.value)}
            className="input border-2 border-gray-300 rounded-md p-3 w-32"
          />
          <select
            value={newSlot.status}
            onChange={e => handleNewSlotChange('status', e.target.value)}
            className="input border-2 border-gray-300 rounded-md p-3 w-32"
          >
            <option value="available">Available</option>
            <option value="consumed">Consumed</option>
          </select>
          <button
            onClick={addSlot}
            className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-indigo-600 text-white hover:scale-105"
          >
            Add
          </button>
        </div>
      </div>

      {/* Update Profile */}
      <div className="flex justify-end mb-8">
        <button
          onClick={updateProfile}
          className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-indigo-600 text-white hover:scale-105"
        >
          Update Profile
        </button>
      </div>

      {/* Messages */}
      {message.error && <p className="text-red-500 mt-4 text-lg">{message.error}</p>}
      {message.success && <p className="text-green-500 mt-4 text-lg">{message.success}</p>}
    </div>
  );
};

export default Settings;