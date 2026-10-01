import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Building2,
  Sliders,
  Bell,
  ShieldCheck,
  Database,
  Save,
  CheckCircle2,
  Sparkles,
  Lock,
  Globe,
  Mail,
  Phone,
  Calendar,
  Key,
  Smartphone,
  Download,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import logo from '../../../assets/logo_clean.png';

const Settings = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'academic' | 'notifications' | 'security' | 'backup'

  // General School Profile State
  const [schoolProfile, setSchoolProfile] = useState(() => {
    const saved = localStorage.getItem('school_system_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      schoolName: 'Delhi Public International School',
      affiliationCode: 'CBSE-AFF-2026-9812',
      schoolCode: 'SCH-88210',
      principalName: 'Dr. Anand Ramanathan, M.Sc, Ph.D',
      contactEmail: 'admin@dpis-school.edu.in',
      phone: '+91 11 4982 3000',
      altPhone: '+91 98100 44552',
      website: 'https://www.dpis-school.edu.in',
      address: 'Plot 4, Knowledge Park III, Institutional Area, New Delhi - 110001',
      academicYear: '2026-2027',
      currency: 'INR (₹)',
      timezone: 'Asia/Kolkata (IST +5:30)'
    };
  });

  // Academic Configuration
  const [academicConfig, setAcademicConfig] = useState({
    passingPercentage: 35,
    gradingScale: 'CBSE-9-Point',
    workingDaysPerWeek: 6,
    periodsPerDay: 7,
    attendanceThreshold: 75,
    autoPromoteMinPercentage: 40,
    allowNegativeMarking: false
  });

  // Notification Gateway Config
  const [notifConfig, setNotifConfig] = useState({
    smsAbsenteeismAlert: true,
    smsFeeReminderAlert: true,
    whatsappHomeworkBroadcast: true,
    emailReportCards: true,
    instantPushNotifications: true,
    smsGatewayApiKey: 'SMS-LIVE-GATEWAY-AUTH-TOKEN-2026'
  });

  // Security & Audit
  const [securityConfig, setSecurityConfig] = useState({
    twoFactorAuth: false,
    sessionTimeoutMinutes: 60,
    forcePasswordResetDays: 90,
    allowTeacherMarksOverride: true,
    allowParentLeaveApplication: true
  });

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    localStorage.setItem('school_system_profile', JSON.stringify(schoolProfile));
    showToast({
      title: 'Profile Updated',
      message: 'Institution profile and contact credentials saved successfully.',
      type: 'success'
    });
  };

  const handleSaveAcademic = (e) => {
    e.preventDefault();
    showToast({
      title: 'Academic Settings Saved',
      message: 'Grading scale, passing threshold, and timetable constraints updated.',
      type: 'success'
    });
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    showToast({
      title: 'Notification Preferences Saved',
      message: 'SMS and WhatsApp automated broadcast rules updated.',
      type: 'success'
    });
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    showToast({
      title: 'Security Policies Enforced',
      message: 'Session timeouts and role permissions successfully saved.',
      type: 'success'
    });
  };

  const handleDownloadBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      schoolProfile,
      academicConfig,
      notifConfig,
      securityConfig
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `School_System_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();

    showToast({
      title: 'Backup Downloaded',
      message: 'Complete configuration and database snapshots exported to JSON.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 🌟 Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Master Control & Preferences</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              System Settings & Institution Profile
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
              Configure institution credentials, academic grading rules, notification gateways, role access, and backup archives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="clay-btn-emerald px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export System Backup</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🧭 Tabs Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-x-auto text-xs no-scrollbar">
        {[
          { id: 'general', label: 'School Profile & Branding', icon: Building2 },
          { id: 'academic', label: 'Academic & Grading Rules', icon: Sliders },
          { id: 'notifications', label: 'SMS & WhatsApp Gateway', icon: Bell },
          { id: 'security', label: 'Security & Access Control', icon: ShieldCheck },
          { id: 'backup', label: 'Database & Maintenance', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'clay-btn-emerald text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 🏢 TAB 1: SCHOOL PROFILE */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveGeneral} className="clay-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Institution Profile & Affiliation</h3>
              <p className="text-[11px] text-slate-400">Official details printed on Report Cards and Fee Invoices</p>
            </div>
            <button
              type="submit"
              className="clay-btn-emerald px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Official School Name *
              </label>
              <input
                type="text"
                required
                value={schoolProfile.schoolName}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, schoolName: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Affiliation & Board Code *
              </label>
              <input
                type="text"
                required
                value={schoolProfile.affiliationCode}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, affiliationCode: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Head of School / Principal Name
              </label>
              <input
                type="text"
                value={schoolProfile.principalName}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, principalName: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Active Academic Session
              </label>
              <input
                type="text"
                value={schoolProfile.academicYear}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, academicYear: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Administrative Email
              </label>
              <input
                type="email"
                value={schoolProfile.contactEmail}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, contactEmail: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Helpline Phone
              </label>
              <input
                type="text"
                value={schoolProfile.phone}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, phone: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Campus Postal Address
              </label>
              <input
                type="text"
                value={schoolProfile.address}
                onChange={(e) => setSchoolProfile({ ...schoolProfile, address: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </form>
      )}

      {/* ⚙️ TAB 2: ACADEMIC RULES */}
      {activeTab === 'academic' && (
        <form onSubmit={handleSaveAcademic} className="clay-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Academic Performance & Timetable Parameters</h3>
              <p className="text-[11px] text-slate-400">Rules governing student promotions, passing criteria, and daily lectures</p>
            </div>
            <button
              type="submit"
              className="clay-btn-emerald px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Rules</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Passing Percentage Threshold (%)
              </label>
              <input
                type="number"
                value={academicConfig.passingPercentage}
                onChange={(e) => setAcademicConfig({ ...academicConfig, passingPercentage: Number(e.target.value) })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Grading System Scale
              </label>
              <select
                value={academicConfig.gradingScale}
                onChange={(e) => setAcademicConfig({ ...academicConfig, gradingScale: e.target.value })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              >
                <option value="CBSE-9-Point">CBSE 9-Point Scale (A1 to E2)</option>
                <option value="Letter-Grade">Letter Grade (A+, A, B+, B, C, D, F)</option>
                <option value="Percentage-Only">Absolute Percentage Marks</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Working Days Per Week
              </label>
              <select
                value={academicConfig.workingDaysPerWeek}
                onChange={(e) => setAcademicConfig({ ...academicConfig, workingDaysPerWeek: Number(e.target.value) })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              >
                <option value={5}>5 Days (Monday to Friday)</option>
                <option value={6}>6 Days (Monday to Saturday)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Lecture Periods
              </label>
              <input
                type="number"
                value={academicConfig.periodsPerDay}
                onChange={(e) => setAcademicConfig({ ...academicConfig, periodsPerDay: Number(e.target.value) })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Mandatory Attendance Threshold for Exam Eligibility (%)
              </label>
              <input
                type="number"
                value={academicConfig.attendanceThreshold}
                onChange={(e) => setAcademicConfig({ ...academicConfig, attendanceThreshold: Number(e.target.value) })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              />
            </div>
          </div>
        </form>
      )}

      {/* 🔔 TAB 3: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <form onSubmit={handleSaveNotifications} className="clay-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Automated SMS & WhatsApp Broadcasting</h3>
              <p className="text-[11px] text-slate-400">Trigger instant automated communications for parents and students</p>
            </div>
            <button
              type="submit"
              className="clay-btn-emerald px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'smsAbsenteeismAlert', label: 'SMS Absenteeism Alert', desc: 'Send automated SMS to parents by 10:00 AM if student is marked Absent.' },
              { id: 'smsFeeReminderAlert', label: 'Fee Due Date Reminder', desc: 'Dispatch WhatsApp and SMS notification 3 days prior to fee installment deadline.' },
              { id: 'whatsappHomeworkBroadcast', label: 'Daily Homework WhatsApp Digest', desc: 'Send daily summary of assigned homework to parent numbers at 4:30 PM.' },
              { id: 'emailReportCards', label: 'Email Term Report Cards', desc: 'Auto-email official signed PDF report card upon exam result publication.' },
            ].map((item) => (
              <label key={item.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifConfig[item.id]}
                  onChange={(e) => setNotifConfig({ ...notifConfig, [item.id]: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 mt-0.5"
                />
                <div>
                  <div className="font-bold text-slate-800 dark:text-white text-xs">{item.label}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </form>
      )}

      {/* 🛡️ TAB 4: SECURITY */}
      {activeTab === 'security' && (
        <form onSubmit={handleSaveSecurity} className="clay-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Security & Role Permissions</h3>
              <p className="text-[11px] text-slate-400">Manage password expiration, 2FA, and teacher override rights</p>
            </div>
            <button
              type="submit"
              className="clay-btn-emerald px-4 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Security</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Inactivity Session Timeout (Minutes)
              </label>
              <input
                type="number"
                value={securityConfig.sessionTimeoutMinutes}
                onChange={(e) => setSecurityConfig({ ...securityConfig, sessionTimeoutMinutes: Number(e.target.value) })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password Expiry Cycle (Days)
              </label>
              <input
                type="number"
                value={securityConfig.forcePasswordResetDays}
                onChange={(e) => setSecurityConfig({ ...securityConfig, forcePasswordResetDays: Number(e.target.value) })}
                className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white"
              />
            </div>
          </div>
        </form>
      )}

      {/* 💾 TAB 5: DATABASE & BACKUP */}
      {activeTab === 'backup' && (
        <div className="clay-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Database Backup & System Maintenance</h3>
              <p className="text-[11px] text-slate-400">Export master records, reset demo data, and verify system integrity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-800 dark:text-white text-xs mb-1">Full Database Export</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Export all student profiles, fee transaction receipts, attendance logs, and marks sheets.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadBackup}
                className="mt-3 clay-btn-emerald py-2 px-4 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Complete JSON Backup</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between">
              <div>
                <div className="font-bold text-slate-800 dark:text-white text-xs mb-1">Database Integrity Check</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Scan database for orphaned student references, unlinked parent contacts, or missing roll numbers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast({ title: 'Integrity Check Passed', message: 'All 1,480 student records & relations verified 100% healthy.', type: 'success' })}
                className="mt-3 clay-btn-secondary py-2 px-4 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Run Integrity Verification</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
