import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_clean.png';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Loader from '../../components/common/Loader';

const ForgotPassword = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 relative overflow-hidden transition-colors duration-200">
      {/* Soft Pastel Background Ambient Accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-slate-200/50 dark:bg-slate-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-slate-200/40 dark:bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Theme Toggle Button */}
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
        <div className="clay-card p-6 sm:p-8">
          <div className="flex flex-col items-center justify-center text-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-slate-800 clay-icon-pill p-2 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 shadow-xs mb-2.5">
              <img
                src={logo}
                alt="School Management Logo"
                className="w-full h-full object-contain dark:brightness-0 dark:invert transition"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
              Reset Password
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enter your registered school email address
            </p>
          </div>



          {isSubmitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center clay-icon-pill">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Password Reset Link Sent!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                We've sent a password recovery link to <span className="font-bold text-indigo-600 dark:text-indigo-400">{email}</span>.
              </p>
              <Link
                to="/login"
                className="clay-btn-primary inline-flex items-center gap-2 px-4 py-2 text-xs font-bold mt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@school.com"
                    className="clay-input w-full pl-9 pr-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-shine bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md hover:shadow-xl shadow-blue-500/30 w-full h-12 py-3.5 px-6 text-sm font-black tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-2xl uppercase border border-white/20 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]"
                >
                  {isLoading ? (
                    <Loader size="xs" variant="white" />
                  ) : (
                    <div className="relative z-20 flex items-center justify-center gap-2">
                      <span className="drop-shadow-sm font-black tracking-widest text-xs sm:text-sm text-white">
                        SEND RESET INSTRUCTIONS
                      </span>
                      <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1.5 stroke-[2.5]" />
                    </div>
                  )}
                </button>
              </div>
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
      </div>
    </div>
  );
};

export default ForgotPassword;
