import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  User,
  LogOut,
  Calendar,
  CreditCard,
  BookOpen,
  ChevronDown,
  Clock,
  Sparkles,
  X
} from 'lucide-react';

const StudentNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const studentName = user?.name || 'Alex Johnson';
  const studentEmail = user?.email || 'alex.johnson@student.school.edu';
  const studentClass = 'Grade 10-A';
  const rollNumber = 'STU-1024';

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Mathematics Homework Due Tomorrow',
      desc: 'Chapter 5 Quadratic Equations exercise questions 1 to 15.',
      time: '15m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Physics Midterm Results Published',
      desc: 'Your score: 94/100 (Grade A+). Tap to view breakdown.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Annual Sports Meet Notice',
      desc: 'Registration open for athletics and relay events.',
      time: '1 day ago',
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 md:px-8 dark:border-zinc-800/80 dark:bg-[#121215]/95 backdrop-blur-md transition-colors">
      {/* Left: Sidebar Toggle & Portal Badge */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-zinc-100">
              Student Portal
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
              <Sparkles className="h-3 w-3 text-amber-500" />
              {studentClass}
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-zinc-400">
            Roll No: <strong className="text-slate-800 dark:text-zinc-200">{rollNumber}</strong> • Academic Term 2025-26
          </span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-zinc-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search subjects, assignments, timetable..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400/20 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-600 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions, Theme & Profile Dropdown */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Theme Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen((prev) => !prev)}
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-zinc-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-[#18181b] animate-in fade-in slide-in-from-top-3 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200 font-semibold cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-3 max-h-72 space-y-2 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border transition ${
                        item.unread
                          ? 'bg-slate-50 border-slate-200 dark:bg-zinc-800/60 dark:border-zinc-700'
                          : 'bg-white border-transparent hover:bg-slate-50 dark:bg-transparent dark:hover:bg-zinc-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-xs text-slate-900 dark:text-zinc-100">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-zinc-400 shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 dark:text-zinc-300 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-zinc-800 text-center">
                <Link
                  to="/student/notices"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white"
                >
                  View All School Notices →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-1 pr-3 text-left hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 dark:bg-zinc-200 font-bold text-xs text-white dark:text-zinc-900 shadow-xs">
              {studentName.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 dark:text-zinc-100 leading-tight">
                {studentName}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                {studentClass}
              </div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
          </button>

          {/* Profile Menu Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-zinc-800 dark:bg-[#18181b] z-50 animate-in fade-in slide-in-from-top-3">
              <div className="p-2.5 border-b border-slate-100 dark:border-zinc-800">
                <p className="text-xs font-bold text-slate-900 dark:text-zinc-100">{studentName}</p>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate mt-0.5">{studentEmail}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Active Student</span>
                </div>
              </div>

              <div className="py-1.5 space-y-0.5">
                <Link
                  to="/student/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
                >
                  <User className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/student/timetable"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
                >
                  <Calendar className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
                  <span>Class Timetable</span>
                </Link>

                <Link
                  to="/student/homework"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
                >
                  <BookOpen className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
                  <span>My Homework</span>
                </Link>

                <Link
                  to="/student/fees"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
                >
                  <CreditCard className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
                  <span>Fee Payments</span>
                </Link>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StudentNavbar;
