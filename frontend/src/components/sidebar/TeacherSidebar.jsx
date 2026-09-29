import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo_clean.png';
import {

  X,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarCheck,
  Calendar,
  FileText,
  Award,
  Bell,
  UserCheck,
  Sparkles
} from 'lucide-react';

const TeacherSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { to: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/teacher/classes', label: 'My Classes', icon: BookOpen },
    { to: '/teacher/students', label: 'My Students', icon: Users },
    { to: '/teacher/attendance', label: 'Attendance', icon: CalendarCheck },
    { to: '/teacher/timetable', label: 'Timetable', icon: Calendar },
    { to: '/teacher/homework', label: 'Homework', icon: FileText },
    { to: '/teacher/exams', label: 'Exams', icon: Award },
    { to: '/teacher/marks', label: 'Marks', icon: Award },
    { to: '/teacher/notices', label: 'Notices', icon: Bell },
    { to: '/teacher/profile', label: 'Profile', icon: UserCheck },
  ];

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
      {/* Mobile Backdrop Overlay with smooth fade */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen && setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200/80 dark:border-slate-800 
        flex flex-col h-full shrink-0 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'
          }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200/70 dark:border-slate-800 shrink-0">
          <Link to="/teacher/dashboard" className="flex items-center gap-2.5 overflow-hidden group flex-1">
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
              <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider mt-1">
                Teacher Portal
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





        {/* Navigation Links with Red / Rose Active State */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${isActive
                    ? 'clay-btn-rose text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-rose-50/70 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 hover:shadow-xs'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{link.label}</span>
              </NavLink>
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

export default TeacherSidebar;
