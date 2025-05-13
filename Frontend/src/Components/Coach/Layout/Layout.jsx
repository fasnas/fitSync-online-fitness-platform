import React from 'react';
import CoachNavbar from '../Home/CoachNavbar';
import CoachSidebar from '../Home/CoachSidebar';
import { Outlet } from 'react-router-dom';

const CoachLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <CoachNavbar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <CoachSidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CoachLayout;
