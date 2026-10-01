import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo_clean.png';
import {
  X,
  LogOut,
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
  CalendarCheck,
  Calendar,
  Award,
  CreditCard,
  FileText,
  Bell,
  BarChart3,
  Settings,
  ChevronDown,
  UserPlus,
  ArrowRight,
  Receipt,
  FileSpreadsheet,
  Layers,
  Sparkles
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation structure with sub-menus
  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Students',
      icon: GraduationCap,
      basePath: '/admin/students',
      subItems: [
        { to: '/admin/students', label: 'Student Directory', exact: true },
        { to: '/admin/students/add', label: 'Add New Student' },
        { to: '/admin/students/promotion', label: 'Batch Promotion' },
      ]
    },
    {
      label: 'Teachers',
      icon: UserCheck,
      basePath: '/admin/teachers',
      subItems: [
        { to: '/admin/teachers', label: 'Faculty Directory', exact: true },
        { to: '/admin/teachers/add', label: 'Add New Teacher' },
      ]
    },
    {
      to: '/admin/parents',
      label: 'Parents & Guardians',
      icon: Users
    },
    {
      label: 'Classes & Subjects',
      icon: BookOpen,
      basePath: '/admin/classes',
      subItems: [
        { to: '/admin/classes', label: 'Classes Roster', exact: true },
        { to: '/admin/classes/sections', label: 'Sections Roster' },
        { to: '/admin/classes/subjects', label: 'Subject Curriculum' },
      ]
    },
    {
      label: 'Attendance',
      icon: CalendarCheck,
      basePath: '/admin/attendance',
      subItems: [
        { to: '/admin/attendance/teacher', label: 'Teacher Attendance' },
        { to: '/admin/attendance/student', label: 'Student Attendance' },
        { to: '/admin/attendance/report', label: 'Attendance Audit Report' },
      ]
    },
    {
      label: 'Timetable',
      icon: Calendar,
      basePath: '/admin/timetable',
      subItems: [
        { to: '/admin/timetable', label: 'Class Timetable', exact: true },
        { to: '/admin/timetable/teacher', label: 'Teacher Schedule' },
        { to: '/admin/timetable/room', label: 'Room & Lab Schedule' },
        { to: '/admin/timetable/conflicts', label: 'Conflict Inspector' },
      ]
    },
    {
      label: 'Examinations',
      icon: Award,
      basePath: '/admin/exams',
      subItems: [
        { to: '/admin/exams', label: 'Exam Schedule', exact: true },
        { to: '/admin/exams/marks', label: 'Subject Marks Entry' },
        { to: '/admin/exams/results', label: 'Merit Results & Leaderboard' },
        { to: '/admin/exams/report-card', label: 'Official Report Cards' },
      ]
    },
    {
      label: 'Fee Management',
      icon: CreditCard,
      basePath: '/admin/fees',
      subItems: [
        { to: '/admin/fees/structure', label: 'Fee Structure' },
        { to: '/admin/fees/collect', label: 'Collect Fees (POS)' },
        { to: '/admin/fees/pending', label: 'Defaulter Tracker' },
        { to: '/admin/fees/receipts', label: 'Payment Receipts' },
      ]
    },
    {
      to: '/admin/homework',
      label: 'Homework Desk',
      icon: FileText
    },
    {
      label: 'Notices & Circulars',
      icon: Bell,
      basePath: '/admin/notices',
      subItems: [
        { to: '/admin/notices', label: 'Circulars Bulletin', exact: true },
        { to: '/admin/notices/broadcast', label: 'Broadcast Circular' },
        { to: '/admin/notices/mail', label: 'Direct Mail & Inquiries' },
      ],
    },
    {
      to: '/admin/reports',
      label: 'Analytics & Reports',
      icon: BarChart3
    },
    {
      to: '/admin/settings',
      label: 'System Settings',
      icon: Settings
    },
  ];

  // Manage open accordion state
  const [openMenus, setOpenMenus] = useState(() => {
    const activeStates = {};
    navItems.forEach((item) => {
      if (item.subItems && item.basePath) {
        if (location.pathname.startsWith(item.basePath)) {
          activeStates[item.label] = true;
        }
      }
    });
    return activeStates;
  });

  // Auto-expand accordion when navigating to a child page
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.subItems && item.basePath && location.pathname.startsWith(item.basePath)) {
        setOpenMenus((prev) => ({ ...prev, [item.label]: true }));
      }
    });
  }, [location.pathname]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Close sidebar on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024 && isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (setIsOpen) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen && setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200/80 dark:border-slate-800 
        flex flex-col h-full shrink-0 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200/70 dark:border-slate-800 shrink-0">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5 overflow-hidden group flex-1">
            <div className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-1.5 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 shadow-xs shrink-0 group-hover:scale-105 transition-all">
              <img
                src={logo}
                alt="School Management"
                className="w-full h-full object-contain dark:brightness-0 dark:invert transition"
              />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-black text-slate-800 dark:text-white tracking-tight leading-none">
                School Management
              </span>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mt-1">
                Admin Portal
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="lg:hidden clay-btn-secondary p-1.5 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition shrink-0 ml-1"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links with Clean Sub-Option Accordions */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;

            // Direct link (no sub-items)
            if (!item.subItems) {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? 'clay-btn-emerald text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-xs'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            }

            // Accordion Item with Sub-options
            const isMenuOpen = !!openMenus[item.label];
            const isChildActive = location.pathname.startsWith(item.basePath);

            return (
              <div key={item.label} className="space-y-1">
                {/* Parent Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isChildActive
                      ? 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isChildActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isMenuOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''
                    }`}
                  />
                </button>

                {/* Sub-items dropdown list */}
                {isMenuOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-emerald-200 dark:border-emerald-800 ml-5 my-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                    {item.subItems.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        end={sub.exact}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${
                            isActive
                              ? 'clay-btn-emerald text-white shadow-xs font-bold'
                              : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30'
                          }`
                        }
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-60"></span>
                        <span className="truncate">{sub.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer with Clay Logout Button */}
        <div className="p-3.5 border-t border-slate-200/70 dark:border-slate-800 shrink-0">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full clay-btn-secondary flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-xs font-bold text-red-600 hover:bg-rose-50 dark:text-red-400 dark:hover:bg-rose-950/40 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
