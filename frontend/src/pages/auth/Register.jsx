import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
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
  IdCard,
  CheckCircle2
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
    idOrRoll: '',
    agreeTerms: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
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

    setTimeout(() => {
      const registeredName = formData.name || (role === 'student' ? 'Alex Johnson' : role === 'teacher' ? 'Prof. Sharma' : 'Admin User');
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
        type: role === 'admin' ? 'emerald' : role === 'teacher' ? 'rose' : 'sky',
        duration: 5000,
      });

      navigate(`/${role}/dashboard`);
    }, 400);
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
        {/* Main Claymorphic Sign Up Card */}
        <div className="clay-card p-6 sm:p-8">
          {/* Header Brand with Logo */}
          <div className="flex flex-col items-center justify-center text-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-2 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 shadow-xs mb-2.5">
              <img
                src={logo}
                alt="School Management Logo"
                className="w-full h-full object-contain dark:brightness-0 dark:invert transition"
              />
            </div>
            <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select your role to get started
            </p>
          </div>



          {/* Role Switcher in Green / Red / Blue */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 mb-5">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'student'
                ? 'clay-btn-sky text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300'
                }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'teacher'
                ? 'clay-btn-rose text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-300'
                }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Teacher</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${role === 'admin'
                ? 'clay-btn-emerald text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300'
                }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200 dark:border-rose-900">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
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
                  className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

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
                  placeholder="name@school.com"
                  className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
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
                    className="clay-input w-full pl-9 pr-8 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
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
                    className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
              />
              <span>I agree to the School Academic Policies & Terms</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${getSubmitBtnClass()} w-full py-2.5 px-4 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer mt-3`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create {role.charAt(0).toUpperCase() + role.slice(1)} Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Direct Link to Login */}
          <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
