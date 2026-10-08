import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  LogOut,
  Menu,
  User,
  Sun,
  Moon,
  Shield,
  Bell,
  CheckCircle2,
  AlertCircle,
  CalendarCheck,
  UserPlus,
  CreditCard,
  CheckCheck,
  Sparkles,
  Trash2,
  ChevronRight,
  X,
  Mail,
  FileText,
  Award
} from 'lucide-react';

const AdminNavbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const { getNotificationsForUser, markAsRead, markAllAsRead } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const notifications = getNotificationsForUser(user);
  const unreadCount = notifications.filter((n) => !(n.read || (n.readBy && n.readBy.includes(user?.email)))).length;

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationOpen((prev) => !prev);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
    navigate('/login');
  };

  const handleMarkAllRead = () => {
    markAllAsRead(user?.email || 'admin@school.com');
  };

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id, user?.email || 'admin@school.com');
    setIsNotificationOpen(false);

    showToast({
      title: notif.title,
      message: notif.message,
      type: notif.type === 'fees' ? 'info' : 'emerald',
      actionLabel: 'View Notices Hub',
      onAction: () => navigate('/admin/notices'),
    });

    navigate('/admin/notices');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'exam':
        return { icon: Award, color: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80' };
      case 'homework':
        return { icon: FileText, color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80' };
      case 'mail':
        return { icon: Mail, color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/80' };
      case 'fees':
        return { icon: CreditCard, color: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/80' };
      case 'attendance':
        return { icon: CalendarCheck, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80' };
      default:
        return { icon: Bell, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80' };
    }
  };

  const handleTriggerSampleToast = (type = 'success') => {
    if (type === 'attendance') {
      showToast({
        title: 'Attendance Alert',
        message: 'Class 10-A attendance marked: 38/40 students present today.',
        type: 'emerald',
      });
    } else if (type === 'teacher') {
      showToast({
        title: 'New Faculty Onboarded',
        message: 'Prof. Rajesh Sharma registered in Mathematics Department.',
        type: 'success',
      });
    } else if (type === 'fees') {
      showToast({
        title: 'Fee Payment Received',
        message: 'Payment of ₹12,500 successfully verified for Roll #1042.',
        type: 'info',
      });
    } else {
      showToast({
        title: 'Admin Notification',
        message: 'System settings synchronized with cloud server.',
        type: 'notification',
      });
    }
  };

  const getPageTitle = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    const last = segments[segments.length - 1];
    if (!last || last === 'admin') return 'Dashboard';
    return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <header className="sticky top-0 z-30 px-3 sm:px-6 pt-3 pb-1">
      <nav className="clay-card flex items-center justify-between px-4 sm:px-6 py-2.5 transition-all duration-300">
        {/* Left side: Toggle button + Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden clay-btn-secondary p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb with Emerald Clay Pill */}
          <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="clay-emerald text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-xl font-bold text-xs">
              ADMIN
            </span>
            <span className="text-slate-400 font-bold">/</span>
            <span className="capitalize font-bold text-slate-800 dark:text-slate-100">
              {getPageTitle()}
            </span>
          </div>
        </div>

        {/* Right side: Notification Bell + Theme toggle + User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 🔔 Notification Bell Button with Live Badge */}
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              onClick={toggleNotificationMenu}
              className={`clay-btn-secondary p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer relative ${
                isNotificationOpen ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600' : ''
              }`}
              title="View Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white shadow-md animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* 📬 Claymorphic Notification Dropdown Center */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-14 w-80 sm:w-96 clay-card p-0 z-50 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 border border-slate-200/80 dark:border-slate-800">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 clay-icon-pill">
                      <Bell className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-800 dark:text-white">
                        Notifications
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                {/* Notification Items List */}
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs font-semibold">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notif) => {
                      const iconData = getNotificationIcon(notif.type);
                      const Icon = iconData.icon;
                      const isRead = Boolean(notif.read || (notif.readBy && notif.readBy.includes(user?.email)));
                      const timeString = notif.createdAt ? new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently';

                      return (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`flex items-start gap-3 p-3.5 hover:bg-slate-50/90 dark:hover:bg-slate-800/50 transition cursor-pointer relative ${
                            !isRead ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 clay-icon-pill ${iconData.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">
                                {notif.title}
                              </h4>
                              <span className="text-[10px] font-medium text-slate-400 shrink-0">
                                {timeString}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug mt-0.5 line-clamp-2">
                              {notif.message}
                            </p>
                          </div>

                          {!isRead && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 self-center"></span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quick Interactive Toaster Triggers (For testing live toasts) */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Trigger Live Toaster:
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleTriggerSampleToast('attendance')}
                      className="clay-btn-secondary py-1 px-1.5 rounded-lg text-emerald-700 dark:text-emerald-400 font-bold hover:bg-emerald-50 cursor-pointer text-center"
                    >
                      Attendance
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTriggerSampleToast('teacher')}
                      className="clay-btn-secondary py-1 px-1.5 rounded-lg text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 cursor-pointer text-center"
                    >
                      Teacher
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTriggerSampleToast('fees')}
                      className="clay-btn-secondary py-1 px-1.5 rounded-lg text-purple-700 dark:text-purple-400 font-bold hover:bg-purple-50 cursor-pointer text-center"
                    >
                      Fee Alert
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dark/Light mode toggle Clay Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="clay-btn-secondary p-2.5 rounded-xl text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-amber-400 transition cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-600" />
            )}
          </button>

          {/* User Info */}
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
              {user?.name || 'Administrator'}
            </div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
              {user?.role || 'Admin'}
            </div>
          </div>

          {/* User Avatar & Clay Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={toggleUserMenu}
              className="flex items-center gap-2 p-1 rounded-2xl hover:scale-105 transition cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md clay-icon-pill overflow-hidden">
                  {user?.avatar || localStorage.getItem('admin_avatar_photo') ? (
                    <img
                      src={user?.avatar || localStorage.getItem('admin_avatar_photo')}
                      alt={user?.name || 'Admin'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.name ? user.name.charAt(0).toUpperCase() : 'A'
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-xs"></span>
              </div>
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-14 w-60 clay-card p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-slate-800 mb-1 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    {user?.avatar || localStorage.getItem('admin_avatar_photo') ? (
                      <img
                        src={user?.avatar || localStorage.getItem('admin_avatar_photo')}
                        alt={user?.name || 'Admin'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user?.name ? user.name.charAt(0).toUpperCase() : 'A'
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-800 dark:text-white truncate">
                      {user?.name || 'Administrator'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user?.email || 'admin@school.com'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate('/admin/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl transition cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>Settings</span>
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;
