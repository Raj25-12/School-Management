import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  GraduationCap,
  UserCheck,
  CreditCard,
  ArrowUpRight,
  UserPlus,
  TrendingUp,
  AlertTriangle,
  Building2,
  CalendarCheck,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Students', value: '1,248', icon: GraduationCap, detail: '1,248 / 1,500 target', progress: 83.2, clayClass: 'clay-indigo', iconColor: 'text-indigo-600 dark:text-indigo-400', pillBg: 'bg-indigo-100/80 dark:bg-indigo-900/50', barColor: 'bg-indigo-600 dark:bg-indigo-400' },
    { title: 'Total Teachers', value: '64', icon: UserCheck, detail: '64 / 70 staffing', progress: 91.4, clayClass: 'clay-emerald', iconColor: 'text-emerald-600 dark:text-emerald-400', pillBg: 'bg-emerald-100/80 dark:bg-emerald-900/50', barColor: 'bg-emerald-500 dark:bg-emerald-400' },
    { title: 'Fee Collection', value: '₹14.2 L', icon: CreditCard, detail: '₹14.2L / ₹16.5L', progress: 86.0, clayClass: 'clay-purple', iconColor: 'text-purple-600 dark:text-purple-400', pillBg: 'bg-purple-100/80 dark:bg-purple-900/50', barColor: 'bg-purple-600 dark:bg-purple-400' },
    { title: "Today's Attendance", value: '95.4%', icon: CalendarCheck, detail: '1,191 of 1,248 present', progress: 95.4, clayClass: 'clay-amber', iconColor: 'text-amber-600 dark:text-amber-400', pillBg: 'bg-amber-100/80 dark:bg-amber-900/50', barColor: 'bg-amber-500 dark:bg-amber-400' },
  ];

  const institutionalGoals = [
    { title: 'Term 1 Fee Realization', current: '₹14.2 Lakh', target: '₹16.5 Lakh', progress: 86, color: 'from-purple-500 to-indigo-600' },
    { title: 'Annual Student Admissions', current: '1,248 Students', target: '1,500 Capacity', progress: 83.2, color: 'from-emerald-500 to-teal-600' },
    { title: 'Teacher Attendance Benchmark', current: '62 / 64 Staff', target: '96.8% active', progress: 96.8, color: 'from-amber-500 to-orange-600' },
  ];

  const recentAdmissions = [
    { id: 'ADM-1042', name: 'Rohan Sharma', class: 'Class 9-A', parent: 'Manoj Sharma', status: 'Approved' },
    { id: 'ADM-1043', name: 'Aarav Patel', class: 'Class 6-B', parent: 'Vikram Patel', status: 'Pending Review' },
    { id: 'ADM-1044', name: 'Sneha Roy', class: 'Class 11-Sci', parent: 'Anil Roy', status: 'Approved' },
    { id: 'ADM-1045', name: 'Kavya Nair', class: 'Class 8-C', parent: 'Suresh Nair', status: 'Fees Pending' },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* 🌟 Compact Claymorphism Welcome Banner (Green Admin Theme) */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>School Administration System • 2026-27</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Welcome back, {user?.name || 'Administrator'}! 🏛️
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              1,248 students enrolled across 32 sections. Today's overall attendance rate is <span className="font-bold text-emerald-600 dark:text-emerald-400">95.4%</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              to="/admin/teachers/add"
              className="clay-btn-emerald px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Teacher</span>
            </Link>
            <Link
              to="/admin/students/add"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>Add Student</span>
            </Link>
            <Link
              to="/admin/attendance/teacher"
              className="clay-btn-secondary px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Staff Attendance</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 Compact KPI Stat Cards with Progress Bars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`${item.clayClass} p-3.5 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {item.title}
                </span>
                <div className={`p-1.5 rounded-lg ${item.pillBg} ${item.iconColor} clay-icon-pill`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-baseline justify-between">
                  <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">
                    {item.value}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    {item.progress}%
                  </span>
                </div>
                {/* 🌟 Compact Claymorphic Progress Bar */}
                <div className="clay-progress-track h-1.5 w-full mt-1.5">
                  <div
                    className={`h-full rounded-full ${item.barColor} transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Admissions Table */}
        <div className="lg:col-span-2 clay-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 clay-icon-pill">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">Recent Admissions</h2>
                <p className="text-[11px] text-slate-400">Latest enrolled students list</p>
              </div>
            </div>
            <Link
              to="/admin/students"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 inline-flex items-center gap-0.5 hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-500 uppercase bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold">
                <tr>
                  <th className="px-3 py-2 rounded-l-lg">Student</th>
                  <th className="px-3 py-2">Class</th>
                  <th className="px-3 py-2">Parent</th>
                  <th className="px-3 py-2 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {recentAdmissions.map((st, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="px-3 py-2.5">
                      <div className="font-bold text-slate-800 dark:text-white">{st.name}</div>
                      <div className="text-[10px] text-slate-400">{st.id}</div>
                    </td>
                    <td className="px-3 py-2.5 text-slate-600 dark:text-slate-300 font-semibold">{st.class}</td>
                    <td className="px-3 py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">{st.parent}</td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          st.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                            : st.status === 'Fees Pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300'
                        }`}
                      >
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Operations & Alerts */}
        <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <div className="p-1.5 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 clay-icon-pill">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">Quick Management</h2>
            </div>

            <div className="space-y-2">
              <Link
                to="/admin/attendance/report"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                    <CalendarCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">Daily Attendance Report</h4>
                    <p className="text-[10px] text-slate-400">Download section summary</p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/admin/fees/pending"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">Pending Fee Defaulters</h4>
                    <p className="text-[10px] text-slate-400">42 students pending</p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/admin/reports"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">Academic Analytics</h4>
                    <p className="text-[10px] text-slate-400">Term pass percentage</p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 Institutional Targets & Metrics Progress Bars */}
      <div className="clay-card p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 clay-icon-pill">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                Institutional Targets & Annual Progress
              </h2>
              <p className="text-[11px] text-slate-400">Key metrics tracking for academic term 2026-27</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Realtime Tracking
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {institutionalGoals.map((goal, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{goal.title}</span>
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{goal.progress}%</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{goal.current}</p>
              {/* Progress Bar */}
              <div className="clay-progress-track h-2 w-full mt-2">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${goal.color} transition-all duration-500`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] text-slate-400 mt-1 font-semibold">
                <span>Current</span>
                <span>Target: {goal.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


