import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, ShieldCheck, UserCheck, User, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      login(
        {
          name: role === 'admin' ? 'Admin User' : role === 'teacher' ? 'Prof. Sharma' : 'Alex Johnson',
          email: formData.email,
          role: role,
        },
        'sample-jwt-token'
      );
      setIsLoading(false);
      navigate(`/${role}/dashboard`);
    }, 400);
  };

  const handleQuickLogin = (targetRole) => {
    login(
      {
        name: targetRole === 'admin' ? 'Admin User' : targetRole === 'teacher' ? 'Prof. Sharma' : 'Alex Johnson',
        email: `${targetRole}@school.com`,
        role: targetRole,
      },
      'sample-jwt-token'
    );
    navigate(`/${targetRole}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 p-4 sm:p-6 text-slate-100">
      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/60 p-6 sm:p-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mb-3">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">EduManage Portal</h1>
          <p className="text-xs text-slate-400 mt-1">School Management & Academic System</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900/80 rounded-xl mb-6 border border-slate-700/50">
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
              role === 'admin'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('teacher')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
              role === 'teacher'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Teacher</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
              role === 'student'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email / Username</label>
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
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-slate-300">Password</label>
              <Link
                to="/forgot-password"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition"
              >
                Forgot?
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
                className="w-full pl-9 pr-10 py-2.5 bg-slate-900/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-5 border-t border-slate-700/60 text-center">
          <p className="text-xs text-slate-400 mb-2.5">🚀 1-Click Direct Demo Access:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition"
            >
              Admin Portal
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('teacher')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition"
            >
              Teacher Portal
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('student')}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition"
            >
              Student Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
