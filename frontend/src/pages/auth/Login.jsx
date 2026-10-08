import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { authApi } from '../../services/authApi';
import logo from '../../assets/logo_clean.webp';
import loginImage from '../../assets/LoginImage.webp';
import Loader from '../../components/common/Loader';
import {
  ShieldCheck,
  UserCheck,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [role, setRole] = useState('admin'); // 'admin' | 'teacher' | 'student'
  const [formData, setFormData] = useState({
    email: 'admin@school.com',
    password: 'password123',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    if (selectedRole === 'admin') {
      setFormData((prev) => ({ ...prev, email: 'admin@school.com' }));
    } else if (selectedRole === 'teacher') {
      setFormData((prev) => ({ ...prev, email: 'teacher@school.com' }));
    } else {
      setFormData((prev) => ({ ...prev, email: 'student@school.com' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (role === 'admin') {
      try {
        const res = await authApi.adminLogin({
          email: formData.email,
          password: formData.password,
        });

        const adminData = res.data || {};
        const userName = adminData.email ? adminData.email.split('@')[0] : 'Admin';
        const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

        login(
          {
            id: adminData._id || adminData.id,
            name: formattedName,
            email: adminData.email || formData.email,
            role: 'admin',
          },
          'admin-jwt-token'
        );

        showToast({
          title: `Welcome, ${formattedName}!`,
          message: res.message || 'Logged in to Admin Portal',
          type: 'emerald',
          duration: 4500,
        });

        navigate('/admin/dashboard');
      } catch (err) {
        const errMsg = err.message || 'Invalid admin credentials or server offline';
        setError(errMsg);
        showToast({
          title: 'Admin Login Error',
          message: errMsg,
          type: 'rose',
          duration: 4500,
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setTimeout(() => {
      const userName = role === 'teacher' ? 'Prof. Sharma' : 'Alex Johnson';
      login(
        {
          name: userName,
          email: formData.email,
          role: role,
        },
        'sample-jwt-token'
      );
      setIsLoading(false);

      showToast({
        title: `Welcome back, ${userName}!`,
        message: `Successfully logged in as ${role.toUpperCase()}`,
        type: role === 'teacher' ? 'amber' : 'sky',
        duration: 4500,
      });

      navigate(`/${role}/dashboard`);
    }, 350);
  };

  const handleQuickLogin = (targetRole) => {
    const userName = targetRole === 'admin' ? 'Admin User' : targetRole === 'teacher' ? 'Prof. Sharma' : 'Alex Johnson';
    login(
      {
        name: userName,
        email: `${targetRole}@school.com`,
        role: targetRole,
      },
      'sample-jwt-token'
    );

    showToast({
      title: `Quick Access Activated`,
      message: `Logged in as ${targetRole.toUpperCase()} (${userName})`,
      type: targetRole === 'admin' ? 'emerald' : targetRole === 'teacher' ? 'amber' : 'sky',
      duration: 4500,
    });

    navigate(`/${targetRole}/dashboard`);
  };

  const getSubmitBtnClass = () => {
    if (role === 'admin') return 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/30';
    if (role === 'teacher') return 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-500/30';
    return 'bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sky-500/30';
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans overflow-x-hidden">

      {/* =========================================================================
          FULL SCREEN BACKGROUND IMAGE WITH BLUR & HARMONIOUS AMBIENT LIGHTING
          ========================================================================= */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Full Image */}
        <img
          src={loginImage}
          alt="School Campus Background"
          loading="lazy"
          decoding="async"
          width="1080"
          height="720"
          className="w-full h-full object-cover object-center transform scale-102"
        />

        {/* Atmospheric Blur & Unified Color Tint Overlay */}
        <div className="absolute inset-0 bg-slate-950/45 dark:bg-slate-950/70 backdrop-blur-[3px] transition-all duration-300" />

        {/* Cohesive Ambient Glows (Luminous Sky & Indigo) */}
        <div className="absolute top-0 left-0 w-[45rem] h-[45rem] bg-sky-500/20 dark:bg-sky-600/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-indigo-600/25 dark:bg-indigo-700/25 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-slate-950/55" />
      </div>

      {/* Top Bar Floating Controls (Theme Switcher Only) */}
      <div className="fixed top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 z-30 flex items-center justify-end pointer-events-auto">
        {/* Theme Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          className="clay-btn-secondary px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-amber-400 transition cursor-pointer flex items-center gap-1.5 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-white/50 dark:border-slate-700/60 shadow-xl"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-700" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          MAIN WRAPPER: LEFT HERO TEXT ON IMAGE + RIGHT SIDE LOGIN FORM
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl pt-16 sm:pt-14 pb-4 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[85vh]">

        {/* LEFT SIDE: Hero Brand, Info & Pillars Over the Image */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left text-white px-2 sm:px-4">

          {/* Standalone Large Logo with Name Underneath */}
          <div className="flex flex-col items-start mb-6 animate-from-left anim-delay-100">
            {/* Big Standalone Logo Container with Original Logo Colors */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/95 dark:bg-white/90 p-3.5 shadow-2xl ring-4 ring-white/20 backdrop-blur-2xl flex items-center justify-center transform hover:scale-105 transition-all duration-300 mb-3.5 border border-white/60">
              <img
                src={logo}
                alt="EduManage Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Name Underneath the Logo */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/25 border border-sky-400/40 text-xs font-bold text-sky-200 backdrop-blur-md mb-2 shadow-sm w-fit">
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>Smart Academic Management</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                EduManage <span className="text-sky-300 font-extrabold">Portal</span>
              </h2>
              <span className="text-xs sm:text-sm text-slate-300 font-medium drop-shadow-sm mt-0.5">
                Next-Generation School Management System
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-lg animate-from-left anim-delay-200">
            Empowering Education, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-200 to-sky-400 drop-shadow-md">
              Building Bright Futures.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-lg mb-6 font-medium drop-shadow-sm animate-from-left anim-delay-300">
            Unified digital ecosystem for students, teachers, and administrators. Manage attendance, exams, fees, timetable, and academic growth in one seamless experience.
          </p>

          {/* 4 Interactive Glass Pillar Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg">
            <div className="p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xl border border-white/15 hover:border-sky-400/50 shadow-xl text-center hover:-translate-y-1 transition-all duration-300 group animate-from-left anim-delay-400">
              <div className="w-8 h-8 mx-auto mb-1.5 rounded-xl bg-sky-500/20 group-hover:bg-sky-500/30 text-sky-300 flex items-center justify-center transition-colors">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="block text-xs font-black text-white tracking-wider uppercase">Education</span>
              <span className="text-[10px] text-slate-300 font-medium">Quality Learning</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xl border border-white/15 hover:border-indigo-400/50 shadow-xl text-center hover:-translate-y-1 transition-all duration-300 group animate-from-left anim-delay-500">
              <div className="w-8 h-8 mx-auto mb-1.5 rounded-xl bg-indigo-500/20 group-hover:bg-indigo-500/30 text-indigo-300 flex items-center justify-center transition-colors">
                <Award className="w-4 h-4" />
              </div>
              <span className="block text-xs font-black text-white tracking-wider uppercase">Discipline</span>
              <span className="text-[10px] text-slate-300 font-medium">Core Values</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xl border border-white/15 hover:border-cyan-400/50 shadow-xl text-center hover:-translate-y-1 transition-all duration-300 group animate-from-left anim-delay-600">
              <div className="w-8 h-8 mx-auto mb-1.5 rounded-xl bg-cyan-500/20 group-hover:bg-cyan-500/30 text-cyan-300 flex items-center justify-center transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="block text-xs font-black text-white tracking-wider uppercase">Knowledge</span>
              <span className="text-[10px] text-slate-300 font-medium">Skill Building</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xl border border-white/15 hover:border-teal-400/50 shadow-xl text-center hover:-translate-y-1 transition-all duration-300 group animate-from-left anim-delay-700">
              <div className="w-8 h-8 mx-auto mb-1.5 rounded-xl bg-teal-500/20 group-hover:bg-teal-500/30 text-teal-300 flex items-center justify-center transition-colors">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="block text-xs font-black text-white tracking-wider uppercase">Bright Future</span>
              <span className="text-[10px] text-slate-300 font-medium">Endless Growth</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Floating Dynamic Glassmorphic Login Form Card (Light & Dark Theme Adaptive) */}
        <div className="w-full lg:w-[460px] xl:w-[480px] animate-fade-in anim-delay-100">
          <div className="p-6 sm:p-8 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-white/60 dark:border-white/15 shadow-2xl rounded-3xl text-slate-800 dark:text-white transition-colors duration-300">

            {/* Header Form Title (Step 1) */}
            <div className="mb-4 animate-from-right anim-delay-200">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight drop-shadow-xs">
                Login to Portal
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 font-medium">
                Select your role to access your personalized workspace
              </p>
            </div>

            {/* Role Switcher: Admin / Teacher / Student (Step 2) */}
            <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/70 border border-slate-200/80 dark:border-white/15 mb-4 animate-from-right anim-delay-300">
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'admin'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('teacher')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'teacher'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-50/80 dark:hover:bg-amber-950/40'
                  }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Teacher</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'student'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/50 text-xs font-semibold text-rose-600 dark:text-rose-200 animate-from-right anim-delay-350">
                  {error}
                </div>
              )}

              {/* Email Field (Step 3) */}
              <div className="animate-from-right anim-delay-400">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@school.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 bg-white/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-white/20 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Field (Step 4) */}
              <div className="animate-from-right anim-delay-500">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 bg-white/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-white/20 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox (Step 5) */}
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-0.5 animate-from-right anim-delay-600">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sky-500 focus:ring-sky-500 w-3.5 h-3.5"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              {/* Submit Button (Step 6: Clean Minimal Button + Hover Lift + Hover Light Beam) */}
              <div className="animate-from-right anim-delay-700 pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn-shine ${getSubmitBtnClass()} w-full h-12 py-3.5 px-6 text-sm font-black tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] border border-white/20 uppercase`}
                >
                  {isLoading ? (
                    <Loader size="xs" variant="white" />
                  ) : (
                    <div className="relative z-20 flex items-center justify-center gap-2.5">
                      <span className="drop-shadow-sm font-black tracking-widest text-xs sm:text-sm text-white">
                        LOGIN
                      </span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1.5 drop-shadow-sm stroke-[2.5]" />
                    </div>
                  )}
                </button>
              </div>
            </form>

            {/* Direct Link to Sign Up (Step 7) */}
            <div className="mt-4 text-center animate-from-right anim-delay-800">
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors underline-offset-2 hover:underline"
                >
                  Create New Account
                </Link>
              </p>
            </div>

            {/* 1-Click Fast Direct Demo Access (Step 8) */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-white/10 text-center animate-from-right anim-delay-900">
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-300 mb-2">
                ⚡ 1-Click Direct Demo Login
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="py-1.5 px-2 rounded-xl text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100/80 dark:bg-emerald-500/15 dark:hover:bg-emerald-500/25 border border-emerald-200/80 dark:border-emerald-500/30 transition cursor-pointer"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('teacher')}
                  className="py-1.5 px-2 rounded-xl text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-500/15 dark:hover:bg-amber-500/25 border border-amber-200/80 dark:border-amber-500/30 transition cursor-pointer"
                >
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('student')}
                  className="py-1.5 px-2 rounded-xl text-[11px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 hover:bg-sky-100/80 dark:bg-sky-500/15 dark:hover:bg-sky-500/25 border border-sky-200/80 dark:border-sky-500/30 transition cursor-pointer"
                >
                  Student
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Login;
