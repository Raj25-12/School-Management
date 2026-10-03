import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import logo from '../../assets/logo_clean.png';
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
  Sparkles,
  Sun,
  Moon
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
        type: role === 'admin' ? 'emerald' : role === 'teacher' ? 'rose' : 'sky',
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
      type: targetRole === 'admin' ? 'emerald' : targetRole === 'teacher' ? 'rose' : 'sky',
      duration: 4500,
    });

    navigate(`/${targetRole}/dashboard`);
  };

  const getSubmitBtnClass = () => {
    if (role === 'admin') return 'clay-btn-emerald';
    if (role === 'teacher') return 'clay-btn-rose';
    return 'clay-btn-sky';
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 relative overflow-hidden transition-colors duration-200">
      {/* Soft Pastel Background Ambient Accents based on active role */}
      <div className={`absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${role === 'admin' ? 'bg-emerald-200/50 dark:bg-emerald-900/20' : role === 'teacher' ? 'bg-rose-200/50 dark:bg-rose-900/20' : 'bg-sky-200/50 dark:bg-sky-900/20'
        }`} />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-slate-200/40 dark:bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Theme Toggle Button (Top Right) */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          className="clay-btn-secondary p-2.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-amber-400 transition cursor-pointer"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Claymorphic Login Card */}
        <div className="clay-card p-6 sm:p-8">
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

          {/* Role Switcher with Green / Red / Blue Themes */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 mb-5">
            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'admin'
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
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'teacher'
                ? 'clay-btn-rose text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400'
                }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Teacher</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'student'
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
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
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
                  className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

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

            <button
              type="submit"
              disabled={isLoading}
              className={`${getSubmitBtnClass()} w-full py-2.5 px-4 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer mt-2`}
            >
              {isLoading ? (
                <Loader size="xs" variant="white" />
              ) : (
                <>
                  <span>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
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
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="clay-btn-secondary py-1.5 px-2 rounded-xl text-[11px] font-bold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40 cursor-pointer"
              >
                Admin (Green)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('teacher')}
                className="clay-btn-secondary py-1.5 px-2 rounded-xl text-[11px] font-bold text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 cursor-pointer"
              >
                Teacher (Red)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="clay-btn-secondary py-1.5 px-2 rounded-xl text-[11px] font-bold text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/40 cursor-pointer"
              >
                Student (Blue)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
