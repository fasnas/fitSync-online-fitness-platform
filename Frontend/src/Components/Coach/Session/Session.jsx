import React, { useContext, useState, useEffect } from 'react';
import { CoachContext } from '../../Context/CoachContext';
import { useNavigate } from 'react-router-dom';

const SessionsPage = () => {
  const { bookedUsers } = useContext(CoachContext);
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map and sort sessions from bookedUsers
  useEffect(() => {
    if (bookedUsers) {
      try {
        const mappedSessions = bookedUsers
          .map(booking => {
            const startTime = booking.slot?.start || '00:00';
            const endTime = booking.slot?.end || '00:00';
            const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
            return {
              id: booking._id, // Booking ID
              userId: booking.user?._id || 'unknown', // User ID (kept for reference, not used in navigation)
              client: booking.user?.name || 'Unknown',
              plan: booking.plan === 'oneMonth' ? 'One Month Plan' : 
                    booking.plan === 'threeMonths' ? 'Three Months Plan' : 
                    booking.plan || 'Custom Plan',
              startTime,
              endTime,
              startMinutes, // For sorting
              date: booking.validity?.start 
                ? new Date(booking.validity.start).toISOString().split('T')[0] 
                : new Date().toISOString().split('T')[0],
            };
          })
          .sort((a, b) => a.startMinutes - b.startMinutes); // Sort by start time

        setSessions(mappedSessions);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load sessions.');
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
    }
  }, [bookedUsers]);

  const stats = [
    { title: 'Total Sessions', value: sessions.length },
  ];

  const handleNotify = client => {
    alert(`Notification sent to ${client}`); // Replace with real notification logic
  };

  // Handle navigation to AdminSessionPage with booking ID
  const handleStartSession = bookingId => {
    navigate(`/coach/sessions/${bookingId}`);
  };

  if (error) {
    return (
      <div className="pl-64 pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pl-64 pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center text-gray-500">
        <svg className="animate-spin h-8 w-8 mx-auto text-indigo-600" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        Loading sessions...
      </div>
    );
  }

  return (
    <div className="pl-64 pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Session Management</h1>
        <p className="text-sm text-gray-600 mt-2">Track and manage coaching sessions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* List View */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-4 text-left">Client</th>
                <th className="px-6 py-4 text-left">Date/Time</th>
                <th className="px-6 py-4 text-left">Plan</th>
                <th className="px-6 py-4 text-left">Notify</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sessions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No sessions found
                  </td>
                </tr>
              ) : (
                sessions.map(session => (
                  <tr key={session.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">{session.client[0].toUpperCase()}</span>
                        </div>
                        <p className="font-medium text-gray-900">{session.client}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {session.date} {session.startTime} - {session.endTime}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                        {session.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleNotify(session.client)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        aria-label={`Notify ${session.client}`}
                      >
                        Notify
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStartSession(session.id)} // Use booking ID
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        aria-label={`Start session for ${session.client}`}
                      >
                        Start Session
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;