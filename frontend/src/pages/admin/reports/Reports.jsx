import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  Printer,
  Users,
  CreditCard,
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Layers,
  BookOpen,
  UserCheck,
  Target,
  Trophy,
  Activity
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const monthlyRevenueData = [
  { month: 'Apr', amount: 5.4, target: 5.0, count: 240 },
  { month: 'May', amount: 4.8, target: 5.0, count: 210 },
  { month: 'Jun', amount: 6.2, target: 5.5, count: 280 },
  { month: 'Jul', amount: 7.1, target: 6.0, count: 310 },
  { month: 'Aug', amount: 6.8, target: 6.0, count: 295 },
  { month: 'Sep', amount: 7.5, target: 6.5, count: 325 },
  { month: 'Oct (Est)', amount: 5.0, target: 5.0, count: 220 },
];

const Reports = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('academic'); // 'academic' | 'financial' | 'attendance' | 'staff'
  const [selectedTerm, setSelectedTerm] = useState('Term 1 - Mid Term (2026)');
  const [selectedSession, setSelectedSession] = useState('2026-2027');

  const handleExportCSV = (reportName) => {
    showToast({
      title: 'Export Generated',
      message: `${reportName} summary exported to CSV spreadsheet successfully.`,
      type: 'success'
    });
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-12 print:p-0">
      {/* 🌟 Header Banner */}
      <div className="clay-emerald p-4 sm:p-5 relative overflow-hidden print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5 shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Executive Data & School Performance Analytics</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Institutional Analytics & Audit Reports
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
              Interactive visualizations for academic merit, fee collections, student attendance curves, and faculty workload analytics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleExportCSV(`${activeTab.toUpperCase()}_Report`)}
              className="clay-btn-secondary px-3 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={handlePrintReport}
              className="clay-btn-emerald px-3.5 py-2 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* 📊 KPI Summary Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-4">
        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Enrolled Students
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">1,480</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +8.4% vs last year
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              YTD Fees Collected
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">₹42,85,000</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">91.2% Realization</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <CreditCard className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Campus Attendance Rate
            </span>
            <div className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mt-0.5">95.4%</div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">High Punctuality</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="clay-card p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Examination Pass Rate
            </span>
            <div className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">98.2%</div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Mid-Term Aggregate</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 clay-icon-pill">
            <Award className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 🧭 Tabs Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 print:hidden overflow-x-auto text-xs no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('academic')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'academic'
              ? 'clay-btn-emerald text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic & Exam Analytics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('financial')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'financial'
              ? 'clay-btn-emerald text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Revenue & Collection Chart</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'attendance'
              ? 'clay-btn-emerald text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Attendance Trends</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('staff')}
          className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'staff'
              ? 'clay-btn-emerald text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Faculty & Workload</span>
        </button>
      </div>

      {/* 📚 TAB 1: ACADEMIC PERFORMANCE */}
      {activeTab === 'academic' && (
        <div className="space-y-4">
          {/* Top Rankers Leaderboard & Class Score Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 clay-card p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                    Class-Wise Examination Score Averages
                  </h3>
                  <p className="text-[11px] text-slate-400">Average Percentage and Pass Rate Breakdown</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200">
                  Session 2026-2027
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { class: 'Class 12 (Science & Commerce)', students: 160, avgPercent: 88.5, passRate: 99.4, topSubject: 'Physics (92%)' },
                  { class: 'Class 11 (Science & Commerce)', students: 175, avgPercent: 84.2, passRate: 98.1, topSubject: 'Mathematics (88%)' },
                  { class: 'Class 10 (Secondary Board)', students: 180, avgPercent: 89.8, passRate: 100.0, topSubject: 'Computer Science (94%)' },
                  { class: 'Class 9 (Secondary Wing)', students: 190, avgPercent: 82.0, passRate: 97.5, topSubject: 'English (86%)' },
                  { class: 'Class 8 (Middle Wing)', students: 210, avgPercent: 85.6, passRate: 99.0, topSubject: 'Science (90%)' },
                  { class: 'Class 7 & 6 (Junior Wing)', students: 380, avgPercent: 87.3, passRate: 99.5, topSubject: 'Social Studies (89%)' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="w-full sm:w-1/3">
                      <div className="font-bold text-slate-800 dark:text-white text-xs">{item.class}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{item.students} Students Tested</div>
                    </div>

                    <div className="w-full sm:w-1/3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-600 dark:text-slate-300">Average Score</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">{item.avgPercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.avgPercent}%` }}></div>
                      </div>
                    </div>

                    <div className="w-full sm:w-1/3 flex items-center justify-between sm:justify-end gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Pass Rate</span>
                        <span className="font-bold text-slate-800 dark:text-white">{item.passRate}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Top Subject</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-[11px]">{item.topSubject}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* School Toppers Podium */}
            <div className="clay-card p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Campus Academic Merit Toppers</span>
                </h3>
                <div className="space-y-2.5">
                  {[
                    { rank: '🥇 Rank 1', name: 'Alex Johnson', class: 'Class 10-A', score: '98.6%', badge: 'Gold Scholar' },
                    { rank: '🥈 Rank 2', name: 'Pooja Hegde', class: 'Class 12-Science', score: '97.8%', badge: 'Silver Medal' },
                    { rank: '🥉 Rank 3', name: 'Tanvi Joshi', class: 'Class 9-A', score: '97.2%', badge: 'Bronze Medal' },
                    { rank: '🎖️ Rank 4', name: 'Ananya Roy', class: 'Class 11-Commerce', score: '96.5%', badge: 'High Distinction' },
                    { rank: '🎖️ Rank 5', name: 'Rohan Sharma', class: 'Class 10-A', score: '95.8%', badge: 'High Distinction' }
                  ].map((top, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-white">{top.rank} • {top.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{top.class}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-emerald-700 dark:text-emerald-400">{top.score}</div>
                        <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400">{top.badge}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grade Distribution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { grade: 'A+ (90-100%)', count: 482, percent: 32.5, color: 'bg-emerald-500' },
              { grade: 'A (80-89%)', count: 520, percent: 35.1, color: 'bg-emerald-600' },
              { grade: 'B+ (70-79%)', count: 285, percent: 19.3, color: 'bg-indigo-500' },
              { grade: 'B (60-69%)', count: 140, percent: 9.5, color: 'bg-amber-500' },
              { grade: 'C & D (<60%)', count: 53, percent: 3.6, color: 'bg-slate-400' },
            ].map((g, idx) => (
              <div key={idx} className="clay-card p-3.5 text-center">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{g.grade}</span>
                <div className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">{g.count}</div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{g.percent}% of students</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 💳 TAB 2: FINANCIAL & FEE REVENUE */}
      {activeTab === 'financial' && (
        <div className="space-y-4">
          {/* Monthly Revenue Visual Bar Chart */}
          <div className="clay-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Monthly Fee Inflow Trend (in ₹ Lakhs)
                </h3>
                <p className="text-[11px] text-slate-400">Actual Collections vs Target Inflow Projection</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span> Actual
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 dark:bg-slate-700 inline-block"></span> Target
                </span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2 border-b border-slate-200 dark:border-slate-800">
              {monthlyRevenueData.map((d, idx) => {
                const heightPercent = Math.min(100, Math.round((d.amount / 8.0) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{d.amount}L
                    </span>
                    <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-t-lg h-full flex items-end overflow-hidden">
                      <div
                        className="w-full bg-emerald-500 group-hover:bg-emerald-400 rounded-t-lg transition-all duration-300 shadow-sm"
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-1">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="clay-card p-4 sm:p-5">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
                Fee Collection by Category
              </h3>
              <div className="space-y-3 text-xs">
                {[
                  { head: 'Tuition Fees', collected: '₹28,50,000', share: 66 },
                  { head: 'Laboratory & IT Fees', collected: '₹6,40,000', share: 15 },
                  { head: 'Transport & Bus', collected: '₹4,80,000', share: 11 },
                  { head: 'Sports & Library', collected: '₹3,15,000', share: 8 }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span>{item.head}</span>
                      <span>{item.collected} ({item.share}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.share}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="clay-card p-4 sm:p-5">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
                Payment Modes Share
              </h3>
              <div className="space-y-2.5 text-xs">
                {[
                  { mode: 'UPI & QR Code (GooglePay / PhonePe)', share: '54%', amount: '₹23,13,900' },
                  { mode: 'Net Banking & NEFT Transfer', share: '24%', amount: '₹10,28,400' },
                  { mode: 'Credit / Debit POS Terminal', share: '14%', amount: '₹5,99,900' },
                  { mode: 'Cash Counter Desk', share: '8%', amount: '₹3,42,800' }
                ].map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-white text-xs">{m.mode}</div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{m.share} share</span>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-xs">{m.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="clay-card p-4 sm:p-5">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
                Pending Defaulter Aging
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 flex items-center justify-between">
                  <span className="font-medium text-emerald-800 dark:text-emerald-300">Current Month Due</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">₹1,85,000 (34 students)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 flex items-center justify-between">
                  <span className="font-medium text-amber-800 dark:text-amber-300">1 - 30 Days Overdue</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">₹1,20,000 (18 students)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 flex items-center justify-between">
                  <span className="font-medium text-rose-800 dark:text-rose-300">30+ Days Critical</span>
                  <span className="font-bold text-rose-700 dark:text-rose-400">₹65,000 (8 students)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📅 TAB 3: ATTENDANCE & PUNCTUALITY */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <div className="clay-card p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3">
              Monthly Attendance Performance Trends
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { month: 'September 2026', studentRate: '96.2%', teacherRate: '98.5%', workingDays: 24 },
                { month: 'August 2026', studentRate: '95.1%', teacherRate: '97.8%', workingDays: 25 },
                { month: 'July 2026', studentRate: '94.8%', teacherRate: '98.0%', workingDays: 26 },
                { month: 'June 2026', studentRate: '95.9%', teacherRate: '99.1%', workingDays: 22 }
              ].map((att, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="font-bold text-slate-800 dark:text-white text-xs">{att.month}</div>
                  <div className="text-[10px] text-slate-400 mb-2">{att.workingDays} Active School Days</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Students:</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{att.studentRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Faculty:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{att.teacherRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 👨‍🏫 TAB 4: FACULTY & WORKLOAD */}
      {activeTab === 'staff' && (
        <div className="space-y-4">
          <div className="clay-card p-4 sm:p-5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3">
              Department-Wise Faculty Allocation & Teaching Load
            </h3>
            <div className="space-y-2.5 text-xs">
              {[
                { dept: 'Department of Mathematics', staffCount: 12, avgPeriodsPerWeek: 26, syllabusCovered: '72%' },
                { dept: 'Department of Science & Labs', staffCount: 16, avgPeriodsPerWeek: 28, syllabusCovered: '75%' },
                { dept: 'Department of Languages (English/Hindi)', staffCount: 14, avgPeriodsPerWeek: 24, syllabusCovered: '78%' },
                { dept: 'Department of Social Sciences', staffCount: 10, avgPeriodsPerWeek: 22, syllabusCovered: '80%' },
                { dept: 'Department of Computer Science & Robotics', staffCount: 8, avgPeriodsPerWeek: 25, syllabusCovered: '70%' },
              ].map((d, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white text-xs">{d.dept}</div>
                    <span className="text-[11px] text-slate-400">{d.staffCount} Faculty Members</span>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Avg Lectures / Wk</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{d.avgPeriodsPerWeek} Periods</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Syllabus Progress</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{d.syllabusCovered}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
