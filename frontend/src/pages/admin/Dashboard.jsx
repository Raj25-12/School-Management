import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  GraduationCap,
  UserCheck,
  CreditCard,
  ArrowUpRight,
  CalendarCheck,
  Sparkles,
  Bell,
  Send,
  Pin,
  BarChart3,
  PieChart,
  Clock,
  Activity,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StatAnalyticsModal = React.lazy(() => import('../../components/analytics/StatAnalyticsModal'));

const AdminDashboard = () => {
  const { user } = useAuth();
  const { notifications, sendNotification } = useNotifications();

  // Selected Stat Modal
  const [selectedStatKey, setSelectedStatKey] = useState(null); // 'students' | 'teachers' | 'fees' | 'attendance'

  // Quick Broadcast Notification Modal State
  const [isQuickBroadcastOpen, setIsQuickBroadcastOpen] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [quickAudience, setQuickAudience] = useState('all');

  // Dashboard Chart View Controls
  const [activeTrendGraph, setActiveTrendGraph] = useState('attendance'); // 'attendance' | 'fees' | 'enrollment'
  const [activeDistributionGraph, setActiveDistributionGraph] = useState('wings'); // 'wings' | 'faculty'
  const [notificationFilter, setNotificationFilter] = useState('all'); // 'all' | 'teachers' | 'students' | 'pinned'

  const handleQuickSend = (e) => {
    e.preventDefault();
    if (!quickTitle.trim() || !quickMessage.trim()) return;

    sendNotification({
      title: quickTitle,
      message: quickMessage,
      targetAudience: quickAudience,
      targetClass: quickAudience === 'teachers' ? 'All Faculty' : 'All Classes',
      type: 'general',
      priority: 'normal',
      pinned: true,
      senderRole: 'admin',
      senderName: user?.name || 'Administrator',
      senderEmail: user?.email || 'admin@school.com',
    });

    setQuickTitle('');
    setQuickMessage('');
    setIsQuickBroadcastOpen(false);
  };

  // Main KPI Stats (Only 1 single set of stats)
  const stats = [
    {
      id: 'students',
      title: 'Total Students',
      value: '1,248',
      icon: GraduationCap,
      detail: '83.2% capacity (1,500 target)',
      progress: 83.2,
      growth: '+14% YoY',
      clayClass: 'clay-card',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      pillBg: 'bg-emerald-50 dark:bg-emerald-950/70',
      barColor: 'bg-emerald-600 dark:bg-emerald-500'
    },
    {
      id: 'teachers',
      title: 'Total Teachers',
      value: '64',
      icon: UserCheck,
      detail: '91.4% staffed (70 posts)',
      progress: 91.4,
      growth: '+6 new',
      clayClass: 'clay-card',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      pillBg: 'bg-emerald-50 dark:bg-emerald-950/70',
      barColor: 'bg-emerald-600 dark:bg-emerald-500'
    },
    {
      id: 'fees',
      title: 'Fee Collection',
      value: '₹14.2 L',
      icon: CreditCard,
      detail: '86% realized (₹16.5L target)',
      progress: 86.0,
      growth: '86% Realized',
      clayClass: 'clay-card',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      pillBg: 'bg-emerald-50 dark:bg-emerald-950/70',
      barColor: 'bg-emerald-600 dark:bg-emerald-500'
    },
    {
      id: 'attendance',
      title: "Today's Attendance",
      value: '95.4%',
      icon: CalendarCheck,
      detail: '1,191 present today',
      progress: 95.4,
      growth: '+1.8% vs yesterday',
      clayClass: 'clay-card',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      pillBg: 'bg-emerald-50 dark:bg-emerald-950/70',
      barColor: 'bg-emerald-600 dark:bg-emerald-500'
    },
  ];

  // Graph Data: Trends
  const trendGraphData = {
    attendance: {
      title: 'Weekly Attendance Rate (%)',
      subtitle: 'Daily student attendance trends this week',
      badge: '95.4% Today',
      items: [
        { label: 'Mon', value: 93.2, display: '93.2%' },
        { label: 'Tue', value: 94.5, display: '94.5%' },
        { label: 'Wed', value: 95.8, display: '95.8%' },
        { label: 'Thu', value: 95.1, display: '95.1%' },
        { label: 'Fri', value: 96.0, display: '96.0%' },
        { label: 'Today', value: 95.4, display: '95.4%' },
      ],
    },
    fees: {
      title: 'Monthly Fee Realization (₹ Lakh)',
      subtitle: 'Cumulative collection milestone across academic term',
      badge: '₹14.2L Collected',
      items: [
        { label: 'Apr', value: 3.8, display: '₹3.8L' },
        { label: 'May', value: 5.6, display: '₹5.6L' },
        { label: 'Jun', value: 7.2, display: '₹7.2L' },
        { label: 'Jul', value: 9.8, display: '₹9.8L' },
        { label: 'Aug', value: 12.1, display: '₹12.1L' },
        { label: 'Sep', value: 14.2, display: '₹14.2L' },
      ],
    },
    enrollment: {
      title: 'Student Admissions Growth',
      subtitle: 'Monthly active student enrollment count',
      badge: '1,248 Enrolled',
      items: [
        { label: 'Apr', value: 1120, display: '1,120' },
        { label: 'May', value: 1160, display: '1,160' },
        { label: 'Jun', value: 1195, display: '1,195' },
        { label: 'Jul', value: 1215, display: '1,215' },
        { label: 'Aug', value: 1230, display: '1,230' },
        { label: 'Sep', value: 1248, display: '1,248' },
      ],
    },
  };

  const currentTrend = trendGraphData[activeTrendGraph];
  const maxTrendVal = Math.max(...currentTrend.items.map((i) => i.value));

  // Graph Data: Distribution
  const distributionData = {
    wings: {
      title: 'Student Enrollment by Wing',
      subtitle: 'Distribution of 1,248 students across school wings',
      items: [
        { name: 'Primary Wing (Classes 1 - 5)', count: '412 Students', percent: 33, color: 'bg-emerald-500' },
        { name: 'Middle Wing (Classes 6 - 8)', count: '360 Students', percent: 29, color: 'bg-teal-500' },
        { name: 'Secondary Wing (Classes 9 - 10)', count: '286 Students', percent: 23, color: 'bg-cyan-500' },
        { name: 'Senior Secondary (Classes 11 - 12)', count: '190 Students', percent: 15, color: 'bg-sky-500' },
      ],
      pills: [
        { label: 'Boys Ratio', val: '648 (51.9%)' },
        { label: 'Girls Ratio', val: '600 (48.1%)' },
        { label: 'Active Sections', val: '32 Sections' },
        { label: 'Avg Class Size', val: '39 Students' },
      ],
    },
    faculty: {
      title: 'Faculty by Department & Subject',
      subtitle: 'Allocation of 64 teaching staff members',
      items: [
        { name: 'Science & Mathematics', count: '22 Teachers', percent: 34, color: 'bg-emerald-500' },
        { name: 'Languages (English, Hindi)', count: '18 Teachers', percent: 28, color: 'bg-teal-500' },
        { name: 'Social Studies & Humanities', count: '12 Teachers', percent: 19, color: 'bg-cyan-500' },
        { name: 'Computer Science & ICT', count: '6 Teachers', percent: 10, color: 'bg-sky-500' },
        { name: 'Arts, Sports & Music', count: '6 Teachers', percent: 9, color: 'bg-indigo-500' },
      ],
      pills: [
        { label: 'Student-Teacher Ratio', val: '19.5 : 1' },
        { label: 'Postgraduate Staff', val: '52 (81.2%)' },
        { label: 'Avg Experience', val: '7.4 Years' },
        { label: 'Faculty Present', val: '62 / 64 Staff' },
      ],
    },
  };

  const currentDist = distributionData[activeDistributionGraph];

  // Filtered notifications
  const filteredNotifications = notifications.filter((notif) => {
    if (notificationFilter === 'teachers') {
      return notif.targetAudience === 'teachers' || notif.targetAudience === 'teacher';
    }
    if (notificationFilter === 'students') {
      return notif.targetAudience === 'students' || notif.targetAudience === 'student';
    }
    if (notificationFilter === 'pinned') {
      return notif.pinned;
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-6">
      {/* Clean Welcome Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Academic Year 2026-27</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Welcome back, {user?.name || 'Administrator'}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Live school dashboard summary, performance graphs, and circulars.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsQuickBroadcastOpen(true)}
            className="clay-btn-emerald px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-md text-white shrink-0"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>+ Send Notification</span>
          </button>
        </div>
      </div>

      {/* 1. STATS (State) - Clean 4 KPI Cards (No duplicates) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedStatKey(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedStatKey(item.id);
                }
              }}
              className={`${item.clayClass} p-3.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group border border-transparent hover:border-emerald-300/80 dark:hover:border-emerald-700/80 select-none`}
              title="Click to view detailed analytics graph"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </span>
                <div className={`p-1.5 rounded-lg ${item.pillBg} ${item.iconColor} clay-icon-pill group-hover:scale-110 transition-transform`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-baseline justify-between">
                  <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">
                    {item.value}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                    {item.growth}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="clay-progress-track h-1.5 w-full mt-2">
                  <div
                    className={`h-full rounded-full ${item.barColor} transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1.5">
                  <span className="truncate">{item.detail}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 shrink-0 ml-1">
                    <span>Graph</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. GRAPHS - Dedicated Visual Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Graph 1: Performance & Growth Timeline Chart */}
        <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 clay-icon-pill">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                    {currentTrend.title}
                  </h2>
                  <p className="text-[11px] text-slate-400">{currentTrend.subtitle}</p>
                </div>
              </div>

              {/* Graph Switcher Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveTrendGraph('attendance')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                    activeTrendGraph === 'attendance'
                      ? 'clay-btn-emerald text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Attendance
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTrendGraph('fees')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                    activeTrendGraph === 'fees'
                      ? 'clay-btn-emerald text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Fees Realization
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTrendGraph('enrollment')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                    activeTrendGraph === 'enrollment'
                      ? 'clay-btn-emerald text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Admissions
                </button>
              </div>
            </div>

            {/* Bar Graph Visualizer */}
            <div className="pt-6 pb-2">
              <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-44 border-b border-slate-200 dark:border-slate-800 pb-2 px-1">
                {currentTrend.items.map((item, idx) => {
                  const heightPercent = Math.max(16, Math.round((item.value / maxTrendVal) * 100));
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.display}
                      </span>
                      <div className="w-full max-w-[38px] bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden flex items-end h-32">
                        <div
                          className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 dark:from-emerald-500 dark:to-teal-300 rounded-t-xl transition-all duration-500 group-hover:brightness-110 shadow-xs"
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

          {/* Graph Footer Stats */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
              <Activity className="w-3 h-3" />
              <span>{currentTrend.badge}</span>
            </span>
            <button
              type="button"
              onClick={() => setSelectedStatKey(activeTrendGraph === 'attendance' ? 'attendance' : activeTrendGraph === 'fees' ? 'fees' : 'students')}
              className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-semibold inline-flex items-center gap-1 cursor-pointer hover:underline text-[11px]"
            >
              <span>Full Analytics</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Graph 2: Distribution & Demographics Breakdown Chart */}
        <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 clay-icon-pill">
                  <PieChart className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                    {currentDist.title}
                  </h2>
                  <p className="text-[11px] text-slate-400">{currentDist.subtitle}</p>
                </div>
              </div>

              {/* Distribution Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveDistributionGraph('wings')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                    activeDistributionGraph === 'wings'
                      ? 'clay-btn-emerald text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Student Wings
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDistributionGraph('faculty')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                    activeDistributionGraph === 'faculty'
                      ? 'clay-btn-emerald text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                  }`}
                >
                  Faculty Depts
                </button>
              </div>
            </div>

            {/* Distribution Visual Progress Bars */}
            <div className="space-y-3.5 my-4">
              {currentDist.items.map((b, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[220px]">
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

          {/* Key Indicators Matrix */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentDist.pills.map((pill, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-center"
                >
                  <span className="block text-[10px] font-semibold text-slate-400 truncate">
                    {pill.label}
                  </span>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-white mt-0.5 block truncate">
                    {pill.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. NOTIFICATIONS - Active Notices & Circulars (No duplicate action buttons) */}
      <div className="clay-card p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 mb-3.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 clay-icon-pill">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span>Active School Notices</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                  {notifications.length}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Latest announcements for teachers and students
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setNotificationFilter('all')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  notificationFilter === 'all'
                    ? 'clay-btn-emerald text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setNotificationFilter('teachers')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  notificationFilter === 'teachers'
                    ? 'clay-btn-emerald text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                Teachers
              </button>
              <button
                type="button"
                onClick={() => setNotificationFilter('students')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  notificationFilter === 'students'
                    ? 'clay-btn-emerald text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                Students
              </button>
              <button
                type="button"
                onClick={() => setNotificationFilter('pinned')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  notificationFilter === 'pinned'
                    ? 'clay-btn-emerald text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                Pinned
              </button>
            </div>

            <Link
              to="/admin/notices"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <span>Notices Hub</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>
          </div>
        </div>

        {/* Notices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredNotifications.slice(0, 6).map((notif) => (
            <div
              key={notif.id}
              className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {notif.targetClass || notif.targetAudience}
                    </span>
                    {notif.priority === 'high' && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        High Priority
                      </span>
                    )}
                  </div>
                  {notif.pinned && (
                    <Pin className="w-3 h-3 text-emerald-600 dark:text-emerald-400 fill-emerald-600 shrink-0" />
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1 mt-1">
                  {notif.title}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate max-w-[140px] font-medium text-slate-500 dark:text-slate-400">
                  {notif.senderName || 'Admin Cell'}
                </span>
                <span className="flex items-center gap-1 shrink-0">
                  <Clock className="w-2.5 h-2.5" />
                  {notif.createdAt
                    ? new Date(notif.createdAt).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Recent'}
                </span>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-slate-400">
              No notifications found matching selected filter.
            </div>
          )}
        </div>
      </div>

      {/* Quick Broadcast Notification Modal */}
      {isQuickBroadcastOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="clay-card max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 clay-icon-pill">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Broadcast Notification from Admin
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Dispatches instant alert to chosen recipients across school
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickBroadcastOpen(false)}
                className="clay-btn-secondary p-1.5 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuickSend} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Audience
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickAudience('all')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      quickAudience === 'all'
                        ? 'clay-btn-emerald text-white shadow-xs'
                        : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Everyone
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickAudience('teachers')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      quickAudience === 'teachers'
                        ? 'clay-btn-emerald text-white shadow-xs'
                        : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Teachers
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickAudience('students')}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      quickAudience === 'students'
                        ? 'clay-btn-emerald text-white shadow-xs'
                        : 'clay-btn-secondary text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Students
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Notice Headline
                </label>
                <input
                  type="text"
                  required
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="e.g. Campus Holiday Notice or Exam Update"
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Content
                </label>
                <textarea
                  rows={3}
                  required
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  placeholder="Type circular announcement details..."
                  className="clay-input w-full px-3 py-2 text-xs font-medium text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuickBroadcastOpen(false)}
                  className="clay-btn-secondary px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-emerald px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md text-white"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Notification Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Stat Analytics & Graph Modal (Loaded on Demand) */}
      {selectedStatKey && (
        <React.Suspense fallback={null}>
          <StatAnalyticsModal
            statType={selectedStatKey}
            isOpen={!!selectedStatKey}
            onClose={() => setSelectedStatKey(null)}
          />
        </React.Suspense>
      )}
    </div>
  );
};

export default AdminDashboard;
