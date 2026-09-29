import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LogOut, Menu, User, Sun, Moon, Shield } from 'lucide-react';

const AdminNavbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
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
            className="lg:hidden clay-btn-secondary p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb with Pastel Clay Pill */}
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

        {/* Right side: Theme toggle + User profile menu */}
        <div className="flex items-center gap-3">
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
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md clay-icon-pill">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-xs"></span>
              </div>
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-14 w-60 clay-card p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <div className="text-sm font-bold text-slate-800 dark:text-white truncate">
                    {user?.name || 'Administrator'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user?.email || 'admin@school.com'}
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
