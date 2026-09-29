import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from '../components/navbar/StudentNavbar';
import StudentSidebar from '../components/sidebar/StudentSidebar';

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-[#0d0d10] dark:text-zinc-100 overflow-hidden font-sans">
      {/* Neutral Sidebar */}
      <StudentSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Layout Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Navbar */}
        <StudentNavbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50/70 dark:bg-[#0d0d10]">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-7">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
