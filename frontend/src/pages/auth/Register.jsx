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
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();

  const [role, setRole] = useState('student'); // 'student' | 'teacher' | 'admin'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      const errMsg = 'Passwords do not match. Please verify and try again.';
      setError(errMsg);
      showToast({
        title: 'Validation Error',
        message: errMsg,
        type: 'error',
      });
      return;
    }

    setIsLoading(true);

    if (role === 'admin') {
      try {
        const res = await authApi.adminCreate({
          email: formData.email,
          password: formData.password,
        });

        const registeredName = formData.name || 'Admin User';
        login(
          {
            name: registeredName,
            email: formData.email,
            role: 'admin',
          },
          'admin-jwt-token'
        );

        showToast({
          title: 'Admin Account Created',
          message: res.message || `Welcome to School Management, ${registeredName}!`,
          type: 'emerald',
          duration: 5000,
        });

        navigate('/admin/dashboard');
      } catch (err) {
        showToast({
          title: 'Account Creation Failed',
          message: err.message || 'Could not create admin account',
          type: 'rose',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setTimeout(() => {
      const registeredName = formData.name || (role === 'student' ? 'Alex Johnson' : 'Prof. Sharma');
      login(
        {
          name: registeredName,
          email: formData.email,
          role: role,
        },
        'sample-jwt-token'
      );
      setIsLoading(false);

      showToast({
        title: 'Account Created Successfully',
        message: `Welcome to School Management, ${registeredName}!`,
        type: role === 'teacher' ? 'amber' : 'sky',
        duration: 5000,
      });

      navigate(`/${role}/dashboard`);
    }, 400);
  };

  const getSubmitBtnClass = () => {
    if (role === 'admin') return 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/40';
    if (role === 'teacher') return 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-xl shadow-amber-500/40';
    return 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-500/45';
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans overflow-x-hidden">
      
      {/* =========================================================================
          FULL SCREEN BACKGROUND IMAGE WITH BLUR & HARMONIOUS AMBIENT LIGHTING
          ========================================================================= */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
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
        
        {/* Cohesive Ambient Glows */}
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

      {/* MAIN WRAPPER */}
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
                <span>Join Our Academic Community</span>
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
            Begin Your Journey, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-200 to-sky-400 drop-shadow-md">
              Shape Tomorrow's World.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-lg mb-6 font-medium drop-shadow-sm animate-from-left anim-delay-300">
            Sign up to get direct access to courses, student profiles, attendance reports, academic calendar, and class assignments.
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

        {/* RIGHT SIDE: Floating Dynamic Glassmorphic Register Form Card (Light & Dark Theme Adaptive) */}
        <div className="w-full lg:w-[460px] xl:w-[480px] animate-fade-in anim-delay-100">
          <div className="p-6 sm:p-8 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-white/60 dark:border-white/15 shadow-2xl rounded-3xl text-slate-800 dark:text-white transition-colors duration-300">
            
            {/* Header (Step 1) */}
            <div className="mb-4 animate-from-right anim-delay-200">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight drop-shadow-xs">
                Create Account
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 font-medium">
                Select your role to start registration
              </p>
            </div>

            {/* Role Switcher in Green / Red / Blue (Step 2) */}
            <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/70 border border-slate-200/80 dark:border-white/15 mb-4 animate-from-right anim-delay-300">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'student'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
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
                onClick={() => setRole('admin')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'admin'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {error && (
              <div className="mb-3 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-200 text-xs font-semibold border border-rose-200 dark:border-rose-500/50 animate-from-right anim-delay-350">
                {error}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name Field (Step 3) */}
              <div className="animate-from-right anim-delay-400">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={role === 'student' ? 'Alex Johnson' : role === 'teacher' ? 'Prof. R. Sharma' : 'Administrator'}
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 bg-white/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-white/20 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Email Address Field (Step 4) */}
              <div className="animate-from-right anim-delay-500">
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
                    placeholder="name@school.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 bg-white/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-white/20 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password & Confirm Password Fields (Step 5) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-from-right anim-delay-600">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Password
                  </label>
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
                      className="w-full pl-9 pr-8 py-2.5 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 bg-white/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-white/20 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 bg-white/80 dark:bg-slate-950/60 border border-slate-200/90 dark:border-white/20 rounded-xl focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-sky-500 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Agree Terms Checkbox (Step 6) */}
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-300 animate-from-right anim-delay-700">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sky-500 focus:ring-sky-500 w-3.5 h-3.5"
                />
                <span>I agree to Academic Policies & Terms</span>
              </div>

              {/* Submit Button (Step 7: Clean Minimal Button + Hover Lift + Hover Light Beam Sweep) */}
              <div className="animate-from-right anim-delay-800 pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group btn-shine-sweep ${getSubmitBtnClass()} w-full h-12 py-3.5 px-6 text-sm font-black tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] border border-white/20 uppercase`}
                >
                  {isLoading ? (
                    <Loader size="xs" variant="white" />
                  ) : (
                    <div className="relative z-20 flex items-center justify-center gap-2.5">
                      <span className="drop-shadow-sm font-black tracking-widest text-xs sm:text-sm text-white">
                        CREATE {role.toUpperCase()} ACCOUNT
                      </span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1.5 drop-shadow-sm stroke-[2.5]" />
                    </div>
                  )}
                </button>
              </div>
            </form>

            {/* Direct Link to Login (Step 8) */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-white/10 text-center animate-from-right anim-delay-900">
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors underline-offset-2 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Register;
