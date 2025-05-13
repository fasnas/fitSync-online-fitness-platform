import React, { useState } from 'react';

const users = [
  { id: 1, name: 'Coach Alex', planActive: true },
  { id: 2, name: 'Coach Sarah', planActive: false },
  { id: 3, name: 'Coach Max', planActive: true },
  { id: 4, name: 'Coach Lisa', planActive: false },
];

const messagesData = {
  1: [
    { sender: 'user', text: 'Hi Coach Alex!' },
    { sender: 'coach', text: 'Hello! Ready for today’s session?' },
  ],
  2: [{ sender: 'coach', text: 'Please update your progress' }],
  3: [],
  4: [{ sender: 'user', text: 'Can we reschedule?' }],
};

const UserChatSection = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(messagesData);

  const currentCoach = users.find((u) => u.id === activeChat);
  const isChatLocked = !currentCoach.planActive;

  const handleSend = () => {
    if (messageInput.trim() === '') return;
    const updatedMessages = { ...messages };
    updatedMessages[activeChat] = [
      ...(updatedMessages[activeChat] || []),
      { sender: 'user', text: messageInput },
    ];
    setMessages(updatedMessages);
    setMessageInput('');
  };

  return (
    <div className="flex h-[80vh] bg-white shadow rounded-xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r overflow-y-auto">
        <h2 className="text-xl font-semibold p-4">Chats</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className={`p-4 cursor-pointer hover:bg-blue-100 ${
              activeChat === user.id ? 'bg-blue-200 font-bold' : ''
            }`}
            onClick={() => setActiveChat(user.id)}
          >
            {user.name}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-4 border-b font-semibold text-lg">
          {currentCoach?.name}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages[activeChat]?.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-gray-200 text-gray-800 self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        {isChatLocked ? (
          <div className="p-4 text-center bg-gray-100 border-t text-gray-600 font-medium">
            🔒 Your plan with {currentCoach.name} has expired. Renew to chat again.
          </div>
        ) : (
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChatSection;
