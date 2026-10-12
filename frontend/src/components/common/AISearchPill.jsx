import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AISparkleSearchIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    {/* Magnifying Glass Circle */}
    <circle
      cx="9.5"
      cy="10.5"
      r="5.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Magnifying Glass Handle */}
    <path
      d="m14 15 5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* 4-Pointed Star Sparkle (Matching Screenshot) */}
    <path
      d="M17.5 2 C17.5 4 19 5.5 21 5.5 C19 5.5 17.5 7 17.5 9 C17.5 7 16 5.5 14 5.5 C16 5.5 17.5 4 17.5 2 Z"
      fill="url(#sparkleGradientRgb)"
    />
    <defs>
      <linearGradient id="sparkleGradientRgb" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  </svg>
);

const quickNavLinks = [
  { label: 'Students Directory', path: '/admin/students', roles: ['admin'] },
  { label: 'Faculty & Teachers Directory', path: '/admin/teachers', roles: ['admin'] },
  { label: 'Attendance Audit', path: '/admin/attendance/report', roles: ['admin'] },
  { label: 'Class Timetables & Schedules', path: '/admin/timetable', roles: ['admin'] },
  { label: 'Fee Collections & POS', path: '/admin/fees/collect', roles: ['admin'] },
  { label: 'Circulars & Notice Board', path: '/admin/notices', roles: ['admin', 'teacher', 'student'] },
  { label: 'Examinations & Marks', path: '/admin/exams', roles: ['admin'] },
  { label: 'My Faculty Timetable Routine', path: '/teacher/timetable', roles: ['teacher'] },
  { label: 'Homework Desk & Assignments', path: '/teacher/homework', roles: ['teacher'] },
  { label: 'Student Marks Entry Sheet', path: '/teacher/marks', roles: ['teacher'] },
  { label: 'My Student Attendance Tracker', path: '/student/attendance', roles: ['student'] },
  { label: 'Fee Invoices & Receipts', path: '/student/fees', roles: ['student'] },
  { label: 'Exams & Progress Report Card', path: '/student/exams', roles: ['student'] },
];

export const AISearchPill = ({
  placeholder = 'Search or ask AI...',
  mode = 'button', // 'button' | 'input'
  value = '',
  onChange,
  onOpenModal,
  className = '',
  compact = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      setIsModalOpen(true);
    }
  };

  const { user } = useAuth();
  const currentRole = user?.role || 'admin';

  const filteredLinks = quickNavLinks.filter((item) => {
    const matchesRole = !item.roles || item.roles.includes(currentRole);
    const matchesQuery = item.label.toLowerCase().includes(query.toLowerCase());
    return matchesRole && matchesQuery;
  });

  if (mode === 'input') {
    return (
      <div className={`rgb-pill px-3 py-1.5 ${className}`}>
        <div className="text-slate-600 dark:text-slate-300 mr-2 flex items-center shrink-0">
          <AISparkleSearchIcon className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-transparent border-none text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none w-full"
        />
        <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 ml-1.5 shrink-0 rgb-text select-none">
          AI Mode
        </span>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`rgb-pill px-3.5 py-1.5 text-xs font-bold gap-2 cursor-pointer select-none group ${className}`}
        title="Search or ask AI"
      >
        <span className="text-slate-700 dark:text-slate-200 group-hover:scale-110 transition-transform flex items-center shrink-0">
          <AISparkleSearchIcon className="w-4 h-4" />
        </span>
        <span className="rgb-text font-black tracking-tight text-xs">
          {compact ? 'AI Mode' : placeholder}
        </span>
        {!compact && (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800/80 rounded-md border border-slate-200/80 dark:border-slate-700/80 ml-1">
            ⌘K
          </kbd>
        )}
      </button>

      {/* Quick Search & AI Command Palette Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg clay-card p-4 shadow-2xl relative animate-in zoom-in-95 duration-200 border-2 border-transparent bg-white dark:bg-slate-900"
            style={{
              backgroundImage:
                'linear-gradient(var(--tw-card-bg, #ffffff), var(--tw-card-bg, #ffffff)), linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            {/* Search Header */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <AISparkleSearchIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search students, faculty, or type an AI query..."
                className="w-full text-xs sm:text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none bg-transparent"
              />
              <span className="rgb-text text-[11px] font-black shrink-0 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                AI Mode
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="clay-btn-secondary p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Links / Suggestions */}
            <div className="pt-3 space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-2">
                Quick Navigation & AI Queries
              </p>
              {filteredLinks.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate(item.path);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition cursor-pointer text-left"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Jump ↗</span>
                </button>
              ))}
              {filteredLinks.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400 font-medium">
                  Press Enter to execute AI query: <span className="font-bold text-slate-700 dark:text-slate-200">"{query}"</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AISearchPill;
