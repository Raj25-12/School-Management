import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_clean.png';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button, Input, Card } from '../../components/common';

const ForgotPassword = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 400);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 relative overflow-hidden transition-colors duration-200">
      {/* Soft Background Ambient Accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-slate-200/50 dark:bg-slate-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-slate-200/40 dark:bg-slate-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="secondary"
          size="icon"
          icon={theme === 'dark' ? Sun : Moon}
          onClick={toggleTheme}
          title="Toggle Light/Dark Theme"
          className="p-2.5"
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card padding="p-6 sm:p-8">
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
                We've sent a password recovery link to <span className="font-bold text-emerald-600 dark:text-emerald-400">{email}</span>.
              </p>
              <Link to="/login" className="inline-block mt-2">
                <Button variant="emerald" icon={ArrowLeft}>
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <Input
                label="Registered Email"
                type="email"
                required
                icon={Mail}
                placeholder="user@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                variant="emerald"
                loading={isLoading}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full py-2.5 mt-2"
              >
                Send Reset Instructions
              </Button>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(ForgotPassword);
