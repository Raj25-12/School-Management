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
  Sparkles
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
          message: res.message || 'Signed in to Admin Portal',
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
        message: `Successfully signed in as ${role.toUpperCase()}`,
        type: role === 'teacher' ? 'rose' : 'sky',
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
    <div className="min-h-screen w-full relative flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans overflow-x-hidden">

      {/* =========================================================================
          FULL SCREEN BACKGROUND IMAGE WITH BLUR & AMBIENT COLOR SHADES
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

        {/* Atmospheric Blur & Color Tint Overlay */}
        <div className="absolute inset-0 bg-slate-900/35 dark:bg-slate-950/65 backdrop-blur-[4px] transition-all duration-300" />

        {/* Image-Inspired Ambient Color Glows */}
        <div className="absolute top-0 left-0 w-[35rem] h-[35rem] bg-sky-500/25 dark:bg-sky-600/20 rounded-full blur-[110px]" />
        <div className="absolute top-1/3 left-1/3 w-[30rem] h-[30rem] bg-amber-400/20 dark:bg-amber-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-emerald-500/25 dark:bg-emerald-700/20 rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      </div>

      {/* Top Bar Floating Controls */}
      <div className="fixed top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 z-30 flex items-center justify-between pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/40 dark:border-slate-700/60 shadow-lg">
          <div className="w-7 h-7 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs">
            <img
              src={logo}
              alt="Logo"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width="28"
              height="28"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white tracking-tight">
            EduManage <span className="text-sky-500 font-semibold text-xs">Portal</span>
          </span>
        </div>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          className="clay-btn-secondary px-3 py-1.5 rounded-2xl text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-amber-400 transition cursor-pointer flex items-center gap-1.5 backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 border border-white/40 dark:border-slate-700/60 shadow-lg"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-700" />
              <span>Dark</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          MAIN WRAPPER: LEFT HERO TEXT ON IMAGE + RIGHT SIDE LOGIN FORM
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl pt-16 sm:pt-14 pb-4 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[85vh]">

        {/* LEFT SIDE: Hero Info & Pillars Over the Image (Slides in from Left, one by one) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left text-white px-2 sm:px-4">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 dark:bg-slate-900/50 backdrop-blur-xl border border-white/30 text-xs font-bold text-amber-300 mb-4 w-fit shadow-lg animate-from-left anim-delay-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Smart Academic Management</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md animate-from-left anim-delay-200">
            Empowering Education, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-amber-300 to-emerald-300">
              Building Bright Futures.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed max-w-lg mb-6 font-normal drop-shadow-sm animate-from-left anim-delay-300">
            Unified digital ecosystem for students, teachers, and administrators. Manage attendance, exams, fees, timetable, and academic growth in one seamless experience.
          </p>

          {/* 4 Interactive Glass Pillar Badges (Staggered Entrance) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg">
            <div className="p-2.5 rounded-2xl bg-white/15 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-400/40 shadow-lg text-center hover:scale-105 transition-transform animate-from-left anim-delay-400">
              <span className="block text-xs font-black text-sky-200 tracking-wider uppercase">Education</span>
              <span className="text-[10px] text-sky-100/80 font-medium">Quality Learning</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/15 dark:bg-slate-900/60 backdrop-blur-xl border border-rose-400/40 shadow-lg text-center hover:scale-105 transition-transform animate-from-left anim-delay-500">
              <span className="block text-xs font-black text-rose-200 tracking-wider uppercase">Discipline</span>
              <span className="text-[10px] text-rose-100/80 font-medium">Core Values</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/15 dark:bg-slate-900/60 backdrop-blur-xl border border-emerald-400/40 shadow-lg text-center hover:scale-105 transition-transform animate-from-left anim-delay-600">
              <span className="block text-xs font-black text-emerald-200 tracking-wider uppercase">Knowledge</span>
              <span className="text-[10px] text-emerald-100/80 font-medium">Skill Building</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/15 dark:bg-slate-900/60 backdrop-blur-xl border border-amber-400/40 shadow-lg text-center hover:scale-105 transition-transform animate-from-left anim-delay-700">
              <span className="block text-xs font-black text-amber-200 tracking-wider uppercase">Bright Future</span>
              <span className="text-[10px] text-amber-100/80 font-medium">Endless Growth</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Floating Blurred Glassmorphic Login Form Card (Slides in from Right) */}
        <div className="w-full lg:w-[460px] xl:w-[480px] animate-from-right anim-delay-200">
          <div className="clay-card p-6 sm:p-8 backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/60 dark:border-slate-700/60 shadow-2xl rounded-3xl">

            {/* Header Form Title */}
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                Sign In to Portal
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Select your role to access your personalized workspace
              </p>
            </div>

            {/* Role Switcher: Admin / Teacher / Student */}
            <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 mb-4">
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'admin'
                  ? 'clay-btn-emerald text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40'
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
                  : 'text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/80 dark:hover:bg-amber-950/40'
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
                  : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/80 dark:hover:bg-sky-950/40'
                  }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs font-semibold text-rose-600 dark:text-rose-400">
                  {error}
                </div>
              )}

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
                    className="text-[11px] font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 hover:underline"
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
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-3.5 h-3.5"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`${getSubmitBtnClass()} w-full py-2.5 px-4 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-md`}
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
                  className="font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 hover:underline"
                >
                  Create New Account
                </Link>
              </p>
            </div>

            {/* 1-Click Fast Direct Demo Access */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-slate-800 text-center">
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                ⚡ 1-Click Direct Demo Login
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="clay-btn-secondary py-1.5 px-2 rounded-xl text-[11px] font-bold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40 cursor-pointer border-emerald-200/60 dark:border-emerald-800/40"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('teacher')}
                  className="clay-btn-secondary py-1.5 px-2 rounded-xl text-[11px] font-bold text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40 cursor-pointer border-amber-200/60 dark:border-amber-800/40"
                >
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('student')}
                  className="clay-btn-secondary py-1.5 px-2 rounded-xl text-[11px] font-bold text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/40 cursor-pointer border-sky-200/60 dark:border-sky-800/40"
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
