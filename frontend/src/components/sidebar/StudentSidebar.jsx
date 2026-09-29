import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  CalendarDays,
  BookOpenCheck,
  FileSpreadsheet,
  GraduationCap,
  CreditCard,
  Bell,
  X,
  BookMarked
} from 'lucide-react';

const StudentSidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    {
      name: 'Dashboard',
      path: '/student/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'My Profile',
      path: '/student/profile',
      icon: User,
    },
    {
      name: 'Attendance',
      path: '/student/attendance',
      icon: CalendarCheck,
      badge: '96%',
      badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40',
    },
    {
      name: 'Class Timetable',
      path: '/student/timetable',
      icon: CalendarDays,
    },
    {
      name: 'Homework & Tasks',
      path: '/student/homework',
      icon: BookOpenCheck,
      badge: '3 Due',
      badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40',
    },
    {
      name: 'Exam Schedule',
      path: '/student/exams',
      icon: FileSpreadsheet,
    },
    {
      name: 'Results & Grades',
      path: '/student/results',
      icon: GraduationCap,
    },
    {
      name: 'Fee Payments',
      path: '/student/fees',
      icon: CreditCard,
    },
    {
      name: 'Notice Board',
      path: '/student/notices',
      icon: Bell,
      badge: '2 New',
      badgeClass: 'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700',
    },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-[#121215] border-r border-slate-200 dark:border-zinc-800/80 transition-all duration-300 ease-in-out lg:static ${
          isOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        {/* Branding Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-5 border-b border-slate-200 dark:border-zinc-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            {isOpen && (
              <div className="flex flex-col truncate">
                <span className="text-base font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
                  EduManage
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                  Student Portal
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800 lg:hidden cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {isOpen && (
            <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Menu Navigation
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100'
                  }`
                }
                title={!isOpen ? item.name : undefined}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-105 ${
                        isActive
                          ? 'text-white dark:text-zinc-900'
                          : 'text-slate-500 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-zinc-100'
                      }`}
                    />
                    {isOpen && (
                      <span className="truncate flex-1">{item.name}</span>
                    )}

                    {isOpen && item.badge && (
                      <span
                        className={`ml-auto px-2 py-0.5 text-[11px] font-bold rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white dark:bg-black/10 dark:text-zinc-900'
                            : item.badgeClass
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {!isOpen && isActive && (
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-slate-900 dark:bg-zinc-100 ring-2 ring-white dark:ring-zinc-900" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Student Academic Summary */}
        {isOpen && (
          <div className="p-3.5 border-t border-slate-200 dark:border-zinc-800/80">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4 text-slate-700 dark:text-zinc-300" />
                  <span className="text-xs font-bold text-slate-900 dark:text-zinc-100">
                    Term 2 Progress
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">96.4%</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                Attendance rate is on track
              </p>
              <div className="mt-2 h-1.5 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[96.4%]" />
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default StudentSidebar;
