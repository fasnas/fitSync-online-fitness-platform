import React from 'react';
import UserNavbar from './Navbar';
import UserSidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <UserNavbar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <UserSidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
