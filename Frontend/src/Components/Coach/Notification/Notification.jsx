import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, Send, Loader2 } from 'lucide-react';
import axiosInstance from '../../../AxiosInstance';

const NotificationPage = () => {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'info',
  });
  const [target, setTarget] = useState('all'); // 'all' or 'specific'
  const [specificUser, setSpecificUser] = useState(''); // User ID or email
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotification((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    if (!notification.title.trim() || !notification.message.trim()) {
      setStatus('error');
      setErrorMessage('Title and message are required.');
      return;
    }
    if (target === 'specific' && !specificUser.trim()) {
      setStatus('error');
      setErrorMessage('Please provide a user ID or email.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title: notification.title,
        message: notification.message,
        type: notification.type,
      };

      if (target === 'all') {
        await axiosInstance.post('/notifications/send-all', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatus('success');
      } else {
        // Check if specificUser is an email (contains '@')
        const isEmail = specificUser.includes('@');
        await axiosInstance.post(
          '/notifications/send-specific',
          {
            ...payload,
            [isEmail ? 'email' : 'userId']: specificUser,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStatus('success');
      }

      // Reset form
      setNotification({ title: '', message: '', type: 'info' });
      setSpecificUser('');
      setTarget('all');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.response?.data?.message || 'Failed to send notification.');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'session':
        return <Bell className="w-5 h-5 text-indigo-600" />;
      case 'payment':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="pl-64 pt-16 min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Send Notification</h1>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Notification sent successfully!
          </div>
        )}
        {status === 'error' && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSendNotification} className="bg-white p-6 rounded-xl shadow">
          <div className="space-y-6">
            {/* Target Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Send To
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="target"
                    value="all"
                    checked={target === 'all'}
                    onChange={() => setTarget('all')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">All Users</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="target"
                    value="specific"
                    checked={target === 'specific'}
                    onChange={() => setTarget('specific')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Specific User</span>
                </label>
              </div>
            </div>

            {/* Specific User Input */}
            {target === 'specific' && (
              <div>
                <label htmlFor="specificUser" className="block text-sm font-medium text-gray-700 mb-2">
                  User ID or Email
                </label>
                <input
                  type="text"
                  id="specificUser"
                  value={specificUser}
                  onChange={(e) => setSpecificUser(e.target.value)}
                  placeholder="Enter user ID or email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Notification Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Notification Type
              </label>
              <div className="flex items-center space-x-4">
                {['info', 'session', 'payment', 'alert'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={notification.type === type}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 flex items-center text-sm text-gray-600">
                      {getIcon(type)}
                      <span className="ml-1 capitalize">{type}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={notification.title}
                onChange={handleInputChange}
                placeholder="Enter notification title"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={notification.message}
                onChange={handleInputChange}
                placeholder="Enter notification message"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`px-6 py-2 rounded-lg text-white flex items-center ${
                status === 'loading'
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Notification
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationPage;