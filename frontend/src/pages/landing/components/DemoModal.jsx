import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Users,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const demoModules = [
  {
    id: 'admin',
    title: 'Admin Control Center',
    icon: ShieldCheck,
    tag: 'Institutional Governance',
    highlights: [
      'Centralized Student & Teacher master registry',
      'Timetable builder with automatic teacher clash detection',
      'Tuition fee collection and automated digital receipts',
      'Campus broadcast circulars and emergency SMS/mailbox',
    ],
    demoAccount: {
      role: 'Admin',
      email: 'admin@school.com',
      password: 'password123',
    },
  },
  {
    id: 'teacher',
    title: 'Teacher Digital Workspace',
    icon: GraduationCap,
    tag: 'Instructional Efficiency',
    highlights: [
      'Interactive attendance roll-sheet with bulk status toggles',
      'Term examination gradebook and custom score calculations',
      'Weekly class schedules and room assignments',
      'Student doubt clearing desk with direct responses',
    ],
    demoAccount: {
      role: 'Teacher',
      email: 'teacher@school.com',
      password: 'password123',
    },
  },
  {
    id: 'student',
    title: 'Student & Parent Portal',
    icon: Users,
    tag: 'Learning Transparency',
    highlights: [
      'Personalized academic attendance metrics and calendar view',
      'Official report card downloads and term performance summaries',
      'Pending fee balances, itemized invoices, and receipt history',
      'Ask doubts directly to assigned subject mentors',
    ],
    demoAccount: {
      role: 'Student',
      email: 'student@school.com',
      password: 'password123',
    },
  },
];

const DemoModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('admin');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentMod = demoModules.find((m) => m.id === activeTab) || demoModules[0];
  const Icon = currentMod.icon;

  const handleLaunchPortal = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl clay-card rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                EduManage Interactive Demo Tour
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore platform workflows for every educational role
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Tab Selection */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
            {demoModules.map((m) => {
              const TabIcon = m.icon;
              const isSelected = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'clay-btn-emerald text-white shadow-xs'
                      : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span className="truncate">{m.title.split(' ')[0]} Portal</span>
                </button>
              );
            })}
          </div>

          {/* Module Content */}
          <div className="clay-emerald rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  {currentMod.title}
                </h4>
              </div>
              <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200">
                {currentMod.tag}
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 mb-3 font-semibold uppercase tracking-wider">
              Workflow Highlights:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
              {currentMod.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Demo Account Box */}
            <div className="p-3.5 clay-card rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  Preconfigured Demo Account:
                </span>
                <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {currentMod.demoAccount.email} • Password: <span className="text-teal-600 dark:text-teal-400">{currentMod.demoAccount.password}</span>
                </p>
              </div>
              <button
                onClick={handleLaunchPortal}
                className="clay-btn-emerald btn-shine px-4 py-2 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch This Role</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Footer inside modal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
              Select any role on the Login page to authenticate immediately.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="clay-btn-secondary px-4 py-2 text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
                className="clay-btn-emerald px-5 py-2 text-xs font-bold text-white cursor-pointer"
              >
                Go to Login Page →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
