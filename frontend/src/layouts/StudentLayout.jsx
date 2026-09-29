import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from '../components/navbar/StudentNavbar';
import StudentSidebar from '../components/sidebar/StudentSidebar';

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 overflow-hidden">
      <StudentSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <StudentNavbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 dark:bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
