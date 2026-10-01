import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Button, Input, Card } from '../../components/common';
import logo from '../../assets/logo_clean.png';
import {
  ShieldCheck,
  UserCheck,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Sun,
  Moon,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Trophy,
  School,
  Bell,
  Compass,
  Atom,
  PenTool,
  Calculator
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

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setFormData((prev) => ({ ...prev, email: 'admin@school.com' }));
    } else if (selectedRole === 'teacher') {
      setFormData((prev) => ({ ...prev, email: 'teacher@school.com' }));
    } else {
      setFormData((prev) => ({ ...prev, email: 'student@school.com' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const userName = role === 'admin' ? 'Admin User' : role === 'teacher' ? 'Prof. Sharma' : 'Alex Johnson';
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
        message: `Successfully signed in as ${role.toUpperCase()}`,
        type: role === 'admin' ? 'emerald' : role === 'teacher' ? 'sand' : 'sky',
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
      message: `Signed in as ${targetRole.toUpperCase()} (${userName})`,
      type: targetRole === 'admin' ? 'emerald' : targetRole === 'teacher' ? 'sand' : 'sky',
      duration: 4500,
    });

    navigate(`/${targetRole}/dashboard`);
  };

  const submitVariant = role === 'admin' ? 'emerald' : role === 'teacher' ? 'sand' : 'sky';

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 relative overflow-hidden transition-colors duration-300 select-none">
      {/* 📐 Subtle Study Notebook & Chalkboard Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:24px_24px] dark:bg-[radial-gradient(#384b66_1.5px,transparent_1.5px)] opacity-40 pointer-events-none" />

      {/* 🌟 Soft Role-Matched Ambient Background Glows */}
      <div
        className={`absolute top-10 left-10 w-96 h-96 rounded-full blur-[110px] pointer-events-none transition-all duration-700 ${
          role === 'admin'
            ? 'bg-emerald-400/30 dark:bg-emerald-600/20'
            : role === 'teacher'
            ? 'bg-[#ebd5ab]/60 dark:bg-[#c49646]/20'
            : 'bg-sky-400/30 dark:bg-sky-600/20'
        }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${
          role === 'admin'
            ? 'bg-teal-400/25 dark:bg-teal-700/20'
            : role === 'teacher'
            ? 'bg-amber-400/25 dark:bg-amber-700/20'
            : 'bg-indigo-400/25 dark:bg-indigo-700/20'
        }`}
      />

      {/* Background Floats */}
      <div className="hidden lg:flex items-center gap-3.5 absolute top-10 left-6 xl:left-14 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-emerald-200/80 dark:border-emerald-800/80 shadow-2xl animate-school-orbit z-0 pointer-events-none">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 shrink-0">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <span>Academic Excellence</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              Grade A+
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
            1,450+ Enrolled Students
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3.5 absolute top-12 right-6 xl:right-14 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-sky-200/80 dark:border-sky-800/80 shadow-2xl animate-school-orbit-reverse z-0 pointer-events-none">
        <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/30 shrink-0">
          <FlaskConical className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
            <span>Science & STEM Lab</span>
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
            Digital Chemistry & Physics
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3.5 absolute bottom-12 left-6 xl:left-14 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-[#ebd5ab] dark:border-[#856326] shadow-2xl animate-school-orbit-reverse z-0 pointer-events-none">
        <div className="w-12 h-12 rounded-2xl bg-[#c49646] text-white flex items-center justify-center shadow-md shadow-amber-600/30 shrink-0">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
            <span>Coursework & Routine</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
            32 Active Subject Modules
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3.5 absolute bottom-10 right-6 xl:right-14 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-amber-200/80 dark:border-amber-800/80 shadow-2xl animate-school-orbit z-0 pointer-events-none">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 shrink-0">
          <Trophy className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <span>Merit Leaderboard</span>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              99.4% Pass
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
            Top Ranking Board Results
          </p>
        </div>
      </div>

      <div className="absolute top-[30%] left-[3%] xl:left-[8%] hidden md:flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-xl border-2 border-amber-200 animate-school-bell pointer-events-none">
        <Bell className="w-7 h-7" />
      </div>
      <div className="absolute top-[50%] left-[1.5%] xl:left-[5%] hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-xl border-2 border-emerald-200 animate-school-bounce pointer-events-none">
        <School className="w-6 h-6" />
      </div>
      <div className="absolute top-[32%] right-[3%] xl:right-[8%] hidden md:flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl border-2 border-indigo-200 animate-school-orbit pointer-events-none">
        <Atom className="w-7 h-7" />
      </div>
      <div className="absolute top-[52%] right-[1.5%] xl:right-[5%] hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xl border-2 border-sky-200 animate-school-orbit-reverse pointer-events-none">
        <Compass className="w-6 h-6" />
      </div>
      <div className="absolute bottom-[30%] left-[3%] xl:left-[8%] hidden md:flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-xl border-2 border-emerald-200 animate-school-orbit-reverse pointer-events-none">
        <Calculator className="w-6 h-6" />
      </div>
      <div className="absolute bottom-[28%] right-[3%] xl:right-[8%] hidden md:flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xl border-2 border-rose-200 animate-school-bounce pointer-events-none">
        <PenTool className="w-6 h-6" />
      </div>

      {/* Theme Toggle Button (Top Right) */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          className="clay-btn-secondary p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-amber-400 transition cursor-pointer"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Claymorphic Login Card */}
        <Card className="p-6 sm:p-8 shadow-xl">
          {/* Header Brand with Clean Logo */}
          <div className="flex flex-col items-center justify-center text-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-2 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 shadow-xs mb-2.5">
              <img
                src={logo}
                alt="School Management Logo"
                className="w-full h-full object-contain dark:brightness-0 dark:invert transition"
              />
            </div>
            <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
              School Management
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select your role & enter account details
            </p>
          </div>

          {/* Role Switcher */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 mb-5">
            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === 'admin'
                  ? 'clay-btn-emerald text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('teacher')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === 'teacher'
                  ? 'clay-btn-sand text-[#2b1804] dark:text-[#fff9ed] shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#8d6016] dark:hover:text-[#ebd5ab]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Teacher</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === 'student'
                  ? 'clay-btn-sky text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <Input
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="user@school.com"
              icon={Mail}
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:underline"
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
                  className="clay-input w-full pl-9 pr-9 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="rounded border-slate-300 text-slate-700 focus:ring-slate-500 w-3.5 h-3.5"
                />
                <span>Remember me</span>
              </label>
            </div>

            <Button
              type="submit"
              variant={submitVariant}
              loading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full mt-2"
            >
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          </form>

          {/* Direct Link to Sign Up */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-bold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* 1-Click Fast Demo Access */}
          <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800 text-center">
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
              1-Click Direct Demo Access
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleQuickLogin('admin')}
                className="text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40 text-[11px]"
              >
                Admin (Green)
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleQuickLogin('teacher')}
                className="text-[#8d6016] hover:bg-[#ebd5ab]/20 dark:text-[#ebd5ab] dark:hover:bg-[#856326]/40 text-[11px]"
              >
                Teacher (Sand)
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleQuickLogin('student')}
                className="text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/40 text-[11px]"
              >
                Student (Blue)
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
