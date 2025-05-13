import React from 'react';
import { Bell } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Upcoming Session',
    message: 'You have a session scheduled with Coach Alex tomorrow at 6:00 PM.',
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'New Message',
    message: 'Coach Emily sent you a message regarding your diet plan.',
    time: '1 day ago',
  },
  {
    id: 3,
    title: 'Plan Reminder',
    message: 'You’re halfway through your 12-Week Strength Plan. Keep pushing!',
    time: '3 days ago',
  },
];

const Notifications = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-blue-600" size={28} />
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>

      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-md transition duration-300 border-l-4 border-blue-500"
          >
            <h2 className="text-lg font-semibold text-gray-700">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.message}</p>
            <span className="text-xs text-gray-400 mt-1 block">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
