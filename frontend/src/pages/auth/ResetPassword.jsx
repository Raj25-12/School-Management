import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_clean.png';
import loginImage from '../../assets/LoginImage.png';
import { Lock, ArrowLeft, ArrowRight, Eye, EyeOff, CheckCircle2, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../../components/common/Loader';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans overflow-x-hidden">
      
      {/* FULL SCREEN BACKGROUND IMAGE WITH BLUR */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={loginImage}
          alt="School Campus Background"
          className="w-full h-full object-cover object-center transform scale-102"
        />

        <div className="absolute inset-0 bg-slate-900/35 dark:bg-slate-950/65 backdrop-blur-[4px] transition-all duration-300" />
        
        <div className="absolute top-0 left-0 w-[35rem] h-[35rem] bg-sky-500/25 dark:bg-sky-600/20 rounded-full blur-[110px]" />
        <div className="absolute top-1/3 left-1/3 w-[30rem] h-[30rem] bg-amber-400/20 dark:bg-amber-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-emerald-500/25 dark:bg-emerald-700/20 rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      </div>

      {/* Top Bar Floating Controls */}
      <div className="fixed top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 z-30 flex items-center justify-between pointer-events-auto">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/40 dark:border-slate-700/60 shadow-lg">
          <div className="w-7 h-7 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs">
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
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

      {/* MAIN WRAPPER */}
      <div className="relative z-10 w-full max-w-7xl pt-16 sm:pt-14 pb-4 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[85vh]">
        
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left text-white px-2 sm:px-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 dark:bg-slate-900/50 backdrop-blur-xl border border-white/30 text-xs font-bold text-amber-300 mb-4 w-fit shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Enhanced Account Protection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            Update Security, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-amber-300 to-emerald-300">
              Protect Your Workspace.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed max-w-lg mb-6 font-normal drop-shadow-sm">
            Set a strong, secure password to ensure complete data integrity across attendance, student grades, exams, and administrative reports.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg">
            <div className="p-2.5 rounded-2xl bg-white/15 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-400/40 shadow-lg text-center">
              <span className="block text-xs font-black text-sky-200 tracking-wider uppercase">Education</span>
              <span className="text-[10px] text-sky-100/80 font-medium">Quality Learning</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/15 dark:bg-slate-900/60 backdrop-blur-xl border border-rose-400/40 shadow-lg text-center">
              <span className="block text-xs font-black text-rose-200 tracking-wider uppercase">Discipline</span>
              <span className="text-[10px] text-rose-100/80 font-medium">Core Values</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/15 dark:bg-slate-900/60 backdrop-blur-xl border border-emerald-400/40 shadow-lg text-center">
              <span className="block text-xs font-black text-emerald-200 tracking-wider uppercase">Knowledge</span>
              <span className="text-[10px] text-emerald-100/80 font-medium">Skill Building</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/15 dark:bg-slate-900/60 backdrop-blur-xl border border-amber-400/40 shadow-lg text-center">
              <span className="block text-xs font-black text-amber-200 tracking-wider uppercase">Bright Future</span>
              <span className="text-[10px] text-amber-100/80 font-medium">Endless Growth</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="clay-btn-primary w-full py-2.5 px-4 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <Loader size="xs" variant="white" />
                ) : (
                  <>
                    <span>Reset & Update Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Floating Glassmorphic Reset Password Card */}
        <div className="w-full lg:w-[460px] xl:w-[480px]">
          <div className="clay-card p-6 sm:p-8 backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-white/60 dark:border-slate-700/60 shadow-2xl rounded-3xl">
            
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                Set New Password
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Choose a strong password to secure your account
              </p>
            </div>

            {error && (
              <div className="mb-3 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200 dark:border-rose-900">
                {error}
              </div>
            )}

            {isSuccess ? (
              <div className="text-center py-5 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center clay-icon-pill">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Password Updated!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Redirecting to login portal...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="clay-btn-sky w-full py-2.5 px-4 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                >
                  {isLoading ? (
                    <Loader size="xs" variant="white" />
                  ) : (
                    <>
                      <span>Reset & Update Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ResetPassword;
