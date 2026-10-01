import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import TeacherNavbar from '../components/navbar/TeacherNavbar';
import TeacherSidebar from '../components/sidebar/TeacherSidebar';
const LayoutLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full py-16">
    <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-hidden">
      <TeacherSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <TeacherNavbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto w-full">
            <Suspense fallback={<LayoutLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
