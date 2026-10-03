import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  TrendingUp,
  GraduationCap,
  UserCheck,
  CreditCard,
  CalendarCheck,
  ArrowUpRight,
  ChevronRight,
  Users,
  Building2,
  CheckCircle2,
  Clock,
  Award,
  DollarSign
} from 'lucide-react';

const StatAnalyticsModal = ({ statType, isOpen, onClose }) => {
  if (!isOpen || !statType) return null;

  const [timeRange, setTimeRange] = useState('term'); // 'month' | 'term' | 'year'

  // Data configurations for each stat type
  const analyticsData = {
    students: {
      title: 'Student Enrollment & Demographics Analytics',
      metric: '1,248',
      submetric: 'Total Enrolled Students',
      target: '1,500 Max Capacity (83.2% filled)',
      icon: GraduationCap,
      accentColor: 'emerald',
      trend: '+14% growth vs last academic session',
      quickLink: '/admin/students',
      quickLinkLabel: 'Go to Student Directory',
      // Chart Data
      monthlyTrend: [
        { label: 'Apr', value: 1120 },
        { label: 'May', value: 1160 },
        { label: 'Jun', value: 1195 },
        { label: 'Jul', value: 1215 },
        { label: 'Aug', value: 1230 },
        { label: 'Sep', value: 1248 },
      ],
      breakdown: [
        { name: 'Primary Wing (Classes 1 - 5)', count: '412 Students', percent: 33, color: 'bg-emerald-500' },
        { name: 'Middle Wing (Classes 6 - 8)', count: '360 Students', percent: 29, color: 'bg-teal-500' },
        { name: 'Secondary Wing (Classes 9 - 10)', count: '286 Students', percent: 23, color: 'bg-cyan-500' },
        { name: 'Senior Secondary (Classes 11 - 12)', count: '190 Students', percent: 15, color: 'bg-sky-500' },
      ],
      statsPills: [
        { label: 'Boys Ratio', val: '648 (51.9%)' },
        { label: 'Girls Ratio', val: '600 (48.1%)' },
        { label: 'Active Sections', val: '32 Sections' },
        { label: 'Average Class Size', val: '39 Students' },
      ],
    },
    teachers: {
      title: 'Faculty & Staff Staffing Analytics',
      metric: '64',
      submetric: 'Active Teaching Faculty',
      target: '64 / 70 Sanctioned Posts (91.4% staffed)',
      icon: UserCheck,
      accentColor: 'emerald',
      trend: '+6 new faculty joined this quarter',
      quickLink: '/admin/teachers',
      quickLinkLabel: 'Go to Faculty Directory',
      // Chart Data
      monthlyTrend: [
        { label: 'Apr', value: 58 },
        { label: 'May', value: 59 },
        { label: 'Jun', value: 60 },
        { label: 'Jul', value: 62 },
        { label: 'Aug', value: 63 },
        { label: 'Sep', value: 64 },
      ],
      breakdown: [
        { name: 'Science & Mathematics', count: '22 Teachers', percent: 34, color: 'bg-emerald-500' },
        { name: 'Languages (English, Hindi, Sanskrit)', count: '18 Teachers', percent: 28, color: 'bg-teal-500' },
        { name: 'Social Studies & Humanities', count: '12 Teachers', percent: 19, color: 'bg-cyan-500' },
        { name: 'Computer Science & ICT', count: '6 Teachers', percent: 10, color: 'bg-sky-500' },
        { name: 'Arts, Sports & Music', count: '6 Teachers', percent: 9, color: 'bg-indigo-500' },
      ],
      statsPills: [
        { label: 'Student-Teacher Ratio', val: '19.5 : 1' },
        { label: 'Postgraduate Faculty', val: '52 (81.2%)' },
        { label: 'Avg Experience', val: '7.4 Years' },
        { label: 'Attendance Rate', val: '96.8%' },
      ],
    },
    fees: {
      title: 'Fee Collection & Realization Analytics',
      metric: '₹14.20 Lakh',
      submetric: 'Realized Fee Revenue',
      target: '₹14.2L / ₹16.5L Target (86.0% Realized)',
      icon: CreditCard,
      accentColor: 'emerald',
      trend: '+₹2.8L collected this week',
      quickLink: '/admin/fees/collect',
      quickLinkLabel: 'Collect & Record Fees',
      // Chart Data
      monthlyTrend: [
        { label: 'Apr', value: 3.8 },
        { label: 'May', value: 5.6 },
        { label: 'Jun', value: 7.2 },
        { label: 'Jul', value: 9.8 },
        { label: 'Aug', value: 12.1 },
        { label: 'Sep', value: 14.2 },
      ],
      breakdown: [
        { name: 'Tuition & Academic Fees', count: '₹10.50 Lakh', percent: 74, color: 'bg-emerald-500' },
        { name: 'Laboratory & Computer Lab', count: '₹1.85 Lakh', percent: 13, color: 'bg-teal-500' },
        { name: 'Transport / Bus Route Fee', count: '₹1.20 Lakh', percent: 8, color: 'bg-cyan-500' },
        { name: 'Library & Activities Fund', count: '₹0.65 Lakh', percent: 5, color: 'bg-sky-500' },
      ],
      statsPills: [
        { label: 'Pending Dues Amount', val: '₹2.30 Lakh' },
        { label: 'Defaulters Count', val: '58 Students' },
        { label: 'Online UPI Collections', val: '68.4%' },
        { label: 'Offline / Cash Desk', val: '31.6%' },
      ],
    },
    attendance: {
      title: "Today's Campus Attendance Real-Time Analytics",
      metric: '95.4%',
      submetric: 'Overall Attendance Today',
      target: '1,191 of 1,248 Students Present',
      icon: CalendarCheck,
      accentColor: 'emerald',
      trend: '+1.8% higher than yesterday',
      quickLink: '/admin/attendance/student',
      quickLinkLabel: 'View Class-wise Attendance',
      // Chart Data
      monthlyTrend: [
        { label: 'Mon', value: 93.2 },
        { label: 'Tue', value: 94.5 },
        { label: 'Wed', value: 95.8 },
        { label: 'Thu', value: 95.1 },
        { label: 'Fri', value: 96.0 },
        { label: 'Today', value: 95.4 },
      ],
      breakdown: [
        { name: 'Present in Class Today', count: '1,191 Students', percent: 95.4, color: 'bg-emerald-500' },
        { name: 'Unexcused Absent', count: '38 Students', percent: 3.0, color: 'bg-rose-500' },
        { name: 'Authorized Medical/Leave', count: '19 Students', percent: 1.6, color: 'bg-amber-500' },
      ],
      statsPills: [
        { label: 'Highest Class Turnout', val: 'Class 10-A (98.2%)' },
        { label: 'Lowest Class Turnout', val: 'Class 6-B (89.1%)' },
        { label: 'Faculty Present Today', val: '62 / 64 Staff' },
        { label: 'Biometric Sync Status', val: 'Live (All Gates)' },
      ],
    },
  };

  const current = analyticsData[statType] || analyticsData.students;
  const Icon = current.icon;

  // Compute max value for bar scaling
  const maxTrendVal = Math.max(...current.monthlyTrend.map((d) => d.value));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="clay-card max-w-3xl w-full p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto custom-scrollbar">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 clay-icon-pill">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">
                {current.title}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {current.trend}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Academic Year 2026-27</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="clay-btn-secondary p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big KPI summary row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Current Total
            </span>
            <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mt-0.5">
              {current.metric}
            </div>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">
              {current.submetric}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Benchmark Target
            </span>
            <div className="text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-400 mt-1">
              {current.target}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Annual Planned Target
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Quick Action
            </span>
            <Link
              to={current.quickLink}
              onClick={onClose}
              className="clay-btn-emerald mt-1 py-1.5 px-3 text-xs font-semibold flex items-center justify-between shadow-xs"
            >
              <span>{current.quickLinkLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Interactive Graph Chart Section */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 my-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Performance & Growth Graph Timeline</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Monthly trajectory progression analysis
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setTimeRange('month')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                  timeRange === 'month' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setTimeRange('term')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                  timeRange === 'term' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Term 1
              </button>
              <button
                type="button"
                onClick={() => setTimeRange('year')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                  timeRange === 'year' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Bar Graph Visualizer */}
          <div className="pt-6 pb-2">
            <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-40 border-b border-slate-200 dark:border-slate-800 pb-2">
              {current.monthlyTrend.map((item, idx) => {
                const heightPercent = Math.max(15, Math.round((item.value / maxTrendVal) * 100));
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {typeof item.value === 'number' && item.value < 100 ? `${item.value}%` : item.value}
                    </span>
                    <div className="w-full max-w-[36px] bg-slate-200 dark:bg-slate-800 rounded-t-lg overflow-hidden flex items-end h-32">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 dark:from-emerald-500 dark:to-teal-300 rounded-t-lg transition-all duration-500 group-hover:brightness-110 shadow-xs"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Breakdown & Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {/* Breakdown progress list */}
          <div className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
              Distribution Breakdown
            </h4>
            <div className="space-y-3">
              {current.breakdown.map((b, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                      {b.name}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {b.count} ({b.percent}%)
                    </span>
                  </div>
                  <div className="clay-progress-track h-2 w-full">
                    <div
                      className={`h-full rounded-full ${b.color} transition-all duration-500`}
                      style={{ width: `${b.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metric Indicators */}
          <div className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
              Institutional Indicators
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {current.statsPills.map((pill, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs"
                >
                  <span className="block text-[10px] font-semibold text-slate-400">
                    {pill.label}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white mt-0.5 block">
                    {pill.val}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Live System Sync
              </span>
              <span>Updated Just Now</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="clay-btn-secondary px-4 py-2 text-xs font-semibold cursor-pointer"
          >
            Close Details
          </button>
          <Link
            to={current.quickLink}
            onClick={onClose}
            className="clay-btn-emerald px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <span>Open Full {current.submetric}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatAnalyticsModal;
