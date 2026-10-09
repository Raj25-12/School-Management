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
  Users,
  GraduationCap,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  Zap
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
          duration: 4000,
        });

        navigate('/admin/dashboard');
      } catch (err) {
        const errMsg = err.message || 'Invalid admin credentials or server offline';
        setError(errMsg);
        showToast({
          title: 'Admin Login Error',
          message: errMsg,
          type: 'rose',
          duration: 4000,
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
        duration: 4000,
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
      title: `⚡ Quick Access Activated`,
      message: `Logged in as ${targetRole.toUpperCase()} (${userName})`,
      type: targetRole === 'admin' ? 'emerald' : targetRole === 'teacher' ? 'amber' : 'sky',
      duration: 3500,
    });

    navigate(`/${targetRole}/dashboard`);
  };

  const getRoleTheme = () => {
    if (role === 'admin') {
      return {
        titleAccent: 'text-emerald-500 dark:text-emerald-400',
        submitBtn: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/30',
        link: 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300',
        focusRing: 'focus:border-emerald-500 focus:ring-emerald-500/20',
        checkbox: 'text-emerald-500 focus:ring-emerald-500',
      };
    }
    if (role === 'teacher') {
      return {
        titleAccent: 'text-amber-500 dark:text-amber-400',
        submitBtn: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-500/30',
        link: 'text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300',
        focusRing: 'focus:border-amber-500 focus:ring-amber-500/20',
        checkbox: 'text-amber-500 focus:ring-amber-500',
      };
    }
    return {
      titleAccent: 'text-sky-500 dark:text-sky-400',
      submitBtn: 'bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sky-500/30',
      link: 'text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300',
      focusRing: 'focus:border-sky-500 focus:ring-sky-500/20',
      checkbox: 'text-sky-500 focus:ring-sky-500',
    };
  };

  const roleTheme = getRoleTheme();

  return (
    <div className="h-screen w-full flex items-center justify-center font-sans relative overflow-hidden select-none">
      
      {/* =========================================================================
          FULL-SCREEN BACKGROUND IMAGE (COVERS ENTIRE SCREEN)
          ========================================================================= */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={loginImage}
          alt="School Campus Background"
          className="w-full h-full object-cover object-center transform scale-102"
        />
        {/* Crisp Readability Overlay & Subtle Atmospheric Vignette */}
        <div className="absolute inset-0 bg-slate-950/35 dark:bg-slate-950/60 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-slate-950/30" />
        
        {/* Soft Ambient Corner Glows */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      {/* Floating Theme Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-full backdrop-blur-md bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 transition-all shadow-md cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-slate-700" />
          )}
        </button>
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT: HERO ON LEFT + FLOATING CARD ON RIGHT
          ========================================================================= */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 py-4 overflow-y-auto lg:overflow-hidden">
        
        {/* LEFT SIDE: Brand Logo + Welcome to EduManage + Glowing Arrow */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center select-none text-left py-4">
          
          {/* Top Brand */}
          <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
            <div className="w-10 h-10 rounded-xl bg-teal-400/25 backdrop-blur-md border border-teal-400/50 flex items-center justify-center text-teal-300 shadow-xl">
              <GraduationCap className="w-5 h-5 text-teal-300 drop-shadow-md stroke-[2.5]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Edu<span className="text-teal-400">Manage</span>
            </span>
          </div>

          <div className="flex items-center gap-4 xl:gap-6">
            <div>
              {/* Heading with Glowing Cyan Text */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] tracking-tight">
                Welcome to <br />
                <span className="text-[#00dfc4] drop-shadow-[0_0_30px_rgba(0,223,196,0.9)]">
                  EduManage
                </span>
              </h1>

              {/* Tagline */}
              <p className="mt-4 text-xs sm:text-sm text-slate-200/90 font-bold tracking-wide drop-shadow-md max-w-md">
                Smart, secure & next-generation school management portal.
              </p>
            </div>

            {/* Glowing Cyan Curved Swoosh Arrow pointing gracefully toward Login Form */}
            <div className="hidden lg:block w-32 xl:w-44 h-24 flex-shrink-0 self-center pointer-events-none translate-y-3">
              <svg viewBox="0 0 150 75" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,223,196,0.9)]">
                <defs>
                  <linearGradient id="cyanArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00dfc4" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#00dfc4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00dfc4" stopOpacity="1" />
                  </linearGradient>
                  <marker
                    id="cyanArrowHead"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                  >
                    <path d="M 0 1.5 L 8.5 5 L 0 8.5 L 2 5 Z" fill="#00dfc4" />
                  </marker>
                </defs>
                <path
                  d="M 8 58 Q 75 60 132 18"
                  stroke="url(#cyanArrowGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  markerEnd="url(#cyanArrowHead)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Floating Login Card */}
        <div className="w-full lg:w-auto flex items-center justify-center">
          <div className="w-full max-w-[420px] sm:w-[420px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/80 dark:border-slate-700/80 p-6 sm:p-7">
            
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Login to <span className={roleTheme.titleAccent}>Portal</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 font-bold">
                Select your role to continue
              </p>
            </div>

            {/* Role Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4 border border-slate-200/80 dark:border-slate-700/80">
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  role === 'admin'
                    ? 'bg-teal-500 text-white shadow-md shadow-teal-500/35'
                    : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('teacher')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  role === 'teacher'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/35'
                    : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Teacher</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  role === 'student'
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/35'
                    : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Student</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-3.5 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/15 border-2 border-rose-300 dark:border-rose-500/40 text-xs font-black text-rose-700 dark:text-rose-200">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Input */}
              <div>
                <label className="block text-xs sm:text-[13px] font-black text-slate-900 dark:text-white mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600 dark:text-slate-300">
                    <Mail className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-medium bg-slate-50/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-slate-800 ${roleTheme.focusRing} focus:ring-2 focus:border-teal-500 transition-all shadow-2xs`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-[13px] font-black text-slate-900 dark:text-white">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className={`text-xs font-black ${roleTheme.link} transition-colors underline-offset-2 hover:underline`}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600 dark:text-slate-300">
                    <Lock className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-medium bg-slate-50/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-slate-800 ${roleTheme.focusRing} focus:ring-2 focus:border-teal-500 transition-all shadow-2xs`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 stroke-[2.2]" /> : <Eye className="w-4 h-4 stroke-[2.2]" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center py-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    className={`rounded border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 ${roleTheme.checkbox} w-4 h-4 cursor-pointer`}
                  />
                  <span>Remember me</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-11 py-2.5 px-4 ${roleTheme.submitBtn} text-xs sm:text-sm font-black tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-[0.99]`}
              >
                {isLoading ? (
                  <Loader size="xs" variant="white" />
                ) : (
                  <>
                    <span className="drop-shadow-xs">Login</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>

              {/* OR Divider */}
              <div className="relative my-2 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300 dark:border-slate-700" />
                </div>
                <span className="relative px-3 bg-white dark:bg-slate-900 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                  OR
                </span>
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={() => handleQuickLogin(role)}
                className="w-full h-10 py-2 px-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-0.5">
                <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 font-bold">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className={`font-black ${roleTheme.link} transition-colors underline-offset-2 hover:underline`}
                  >
                    Sign up
                  </Link>
                </p>
              </div>

              {/* 1-Click Direct Demo Login */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-center gap-1.5 text-xs font-black text-slate-800 dark:text-slate-200 mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>1-Click Direct Demo Login</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin')}
                    className="py-1.5 px-2.5 rounded-xl text-xs font-black text-emerald-900 dark:text-emerald-100 bg-emerald-100/95 hover:bg-emerald-200 dark:bg-emerald-500/25 dark:hover:bg-emerald-500/35 border border-emerald-300 dark:border-emerald-500/40 transition cursor-pointer text-center shadow-xs"
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('teacher')}
                    className="py-1.5 px-2.5 rounded-xl text-xs font-black text-amber-900 dark:text-amber-100 bg-amber-100/95 hover:bg-amber-200 dark:bg-amber-500/25 dark:hover:bg-amber-500/35 border border-amber-300 dark:border-amber-500/40 transition cursor-pointer text-center shadow-xs"
                  >
                    Teacher
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('student')}
                    className="py-1.5 px-2.5 rounded-xl text-xs font-black text-sky-900 dark:text-sky-100 bg-sky-100/95 hover:bg-sky-200 dark:bg-sky-500/25 dark:hover:bg-sky-500/35 border border-sky-300 dark:border-sky-500/40 transition cursor-pointer text-center shadow-xs"
                  >
                    Student
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Login;



